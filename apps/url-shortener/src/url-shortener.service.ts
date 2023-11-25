import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlShortenerService {
  getHello(): string {
    return 'Hello World!';
  }
}
