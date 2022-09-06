import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admincontest, Ads, Segment, User } from 'src/typeorm';
import { CreateAdminContestDto } from 'src/dtos/contests/CreateAdminContest.dto';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CreateAdsDto } from 'src/dtos/Ads/CreateAds.dto';


export interface IGetUserAuthInfoRequest extends Request {
      userId: number 
      contestId:number// or any other type
    }

@Injectable()
export class AdminContestService {


  constructor(@InjectRepository(Admincontest)
  private readonly admincontestRepository: Repository<Admincontest> ,
  @InjectRepository(User)
  private readonly UserRepository: Repository<User>,
  @InjectRepository(Segment)
  private readonly segmentRepository: Repository<Segment>,


 
  
  ){}

getSavedContest(){
     try{

       return this.admincontestRepository.find({relations:['user','questions']});
     
      }catch(e){
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
      }
      } 

getSavedContestById(id:number){
    
      try{

      // return this.admincontestRepository.findOne(id ,{relations:['questions']})
      return this.admincontestRepository.findOne({where: { id }, relations: ['questions']})
     
     }catch(e){
      
            throw new HttpException(e, HttpStatus.BAD_REQUEST) 
      }
}

async createContest(admincontestDto:CreateAdminContestDto,user:User,request:IGetUserAuthInfoRequest){
    
    try{
      const users = await this.UserRepository.findOne({where:{id:request.userId}})
      console.log(users,"Sfsdfds")
         const newContest = this.admincontestRepository.create({
               contestName:admincontestDto.contestName,
               contestDetails:admincontestDto.contestDetails,
               contestTime:admincontestDto.contestTime,
               EntryAmount:admincontestDto.EntryAmount,
               publish:admincontestDto.publish,
               user:users
         });
         user.savedcontests = [...user.savedcontests , newContest]
         console.log("Contests" , user.savedcontests)

         
         await this.UserRepository.save(user)
         await this.admincontestRepository.save(newContest)

         //for saving segment 
         
         for(let i=0;i<admincontestDto.segment;i++){
           
            const segment = this.segmentRepository.create({
                  contestId:newContest.id,
                  segmentName:"Segment"+(i+1)+newContest.id

            }
            )
            await this.segmentRepository.save(segment)

         }
      const particularsegement = await this.segmentRepository.find({where:{contestId:newContest.id }})
         return {message:"Contest Created Succssfully",contest:newContest,Segment:particularsegement}
    
      }catch(e){
      
            throw new HttpException(e, HttpStatus.BAD_REQUEST)

    } 
   }


async getSegment(request:IGetUserAuthInfoRequest){
      
      try{
        const segment = await this.segmentRepository.find({where:{contestId:request.body.contestId}})

        return {Segment:segment};

      }catch(e){
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
      }

}





}













