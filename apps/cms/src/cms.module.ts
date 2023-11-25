import { Module } from '@nestjs/common';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';

@Module({
  imports: [],
  controllers: [CmsController],
  providers: [CmsService],
})
export class CmsModule {}
