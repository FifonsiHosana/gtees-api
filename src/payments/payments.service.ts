import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class PaymentsService {
    constructor(private readonly ordersService: OrdersService) {
    console.log('PaymentsService constructed');
  }

  private async getAccessToken() {
    const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');
    const { data } = await axios.post(
      `${process.env.PAYPAL_API}/v1/oauth2/token`,
      'grant_type=client_credentials',
      { headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return data.access_token;
  }

  async createOrder(total: number) {
    const accessToken = await this.getAccessToken();
    const response = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders`,
      {
        intent: 'CAPTURE',
        purchase_units: [{ amount: { currency_code: 'USD', value: total.toFixed(2) } }],
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response.data;
  }

  async captureOrder(paypalOrderId: string, internalOrderId: number) {
    const accessToken = await this.getAccessToken();
    const { data } = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders/${paypalOrderId}/capture`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    
    await this.ordersService.updateStatus(internalOrderId, 'paid');

    return data;
  }
}
