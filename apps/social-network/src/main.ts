import { NestFactory } from '@nestjs/core';
import { SocialNetworkModule } from './social-network.module';

async function bootstrap() {
  const app = await NestFactory.create(SocialNetworkModule);
  await app.listen(3000);
}
bootstrap();
