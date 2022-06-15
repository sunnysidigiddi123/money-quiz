import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/typeorm';
import { QuestionController } from './controllers/question/question.controller';
import { QuestionService } from './services/question/question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionController],
  providers: [
    {
      provide: 'QUESTION_SERVICE',
      useClass: QuestionService, 
    }
  ]
})
export class QuestionsModule {}
