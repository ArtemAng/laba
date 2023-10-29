import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @ApiOperation({summary: 'Create user'})
  @UsePipes(ValidationPipe)
  @ApiResponse({status: 200, type: User})
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @ApiOperation({summary: 'Get all users'})
  @ApiResponse({status: 200, type: Array<User>})
  @Get()
  getAllUserss() {
    return this.usersService.findAllUsers();
  }
}
