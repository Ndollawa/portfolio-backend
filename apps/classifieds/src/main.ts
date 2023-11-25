import { NestFactory } from '@nestjs/core';
import { ClassifiedsModule } from './classifieds.module';

async function bootstrap() {
  const app = await NestFactory.create(ClassifiedsModule);
  await app.listen(3000);
}
bootstrap();
