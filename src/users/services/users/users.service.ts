import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User as UserEntity } from 'src/typeorm';
import { Savedcontest as ContestEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/dtos/Users/CreateUser.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
     
  // to get repo of db 

   constructor(@InjectRepository(UserEntity) 
   private readonly userRepository: Repository<UserEntity> ,
   @InjectRepository(ContestEntity) 
   private readonly contestRepository: Repository<ContestEntity>
   
   ){

   }

    findUsers(){
        return  this.userRepository.find() ;

        // use map function for restrict to send password in client side by using plainToclass(serialdata , original data) 
    }

   async signupUser(userDto:CreateUserDto){

     
        const userexist = await this.userRepository.findOne({where:{email:userDto.email}}) 
        if(userexist){
            throw new HttpException("Email Already Exist", HttpStatus.BAD_REQUEST);
        }
        const password = encodePassword(userDto.password);
        const newUser =  this.userRepository.create({...userDto, password});
        return this.userRepository.save(newUser);  


    }


    getUserByName(name:string){
        
       const names = this.userRepository.findOne({where: {name:name}})
       return names;
            
         
    }

}
