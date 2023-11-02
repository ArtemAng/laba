import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from 'src/employees/employee.model';
import { Project } from './project.model';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { EmployeesService } from 'src/employees/employees.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, UsersService, EmployeesService],
  imports: [
    SequelizeModule.forFeature([
      Project,
      Employee,
      User
    ])
  ],
})
export class ProjectsModule {}
