import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartItem } from './cart.entity';
import { CartService } from './cart.service';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/products.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CartItem, Product, Order])],
    providers: [CartService],
    controllers: [CartController],
})
export class CartModule { }
