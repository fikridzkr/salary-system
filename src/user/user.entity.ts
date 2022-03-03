/* eslint-disable @typescript-eslint/no-unused-vars */
import { RolesUser } from 'src/common/enums/roles.enum';
import Employee from 'src/employee/employee.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column()
  public roles: RolesUser;

  @OneToOne((type) => Employee, { cascade: true })
  @JoinColumn()
  public employee: Employee;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}

export default User;
