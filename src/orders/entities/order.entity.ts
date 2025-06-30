import { Entity, ManyToOne, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/user.entity";
import { OrderItem } from "./orderitems.entity";
import { Payment } from "src/payments/payments.entity";
import { ShippingAddress } from "./shipping-address.entity";
import { OrderStatusHistory } from "./order-status-history.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, (user) => user.orders)
    user: User;
    @Column({ default: 'pending' })
    status: 'pending' | 'paid' | 'shipped' | 'delivered';
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    @Column('decimal')
    total: number;
    @OneToMany(() => OrderItem, item => item.order)
    items: OrderItem[];
    @OneToMany(() => Payment, payment => payment.order)
    payments: Payment[];
    @ManyToOne(() => ShippingAddress, { cascade: true, eager: true })
    shippingAddress: ShippingAddress;
    @OneToMany(() => OrderStatusHistory, (h) => h.order, { cascade: true })
    statusHistory: OrderStatusHistory[];
}