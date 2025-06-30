import { Req } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UseGuards, Post, Body, Get, Param, Patch } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/guards/roles.guards';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {
    console.log('OrdersController constructed');
  }

    @Get('my')
    @ApiOperation({ summary: 'Get current user\'s orders' })
    @ApiResponse({ status: 200, description: 'List of user orders' })
    async userOrders(@Req() req) {
        return this.orderService.getUserOrders(req.user.userId);
    }


    @Get()
    @ApiOperation({ summary: 'Get all orders (admin)' })
    @ApiResponse({ status: 200, description: 'List of all orders' })
    async allOrders() {
        return this.orderService.getAllOrders();
    }


    @Patch(':id/status')
    @ApiOperation({ summary: 'Update order status (admin)' })
    @ApiResponse({ status: 200, description: 'Order status updated' })
    async updateStatus(@Param('id') id: number, @Body() body: { status: 'pending' | 'paid' | 'shipped' | 'delivered' }) {
        return this.orderService.updateStatus(+id, body.status);
    }

    @Get(':id/history')
    @ApiOperation({ summary: 'Get status change history for an order' })
    @ApiResponse({ status: 200, description: 'Order status history retrieved' })
    async getStatusHistory(@Param('id') id: number) {
        return this.orderService.getStatusHistory(+id);
    }
}
