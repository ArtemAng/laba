import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signin')
    signIn(@Body() dto: AuthUserDto) {
        return this.authService.signIn(dto);
    }

    @Post('/signup')
    signUp(@Body() dto: CreateUserDto) {
        return this.authService.signUp(dto);
    }
}
