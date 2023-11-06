import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SettingsInterface } from './interfaces/settings.interface';
import { EntityRepository } from '@/common/database/entity-repository';

@Injectable()
export class SettingsRepository extends EntityRepository<SettingsInterface> {
  constructor(
    @InjectModel('Settings') settingsModel: Model<SettingsInterface>,
  ) {
    super(settingsModel);
  }
}
