import { CreateProductExDto } from './create-product.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProductExDto extends PartialType(CreateProductExDto) {}
