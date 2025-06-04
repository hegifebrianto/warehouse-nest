import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailsService } from './emails.service';
import { ResendFactory } from './resend.factory';

@Module({
	imports: [ConfigModule],

	providers: [
		EmailsService,
		{
			provide: 'RESEND',
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const apiKey = configService.get<string>('RESEND_API_KEY');
				if (!apiKey) {
					throw new Error('Missing RESEND_API_KEY');
				}
				return new ResendFactory().getInstance(apiKey);
			},
		},
	],
	exports: [EmailsService],
})
export class EmailsModule {}
