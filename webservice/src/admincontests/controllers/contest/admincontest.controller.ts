import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Req, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { AdminContestService, IGetUserAuthInfoRequest } from 'src/admincontests/services/contest/admincontest.service';
import { CreateAdminContestDto } from 'src/dtos/contests/CreateAdminContest.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('admincontest')
export class AdminContestController {

    constructor(@Inject('ADMINCONTEST_SERVICE') private readonly admincontestService: AdminContestService,
           @Inject('USER_SERVICE') private readonly userService: UsersService
    ){}


@Get('getContest')
@UseInterceptors(ClassSerializerInterceptor)   
async getContest(){

   return this.admincontestService.getSavedContest();   
   
    }
 
@Get('/:id')
@UseInterceptors(ClassSerializerInterceptor)   
async getContestById(@Param('id' ,ParseIntPipe) id:number  ){
      
       const contest = await this.admincontestService.getSavedContestById(id);   
         return contest
        }
     

 @Post('createContest')
 @UsePipes(ValidationPipe)   
 async createContest(@Body() adminContestDto:CreateAdminContestDto,@Req() request:IGetUserAuthInfoRequest ){
    const user = await this.userService.getUserById(request.userId)
    console.log(adminContestDto)
    const newContest = await this.admincontestService.createContest(adminContestDto,user,request);
     if(newContest)
        throw new HttpException(newContest,HttpStatus.CREATED);
        else throw new HttpException("COntest Not Created",HttpStatus.BAD_REQUEST)
     
 }


 @Post('getSegment')
 @UsePipes(ValidationPipe)   
 getSegment(@Req() request: IGetUserAuthInfoRequest){

   
     return this.admincontestService.getSegment(request);
   
 }

 

}
