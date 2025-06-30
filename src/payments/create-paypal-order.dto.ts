import { IsNumber } from 'class-validator';

export class CreatePaypalOrderDto {
  @IsNumber()
  total: number;
}