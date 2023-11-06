import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectInterface } from './interfaces/project.interface';
import { EntityRepository } from '@/common/database/entity-repository';

@Injectable()
export class ProjectRepository extends EntityRepository<ProjectInterface> {
  constructor(@InjectModel('Project') projectModel: Model<ProjectInterface>) {
    super(projectModel);
  }
}
