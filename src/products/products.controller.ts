import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductFilters } from './interfaces/products-filters.interface';
import { CreateProductExDto } from './dtos/create-product.dto';
import { UpdateProductExDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  createProduct(@Body() productData: CreateProductExDto) {
    return this.productsService.createProduct(productData);
  }

  @Patch('/:id')
  updateProduct(
    @Param('id') productId: string,
    @Body() updateData: UpdateProductExDto,
  ) {
    return this.productsService.updateProduct(Number(productId), updateData);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') productId: string) {
    return this.productsService.deleteProduct(Number(productId));
  }

  @Get()
  findAllProducts(@Query() filters: ProductFilters) {
    return this.productsService.findAllProducts(filters);
  }

  @Get('/:id')
  findProductById(@Param('id') productId: string) {
    return this.productsService.findProductById(Number(productId));
  }
}
