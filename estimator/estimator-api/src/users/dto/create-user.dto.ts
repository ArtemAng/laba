import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'jUJ4m@example.com', description: 'User email'})
    @IsString({message: 'Incorrect email, it must be a string'})
    @IsEmail({}, {message: 'Incorrect email'})
    readonly email: string;

    @ApiProperty({example: 'John', description: 'User first name'})
    @IsString({message: 'Incorrect first name, it must be a string'})
    readonly firstName: string;

    @ApiProperty({example: 'Doe', description: 'User last name'})
    @IsString({message: 'Incorrect last name, it must be a string'})
    readonly lastName: string;

    @ApiProperty({example: 'Pa$$w0rd', description: 'User password'})
    @IsString({message: 'Incorrect password type, it must be a string'})
    readonly password: string;
}