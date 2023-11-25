import { Module } from '@nestjs/common';
import { AirbnbController } from './airbnb.controller';
import { AirbnbService } from './airbnb.service';

@Module({
  imports: [],
  controllers: [AirbnbController],
  providers: [AirbnbService],
})
export class AirbnbModule {}
