import { Injectable } from '@nestjs/common';

@Injectable()
export class DeliveryappService {
  getHello(): string {
    return 'Hello World!';
  }
}
