import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admincontest, User } from 'src/typeorm';
import { CreateAdminContestDto } from 'src/dtos/contests/CreateAdminContest.dto';
import { Repository } from 'typeorm';
import { Request } from 'express';


export interface IGetUserAuthInfoRequest extends Request {
      userId: number // or any other type
    }

@Injectable()
export class AdminContestService {


  constructor(@InjectRepository(Admincontest)
  private readonly admincontestRepository: Repository<Admincontest> ,
  @InjectRepository(User)
  private readonly UserRepository: Repository<User>,
 
  
  ){}

getSavedContest(){

       return this.admincontestRepository.find();
} 

getSavedContestById(id:number){
    
      return this.admincontestRepository.findOne(id ,{relations:['questions']})
     
}

async createContest(admincontestDto:CreateAdminContestDto,user:User,request:IGetUserAuthInfoRequest){
      const users = await this.UserRepository.findOne({where:{id:request.userId}})
         const newContest = this.admincontestRepository.create({
               contestName:admincontestDto.contestName,
               contestDetails:admincontestDto.contestDetails,
               contestTime:admincontestDto.contestTime,
               EntryAmount:admincontestDto.EntryAmount,
               user:users
         });
         user.savedcontests = [...user.savedcontests , newContest]
         console.log("Contests" , user.savedcontests)
         await this.UserRepository.save(user)
         await this.admincontestRepository.save(newContest)
         return newContest
       
   }



}













