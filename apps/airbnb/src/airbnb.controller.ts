import { Controller, Get } from '@nestjs/common';
import { AirbnbService } from './airbnb.service';

@Controller()
export class AirbnbController {
  constructor(private readonly airbnbService: AirbnbService) {}

  @Get()
  getHello(): string {
    return this.airbnbService.getHello();
  }
}
