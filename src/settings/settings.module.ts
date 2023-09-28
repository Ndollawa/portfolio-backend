import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingsService } from './settings.service';
import SettingsSchema from './schemas/settings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Settings', schema: SettingsSchema }]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
