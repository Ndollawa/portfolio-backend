import { Controller, Get } from '@nestjs/common';
import { FolioService } from './folio.service';

@Controller()
export class FolioController {
  constructor(private readonly folioService: FolioService) {}

  @Get()
  getHello(): string {
    return this.folioService.getHello();
  }
}
