import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { IUpdateProductDto } from '../../../common/types';
import { ImageDto } from '../../users/dto/image.dto';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends CreateProductDto implements IUpdateProductDto {
	@ValidateNested()
	@Type(() => ImageDto)
	image: ImageDto;

	@ValidateNested()
	@Type(() => ImageDto)
	qrImage: ImageDto;
}
