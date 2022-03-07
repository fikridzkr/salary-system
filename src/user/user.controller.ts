import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import User from './user.entity';
import { UserService } from './user.service';
import { Roles } from '../common/decarators/roles.decorator';
import { RolesUser } from 'src/common/enums/roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TransformInterceptor } from 'src/utils/helpers/transformInterceptor';

@Controller('user')
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(@Query() query): Promise<object> {
    const users = this.userService.findAll(query);
    return users;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<object> {
    const user: Promise<object> = this.userService.findOne(id);
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Patch(':id')
  @Roles(RolesUser.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<object> {
    const user: Promise<object> = this.userService.update(id, updateUserDto);
    return user;
  }

  @Delete(':id')
  @Roles(RolesUser.ADMIN)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<object> {
    const user = this.userService.delete(id);
    return user;
  }
}
