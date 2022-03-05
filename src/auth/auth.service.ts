import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Connection } from 'typeorm';
import User from 'src/user/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private connection: Connection,
    private readonly jwtService: JwtService
  ) {}
  private userRepository = this.connection.getRepository(User);

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new NotFoundException('User Not Found');
    await this.verifyPassword(password, user.password);
    user.password = undefined;
    return user;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async login(tokenPayload: any) {
    const validateUser = await this.validateUser(tokenPayload);
    const { email, roles, id } = validateUser;
    const accessToken = this.jwtService.sign({ email, roles, id });
    if (validateUser) {
      return {
        email,
        roles,
        id,
        accessToken
      };
    }
    return validateUser;
  }
}
