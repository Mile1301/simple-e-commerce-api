import { ProductEx } from 'src/products/entities/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ default: 1000 })
  priority: number;

  // An image can be associated with one product, but one product can have many images
  // JoinColumn is used to create a column in the images table that references by id the product with its associated images

  @ManyToOne(() => ProductEx, (product) => product.images, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  product: ProductEx;
}
