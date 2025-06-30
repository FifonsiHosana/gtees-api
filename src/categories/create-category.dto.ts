import { IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(2, 50)
  name: string;

  @IsString()
  @Length(5, 255)
  description: string;
}