import { Injectable } from '@nestjs/common';

@Injectable()
export class MessengerService {
  getHello(): string {
    return 'Hello World!';
  }
}
