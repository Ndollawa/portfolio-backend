import { Controller, Get } from '@nestjs/common';
import { SocialNetworkService } from './social-network.service';

@Controller()
export class SocialNetworkController {
  constructor(private readonly socialNetworkService: SocialNetworkService) {}

  @Get()
  getHello(): string {
    return this.socialNetworkService.getHello();
  }
}
