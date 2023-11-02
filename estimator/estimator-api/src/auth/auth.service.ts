import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

	constructor(
		private usersService: UsersService,
	) { }

	sign(payload: {email: string, id: number}) {
		const header = {
			alg: 'HS256', 
			typ: 'JWT', 
		};
	
		const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64');
		const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
		const signatureInput = encodedHeader + '.' + encodedPayload;
	
		const signature = crypto
			.createHmac('sha256', 'secret')
			.update(signatureInput)
			.digest('base64');
	
		
		return `${encodedHeader}.${encodedPayload}.${signature}`;
	}

	private async validateUser(dto: AuthUserDto) {
		const user = await this.usersService.findUserByEmail(dto.email);
		const validatePassword = await bcrypt.compareSync(dto.password, user.password);

		if (user && validatePassword) {
			return user;
		}
		throw new UnauthorizedException({ message: 'Invalid email or password' });

	}

	async signIn(dto: AuthUserDto) {
		const user = await this.validateUser(dto);
		return this.generateToken(user);
	}

	generateToken(user: User) {
		const payload = { email: user.email, id: user.id }
		return {
			token: this.sign(payload)
		}
	}

	async signUp(dto: CreateUserDto) {
		const user = await this.usersService.findUserByEmail(dto.email);

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
