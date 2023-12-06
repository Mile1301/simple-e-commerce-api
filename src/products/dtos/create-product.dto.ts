import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { ProductStatus } from '../entities/products.entity';

export class CreateProductExDto {
  @IsString()
  @Length(3, 30)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsArray()
  imageIds: number[];
}
