import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applieduser, aud_contests, aud_liveusers, Liveuser, Publishedcontest, Question, User } from 'src/typeorm';
import { FakeValidateUserMiddleWare, ValidateUserMiddleWare } from 'src/users/middlewares/validate-user.middleware';
import { BroadcastController } from './controllers/broadcast/broadcast.controller';
import { BroadcastService } from './services/broadcast/broadcast.service';

@Module({
  imports: [TypeOrmModule.forFeature([Publishedcontest,aud_contests,User,Applieduser,Liveuser,Question,aud_liveusers])],
  controllers: [BroadcastController],
  providers: [ 
  { 
      provide: 'BROADCAST_SERVICE',
      useClass: BroadcastService, 

  }
  ]
})
export class BroadcastModule implements NestModule {


  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUserMiddleWare)
    .forRoutes({
     path: 'broadcast/answerCheck',
     method: RequestMethod.POST
 
    },{
      path: 'broadcast/cashout',
      method: RequestMethod.POST
  
     },{
      path: 'broadcast/quit',
      method: RequestMethod.POST
  
     },{
      path: 'broadcast/reenter',
      method: RequestMethod.POST
  
     },{
      path: 'broadcast/getpollvalues',
      method: RequestMethod.POST
  
     }
     ,{
      path: 'broadcast/creditwinningamount',
      method: RequestMethod.POST
  
     }
     
    
    )
  }
 



}