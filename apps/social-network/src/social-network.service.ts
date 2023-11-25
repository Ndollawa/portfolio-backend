import { Injectable } from '@nestjs/common';

@Injectable()
export class SocialNetworkService {
  getHello(): string {
    return 'Hello World!';
  }
}
