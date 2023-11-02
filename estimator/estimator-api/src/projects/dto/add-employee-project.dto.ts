import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class AddEmployeeDto {
  @ApiProperty({example: 'jUJ4m@example.com', description: 'emloyee\'s email'})
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;
}