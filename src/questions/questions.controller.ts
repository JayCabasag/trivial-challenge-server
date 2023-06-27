import { Controller, Get, Param, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }

  @Get()
  findAllQuestions(
    @Query('limit') limit?: number,
    @Query('ids') ids?: string,
  ) {
    const questionIds = ids ? ids.split(',').map(id => parseInt(id, 10)) : [];
    return this.questionsService.findAll(limit, questionIds);
  }

  @Get('random')
  findRandomQuestions(@Query('limit') limit?: number) {
    return this.questionsService.findRandom(limit);
  }

  @Get(':id')
  findOneQuestion(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

}
