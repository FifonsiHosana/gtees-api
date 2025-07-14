import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/products.entity';

@Entity()
@Unique(['user', 'product'])
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.favorites)
  user: User;

  @ManyToOne(() => Product, product => product.favorites)
  product: Product;
}
