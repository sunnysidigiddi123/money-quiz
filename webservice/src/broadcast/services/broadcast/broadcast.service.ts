import { Injectable ,HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Applieduser, Auditcontest, Liveuser, Publishedcontest, Question, User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';


export interface IGetUserAuthInfoRequest extends Request {
    userId: number // or any other type
  }

@Injectable()
export class BroadcastService {


    constructor(
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
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    
    ){}

  async answerCheck(request: IGetUserAuthInfoRequest){
   
    const user = await this.UserRepository.findOne({where:{id:request.userId}})
    const question = await this.questionRepository.findOne({where:{id:request.body.questionId}})
    const contest = await this.PublishedContestRepository.findOne({where:{id:request.body.contestId}})
    const LiveUser = await this.liveUserRepository.findOne({where:{userId:request.userId,contestId:request.body.contestId}})
    const TotalLiveUsers = await this.liveUserRepository.count({where:{contestId:request.body.contestId}})
    // console.log("sssss",await this.AppliedUserRepository.count({where:{contestid:1}}))
    console.log(request.body.selectedOption,LiveUser,"aaaaaaaaaa")
    try{
    if(user){
      
        if(question.correctanswer === request.body.selectedOption  && request.body.selectedOption !== '' && request.body.selectedOption !== null)

         return {message: "Congrats! You Gave Correct Answer ",status:1}

        if(question.correctanswer !== request.body.selectedOption || request.body.selectedOption === null || request.body.selectedOption === '' ){
           
          let totalPoll = TotalLiveUsers * contest.ParticularPoll ;
          await this.liveUserRepository.remove(LiveUser);
          const TotalLiveUsersnew = await this.liveUserRepository.count({where:{contestId:request.body.contestId}})
         if(TotalLiveUsersnew == 0){
        
         contest.ParticularPoll = contest.EntryAmount;
         }
        
         if(TotalLiveUsersnew > 0){
          
          console.log("total live users", TotalLiveUsersnew)
          contest.ParticularPoll = totalPoll/TotalLiveUsersnew;
        }

         await this.PublishedContestRepository.save(contest);
         
         return {message: "Oops! You Gave Wrong Answer" ,ParticularPoll:contest.ParticularPoll,LiveUsers:TotalLiveUsersnew,TotalPoll:totalPoll,status:0}
        }
        
       
    }
  }catch(e){

    throw new HttpException(e, HttpStatus.BAD_REQUEST)
  }

  }


  async getpollvalues(request:IGetUserAuthInfoRequest){

    const user = await this.UserRepository.findOne({where:{id:request.userId}})
    const TotalLiveUsers = await this.liveUserRepository.count({where:{contestId:request.body.contestId}})
    const contest = await this.PublishedContestRepository.findOne({where:{id:request.body.contestId}})
    try{
    if(user){
         
      return {message: "Poll Values" ,ParticularPoll:contest.ParticularPoll,LiveUsers:TotalLiveUsers}

    }

  }catch(e){
    throw new HttpException(e, HttpStatus.BAD_REQUEST)
  }

  }


  async getInitialUsers(request:IGetUserAuthInfoRequest){
  
    try{
    const TotalLiveUsers = await this.liveUserRepository.count({where:{contestId:request.body.contestId}})
  
         
      return {message: "Initial Users" ,InitialUsers:TotalLiveUsers}

    }catch(e){
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }

  }



  async cashout(request: IGetUserAuthInfoRequest){
   
    const user = await this.UserRepository.findOne({where:{id:request.userId}})
    const contest = await this.PublishedContestRepository.findOne({where:{id:request.body.contestId}})
    const LiveUser = await this.liveUserRepository.findOne({where:{userId:request.userId,contestId:request.body.contestId}})
    const TotalLiveUsers = await this.liveUserRepository.count({where:{contestId:request.body.contestId}})
    console.log("total old live users", TotalLiveUsers,user)
    try{
    if(user){
      
      let totalPoll = TotalLiveUsers * contest.ParticularPoll ;
      console.log("total old live users", totalPoll)
      let particularPoll = contest.ParticularPoll;
      user.Wallet = user.Wallet + particularPoll;
      console.log("total old live users", TotalLiveUsers)
      await this.liveUserRepository.remove(LiveUser);
      const TotalLiveUsersnew = await this.liveUserRepository.count({where:{contestId:request.body.contestId}})
      if(TotalLiveUsersnew == 0){
        
      contest.ParticularPoll = contest.EntryAmount;
      }
      
      if(TotalLiveUsersnew > 0){
        
        console.log("total live users", TotalLiveUsersnew)
      contest.ParticularPoll = (totalPoll-particularPoll)/TotalLiveUsersnew;
      }
    
      await this.PublishedContestRepository.save(contest);
      await this.UserRepository.save(user);
      return {mesage:"Cashout Successfully",ParticularPoll:particularPoll,LiveUsers:TotalLiveUsersnew,TotalPoll:totalPoll,status:1}
    }
  }catch(e){
     
    throw new HttpException(e, HttpStatus.BAD_REQUEST)
     
  }

  }

  async quit(request: IGetUserAuthInfoRequest){


    const user = await this.UserRepository.findOne({where:{id:request.userId}})
    const contest = await this.PublishedContestRepository.findOne({where:{id:request.body.contestId}})
    const LiveUser = await this.liveUserRepository.findOne({where:{userId:request.userId,contestId:request.body.contestId}})
    const TotalLiveUsers = await this.liveUserRepository.count({where:{contestId:request.body.contestId}})
  
    try{
    if(user){
       
      let totalPoll = TotalLiveUsers * contest.ParticularPoll ;
      await this.liveUserRepository.remove(LiveUser);
      const TotalLiveUsersnew = await this.liveUserRepository.count({where:{contestId:request.body.contestId}})
      if(TotalLiveUsersnew == 0){
        
        contest.ParticularPoll = contest.EntryAmount;
        }
        
        if(TotalLiveUsersnew > 0){
          
          console.log("total live users", TotalLiveUsersnew)
        contest.ParticularPoll = totalPoll/TotalLiveUsersnew;
        }

        await this.PublishedContestRepository.save(contest);
        return {mesage:"Quit Successfully",ParticularPoll:contest.ParticularPoll,LiveUsers:TotalLiveUsersnew,TotalPoll:totalPoll}

    }
  }catch(e){
  
    throw new HttpException(e, HttpStatus.BAD_REQUEST)
     
  }

  }

  async reenter(request: IGetUserAuthInfoRequest){


    const user = await this.UserRepository.findOne({where:{id:request.userId}})
    const contest = await this.PublishedContestRepository.findOne({where:{id:request.body.contestId}})
   
    try{

    if(user){
      if(user.Wallet < contest.ParticularPoll){
         
        throw new HttpException({message:"Insufficient Cash In Your Wallet",status:0},HttpStatus.BAD_REQUEST);
        }
        if(user.Wallet >= contest.ParticularPoll){
          user.Wallet = user.Wallet - (contest.ParticularPoll);
          const liveUsers = this.liveUserRepository.create({
            userId:user.id,
            contestId:contest.id
           })
           await this.liveUserRepository.save(liveUsers);
           await this.UserRepository.save(user)
           return {mesage:"Re-Enter successfully",status:1}
        }  
     
    }
  }catch(e){

    throw new HttpException(e, HttpStatus.BAD_REQUEST)
  }
  }

 
  async creditwinningamount(request: IGetUserAuthInfoRequest){

    const user = await this.UserRepository.findOne({where:{id:request.userId}})
    const contest = await this.PublishedContestRepository.findOne({where:{id:request.body.contestId}})
    
    try{
    if(user){
      
      let particularPoll = contest.ParticularPoll;
      user.Wallet = user.Wallet + particularPoll;
      
      await this.UserRepository.save(user);
      return {mesage:"Amount Credited"}
    }
  }catch(e){

    throw new HttpException(e, HttpStatus.BAD_REQUEST)
  }
  }


  
  

  








}
