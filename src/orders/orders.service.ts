import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatusHistory } from './entities/order-status-history.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderitems.entity';
import { ShippingAddress } from './entities/shipping-address.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepo: Repository<Order>,
    
        @InjectRepository(OrderItem)
        private itemRepo: Repository<OrderItem>,
    
        @InjectRepository(User)
        private userRepo: Repository<User>,
    
        @InjectRepository(Product)
        private productRepo: Repository<Product>,
    
        @InjectRepository(ShippingAddress)
        private shippingRepo: Repository<ShippingAddress>,
    
        @InjectRepository(OrderStatusHistory)
        private statusHistoryRepo: Repository<OrderStatusHistory>,
      ) {
    console.log('OrdersService constructed');
  }

    async createOrder(userId: number, dto: CreateOrderDto){
        const user = await this.userRepo.findOne({where: {id: userId}});
        const items = await Promise.all(
            dto.items.map(async (item)=> {
                const product = await this.productRepo.findOne({where: {id:item.productId}});
                if (!product) {
                    throw new NotFoundException(`Product with ID ${item.productId} not found`);
                  }
                return this.itemRepo.create({
                    product,
                    quantity: item.quantity,
                    price: item.price,
                });
            })
        );

        const shipping = this.shippingRepo.create(dto.shippingAddress);
        await this.shippingRepo.save(shipping);
        if (!user) {
            throw new NotFoundException(`User not found`);
          }
        const order = this.orderRepo.create({
            user,
            items,
            total: dto.total,
            status:'pending',
            shippingAddress: shipping,
        });
        return this.orderRepo.save(order);
    }
    async getUserOrders(userId: number){
        return this.orderRepo.find({where: {user: {id: userId}}, relations:['items','items.product']});

    }
    async getAllOrders(){
        return this.orderRepo.find({ relations: ['user','items','items.product']});
    }
    async updateStatus(id: number, newStatus: 'pending' | 'paid' | 'shipped' | 'delivered', changedBy = 'admin'){
        const order = await this.orderRepo.findOne({where: {id}});
        if (!order) throw new NotFoundException();
        // order.status = status as any;
        this.orderRepo.save(order);
        
        const oldStatus = order.status;
        order.status = newStatus;

        const history = this.statusHistoryRepo.create({
            order,
            oldStatus,
            newStatus,
            changedBy,
          });
        
          await this.statusHistoryRepo.save(history);
          return this.orderRepo.save(order);
    }
    async getStatusHistory(orderId: number) {
        return this.statusHistoryRepo.find({
          where: { order: { id: orderId } },
          order: { changedAt: 'ASC' },
        });
      }
      
}
