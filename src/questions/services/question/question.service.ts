import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDto } from 'src/dtos/questions/CreateQuestions.dto';
import { Question } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {

    constructor(@InjectRepository(Question)
    private readonly questionRepository: Repository<Question> ,
    
    ){}

   
    createQuestion(questionDto:CreateQuestionDto){

        const newQuestion = this.questionRepository.create(questionDto);
        return this.questionRepository.save(newQuestion)
        


  }

   getQuestion(){

        return this.questionRepository.find();
   }



}
