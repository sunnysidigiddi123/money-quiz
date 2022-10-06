import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Applieduser, Publishedcontest, Liveuser, Admincontest, User, Segment, Question, aud_contests, aud_applieduser } from 'src/typeorm';
import { CreateAuditContestDto } from 'src/dtos/contests/CreateAuditContest.dto';
import { CreatePublishedContestDto } from 'src/dtos/contests/CreatePublishedContest.dto';
import { ConnectionIsNotSetError, Repository } from 'typeorm'; 
import { Request, Response } from 'express';
import * as moment from "moment";
import { dynamicSort } from 'config';

export interface IGetUserAuthInfoRequest extends Request {
    userId: number // or any other type
  }

@Injectable()
export class PublishedcontestService {


    constructor(@InjectRepository(Admincontest)
    private readonly contestRepository: Repository<Admincontest> ,
    @InjectRepository(Publishedcontest)
    private readonly PublishedContestRepository: Repository<Publishedcontest>,
    @InjectRepository(aud_contests)
    private readonly AuditContestRepository: Repository<aud_contests>,
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
    @InjectRepository(aud_applieduser)
    private readonly auditapplieduserRepository: Repository<aud_applieduser>,
    
    ){}




async publishContest(publishedcontestDto:CreatePublishedContestDto,admincontest:Admincontest){

   try{
        const segment = await this.segmentRepository.find({where:{contestId:admincontest.id}})
        const newContest = this.PublishedContestRepository.create({
              contestName:publishedcontestDto.contestName,
              contestDetails:publishedcontestDto.contestDetails,
              contestTime:publishedcontestDto.contestTime,
              EntryAmount:publishedcontestDto.EntryAmount,
              ParticularPoll:publishedcontestDto.EntryAmount,
              LivecontestTime:publishedcontestDto.contestTime,
              SegmentGoingOn:publishedcontestDto.contestTime
        });
        newContest.questions = admincontest.questions
      
        admincontest.publish = true
        
        let sum = 0
        for(let i=0;i<newContest.questions.length;i++){
          
           sum += newContest.questions[i].totalQuestionTime


        }
        newContest.contestEndTime = moment(newContest.contestTime).add(sum+(30*newContest.questions.length),'seconds').toDate()
        console.log(sum,"ssssss", newContest.contestEndTime)

        await this.contestRepository.save(admincontest);

        const publishcontest =  await this.PublishedContestRepository.save(newContest);
        
        for(let i=0;i< segment.length;i++){

          segment[i].livecontestId = newContest.id
           console.log(segment[i].livecontestId,newContest.id,"aaaaa")
          
     }
     
          await this.segmentRepository.save(segment);

        return publishcontest
     
    }catch(e){
      
      throw new HttpException(e,HttpStatus.BAD_REQUEST);

    }   
    
  }

  async auditContest(auditcontestDto:CreateAuditContestDto){
    
    try{
    const removecontest = await this.PublishedContestRepository.findOne({where: {contestDetails:auditcontestDto.contestDetails}})
     console.log("Remove Contest From Live Table", removecontest);
     await this.PublishedContestRepository.remove(removecontest);
    const newContest = this.AuditContestRepository.create(auditcontestDto);
    return await this.AuditContestRepository.save(newContest);

    }catch(e){
      throw new HttpException(e,HttpStatus.BAD_REQUEST);
    }

}


async applyContest(request: IGetUserAuthInfoRequest){
         
    const contest = await this.PublishedContestRepository.findOne({where: {id:request.body.contestid}})
    const user = await this.UserRepository.findOne({where:{id:request.userId}})
   
    const appliedUser = await this.AppliedUserRepository.findOne({where:{contestid:request.body.contestid , userid:request.userId}})
   
    try{

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
  
}catch(e){

  throw new HttpException(e,HttpStatus.BAD_REQUEST);   
}


}


async contestplaycheck(request: IGetUserAuthInfoRequest){
         
    const contest = await this.PublishedContestRepository.findOne({where: {id:request.body.contestid},relations:['questions']})
    const user = await this.UserRepository.findOne({where:{id:request.userId}})
    const UserAlreadyPlayed = await this.liveUserRepository.findOne({where:{contestId:request.body.contestid , userId:request.userId}})
    console.log("sss",contest.questions[0],contest.questions.length)
    
    try{
    if(UserAlreadyPlayed){
      
         throw new HttpException({message:"You Have Already Played",status:0},HttpStatus.BAD_REQUEST);
    }
    
   
    if(!UserAlreadyPlayed){

      if(contest.LiveQuestionIndex > 0  && contest.questions[contest.LiveQuestionIndex-1].segmentId == contest.questions[contest.LiveQuestionIndex].segmentId  ){

        throw new HttpException({message:"Wait Until Segment Gets over",status:0},HttpStatus.BAD_REQUEST);
  
  
      }else{
        if(contest.EntryRestrict == true){
          
          throw new HttpException({message:"Wait Until Segment Gets over",status:0},HttpStatus.BAD_REQUEST);

        }else{

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
    }
        
    }catch(e){
   
      throw new HttpException(e,HttpStatus.BAD_REQUEST)


    }
}


async getData(request: IGetUserAuthInfoRequest){
         
  const contest = await this.PublishedContestRepository.findOne({where: {id:request.body.contestId},relations:['questions']})
  const user = await this.UserRepository.findOne({where:{id:request.userId}})
  // const question = await this.questionRepository.findOne({where:{id:request.body.questionId}})
 console.log("Cccccccccc",contest.questions[1],request.body.LivecontestTime,request.body.questionIndex,contest.SegmentGoingOn,contest.LivecontestTime)
 const LiveUser = await this.liveUserRepository.findOne({where:{userId:request.userId,contestId:request.body.contestId}})
 const TotalLiveUsers = await this.liveUserRepository.count({where:{contestId:request.body.contestId}})
 try{
 if(user){

    contest.EntryRestrict = false

    this.PublishedContestRepository.save(contest)
      
    //  //for segment 
     
    //  if(moment(contest.LivecontestTime).isSame(contest.SegmentGoingOn) ){
    //      console.log("sssssss")
    //     for(let i=contest.LiveQuestionIndex;i<contest.questions.length;i++ ){
          
    //        if(contest.questions[i+1].segmentId != null && contest.questions[i].segmentId == contest.questions[i+1].segmentId){
    //         console.log("hhhhhh")
    //       contest.SegmentGoingOn = moment(contest.SegmentGoingOn).add(contest.questions[i].totalQuestionTime+contest.questions[i+1].totalQuestionTime+60,'seconds').toDate()
    //       console.log("vvvvvv",contest.SegmentGoingOn)  
    //       contest.LivecontestTime = request.body.LivecontestTime
    //       contest.LiveQuestionIndex = request.body.questionIndex
    //       await this.PublishedContestRepository.save(contest)
 
    //     }
    //   }
    //  }else{

   
    // when one user left in contest 

    if(TotalLiveUsers == 1) {
      
      let particularPoll = contest.ParticularPoll;
      user.Wallet = user.Wallet + particularPoll;
      await this.liveUserRepository.remove(LiveUser);
      await this.UserRepository.save(user);


      contest.LivecontestTime = request.body.LivecontestTime
      contest.LiveQuestionIndex = request.body.questionIndex
      await this.PublishedContestRepository.save(contest)

      // if(contest.questions.length > request.body.questionIndex ){

        
      //   let diff = contest.questions.length-parseInt(request.body.questionIndex)

      //   for(let i=0;i< diff;i++){
                  
      //     setTimeout(()=>{

      //       contest.LivecontestTime = moment(contest.LivecontestTime).add(contest.questions[parseInt(request.body.questionIndex)+(i+1)].totalQuestionTime,'seconds').toDate()
      //       contest.LiveQuestionIndex =  contest.LiveQuestionIndex+1
      //       this.PublishedContestRepository.save(contest)

      //     },contest.questions[parseInt(request.body.questionIndex)+(i+1)].totalQuestionTime)
        
        
      //   }


      // }

      const question = contest.questions[request.body.questionIndex]
    //  if(contest.questions.length == request.body.questionIndex ){
       
      const contestalreadyaudited = await this.AuditContestRepository.findOne({where: {contestId:request.body.contestId}})
      const [liveusers ,count] = await this.liveUserRepository.findAndCount({where:{contestId:request.body.contestId}})
      const applieduser = await this.AppliedUserRepository.find({where:{contestid:request.body.contestId}})

     
        
        
        const auditcontest = this.AuditContestRepository.create({
         
          contestId:contest.id,
          contestDetails:contest.contestDetails,
          contestName:contest.contestName,
          contestTime:contest.contestTime,
          EntryAmount:contest.EntryAmount,
          winningAmount:contest.ParticularPoll,
          remainingUsers: count+1



        }) 
        
        for(let i=0;i<applieduser.length;i++){

          const auditapplieduser = this.auditapplieduserRepository.create({
                
            contestid:request.body.contestId,
            userid:applieduser[i].userid
  
  
          })
          await this.auditapplieduserRepository.save(auditapplieduser)
        }
      




          await this.AppliedUserRepository.remove(applieduser)
         

      if(!contestalreadyaudited){
        await this.PublishedContestRepository.remove(contest)
        await this.AuditContestRepository.save(auditcontest)
          
      }
    // }

      throw new HttpException({message:'NO User Left To Play Contest'},HttpStatus.BAD_REQUEST)


    }else

      contest.LivecontestTime = request.body.LivecontestTime
      contest.LiveQuestionIndex = request.body.questionIndex
      await this.PublishedContestRepository.save(contest)
    // if(question.correctanswer === request.body.selectedOption  && request.body.selectedOption !== '' && request.body.selectedOption !== null)
     const question = contest.questions[request.body.questionIndex]
     if(contest.questions.length == request.body.questionIndex ){
       
      const contestalreadyaudited = await this.AuditContestRepository.findOne({where: {contestId:request.body.contestId}})
      const [liveusers ,count] = await this.liveUserRepository.findAndCount({where:{contestId:request.body.contestId}})
      const applieduser = await this.AppliedUserRepository.findOne({where:{contestid:request.body.contestId,userid:request.userId}})

     
        
        
        const auditcontest = this.AuditContestRepository.create({
         
          contestId:contest.id,
          contestDetails:contest.contestDetails,
          contestName:contest.contestName,
          contestTime:contest.contestTime,
          EntryAmount:contest.EntryAmount,
          winningAmount:contest.ParticularPoll,
          remainingUsers: count



        }) 

        const auditapplieduser = this.auditapplieduserRepository.create({
                
          contestid:request.body.contestId,
          userid:request.userId


        })




          await this.AppliedUserRepository.remove(applieduser)
          await this.auditapplieduserRepository.save(auditapplieduser)

      if(!contestalreadyaudited){
        await this.PublishedContestRepository.remove(contest)
        await this.AuditContestRepository.save(auditcontest)
          
      }
    }
    return {message: "Poll Data ",status:1,entryamount:contest.EntryAmount,particularPoll:contest.ParticularPoll,question:contest.questions[request.body.questionIndex],liveindex:contest.LiveQuestionIndex}
    //  }
  }
}catch(e){
  throw new HttpException(e,HttpStatus.BAD_REQUEST)
}
} 


async paynewpollamount(request: IGetUserAuthInfoRequest){
         
  const contest = await this.PublishedContestRepository.findOne({where: {id:request.body.contestid},relations:['questions']})
  const user = await this.UserRepository.findOne({where:{id:request.userId}})
  try{
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
  }catch(e){

    throw new HttpException(e,HttpStatus.BAD_REQUEST)
  }

}

async getPublishedContest(request: IGetUserAuthInfoRequest,page: number =1 ,limit:number =3 ,OrderBy:number = -1  , sortBy:string = "contestTime" ){
     
  const sort = {}

  try{
    if(sortBy && OrderBy){
      OrderBy = 'DESC' ? -1 : 1 
      sort[sortBy] = OrderBy

    }
   
     const AppliedContests = await this.AppliedUserRepository.find({where:{userid:request.userId}})
     
     const [contest,count] = await this.PublishedContestRepository.findAndCount({take:limit, skip:limit*(page-1),order:sort});
     console.log('sssss')
     const user = await this.UserRepository.find({where:{id:request.userId}});

     return {appliedcontests:AppliedContests,contests:contest,page_size:limit,page_number:page,count:count,user:user[0].name,wallet:user[0].Wallet}
  }catch(e){
    throw new HttpException(e,HttpStatus.BAD_REQUEST)
  }
}



async detailviewcontest(request: IGetUserAuthInfoRequest ){
  
  try{
  const contest = await this.PublishedContestRepository.findOne({where:{id:request.body.contestid}})
  const liveusers = await this.liveUserRepository.count({where:{contestId:request.body.contestid}})
  const appliedusers = await this.AppliedUserRepository.count({where:{contestid:request.body.contestid}})
  const appliedContest = await this.AppliedUserRepository.find({where:{userid:request.userId,contestid:request.body.contestid}})
  const totalWinningAmount = contest.EntryAmount * liveusers
  console.log(appliedContest,request.userId)
 
  let isApplied :Boolean
  if(appliedContest.length == 0){
       isApplied = false
  }else{
        isApplied = true
  }
  console.log(isApplied,"aaa")
  return {message: "Detailed  View of contest",liveplayers:liveusers,appliedusers:appliedusers ,totalwinningamount:totalWinningAmount,entryamount:contest.EntryAmount,contestTime:contest.contestTime,contestName:contest.contestName,isApplied:isApplied }
  
  }catch(e){
    throw new HttpException(e,HttpStatus.BAD_REQUEST)

  }

}

async appliedcontests(request: IGetUserAuthInfoRequest  ){
  
  try{
  const appliedContest = await this.AppliedUserRepository.find({where:{userid:request.userId}})
  console.log(appliedContest[1])
  let arr = []

  for(let i=0 ;i<appliedContest.length;i++){
     
   const contest = await this.PublishedContestRepository.find({where:{id:appliedContest[i].contestid}})
 
   console.log(contest)
   arr.push(contest.pop())
  
  }
  
 arr.sort(dynamicSort("contestTime"));

  return {message: " applied of contests",contest:arr}


}catch(e){
    throw new HttpException(e,HttpStatus.BAD_REQUEST)
}


}
}
