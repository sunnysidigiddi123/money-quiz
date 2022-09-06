import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import {AdsService} from "./services/ads/ads.service"
import {AdsController} from "./controllers/ads/ads.controller"
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admincontest, Ads, Ads_played_users, Ads_question, Ads_target, Otp, User } from 'src/typeorm';
import { UsersService } from 'src/users/services/users/users.service';
import { ValidateUserMiddleWare } from 'src/users/middlewares/validate-user.middleware';

@Module({
    imports: [TypeOrmModule.forFeature([User,Admincontest,Otp,Ads,Ads_question,Ads_target,Ads_played_users])],
    controllers: [AdsController],
    providers: [ 
    { 
        provide: 'ADS_SERVICE',
        useClass: AdsService, 
  
    },
    {
        provide: 'USER_SERVICE',
        useClass: UsersService, 
      }
    ]


})
export class AdsModule  implements NestModule {


    configure(consumer: MiddlewareConsumer) {
      consumer.apply(ValidateUserMiddleWare)
      .forRoutes({
       path: 'ads/getAdsQuestions',
       method: RequestMethod.POST
       },
       {
        path: 'ads/answerCheck',
        method: RequestMethod.POST
        },
     
       
      
      )
    }
   


}
