// import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToMany} from "typeorm";
// import { Category } from "src/categories/categories.entity";
// import { ProductImage } from "./productimage.entity";
// import { Variant } from "./variant.entity";
// import { OrderItem } from "src/orders/entities/orderitems.entity";



// @Entity()
// export class Product {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column({ unique: true })
//   slug: string;

//   @Column({ nullable: true })
//   description: string;

//   @Column('decimal')
//   price: number;

//   @ManyToOne(() => Category, category => category.products)
//   category: Category;

//   @OneToMany(() => ProductImage, image => image.product)
//   images: ProductImage[];

//   @OneToMany(() => Variant, variant => variant.product)
//   variants: Variant[];

//   @OneToMany(() => OrderItem, item => item.product)
//   orderItems: OrderItem[];

//   @Column({ default: 0 })
//   stock: number;
// }
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from 'src/categories/categories.entity';
import { ProductImage } from './productimage.entity';
import { OrderItem } from 'src/orders/entities/orderitems.entity';
import { Variant } from './variant.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  // @OneToMany(() => ProductImage, image => image.product)
  // images: ProductImage[];
  @Column({ nullable: true })
  image: string;
  @OneToMany(() => OrderItem, item => item.product)
  orderItems: OrderItem[];
  @OneToMany(() => Variant, variant => variant.product)
  variants: Variant[];

}
