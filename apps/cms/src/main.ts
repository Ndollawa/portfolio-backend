import { NestFactory } from '@nestjs/core';
import { CmsModule } from './cms.module';

async function bootstrap() {
  const app = await NestFactory.create(CmsModule);
  await app.listen(3000);
}
bootstrap();
