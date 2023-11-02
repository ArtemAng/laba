import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.model';
import { AddEmployeeDto } from './dto/add-employee-project.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @ApiOperation({summary: 'Create project'})
  @UsePipes(ValidationPipe)
  @ApiResponse({status: 200, type: Project})
  @Post()
  createProject( @Body() dto: CreateProjectDto) {
    return this.projectsService.createProject(dto);
  }

  @ApiOperation({summary: 'Get All project'})
  @UsePipes(ValidationPipe)
  @ApiResponse({status: 200, type: Project})
  @Get()
  getAllProjects() {
    return this.projectsService.findAllProjects();
  }

  @ApiOperation({summary: 'Get All project'})
  @UsePipes(ValidationPipe)
  @ApiResponse({status: 200, type: Project})
  @Patch(':id')
  addEmployeeToProject(@Body() empDtp: AddEmployeeDto,  @Param('id') projectId: string) {
    return  this.projectsService.addEmployeeToProject(empDtp.email, projectId);
  }

  @ApiOperation({summary: 'Calculate project cost'})
  @UsePipes(ValidationPipe)
  @ApiResponse({status: 200, type: Project})
  @Get(':id')
  calculateCost(@Param('id') projectId: string) {
    return this.projectsService.calculateCost(projectId);
  }
}
