import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class UpdateCourseDto extends CreateCourseDto {
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
