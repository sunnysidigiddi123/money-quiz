import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applieduser, Auditcontest, Liveuser, Publishedcontest, Question, User } from 'src/typeorm';
import { ValidateUserMiddleWare } from 'src/users/middlewares/validate-user.middleware';
import { BroadcastController } from './controllers/broadcast/broadcast.controller';
import { BroadcastService } from './services/broadcast/broadcast.service';

@Module({
  imports: [TypeOrmModule.forFeature([Publishedcontest,Auditcontest,User,Applieduser,Liveuser,Question])],
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
  
     },
     
    
    )
  }
 



}