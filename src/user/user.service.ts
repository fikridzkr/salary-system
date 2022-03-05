import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesUser } from 'src/common/enums/roles.enum';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes';
import Employee from 'src/employee/employee.entity';
import { Connection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private connection: Connection
  ) {}
  private employeeRepository = this.connection.getRepository(Employee);

  async create(user: CreateUserDto) {
    try {
      const { employeeId, roles, password } = user;
      const hashedPassword = await bcrypt.hash(password, 10);
      if (employeeId && roles !== RolesUser.SUPERADMIN) {
        const employee = await this.employeeRepository.findOne(user.employeeId);
        if (employee) user.employee = employee;
        else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const newUser = await this.userRepository.create({
        ...user,
        password: hashedPassword
      });
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      console.log(error);
      if (error.code === PostgresErrorCode.UniqueViolation && user.employeeId)
        throw new HttpException(
          `User is already exist`,
          HttpStatus.BAD_REQUEST
        );
      if (error.code == PostgresErrorCode.UniqueViolation)
        throw new HttpException(
          `Email is already exist`,
          HttpStatus.BAD_REQUEST
        );
      else
        throw new HttpException(
          'Something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
  }

  async update(id: number, user: UpdateUserDto) {
    try {
      let newPassword: string;
      const { employeeId, roles, password } = user;
      if (employeeId && roles !== RolesUser.SUPERADMIN) {
        const employee = await this.employeeRepository.findOne(employeeId);
        if (employee) user.employee = employee;
        else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      if (password) {
        newPassword = await bcrypt.hash(password, 10);
        user.password = newPassword;
      }
      await this.userRepository.update(id, user);
      const updatedUser = await this.userRepository.findOne(id);
      if (updatedUser) {
        return updatedUser;
      }
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
