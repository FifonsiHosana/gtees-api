import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "src/products/products.entity";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id:number
    @ManyToOne(()=> Order, order => order.items)
    order: Order;
    @ManyToOne(()=> Product, product=>product.orderItems)
    product:Product;
    @Column()
    size: string;
    @Column({nullable: true})
    color: string;
    @Column()
    quantity: number;
    @Column('decimal')
    price: number
}