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

  @ManyToOne(() => ProductEx, (product) => product.images, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  product: ProductEx;
}
