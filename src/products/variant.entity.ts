import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './products.entity';

@Entity()
export class Variant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, product => product.variants)
  product: Product;

  @Column()
  size: string;

  @Column({ nullable: true })
  color: string;

  @Column()
  inventory: number;

  @Column('decimal')
  price: number;
}