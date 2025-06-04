import { IsMongoId } from 'class-validator';
import { ITransferOrganizationDto } from '../../common/types';

export class TransferOrganizationDto implements ITransferOrganizationDto {
	@IsMongoId()
	user: string;
}
