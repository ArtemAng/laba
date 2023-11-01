import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Employee } from './employee.model';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeesService } from './employees.service';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) { }

  @ApiOperation({summary: 'Create Employee'})
  @UsePipes(ValidationPipe)
  @ApiResponse({status: 200, type: Employee})
  @Post()
  createEmployee(@Body() dto: CreateEmployeeDto) {
    return this.employeesService.createEmployee(dto);
  }

  @ApiOperation({summary: 'Get all Employees'})
  @ApiResponse({status: 200, type: Array<Employee>})
  @Get()
  getAllEmployees() {
    return this.employeesService.findAllEmployees();
  }
}
