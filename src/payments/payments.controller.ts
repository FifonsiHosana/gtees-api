import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PaymentsService } from './payments.service';
import { CreatePaypalOrderDto } from './create-paypal-order.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CapturePaypalOrderDto } from './capture-paypal-order.dto';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post('create')
    @ApiOperation({ summary: 'Create PayPal order' })
    @ApiResponse({ status: 201, description: 'PayPal order created successfully' })
    async createOrder(@Body() body: CreatePaypalOrderDto): Promise<any> {
        return this.paymentsService.createOrder(body.total);
    }

    @Post('capture')
    @ApiOperation({ summary: 'Capture PayPal order and finalize internal order' })
    @ApiResponse({ status: 200, description: 'PayPal order captured and linked to internal order' })
    async captureOrder(@Body() body: CapturePaypalOrderDto): Promise<any> {
        return this.paymentsService.captureOrder(body.paypalOrderId, body.internalOrderId);
    }
}
