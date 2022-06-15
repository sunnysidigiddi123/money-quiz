import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { ContestService } from 'src/contests/services/contest/contest.service';
import { Savedcontest, User } from 'src/typeorm';
import { UsersController } from './controllers/users/users.controller';
import { ValidateUserMiddleWare } from './middlewares/validate-user.middleware';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,Savedcontest])],
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
   .forRoutes({
    path: 'users',
    method: RequestMethod.GET

   })
 }

}
