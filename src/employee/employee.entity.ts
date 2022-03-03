import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
class Employee {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public employeeId: number;

  @Column()
  public name: string;

  @Column()
  public age: number;

  @Column()
  public phoneNumber: number;

  @Column()
  public position: string;

  @Column()
  public address: string;

  @Column()
  public basicSalary: number;

  @Column()
  public salaryAllowance: number;

  @Column()
  public totalSalary: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}

export default Employee;
