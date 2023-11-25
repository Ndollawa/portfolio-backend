import { Module } from '@nestjs/common';
import { DeliveryappController } from './deliveryapp.controller';
import { DeliveryappService } from './deliveryapp.service';

@Module({
  imports: [],
  controllers: [DeliveryappController],
  providers: [DeliveryappService],
})
export class DeliveryappModule {}
