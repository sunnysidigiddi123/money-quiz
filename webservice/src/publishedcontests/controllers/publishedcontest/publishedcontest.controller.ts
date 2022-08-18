import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Post, Query, Req, Res, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { AdminContestService } from 'src/admincontests/services/contest/admincontest.service';
import { CreateAuditContestDto } from 'src/dtos/contests/CreateAuditContest.dto';
import { CreatePublishedContestDto } from 'src/dtos/contests/CreatePublishedContest.dto';
import { IGetUserAuthInfoRequest, PublishedcontestService } from 'src/publishedcontests/services/publishedcontest/publishedcontest.service';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('publishedcontest')
export class PublishedcontestController {

    constructor(@Inject('PUBLISHEDCONTEST_SERVICE') private readonly publishcontestService: PublishedcontestService,
    @Inject('USER_SERVICE') private readonly userService: UsersService,
    @Inject('ADMINCONTEST_SERVICE') private readonly admincontestService: AdminContestService

){}

@Get('getPublishedContest')
@UseInterceptors(ClassSerializerInterceptor)   
async getContest(@Req() request: IGetUserAuthInfoRequest,@Query('page') page:number,@Query('OrderBy') OrderBy:number,@Query('sortBy') sortBy:string,@Query('limit') limit:number,@Res() response:Response){

   const contests = await this.publishcontestService.getPublishedContest(request,page,limit,OrderBy,sortBy);   
    if(contests){
       response.status(201).send(contests)
    }
    }


@Post('liveContest')
@UsePipes(ValidationPipe)   
async publishContest(@Body() createPublishedContestDto:CreatePublishedContestDto,@Res() response:Response){
   const admincontest = await this.admincontestService.getSavedContestById(createPublishedContestDto.admincontestId)
   console.log(createPublishedContestDto)
   const publishcontest = await this.publishcontestService.publishContest(createPublishedContestDto,admincontest);
   
   if(publishcontest){
    
      response.status(201).send(publishcontest)

   }
}


@Post('auditContest')
@UsePipes(ValidationPipe)   
async auditContest(@Body() createAuditContestDto:CreateAuditContestDto,@Res() response:Response){

   console.log(createAuditContestDto)
   const auditcontest = await this.publishcontestService.auditContest(createAuditContestDto);
   if(auditcontest){
      response.status(201).send(auditcontest)
   }
}

@Post('applycontest')
 @UsePipes(ValidationPipe)   
 async applyContest(@Req() request: IGetUserAuthInfoRequest,@Res() response:Response){

    console.log(request.body)
    const ApplyUser =  await this.publishcontestService.applyContest(request);
    if(ApplyUser){
       response.status(201).send({message:"You Have Applied Successfully"})
    }
 }

 @Post('contestplaycheck')
 @UsePipes(ValidationPipe)   
 async contestplaycheck(@Req() request: IGetUserAuthInfoRequest,@Res() response:Response){

    const PlayUser =  await this.publishcontestService.contestplaycheck(request);
    if(PlayUser){
      response.status(201).send(PlayUser)
    }
 }


 @Post('getData')
 @UsePipes(ValidationPipe)   
 async getData(@Req() request: IGetUserAuthInfoRequest,@Res() response:Response){

   const getData = await this.publishcontestService.getData(request);
   if(getData){
      response.status(201).send(getData)
   }
 }

 @Post('paynewpollamount')
 @UsePipes(ValidationPipe)   
 async paynewpollamount(@Req() request: IGetUserAuthInfoRequest,@Res() response:Response){

    const PlayUser =  await this.publishcontestService.paynewpollamount(request);
    if(PlayUser){
       response.status(201).send(PlayUser)
    }
 }


 @Post('detailviewcontest')
 @UsePipes(ValidationPipe)   
 async detailviewcontest(@Req() request: IGetUserAuthInfoRequest,@Res() response:Response){

   const detailcontests = await  this.publishcontestService.detailviewcontest(request);

   if(detailcontests){
      response.status(201).send(detailcontests)
   }
   
 }

 @Get('appliedcontests')
 @UsePipes(ValidationPipe)   
 async appliedcontests(@Req() request: IGetUserAuthInfoRequest ,@Res() response:Response){

    const appliedcontest = await this.publishcontestService.appliedcontests(request);
    
    if(appliedcontest){
      response.status(201).send(appliedcontest)
    }
 }


}
