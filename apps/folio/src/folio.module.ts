import { Module } from '@nestjs/common';
import { FolioController } from './folio.controller';
import { FolioService } from './folio.service';

@Module({
  imports: [],
  controllers: [FolioController],
  providers: [FolioService],
})
export class FolioModule {}
