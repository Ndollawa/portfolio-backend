import { Module } from '@nestjs/common';
import { OnlineshopController } from './onlineshop.controller';
import { OnlineshopService } from './onlineshop.service';

@Module({
  imports: [],
  controllers: [OnlineshopController],
  providers: [OnlineshopService],
})
export class OnlineshopModule {}
