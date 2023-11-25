import { NestFactory } from '@nestjs/core';
import { UrlShortenerModule } from './url-shortener.module';

async function bootstrap() {
  const app = await NestFactory.create(UrlShortenerModule);
  await app.listen(3000);
}
bootstrap();
