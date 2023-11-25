import { Injectable } from '@nestjs/common';

@Injectable()
export class AirbnbService {
  getHello(): string {
    return 'Hello World!';
  }
}
