import { NestFactory } from '@nestjs/core';
import { FolioModule } from './folio.module';

async function bootstrap() {
  const app = await NestFactory.create(FolioModule);
  await app.listen(3000);
}
bootstrap();
