import { IsBoolean, IsDataURI, IsEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { IImageDto } from '../../../common/types';

export class ImageDto implements IImageDto {
	@IsBoolean()
	hasImage: boolean;

	@ValidateIf((o) => !o.data)
	@IsOptional()
	@IsString()
	url?: string;

	@IsOptional()
	@IsDataURI()
	data?: string;
}
