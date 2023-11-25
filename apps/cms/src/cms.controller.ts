import { Controller, Get } from '@nestjs/common';
import { CmsService } from './cms.service';

@Controller()
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get()
  getHello(): string {
    return this.cmsService.getHello();
  }
}
