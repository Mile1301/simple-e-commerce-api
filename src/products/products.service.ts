import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEx, ProductStatus } from './entities/products.entity';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { ProductFilters } from './interfaces/products-filters.interface';
import { CreateProductExDto } from './dtos/create-product.dto';
import { UpdateProductExDto } from './dtos/update-product.dto';
import { Image } from 'src/images/entities/image.entity';

@Injectable()
export class ProductsService {
  @InjectRepository(ProductEx) private productsRepo: Repository<ProductEx>;

  async createProduct(productData: CreateProductExDto) {
    const { imageIds, ...otherData } = productData;
    const newProduct = this.productsRepo.create({
      ...otherData,
      images: imageIds.map((imageId) => {
        return { id: imageId };
      }),
    });
    await this.productsRepo.save(newProduct);
    return newProduct;
  }

  async updateProduct(productId: number, updateData: UpdateProductExDto) {
    const productToUpdate = await this.findProductById(productId);
    Object.assign(productToUpdate, updateData);

    if (updateData.imageIds) {
      productToUpdate.images = updateData.imageIds.map((imageId) => {
        const image = new Image();
        image.id = imageId;
        return image;
      });
    }

    await this.productsRepo.save(productToUpdate);
  }

  async deleteProduct(productId: number) {
    const productToDelete = await this.findProductById(productId);
    await this.productsRepo.remove(productToDelete);
  }

  findAllProducts(filters: ProductFilters) {
    const filterConfig: FindManyOptions<ProductEx> = {};

    if (filters.name)
      filterConfig.where = {
        ...filterConfig.where,
        name: ILike(`%${filters.name}%`),
      };

    const sortByStatus = filters.sortByStatus || ProductStatus.ACTIVE;
    const sortOrder = filters.sortOrder || 'ASC';

    if (filters.orderBy) {
      if (filters.orderBy === 'price')
        filterConfig.order = { price: sortOrder };
      if (filters.orderBy === 'status')
        filterConfig.where = {
          ...filterConfig.where,
          status: sortByStatus,
        };
    }
    return this.productsRepo.find(filterConfig);
  }

  async findProductById(id: number) {
    const product = await this.productsRepo.findOne({
      where: { id },
      relations: {
        images: true,
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
