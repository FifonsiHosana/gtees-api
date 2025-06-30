import { Entity,PrimaryGeneratedColumn,ManyToOne,Column } from "typeorm";
import { Order } from "src/orders/entities/order.entity";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.payments)
  order: Order;

  @Column()
  provider: string; // 'paypal'

  @Column()
  transaction_id: string;

  @Column({ default: 'completed' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  paid_at: Date;
}
