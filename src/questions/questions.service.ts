import { Injectable, NotFoundException } from '@nestjs/common';
import { MockDataService } from 'src/mock-data/mock-data.service';

@Injectable()
export class QuestionsService {

  constructor(private questions: MockDataService) { }

  findAll(limit?: number, ids?: number[]) {
    let allQuestions = this.questions.getQuestions();

    if (ids && ids.length > 0) {
      allQuestions = allQuestions.filter(question => ids.includes(question.id));
    }

    if (limit && limit > 0) {
      return allQuestions.slice(0, limit)
    }

    return allQuestions
  }

  findRandom(limit?: number) {
    const allQuestions = this.questions.getRandomQuestions();
    const alteredQuestions = allQuestions.map((data) => {
      const { correct_answer, incorrect_answers, ...questionWithoutCorrectAnswer } = data;
      return questionWithoutCorrectAnswer
    })

    if (limit && limit > 0) {
      return alteredQuestions.slice(0, limit)
    }

    return alteredQuestions
  }

  findOne(id: number) {
    const question = this.questions.getQuestion(id)

    if (!question) {
      throw new NotFoundException(`Question ${id} not found`)
    }

    return this.questions.getQuestion(id);
  }

}
