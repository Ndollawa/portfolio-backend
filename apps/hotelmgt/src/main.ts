import { NestFactory } from '@nestjs/core';
import { HotelmgtModule } from './hotelmgt.module';

async function bootstrap() {
  const app = await NestFactory.create(HotelmgtModule);
  await app.listen(3000);
}
bootstrap();
