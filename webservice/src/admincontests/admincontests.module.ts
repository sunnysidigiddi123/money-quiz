import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admincontest, Ads, Otp, Segment, User } from 'src/typeorm';
import { ValidateUserMiddleWare } from 'src/users/middlewares/validate-user.middleware';
import { UsersService } from 'src/users/services/users/users.service';
import { AdminContestController } from './controllers/contest/admincontest.controller';
import { AdminContestService } from './services/contest/admincontest.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admincontest,User,Segment,Otp])],
  controllers: [AdminContestController],
  providers: [
    {
      provide: 'ADMINCONTEST_SERVICE',
      useClass: AdminContestService, 
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService, 
    }
    ]
})
export class AdminContestsModule implements NestModule {


  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUserMiddleWare)
    .forRoutes(
    {
      path: 'admincontest/createContest',
      method: RequestMethod.POST
  
     },
     {
      path: 'admincontest/getContest',
      method: RequestMethod.GET
  
     },
     {
      path: 'admincontest/createAd',
      method: RequestMethod.POST
  
     },
    
    )
  }
 



}
