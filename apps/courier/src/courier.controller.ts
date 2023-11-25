import { Controller, Get } from '@nestjs/common';
import { CourierService } from './courier.service';

@Controller()
export class CourierController {
  constructor(private readonly courierService: CourierService) {}

  @Get()
  getHello(): string {
    return this.courierService.getHello();
  }
}
