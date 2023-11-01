import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [
    SequelizeModule.forFeature([
      Employee
    ])
  ],
  exports: [EmployeesService]
})
export class EmployeesModule {}
