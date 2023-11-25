import { Module } from '@nestjs/common';
import { HotelmgtController } from './hotelmgt.controller';
import { HotelmgtService } from './hotelmgt.service';

@Module({
  imports: [],
  controllers: [HotelmgtController],
  providers: [HotelmgtService],
})
export class HotelmgtModule {}
