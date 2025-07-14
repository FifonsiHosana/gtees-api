import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/products.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.cart)
  user: User;

  @ManyToOne(() => Product)
  product: Product;

  @Column({ default: 1 })
  quantity: number;
}