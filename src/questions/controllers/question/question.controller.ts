import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateQuestionDto } from 'src/dtos/questions/CreateQuestions.dto';
import { QuestionService } from 'src/questions/services/question/question.service';
import { Serializedquestion } from 'src/users/types';

@Controller('question')
export class QuestionController {

    constructor(@Inject('QUESTION_SERVICE') private readonly questionService: QuestionService ){}

    @Post('createQuestion')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(ValidationPipe)   
    async createContest(@Body() createQuestionDto:CreateQuestionDto){
   
       console.log(createQuestionDto)
       const question = await this.questionService.createQuestion(createQuestionDto);
       if(question)
       return new Serializedquestion(question);
       else throw new HttpException("Question Not Created",HttpStatus.BAD_REQUEST)
    }


    @Get('getQuestion')
    @UseInterceptors(ClassSerializerInterceptor)   
    async getContest(){

        const question = await this.questionService.getQuestion();
        return question;
   
    }





}
