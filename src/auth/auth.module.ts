import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthEmailsModule } from '../auth-emails/auth-emails.module';
import { UsersModule } from '../models/users/users.module';
import { EmailNotTakenRule } from '../rules/email-not-taken.rule';
import { UsernameNotTakenRule } from '../rules/username-not-taken.rule copy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './strategies/local.strategy';
import { BearerStrategy } from './strategies/bearer.strategy';
import { ApiKeysModule } from '../api-keys/api-keys.module';
import { OrganizationsModule } from '../models/organizations/organizations.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
	imports: [
		ConfigModule,
		PassportModule.register({ session: true }),
		ApiKeysModule,
		forwardRef(() => UsersModule),
		forwardRef(() => AuthEmailsModule),
		forwardRef(() => OrganizationsModule),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
			  secret: config.get<string>('JWT_SECRET'),
			  signOptions: { expiresIn: '1d' },
			}),
		  }),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		LocalStrategy,
		BearerStrategy,
		SessionSerializer,
		UsernameNotTakenRule,
		EmailNotTakenRule,
		JwtStrategy
	],
	exports: [AuthService],
})
export class AuthModule {}
