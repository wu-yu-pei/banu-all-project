import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './module/news/news.module';

@Module({
  imports: [NewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
