import { IsString, IsNumber } from 'class-validator';

export class CapturePaypalOrderDto {
  @IsString()
  paypalOrderId: string;

  @IsNumber()
  internalOrderId: number;
}