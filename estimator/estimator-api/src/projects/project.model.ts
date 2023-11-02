import { Table, Column, Model, DataType, BelongsToMany, BelongsTo, HasOne, ForeignKey } from 'sequelize-typescript';
import { Employee } from 'src/employees/employee.model';
import { User } from 'src/users/users.model';
import { ProjectEmployee } from './project-employees.model';
import { ApiProperty } from '@nestjs/swagger';

interface ProjectCreationAttrs {
  id?: number;
  name: string;
  employees?: Employee[];
  owner?: User;
  hours: number;
}

@Table({
  tableName: 'projects',
})
export class Project extends Model<Project, ProjectCreationAttrs > {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'My project', description: 'Project name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @ApiProperty({ example: 100, description: 'Hours spent' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  hours: number;

  @ApiProperty({ example: [], description: 'Project owner\'s email' })
  @BelongsToMany(() => Employee,  () => ProjectEmployee)
  employees: Employee[];

  @ForeignKey(() => User)
  ownerId: number;

  // @BelongsTo(() => User)
  // owner: User;
  
}
