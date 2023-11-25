import { Module } from '@nestjs/common';
import { SocialNetworkController } from './social-network.controller';
import { SocialNetworkService } from './social-network.service';

@Module({
  imports: [],
  controllers: [SocialNetworkController],
  providers: [SocialNetworkService],
})
export class SocialNetworkModule {}
