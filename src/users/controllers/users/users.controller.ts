import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Param, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ContestService } from 'src/contests/services/contest/contest.service';
import { CreateUserDto } from 'src/dtos/Users/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { Serializeduser } from 'src/users/types';

@Controller('users')
export class UsersController {

  constructor(@Inject('USER_SERVICE') private readonly usersService: UsersService 
              
  ){}
  
 @Get('')
 getUsers(){
     return this.usersService.findUsers();
 }

 @Post('signup')
 @UsePipes(ValidationPipe)      //for class-validator to import
 signupUsers(@Body() createUserDto:CreateUserDto){
     console.log(createUserDto)
     return this.usersService.signupUser(createUserDto);
   
 }

 @UseInterceptors(ClassSerializerInterceptor) // to import class serialized restrict password interceptors
 @Get('/:name')
 async getUsersbyname(@Param('name') name:string){
    const user = await this.usersService.getUserByName(name);
    console.log(user,"hhhhh")
    if(user) 
    return new Serializeduser(user); // if we dont want to use plaintoclass then user this .
    else throw new HttpException('User not found',HttpStatus.BAD_REQUEST)
 }

}


