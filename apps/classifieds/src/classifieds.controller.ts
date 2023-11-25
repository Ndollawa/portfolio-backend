import { Controller, Get } from '@nestjs/common';
import { ClassifiedsService } from './classifieds.service';

@Controller()
export class ClassifiedsController {
  constructor(private readonly classifiedsService: ClassifiedsService) {}

  @Get()
  getHello(): string {
    return this.classifiedsService.getHello();
  }
}
