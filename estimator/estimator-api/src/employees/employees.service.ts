import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class EmployeesService {
  constructor(@InjectModel(Employee) private employeeRepository: typeof Employee) {}
  
  async createEmployee(dto: CreateEmployeeDto) {   
    const candidate = await this.findEmployeeByEmail(dto.email);
    if (candidate) {
      throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
    }
    const employee = await this.employeeRepository.create(dto);
    return employee;
  }

  async findAllEmployees(){
    const employees = await this.employeeRepository.findAll();
    return employees;
  }

  async findEmployeeByEmail(email: string){
    const employee = await this.employeeRepository.findOne({where: {email}});
    return employee;
  }
}
