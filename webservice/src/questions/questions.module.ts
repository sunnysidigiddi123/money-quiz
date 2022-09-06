import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminContestService } from 'src/admincontests/services/contest/admincontest.service';
import { Applieduser, Auditcontest, Publishedcontest, Liveuser, Question, Admincontest, User, Segment, Ads } from 'src/typeorm';
import { ValidateUserMiddleWare } from 'src/users/middlewares/validate-user.middleware';
import { QuestionController } from './controllers/question/question.controller';
import { QuestionService } from './services/question/question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question,Admincontest,Publishedcontest,Auditcontest,User,Applieduser,Liveuser,Segment,Ads])],
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
export class QuestionsModule implements NestModule {


  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUserMiddleWare)
    .forRoutes(
  
    )
  }
}
