import { IsString, Length } from 'class-validator';
import { IChangePasswordDto } from '../../common/types';

export class ChangePasswordDto implements IChangePasswordDto {
	@IsString()
	@Length(4, 32)
	oldPassword: string;

	@IsString()
	@Length(4, 32)
	newPassword: string;
}
