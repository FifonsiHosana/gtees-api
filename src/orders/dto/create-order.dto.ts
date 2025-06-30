import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class OrderItemInput{
    @IsInt() productId:number;
    @IsInt() quantity: number;
    @IsNumber() price: number;
}

export class ShippingAddressDto {
    @IsString() fullName: string;
    @IsString() phone: string;
    @IsString() addressLine1: string;
    @IsOptional() @IsString() addressLine2?: string;
    @IsString() city: string;

  }
  
  export class CreateOrderDto {
    @ValidateNested({ each: true }) @Type(() => OrderItemInput)
    items: OrderItemInput[];
  
    @IsNumber() total: number;
  
    @ValidateNested() @Type(() => ShippingAddressDto)
    shippingAddress: ShippingAddressDto;
  }
  