import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Post, Req, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
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
async getContest(@Req() request: IGetUserAuthInfoRequest){

   const contests = await this.publishcontestService.getPublishedContest(request);   
    if(contests){
       throw new HttpException(contests,HttpStatus.CREATED)
    }else
     throw new HttpException("Unauthorized User",HttpStatus.UNAUTHORIZED)
    }


@Post('liveContest')
@UsePipes(ValidationPipe)   
async publishContest(@Body() createPublishedContestDto:CreatePublishedContestDto){
   const admincontest = await this.admincontestService.getSavedContestById(createPublishedContestDto.admincontestId)
   console.log(createPublishedContestDto)
   return this.publishcontestService.publishContest(createPublishedContestDto,admincontest);

}


@Post('auditContest')
@UsePipes(ValidationPipe)   
auditContest(@Body() createAuditContestDto:CreateAuditContestDto){

   console.log(createAuditContestDto)
   return this.publishcontestService.auditContest(createAuditContestDto);

}

@Post('applycontest')
 @UsePipes(ValidationPipe)   
 async applyContest(@Req() request: IGetUserAuthInfoRequest){

    console.log(request.body)
    const ApplyUser =  await this.publishcontestService.applyContest(request);
    if(ApplyUser){
       throw new HttpException("You Have Applied Successfully",HttpStatus.CREATED)
    }
 }

 @Post('contestplaycheck')
 @UsePipes(ValidationPipe)   
 async contestplaycheck(@Req() request: IGetUserAuthInfoRequest){

    console.log(request.body)
    const PlayUser =  await this.publishcontestService.contestplaycheck(request);
    if(PlayUser){
       throw new HttpException(PlayUser,HttpStatus.CREATED)
    }
 }

 @Post('paynewpollamount')
 @UsePipes(ValidationPipe)   
 async paynewpollamount(@Req() request: IGetUserAuthInfoRequest){

    console.log(request.body)
    const PlayUser =  await this.publishcontestService.paynewpollamount(request);
    if(PlayUser){
       throw new HttpException(PlayUser,HttpStatus.CREATED)
    }
 }


}
