import { Controller, Get } from '@nestjs/common';
import { OnlineshopService } from './onlineshop.service';

@Controller()
export class OnlineshopController {
  constructor(private readonly onlineshopService: OnlineshopService) {}

  @Get()
  getHello(): string {
    return this.onlineshopService.getHello();
  }
}
