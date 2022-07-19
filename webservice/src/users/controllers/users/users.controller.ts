import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Req, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/Users/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { Serializeduser } from 'src/types';
import { LoginUserDto } from 'src/dtos/Users/LoginUser.dto';
import { IGetUserAuthInfoRequest } from 'src/users/middlewares/validate-user.middleware';



@Controller('users')
export class UsersController {

  constructor(@Inject('USER_SERVICE') private readonly usersService: UsersService 
              
  ){}
  
 @Get('')
 getUsers(){
     return this.usersService.findUsers();
 }

 @Get('/getuserid')
 async home(@Req() request: IGetUserAuthInfoRequest ){
    
    const user = await this.usersService.home(request);  
   
    if(user){
        throw new HttpException(user,HttpStatus.CREATED)
    }

   
}

 @Get('/:id')
@UseInterceptors(ClassSerializerInterceptor)   
    async getContestById(@Param('id' ,ParseIntPipe) id:number  ){
      
       const contest = await this.usersService.getUserById(id);   
       return contest

 }

 @Post('signup')
 @UsePipes(ValidationPipe)      //for class-validator to import
 async signupUsers(@Body() createUserDto:CreateUserDto){
     console.log(createUserDto)
     const user = await this.usersService.signupUser(createUserDto);
     if(user){
         throw new HttpException(user,HttpStatus.CREATED)
     }
 }

 @Post('login')
 @UsePipes(ValidationPipe)      //for class-validator to import
 async loginUsers(@Body() loginUserDto:LoginUserDto){
     const user = await this.usersService.loginUser(loginUserDto);
     if(user){
         throw new HttpException(user,HttpStatus.ACCEPTED)
     }else
     throw new HttpException("You have entered an invalid username or password",HttpStatus.BAD_REQUEST)
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

 @Post('refresh-token')
 @UsePipes(ValidationPipe)      //for class-validator to import
 refreshtoken(@Req() request: IGetUserAuthInfoRequest){
     return this.usersService.refreshtoken(request);
  

}


}