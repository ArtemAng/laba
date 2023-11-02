import { BelongsTo, Column, Model, DataType, ForeignKey, Table } from "sequelize-typescript";
import { Project } from "./project.model";
import { Employee } from "src/employees/employee.model";

@Table({
  tableName: 'project_employees',
})
export class ProjectEmployee extends Model<ProjectEmployee> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Project)
  projectId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Employee)
  employeeId: number;
}