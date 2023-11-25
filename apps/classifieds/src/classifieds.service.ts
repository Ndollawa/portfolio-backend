import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassifiedsService {
  getHello(): string {
    return 'Hello World!';
  }
}
