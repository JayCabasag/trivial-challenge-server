import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { MockDataService } from 'src/mock-data/mock-data.service';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, MockDataService]
})
export class QuestionsModule { }
