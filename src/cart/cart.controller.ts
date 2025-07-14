import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CartService } from './cart.service';

@Controller('cart')
@UseGuards(AuthGuard('jwt'))
export class CartController {
    constructor(private readonly cartService: CartService) {}

  @Post(':productId')
  add(@Req() req, @Param('productId') productId: number, @Body('quantity') quantity: number) {
    return this.cartService.addToCart(req.user.userId, productId, quantity);
  }

  @Get()
  getCart(@Req() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Delete(':itemId')
  remove(@Req() req, @Param('itemId') itemId: number) {
    return this.cartService.removeItem(req.user.userId, itemId);
  }

  @Delete()
  clear(@Req() req) {
    return this.cartService.clearCart(req.user.userId);
  }

    @Post('checkout')
  checkout(@Req() req) {
    return this.cartService.checkout(req.user);
  }
}
