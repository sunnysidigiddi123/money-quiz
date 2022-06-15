import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Param, Post, Req, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { ContestService } from 'src/contests/services/contest/contest.service';
import { CreateAuditContestDto } from 'src/dtos/contests/CreateAuditContest.dto';
import { CreateLiveContestDto } from 'src/dtos/contests/CreateLiveContest.dto';
import { CreateSavedContestDto } from 'src/dtos/contests/CreateSavedContest.dto';

@Controller('contest')
export class ContestController {

    constructor(@Inject('CONTEST_SERVICE') private readonly contestService: ContestService ){}


 @Post('createSavedContest')
 @UsePipes(ValidationPipe)   
 createContest(@Body() createContestDto:CreateSavedContestDto){

    console.log(createContestDto)
    return this.contestService.createContest(createContestDto);

 }


 @Post('liveContest')
 @UsePipes(ValidationPipe)   
 publishContest(@Body() createLiveContestDto:CreateLiveContestDto){

    console.log(createLiveContestDto)
    return this.contestService.publishContest(createLiveContestDto);

 }

 
 @Post('auditContest')
 @UsePipes(ValidationPipe)   
 auditContest(@Body() createAuditContestDto:CreateAuditContestDto){

    console.log(createAuditContestDto)
    return this.contestService.auditContest(createAuditContestDto);

 }

 @Post('applycontest')
 @UsePipes(ValidationPipe)   
 async applyContest(@Req() request: Request){

    console.log(request.body)
    const ApplyUser =  await this.contestService.applyContest(request);
    if(ApplyUser){
       throw new HttpException("You Have Applied Successfully",HttpStatus.CREATED)
    }
 }


 

}
