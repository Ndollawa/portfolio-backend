import { Controller, Get } from '@nestjs/common';
import { MessengerService } from './messenger.service';

@Controller()
export class MessengerController {
  constructor(private readonly messengerService: MessengerService) {}

  @Get()
  getHello(): string {
    return this.messengerService.getHello();
  }
}
