import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) { }

	private async validateUser(dto: AuthUserDto) {
		const user = await this.usersService.findUserByEmail(dto.email);
		const validatePassword = await bcrypt.compareSync(dto.password, user.password);
		
		if (user && validatePassword) {
			return user;
		}
		throw new UnauthorizedException({message: 'Invalid email or password'});

	}

	async signIn(dto: AuthUserDto) {
		const user = await this.validateUser(dto);
		return this.generateToken(user);
	}

	generateToken(user: User) {
		const payload = { email: user.email, id: user.id}
		return {
			token: this.jwtService.sign(payload)
		}
	}

	async signUp(dto: CreateUserDto) {
		const user = await this.usersService.findUserByEmail(dto.email);
		console.log(user);
		
		if (user) {
			throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
		}
		const hashPassword = bcrypt.hashSync(dto.password, 7);
		const newUser = await this.usersService.createUser({
			...dto,
			password: hashPassword
		});

		return this.generateToken(newUser);
	}
}
