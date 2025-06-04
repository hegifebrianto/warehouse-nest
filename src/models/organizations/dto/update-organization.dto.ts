import { IsString, Length } from 'class-validator';
import { IUpdateOrganizationDto } from '../../../common/types';

export class UpdateOrganizationDto implements IUpdateOrganizationDto {
	@IsString()
	@Length(4, 64)
	name: string;
}
