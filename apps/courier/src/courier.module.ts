import { Module } from '@nestjs/common';
import { CourierController } from './courier.controller';
import { CourierService } from './courier.service';

@Module({
  imports: [],
  controllers: [CourierController],
  providers: [CourierService],
})
export class CourierModule {}
