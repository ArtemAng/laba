import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsInt, Min, IsNumber  } from "class-validator";

export class CreateEmployeeDto {
  @ApiProperty({example: 'John', description: 'Employee first name'})
  @IsString({message: 'Incorrect first name, it must be a string'})
  firstName: string;

  @ApiProperty({example: 'Doe', description: 'Employee last name'})
  @IsString({message: 'Incorrect last name, it must be a string'})
  lastName: string;

  @ApiProperty({example: 'jUJ4m@example.com', description: 'Employee email'})
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @ApiProperty({example: 21, description: 'Employee age'})
  @IsInt({message: 'Age must be a number'})
  @Min(0, {message: 'Age must be greater than 0'})
  age: number;

  @ApiProperty({example: 2, description: 'Employee work experience'})
  @IsInt({message: 'Work experience must be a number'})
  @Min(0, {message: 'Work experience must be greater than 0'})
  workExperience: number;

  @ApiProperty({example: 'trainee', description: 'Employee programming level'})
  @IsString({message: 'Programming level must be a string'})
  programmingLevel: string;

  @ApiProperty({example: 10, description: 'Employee price per hour'})
  @IsNumber({}, {message: 'Salary must be a number'})
  @Min(1, {message: 'Salary must be greater than 0'})
  pricePerHour: number;
}