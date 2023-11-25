import { Module } from '@nestjs/common';
import { ClassifiedsController } from './classifieds.controller';
import { ClassifiedsService } from './classifieds.service';

@Module({
  imports: [],
  controllers: [ClassifiedsController],
  providers: [ClassifiedsService],
})
export class ClassifiedsModule {}
