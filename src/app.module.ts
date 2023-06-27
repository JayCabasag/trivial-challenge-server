import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { MockDataService } from './mock-data/mock-data.service';

@Module({
  imports: [QuestionsModule],
  controllers: [AppController],
  providers: [AppService, MockDataService],
})
export class AppModule {}
