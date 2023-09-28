import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectInterface } from './interfaces/project.interface';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Get()
  async getProjects(): Promise<ProjectInterface[]> {
    return await this.projectService.getProjects();
  }

  @Get()
  async getProjectById(@Param() id: string): Promise<ProjectInterface> {
    return await this.projectService.getProject(id);
  }

  @Post()
  async createProject(
    @Body(ValidationPipe) createProjectData: CreateProjectDto,
  ): Promise<ProjectInterface> {
    return await this.projectService.createProject(createProjectData);
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProjectData: UpdateProjectDto,
  ): Promise<ProjectInterface> {
    return await this.projectService.updateProject(id, updateProjectData);
  }

  @Delete()
  async deleteProjects(): Promise<ProjectInterface[]> {
    return await this.projectService.getProjects();
  }
}
