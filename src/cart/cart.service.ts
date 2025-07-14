import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart.entity';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/products.entity';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartItem)
        private cartRepo: Repository<CartItem>,
        @InjectRepository(Product)
        private productRepo: Repository<Product>,
        @InjectRepository(Order)
        private orderRepo: Repository<Order>
    ) { }


    async addToCart(user: User, productId: number, quantity: number) {
        const product = await this.productRepo.findOne({ where: { id: productId } });
        if (!product) throw new NotFoundException('Product not found');
        if (product.stock < quantity) throw new BadRequestException('Insufficient stock');

        const existing = await this.cartRepo.findOne({ where: { user: { id: user.id }, product: { id: productId } } });

        if (existing) {
            existing.quantity += quantity;
            return this.cartRepo.save(existing);
        }

        const item = this.cartRepo.create({ user, product, quantity });
        return this.cartRepo.save(item);
    }

    async getCart(user: User) {
        return this.cartRepo.find({ where: { user: { id: user.id } }, relations: ['product'] });
    }

    async removeItem(user: User, itemId: number) {
        const item = await this.cartRepo.findOne({ where: { id: itemId, user: { id: user.id } } });
        if (!item) throw new NotFoundException('Item not found');
        return this.cartRepo.remove(item);
    }

    async clearCart(user: User) {
        const items = await this.cartRepo.find({ where: { user: { id: user.id } } });
        return this.cartRepo.remove(items);
    }

    async checkout(user: User) {
        const items = await this.getCart(user);
        if (!items.length) throw new BadRequestException('Cart is empty');

        // Check stock again during checkout
        for (const item of items) {
            const product = await this.productRepo.findOne({ where: { id: item.product.id } });
            if (!product) {
                throw new BadRequestException(`Product not found for item in cart`);
            }
            if (product.stock < item.quantity) {
                throw new BadRequestException(`Not enough stock for ${product.name}`);
            }
        }

        // Deduct stock
        for (const item of items) {
            item.product.stock -= item.quantity;
            await this.productRepo.save(item.product);
        }

        // Create order logic 
        const order = this.orderRepo.create({
            user,
            total: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
            items: items.map(item => ({
                product: item.product,
                quantity: item.quantity,
                price: item.product.price,
            })),
        });
        await this.orderRepo.save(order);


        await this.clearCart(user);

        return { message: 'Order created from cart successfully' };
    }
}

