import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectInterface } from './interfaces/project.interface';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async getProject(projectId: string): Promise<ProjectInterface> {
    return this.projectRepository.findOne({ _id: projectId });
  }

  async getProjects(): Promise<ProjectInterface[]> {
    return this.projectRepository.find({});
  }

  async createProject(
    createProjectData: CreateProjectDto,
  ): Promise<ProjectInterface> {
    return this.projectRepository.create(createProjectData);
  }

  async updateProject(
    projectId: string,
    updateProjectData: UpdateProjectDto,
  ): Promise<ProjectInterface> {
    return this.projectRepository.findOneAndUpdate(
      { _id: projectId },
      updateProjectData,
    );
  }

  async deleteProjectById(projectId: string): Promise<boolean> {
    return this.projectRepository.deleteOne({ _id: projectId });
  }

  async deleteManyProjects(projectIds: string): Promise<boolean> {
    return this.projectRepository.deleteMany({ _id: projectIds });
  }
}
