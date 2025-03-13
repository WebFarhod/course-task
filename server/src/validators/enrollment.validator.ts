import { IsBoolean, IsMongoId, IsNotEmpty } from "class-validator";

export class CreateEnrollmentDto {
  @IsNotEmpty()
  @IsMongoId()
  studentId: string;

  @IsNotEmpty()
  @IsMongoId()
  courseId: string;
}

// export class UpdateEnrollmentDto extends CreateEnrollmentDto {
//   @IsNotEmpty()
//   @IsBoolean()
//   isActive: boolean;
// }
