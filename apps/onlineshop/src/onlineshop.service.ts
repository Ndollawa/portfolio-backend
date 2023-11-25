import { Injectable } from '@nestjs/common';

@Injectable()
export class OnlineshopService {
  getHello(): string {
    return 'Hello World!';
  }
}
