import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from "typeorm";
import { Order } from "src/orders/entities/order.entity";
import { Favorite } from "src/favorites/favorite.entity";

export type Role = 'customer' | 'admin'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column({ default: 'customer' })
    role: Role;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    @Column({ nullable: true })
    cart: string;
    @OneToMany(() => Order, order => order.user)
    orders: Order[];
    @OneToMany(() => Favorite, favorite => favorite.user, { cascade: true })
    @JoinTable()
    favorites: Favorite[];
}
