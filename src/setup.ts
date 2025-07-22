import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import RedisStore from 'connect-redis';
import { json } from 'express';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import Utils from './helpers/utils';
import redisClient from './redis/connect';

/**
 * NestSetup class is responsible for configuring nest startup sequence,
 * express middlewares, global pipes and such
 *
 * This class can be used for both regular start and e2e start.
 */
export default class NestSetup {
	static async setupNestApp(port: string) {
		const app = await NestFactory.create<NestExpressApplication>(AppModule);

		this.configureNestApp(app);
		this.setupSwagger(app);

		await app.listen(port || 4000);
	}

	static configureNestApp(app: NestExpressApplication): void {
		// Allow for base64 attachments
		app.use(json({ limit: '50mb' }));

		// Frontend is served on / by static serve module, so serve api on /api
		app.setGlobalPrefix('api');

		// This is for decency injection in custom validators
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useContainer(app.select(AppModule), { fallbackOnErrors: true });

		// Setup validation with class-validator and class-transformer
		app.useGlobalPipes(new ValidationPipe({ transform: true }));

		this.setupSession(app);
		app.use(passport.initialize());
		app.use(passport.session());
	}

	private static async setupSwagger(app: NestExpressApplication) {
		const config = new DocumentBuilder()
			.setTitle('Terbit Warehouse Stock API')
			.setDescription(
				'Welcome to StockedUp official API reference!\n\nLinks:\n' +
					'- [API Documentation](https://github.com/hegifebrianto/warehouse-nest)\n' +
					'- [GitHub Profile](https://github.com/hegifebrianto)\n' 
			)
			.setVersion('v1')
			.addBearerAuth()
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('api', app, document);
	}

	private static async setupSession(app: NestExpressApplication) {
		const redisStore = new RedisStore({
			client: redisClient,
			prefix: 'session:',
		});

		const isProduction = Utils.isProduction();

		if (isProduction) {
			// Allow for setting secure cookies via reverse proxy
			// Recommended deployment way is NGINX reverse proxy
			app.set('trust proxy', 1);
		}

		const sessionSecret = Utils.isTest() ? 'keyboard cat' : process.env.SESSION_SECRET;

		app.use(
			session({
				store: redisStore,
				secret: sessionSecret,
				resave: false,
				saveUninitialized: false,
				cookie: {
					maxAge: 30 * 24 * 60 * 60 * 1000,
					httpOnly: true,
					sameSite: 'strict',
					secure: Utils.isProduction(),
				},
			}),
		);
	}
}
