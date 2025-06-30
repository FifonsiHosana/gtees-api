import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Order } from "src/orders/entities/order.entity";

export type Role = 'customer' | 'admin'

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column({default: 'customer'})
    role: Role;
    @Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    created_at: Date;
    @OneToMany(()=>Order, order => order.user)
    orders: Order[];
}
