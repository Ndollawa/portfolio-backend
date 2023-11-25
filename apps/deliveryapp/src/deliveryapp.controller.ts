import { Controller, Get } from '@nestjs/common';
import { DeliveryappService } from './deliveryapp.service';

@Controller()
export class DeliveryappController {
  constructor(private readonly deliveryappService: DeliveryappService) {}

  @Get()
  getHello(): string {
    return this.deliveryappService.getHello();
  }
}
