import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model } from "sequelize-typescript";

interface UserCreationAttrs {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  workExperience: number;
  programmingLevel: string;
  pricePerHour: number;
}

@Table({
  tableName: 'employees',
})
export class Employee extends Model<Employee, UserCreationAttrs> {
  
	@ApiProperty({ example: '1', description: 'Unique identifier' })
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
	id: number;

  @Column({ type: DataType.STRING, allowNull: false})
  firstName: string;

  @Column({ type: DataType.STRING, allowNull: false})
  lastName: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true})
  email: string;

  @Column({ type: DataType.INTEGER, allowNull: false})
  age: number;

  @Column({ type: DataType.INTEGER, allowNull: false})
  workExperience: number;

  @Column({ type: DataType.STRING, allowNull: false})
  programmingLevel: string;

  @Column({ type: DataType.INTEGER, allowNull: false})
  pricePerHour: number;
}