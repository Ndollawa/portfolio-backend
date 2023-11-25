import { Injectable } from '@nestjs/common';

@Injectable()
export class CourierService {
  getHello(): string {
    return 'Hello World!';
  }
}
