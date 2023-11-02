import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Project } from './project.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProjectDto } from './dto/create-project.dto';
import { UsersService } from 'src/users/users.service';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
    private userService: UsersService,
    private employeesService: EmployeesService
  ) { }

  async createProject(dto: CreateProjectDto) {
    const owner = await this.userService.findUserByEmail(dto.ownerEmail);
    if (!owner) {
      throw new HttpException('User with this email does not exist', HttpStatus.BAD_REQUEST);
    }

    const candidate = await this.projectRepository.findOne({ where: { name: dto.name } });
    if (candidate) {
      throw new HttpException('Project with this name already exists', HttpStatus.BAD_REQUEST);
    }

    const project = await this.projectRepository.create({
      ...dto,
      owner: owner
    })

    return project;
  }

  async addEmployeeToProject(employeeEmail: string, projectId: string) {
    const project = await this.projectRepository.findOne({ where: { id: projectId }, include: { all: true } });
    if(!project){
      throw new HttpException('Project with this id does not exist', HttpStatus.BAD_REQUEST);
    }

    const employee = await this.employeesService.findEmployeeByEmail(employeeEmail);
    if(!employee){
      throw new HttpException('Employee with this id does not exist', HttpStatus.BAD_REQUEST);
    }

    await project.$set('employees', [...project.employees.map(i=>i.id), employee.id]);
    return project;
  }

  async findAllProjects() {
    const projects = await this.projectRepository.findAll({ include: { all: true } });
    return projects;
  }
}
