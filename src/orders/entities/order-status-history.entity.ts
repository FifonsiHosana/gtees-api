import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderStatusHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.statusHistory)
  order: Order;

  @Column()
  oldStatus: string;

  @Column()
  newStatus: string;

  @Column()
  changedBy: string;

  @CreateDateColumn()
  changedAt: Date;
}
