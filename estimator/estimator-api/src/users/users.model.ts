import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, BelongsTo, HasMany, ForeignKey } from "sequelize-typescript";
import { Project } from "src/projects/project.model";

interface UserCreationAttrs {
	email: string;
	firstName: string;
	lastName: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {

	@ApiProperty({ example: '1', description: 'Unique identifier' })
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
	id: number;

	@ApiProperty({ example: 'jUJ4m@example.com', description: 'User email' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string;

	@ApiProperty({ example: 'John', description: 'User first name' })
	@Column({ type: DataType.STRING, allowNull: false })
	password: string;

	@ApiProperty({ example: 'Doe', description: 'User last name' })
	@Column({ type: DataType.STRING, allowNull: false })
	firstName: string;

	@ApiProperty({ example: 'Doe', description: 'User last name' })
	@Column({ type: DataType.STRING, allowNull: false })
	lastName: string;

	@HasMany(()=> Project)
	projects: Project[]
}