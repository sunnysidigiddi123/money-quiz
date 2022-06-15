import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Applieduser, Livecontest, Savedcontest, User } from 'src/typeorm';
import { Auditcontest } from 'src/typeorm/contests/Auditcontest';
import { CreateAuditContestDto } from 'src/dtos/contests/CreateAuditContest.dto';
import { CreateLiveContestDto } from 'src/dtos/contests/CreateLiveContest.dto';
import { CreateSavedContestDto } from 'src/dtos/contests/CreateSavedContest.dto';
import { Repository } from 'typeorm';
import { Request } from 'express';
import * as moment from "moment";

@Injectable()
export class ContestService {


  constructor(@InjectRepository(Savedcontest)
  private readonly contestRepository: Repository<Savedcontest> ,
  @InjectRepository(Livecontest)
  private readonly liveContestRepository: Repository<Livecontest>,
  @InjectRepository(Auditcontest)
  private readonly AuditContestRepository: Repository<Auditcontest>,
  @InjectRepository(User)
  private readonly UserRepository: Repository<User>,
  @InjectRepository(Applieduser)
  private readonly AppliedUserRepository: Repository<Applieduser>,
  
  ){}

  

createContest(contestDto:CreateSavedContestDto){

         const newContest = this.contestRepository.create(contestDto);
         return this.contestRepository.save(newContest)
       
   }

publishContest(livecontestDto:CreateLiveContestDto){

      const newContest = this.liveContestRepository.create(livecontestDto);
      return this.liveContestRepository.save(newContest);

}

async applyContest(request: Request){

        const contest = await this.contestRepository.findOne({where: {id:request.body.contestid}})
        const user = await this.UserRepository.findOne({where:{id:request.body.userid}})
        console.log(contest , user)

        const appliedUser = await this.AppliedUserRepository.findOne({where:{contestid:request.body.contestid , userid:request.body.userid}})
       
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
            const ApplyUser = this.AppliedUserRepository.create({contestid:request.body.contestid,userid:request.body.userid});
            return this.AppliedUserRepository.save(ApplyUser)
            
           }else{
            throw new HttpException("Insufficient Cash In Your Wallet",HttpStatus.BAD_REQUEST); 
      }
      } else
      throw new HttpException("You can Apply Before 2 Hours of Contest",HttpStatus.BAD_REQUEST);   

}

async auditContest(auditcontestDto:CreateAuditContestDto){
      
      const removecontest = await this.liveContestRepository.findOne({where: {contestDetails:auditcontestDto.contestDetails}})
       console.log("Remove Contest From Live Table", removecontest);
       await this.liveContestRepository.remove(removecontest);
      const newContest = this.AuditContestRepository.create(auditcontestDto);
      return this.AuditContestRepository.save(newContest);

}

}
