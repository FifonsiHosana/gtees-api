import { forwardRef, Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderitems.entity';
import { User } from '../users/user.entity';
import { Product } from 'src/products/products.entity';
import { ShippingAddress } from './entities/shipping-address.entity';
import { OrderStatusHistory } from './entities/order-status-history.entity';
import { Payment } from 'src/payments/payments.entity';
import { PaymentsModule } from 'src/payments/payments.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
      User,
      Product,
      ShippingAddress,
      OrderStatusHistory,
      Payment,
    ]),
    forwardRef(() => PaymentsModule),
  ],  
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
