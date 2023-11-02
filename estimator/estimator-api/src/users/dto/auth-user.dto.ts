import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class AuthUserDto {
    @ApiProperty({example: 'jUJ4m@example.com', description: 'User email'})
    @IsEmail({}, {message: 'Incorrect email'})
    readonly email: string;

    @ApiProperty({example: 'Pa$$w0rd', description: 'User first name'})
    @Length(5, 30, {message: 'Password must be between 5 and 30 characters'})
    readonly password: string;
}