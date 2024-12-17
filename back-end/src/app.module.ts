import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './services/prisma.module';
import { DocumentsModule } from './documents/documents.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, DocumentsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
