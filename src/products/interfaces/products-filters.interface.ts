import { ProductStatus } from '../entities/products.entity';

export interface ProductFilters {
  name?: string;
  // status?: ProductStatus;
  sortByStatus?: ProductStatus.ACTIVE | ProductStatus.INACTIVE;
  orderBy?: 'price' | 'status';
  sortOrder?: 'ASC' | 'DESC';
}
