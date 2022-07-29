import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Post, Res, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { AdminContestService } from 'src/admincontests/services/contest/admincontest.service';
import { CreateQuestionDto } from 'src/dtos/questions/CreateQuestions.dto';
import { QuestionService } from 'src/questions/services/question/question.service';
import { Serializedquestion } from 'src/types';

@Controller('question')
export class QuestionController {

    constructor(@Inject('QUESTION_SERVICE') private readonly questionService: QuestionService,
    @Inject('CONTEST_SERVICE') private readonly contestService: AdminContestService
    
    ){}

    @Post('createQuestion')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(ValidationPipe)   
    async createContest(@Body() createQuestionDto:CreateQuestionDto){
       const contest = await this.contestService.getSavedContestById(createQuestionDto.contestId)
       console.log(createQuestionDto)
       const question = await this.questionService.createQuestion(createQuestionDto,contest);
       if(question)
       return new Serializedquestion(question);
       else throw new HttpException("Question Not Created",HttpStatus.BAD_REQUEST)
    }


    @Get('getQuestion')
    @UseInterceptors(ClassSerializerInterceptor)   
    async getContest(@Res() response:Response){

         const questions = await this.questionService.getQuestion();
       
          if(questions){
            response.status(201).send(questions)
          }
    }

    





}
