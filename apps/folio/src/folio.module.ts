import { Module } from '@nestjs/common';
import { FolioController } from './folio.controller';
import { FolioService } from './folio.service';
import { PrismaService } from './prisma/prisma.service';
import { PostModule } from './post/post.module';
import { ProjectsModule } from './projects/projects.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [PostModule, ProjectsModule, ServiceModule],
  controllers: [FolioController],
  providers: [FolioService, PrismaService],
})
export class FolioModule {}
