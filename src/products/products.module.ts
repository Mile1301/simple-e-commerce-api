import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEx } from './entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEx])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
