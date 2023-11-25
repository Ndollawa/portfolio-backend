import { Controller, Get } from '@nestjs/common';
import { HotelmgtService } from './hotelmgt.service';

@Controller()
export class HotelmgtController {
  constructor(private readonly hotelmgtService: HotelmgtService) {}

  @Get()
  getHello(): string {
    return this.hotelmgtService.getHello();
  }
}
