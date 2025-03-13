import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}

export class UpdateStudentDto extends CreateStudentDto {
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
