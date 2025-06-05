import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserAuthDocument = HydratedDocument<UserAuth>;

@Schema()
export class UserAuth {
	@Prop()
	username?: string | null;

	@Prop()
	password: string | null;

	@Prop({ required: false })
	apiKey?: string | null;
}

export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);
