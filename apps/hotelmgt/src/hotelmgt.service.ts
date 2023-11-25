import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelmgtService {
  getHello(): string {
    return 'Hello World!';
  }
}
