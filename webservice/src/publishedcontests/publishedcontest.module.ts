import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publishedcontest } from 'src/typeorm/contests/Publishedcontests';
import { Liveuser } from 'src/typeorm/contests/Liveusers';
import { Admincontest } from 'src/typeorm/contests/Admincontest';
import { Applieduser } from 'src/typeorm/participants/appliedusers';
import { User } from 'src/typeorm/Users/User';
import { FakeValidateUserMiddleWare, ValidateUserMiddleWare } from 'src/users/middlewares/validate-user.middleware';
import { UsersService } from 'src/users/services/users/users.service';
import { PublishedcontestController } from './controllers/publishedcontest/publishedcontest.controller';
import { PublishedcontestService } from './services/publishedcontest/publishedcontest.service';
import { AdminContestService } from 'src/admincontests/services/contest/admincontest.service';
import { Admin, Ads, aud_applieduser, aud_contests, Otp, profile_address, Question, Segment, user_profile } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Admincontest,Publishedcontest,aud_contests,User,Applieduser,Liveuser,Segment,Question,Otp,user_profile, Ads,profile_address,Admin,aud_applieduser])],
  controllers: [PublishedcontestController],
  providers: [
    {
        provide: 'PUBLISHEDCONTEST_SERVICE',
        useClass: PublishedcontestService, 
      },
      {
        provide: 'USER_SERVICE',
        useClass: UsersService, 
      },
      {
        provide: 'ADMINCONTEST_SERVICE',
        useClass: AdminContestService, 
      }
  ]
})
export class PublishedcontestModule  implements NestModule {


    configure(consumer: MiddlewareConsumer) {
      consumer.apply(ValidateUserMiddleWare)
      .forRoutes({
       path: 'publishedcontest/applyContest',
       method: RequestMethod.POST
       },
       {
        path: 'publishedcontest/contestplaycheck',
        method: RequestMethod.POST
    
       },
       {
        path: 'publishedcontest/getPublishedContest',
        method: RequestMethod.GET
    
       },
       {
        path: 'publishedcontest/paynewpollamount',
        method: RequestMethod.POST
    
       },
       {
        path: 'publishedcontest/getData',
        method: RequestMethod.POST
    
       },
       {
        path: 'publishedcontest/appliedcontests',
        method: RequestMethod.GET
    
       },
       {
        path: 'publishedcontest/detailviewcontest',
        method: RequestMethod.POST
    
       },
     
     
       
      
      )
    }
   
  
  
  
  }
