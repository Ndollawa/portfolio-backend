import { Injectable } from '@nestjs/common';

@Injectable()
export class FolioService {
  getHello(): string {
    return 'Hello World!';
  }
}
