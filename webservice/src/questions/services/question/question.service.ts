import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDto } from 'src/dtos/questions/CreateQuestions.dto';
import { Question, Admincontest } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {

    constructor(@InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
        @InjectRepository(Admincontest)
        private readonly savedContestRepository: Repository<Admincontest>,
    ) { }


    async createQuestion(questionDto: CreateQuestionDto, contest: Admincontest) {

        const newQuestion = this.questionRepository.create(questionDto);
        contest.questions = [...contest.questions, newQuestion]
        console.log("qqqqq", contest.questions)
        await this.questionRepository.save(newQuestion)
        await this.savedContestRepository.save(contest);
        return newQuestion;


    }


    async getQuestion() {
        try {

            return await this.questionRepository.find();
             

        } catch (e) {

        }
    }



}
