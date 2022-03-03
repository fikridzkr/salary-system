import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  public position: string;

  @Column()
  public address: string;

  @Column()
  public basicSalary: number;

  @Column()
  public salaryAllowance: number;

  @Column()
  public totalSalary: number;
}

export default Employee;
