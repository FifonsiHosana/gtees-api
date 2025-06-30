import { IsArray, IsInt, IsNumber, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
export class CreateProductDto {
    @IsString() name: string;
    @IsString() slug: string;
    @IsString() description: string;
    @IsNumber() price: number;
    @IsArray() image: string[];
    @IsInt() categoryId: number;
    @IsInt() stock: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) { }