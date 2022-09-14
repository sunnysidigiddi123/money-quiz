import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin, Admincontest, Ads, Ads_played_users, Otp, profile_address, User, user_profile } from 'src/typeorm';
import { UsersController } from './controllers/users/users.controller';
import { ValidateUserMiddleWare } from './middlewares/validate-user.middleware';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,Admincontest,Otp,Ads,Ads_played_users,user_profile,profile_address,Admin])],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService, 
    
  }

] //use { provide,useclass} to send service as token 
})

export class UsersModule implements NestModule {


  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUserMiddleWare)
    .forRoutes(
    {
      path: 'users/getuserid',
      method: RequestMethod.GET
  
     },
     {
      path: 'users/admin/getuserid',
      method: RequestMethod.GET
  
     },
     {
      path: 'users/profileinfo',
      method: RequestMethod.GET
  
     },
     {
      path: 'users/update-profile',
      method: RequestMethod.POST
  
     },
     {
      path: 'users/getpincodedata',
      method: RequestMethod.POST
  
     },
    
     
    )
  }
 
}
