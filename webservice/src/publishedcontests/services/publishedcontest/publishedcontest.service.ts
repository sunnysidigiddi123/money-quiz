import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Applieduser, Publishedcontest, Liveuser, Admincontest, User, Segment, Question } from 'src/typeorm';
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
    @InjectRepository(Segment)
    private readonly segmentRepository: Repository<Segment>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    
    ){}




async publishContest(publishedcontestDto:CreatePublishedContestDto,admincontest:Admincontest){

        const segment = await this.segmentRepository.find({where:{contestId:admincontest.id}})
        const newContest = this.PublishedContestRepository.create({
              contestName:publishedcontestDto.contestName,
              contestDetails:publishedcontestDto.contestDetails,
              contestTime:publishedcontestDto.contestTime,
              EntryAmount:publishedcontestDto.EntryAmount,
              ParticularPoll:publishedcontestDto.EntryAmount,
              LivecontestTime:publishedcontestDto.contestTime
        });
        newContest.questions = admincontest.questions
      
        admincontest.publish = true

        await this.contestRepository.save(admincontest);

        const publishcontest =  await this.PublishedContestRepository.save(newContest);
        
        for(let i=0;i< segment.length;i++){

          segment[i].livecontestId = newContest.id
           console.log(segment[i].livecontestId,newContest.id,"aaaaa")
          
     }
     
          await this.segmentRepository.save(segment);

        return publishcontest

  
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
         
    const contest = await this.PublishedContestRepository.findOne({where: {id:request.body.contestid},relations:['questions']})
    const user = await this.UserRepository.findOne({where:{id:request.userId}})
    const UserAlreadyPlayed = await this.liveUserRepository.findOne({where:{contestId:request.body.contestid , userId:request.userId}})
    console.log("sss",contest.questions[0],contest.questions.length)
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
           const TotalLiveUsersnew = await this.liveUserRepository.count({where:{contestId:request.body.contestid}})
           return {message:'Enter Successfully', status:1,question1:contest.questions[contest.LiveQuestionIndex],contestTime:contest.LivecontestTime,totalquestions:contest.questions.length,totalIntitalUsers:TotalLiveUsersnew,questionIndex:contest.LiveQuestionIndex}
          }
        if(contest.EntryAmount < contest.ParticularPoll){

           return {mesage:"Please Pay New Poll Amount To Enter in Contest",status:2,entryamount:contest.EntryAmount,contestTime:contest.LivecontestTime,particularPoll:contest.ParticularPoll,question1:contest.questions[contest.LiveQuestionIndex],totalquestions:contest.questions.length}
        }



    }
}


async getData(request: IGetUserAuthInfoRequest){
         
  const contest = await this.PublishedContestRepository.findOne({where: {id:request.body.contestId},relations:['questions']})
  const user = await this.UserRepository.findOne({where:{id:request.userId}})
  // const question = await this.questionRepository.findOne({where:{id:request.body.questionId}})
 console.log("Cccccccccc",contest.questions[1],request.body.LivecontestTime,request.body.questionIndex)
  if(user){
      contest.LivecontestTime = request.body.LivecontestTime
      contest.LiveQuestionIndex = request.body.questionIndex
      await this.PublishedContestRepository.save(contest)
    // if(question.correctanswer === request.body.selectedOption  && request.body.selectedOption !== '' && request.body.selectedOption !== null)
    
    throw new HttpException({message: "Congrats! You Gave Correct Answer ",status:1,entryamount:contest.EntryAmount,particularPoll:contest.ParticularPoll,question:contest.questions[request.body.questionIndex]},HttpStatus.CREATED)

  //  if(question.correctanswer !== request.body.selectedOption )

  //   throw new HttpException({message: "Oops! You Gave Wrong Answer" , status:0,entryamount:contest.EntryAmount,particularPoll:contest.ParticularPoll,question:contest.questions[request.body.questionIndex]},HttpStatus.CREATED)
   
  //  if(request.body.selectedOption === null)
      
  //  throw new HttpException({message: "Oops! You Gave Wrong Answer" , status:0,entryamount:contest.EntryAmount,particularPoll:contest.ParticularPoll,question:contest.questions[request.body.questionIndex]},HttpStatus.CREATED)
     
  //  if(request.body.selectedOption === '')

  //  throw new HttpException({message: "Oops! You Gave Wrong Answer" , status:0,entryamount:contest.EntryAmount,particularPoll:contest.ParticularPoll,question:contest.questions[request.body.questionIndex]},HttpStatus.CREATED)

  

  }
} 


async paynewpollamount(request: IGetUserAuthInfoRequest){
         
  const contest = await this.PublishedContestRepository.findOne({where: {id:request.body.contestid},relations:['questions']})
  const user = await this.UserRepository.findOne({where:{id:request.userId}})
  
      if(user.Wallet < contest.ParticularPoll){
         
        throw new HttpException({message:"Insufficient Cash In Your Wallet",status:0},HttpStatus.BAD_REQUEST);
        }
      if(user.Wallet >= contest.ParticularPoll){
        user.Wallet = user.Wallet - (contest.ParticularPoll-contest.EntryAmount);
        const liveUsers = this.liveUserRepository.create({
          userId:user.id,
          contestId:contest.id
         })
         await this.liveUserRepository.save(liveUsers);
         await this.UserRepository.save(user)
         const TotalLiveUsersnew = await this.liveUserRepository.count({where:{contestId:request.body.contestid}})
         return {mesage:"Enter successfully",status:1,question1:contest.questions[contest.LiveQuestionIndex],totalquestions:contest.questions.length,totalIntitalUsers:TotalLiveUsersnew,questionIndex:contest.LiveQuestionIndex}
      }

}





async getPublishedContest(request: IGetUserAuthInfoRequest){
     
     const AppliedContests = await this.AppliedUserRepository.find({where:{userid:request.userId}})
     const contest = await this.PublishedContestRepository.find();
     const user = await this.UserRepository.find({where:{id:request.userId}});


     return {appliedcontests:AppliedContests,contests:contest,user:user[0].name,wallet:user[0].Wallet}



}



}
