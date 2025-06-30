import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { OrderItem } from 'src/orders/entities/orderitems.entity';
import { Product } from 'src/products/products.entity';
import { Category } from 'src/categories/categories.entity';
import { ProductImage } from 'src/products/productimage.entity';
import { Variant } from 'src/products/variant.entity';
import { Payment } from 'src/payments/payments.entity';
import { ShippingAddress } from 'src/orders/entities/shipping-address.entity';
import { OrderStatusHistory } from 'src/orders/entities/order-status-history.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([User,Order,OrderItem,Product,Category,ProductImage,Variant,Payment,ShippingAddress,OrderStatusHistory])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
