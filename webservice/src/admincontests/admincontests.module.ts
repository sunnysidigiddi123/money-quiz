import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admincontest, Otp, Segment, User, user_profile } from 'src/typeorm';
import { ValidateUserMiddleWare } from 'src/users/middlewares/validate-user.middleware';
import { UsersService } from 'src/users/services/users/users.service';
import { AdminContestController } from './controllers/contest/admincontest.controller';
import { AdminContestService } from './services/contest/admincontest.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admincontest,User,Segment,Otp,user_profile])],
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
    
    )
  }
 



}
