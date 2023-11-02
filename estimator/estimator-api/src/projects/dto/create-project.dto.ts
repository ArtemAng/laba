import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsArray, IsInt  } from "class-validator";

export class CreateProjectDto {
  @ApiProperty({example: 'My project', description: 'Project name'})
  @IsString({message: 'Incorrect name, it must be a string'})
  name: string;

  @ApiProperty({example: 'jUJ4m@example.com', description: 'Project owner\'s email'})
  @IsEmail({}, { message: 'Email is not valid' })
  ownerEmail: string;

  @ApiProperty({example: 100, description: 'Hours spent'})
  @IsInt( { message: 'Incorrect hours' })
  hours: number;
}