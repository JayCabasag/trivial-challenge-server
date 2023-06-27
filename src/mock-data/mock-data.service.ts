import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { QuestionDto } from './dto/question.dto';

const jsonData = readFileSync('src/mock-data/questions.json', 'utf-8');
const questions = JSON.parse(jsonData).results as QuestionDto[];
const questionsWithIdList = questions.map((data, index) => {
    return { id: index + 1, ...data }
})

@Injectable()
export class MockDataService {
    getQuestions() {
        return questionsWithIdList;
    }

    getQuestion(id: number) {
        const foundQuestion = questionsWithIdList.find((data) => data.id === id)
        return foundQuestion
    }

    getRandomQuestions() {
        const allQuestions = questionsWithIdList;
        const shuffledQuestions = this.shuffleArray(allQuestions);
        return shuffledQuestions;
    }

    shuffleArray(questions) {
        const totalQuestions = questions.length
        const randomNumbers = this.generateUniqueNumbers(totalQuestions, totalQuestions)

        const mappedQuestions = new Map<number, QuestionDto>()
        questions.forEach(element => {
            mappedQuestions.set(element.id, element as QuestionDto)
        })

        const randomQuestions = randomNumbers.map((number: number) => {
            return mappedQuestions.get(number)
        })
        return randomQuestions
    }

    generateUniqueNumbers(range: number, count: number): number[] {
        const numbers = Array.from({ length: range }, (_, i) => i + 1);
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        return numbers.slice(0, count);
    }
}
