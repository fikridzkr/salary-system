import { Body, Controller, Get, HttpCode, Patch, Post } from '@nestjs/common';
import { RolesUser } from 'src/common/enums/roles.enum';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('/login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const login = await this.authService.login(loginDto);
    return login;
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    createUserDto.roles = RolesUser.SUPERADMIN;
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Patch('/forgot-password')
  async forgotPassword() {
    return 'On develop';
  }

  @Get('/2Fa')
  async TwoFactorAuth() {
    return 'On Develop';
  }
}
