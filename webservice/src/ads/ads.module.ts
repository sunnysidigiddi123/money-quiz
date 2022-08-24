import { Module } from '@nestjs/common';
import {AdsService} from "./services/ads/ads.service"
import {AdsController} from "./controllers/ads/ads.controller"
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admincontest, Ads, Ads_question, Ads_target, Otp, User } from 'src/typeorm';
import { UsersService } from 'src/users/services/users/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User,Admincontest,Otp,Ads,Ads_question,Ads_target])],
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
export class AdsModule {}
