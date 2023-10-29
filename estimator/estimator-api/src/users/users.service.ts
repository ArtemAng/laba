import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository : typeof User) {}

  async createUser(dto: CreateUserDto) {
    const candidate = await this.userRepository.findOne({where: {email: dto.email}});
    if (candidate) {
      throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.create(dto);
    return user;
  }

  async findAllUsers(){
    const users = await this.userRepository.findAll();
    return users;
  }

  async findUserByEmail(email: string){
    const user = await this.userRepository.findOne({where: {email}});
    return user;
  }
}
