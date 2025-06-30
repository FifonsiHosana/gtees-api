import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString() name: string;
    @IsEmail() eamil: string;
    @MinLength(6) password: string;
}