import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Applieduser, Publishedcontest, Liveuser, Admincontest, User } from 'src/typeorm';
import { Auditcontest } from 'src/typeorm/contests/Auditcontest';
import { CreateAuditContestDto } from 'src/dtos/contests/CreateAuditContest.dto';
import { CreatePublishedContestDto } from 'src/dtos/contests/CreatePublishedContest.dto';
import { Repository } from 'typeorm';
import { Request } from 'express';
import * as moment from "moment";

export interface IGetUserAuthInfoRequest extends Request {
    userId: number // or any other type
  }

@Injectable()
export class PublishedcontestService {


    constructor(@InjectRepository(Admincontest)
    private readonly contestRepository: Repository<Admincontest> ,
    @InjectRepository(Publishedcontest)
    private readonly PublishedContestRepository: Repository<Publishedcontest>,
    @InjectRepository(Auditcontest)
    private readonly AuditContestRepository: Repository<Auditcontest>,
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    @InjectRepository(Applieduser)
    private readonly AppliedUserRepository: Repository<Applieduser>,
    @InjectRepository(Liveuser)
    private readonly liveUserRepository: Repository<Liveuser>,
    
    ){}




publishContest(publishedcontestDto:CreatePublishedContestDto,admincontest:Admincontest){

        const newContest = this.PublishedContestRepository.create({
              contestName:publishedcontestDto.contestName,
              contestDetails:publishedcontestDto.contestDetails,
              contestTime:publishedcontestDto.contestTime,
              EntryAmount:publishedcontestDto.EntryAmount,
              ParticularPoll:publishedcontestDto.EntryAmount
        });
        newContest.questions = admincontest.questions
        return this.PublishedContestRepository.save(newContest);
  
  }

  async auditContest(auditcontestDto:CreateAuditContestDto){
      
    const removecontest = await this.PublishedContestRepository.findOne({where: {contestDetails:auditcontestDto.contestDetails}})
     console.log("Remove Contest From Live Table", removecontest);
     await this.PublishedContestRepository.remove(removecontest);
    const newContest = this.AuditContestRepository.create(auditcontestDto);
    return this.AuditContestRepository.save(newContest);

}


async applyContest(request: IGetUserAuthInfoRequest){
         
    const contest = await this.PublishedContestRepository.findOne({where: {id:request.body.contestid}})
    const user = await this.UserRepository.findOne({where:{id:request.userId}})
   
    const appliedUser = await this.AppliedUserRepository.findOne({where:{contestid:request.body.contestid , userid:request.userId}})
   
    if(appliedUser){
         throw new HttpException("You have Already Applied",HttpStatus.BAD_REQUEST);
    }
  
    const joinTime = new Date()
    const contestTime = moment(contest.contestTime);
    const canApply = moment(joinTime).isSameOrBefore(contestTime);

  
  if(canApply){
        if(user.Wallet >= contest.EntryAmount){
         user.Wallet = user.Wallet - contest.EntryAmount;
         await this.UserRepository.save(user)
        const ApplyUser = this.AppliedUserRepository.create({contestid:request.body.contestid,userid:user.id});
        return this.AppliedUserRepository.save(ApplyUser)
        
       }else{
        throw new HttpException("Insufficient Cash In Your Wallet",HttpStatus.BAD_REQUEST); 
  }
  } else
  throw new HttpException("You can Apply Before 2 Hours of Contest",HttpStatus.BAD_REQUEST);   

}


async contestplaycheck(request: IGetUserAuthInfoRequest){
         
    const contest = await this.PublishedContestRepository.findOne({where: {id:request.body.contestid}})
    const user = await this.UserRepository.findOne({where:{id:request.userId}})
    
    const UserAlreadyPlayed = await this.liveUserRepository.findOne({where:{contestId:request.body.contestid , userId:request.userId}})
   
    if(UserAlreadyPlayed){
      
         throw new HttpException({message:"You Have Already Played",status:0},HttpStatus.BAD_REQUEST);
    }
  
    if(!UserAlreadyPlayed){
   
        if(contest.EntryAmount == contest.ParticularPoll){
           const liveUsers = this.liveUserRepository.create({
                 userId:user.id,
                 contestId:contest.id
           })
           await this.liveUserRepository.save(liveUsers);
           return {message:'Enter Successfully', status:1}
          }
        if(contest.EntryAmount < contest.ParticularPoll){

           return {mesage:"Please Pay New Poll Amount To Enter in Contest",status:2}
        }



    }
}




}
