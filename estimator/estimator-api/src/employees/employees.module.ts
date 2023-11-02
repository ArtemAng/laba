import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from 'src/projects/project.model';
import { ProjectEmployee } from 'src/projects/project-employees.model';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [
    SequelizeModule.forFeature([
      Employee,
      Project,
      ProjectEmployee
    ])
  ],
  exports: [EmployeesService]
})
export class EmployeesModule {}
