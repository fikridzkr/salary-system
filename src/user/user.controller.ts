import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import User from './user.entity';
import { UserService } from './user.service';
import { Roles } from '../common/decarators/roles.decorator';
import { RolesUser } from 'src/common/enums/roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    const users: Promise<User[]> = this.userService.findAll();
    return users;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user: Promise<User> = this.userService.findOne(id);
    if (user) return user;
  }

  @Post()
  @Roles(RolesUser.ADMIN)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Patch(':id')
  @Roles(RolesUser.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    const user: Promise<User> = this.userService.update(id, updateUserDto);
    return user;
  }

  @Delete(':id')
  @Roles(RolesUser.ADMIN)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
    const user = this.userService.delete(id);
    return user;
  }
}
