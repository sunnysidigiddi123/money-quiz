import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminContestService } from 'src/admincontests/services/contest/admincontest.service';
import { Applieduser, Auditcontest, Publishedcontest, Liveuser, Question, Admincontest, User } from 'src/typeorm';
import { QuestionController } from './controllers/question/question.controller';
import { QuestionService } from './services/question/question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question,Admincontest,Publishedcontest,Auditcontest,User,Applieduser,Liveuser])],
  controllers: [QuestionController],
  providers: [
    {
      provide: 'QUESTION_SERVICE',
      useClass: QuestionService, 
    },
    {
      provide: 'CONTEST_SERVICE',
      useClass: AdminContestService, 
    }
    
  ]
})
export class QuestionsModule {}
