import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Employee from 'src/employee/employee.entity';
import { Connection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private connection: Connection
  ) {}
  private employeeRepository = this.connection.getRepository(Employee);

  async create(user: CreateUserDto) {
    const employee = await this.employeeRepository.findOne(user.employeeId);
    try {
      if (employee) {
        user.employee = employee;
        const newUser = await this.userRepository.create(user);
        await this.userRepository.save(newUser);
        return newUser;
      } else {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      if (error.code == 23505)
        throw new HttpException(
          `User ${employee.name} is already exist`,
          HttpStatus.BAD_REQUEST
        );
      else throw error;
    }
  }

  async update(id: number, user: UpdateUserDto) {
    try {
      await this.userRepository.update(id, user);
      const updatedUser = await this.userRepository.findOne(id);
      if (updatedUser) {
        return updatedUser;
      }
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({ relations: ['employee'] });
    if (users) {
      return users;
    }
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      relations: ['employee']
    });
    if (user) {
      return user;
    }
    throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
  }

  async delete(id: number): Promise<User[]> {
    const deleteResponse = await this.userRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.userRepository.find();
  }
}
