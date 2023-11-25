import { Injectable } from '@nestjs/common';

@Injectable()
export class CmsService {
  getHello(): string {
    return 'Hello World!';
  }
}
