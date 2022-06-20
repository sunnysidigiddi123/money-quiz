import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User as UserEntity } from 'src/typeorm';
import { Admincontest as ContestEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/dtos/Users/CreateUser.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { LoginUserDto } from 'src/dtos/Users/LoginUser.dto';
import * as dotenv from "dotenv";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dotenv.config();

const jwtSecret = process.env.JWT_SECRET
const tokenLife = process.env.TOKEN_LIFE
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE
const jwtRefreshSecret = process.env.REFRESH_JWT_SECRET



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
        await this.userRepository.save(newUser); 
        console.log("adasdsads",newUser.id) 
        const id = newUser.id;
        const token = jwt.sign({ id }, jwtSecret, {
            expiresIn: parseInt(tokenLife),
          });
        const refreshToken = jwt.sign({ id }, jwtRefreshSecret, {
            expiresIn: parseInt(refreshTokenLife),
          });
        const details = {
            id: id,
            name: userDto.name,
            email: userDto.email,
          };
        console.log(token,refreshToken)
        return {auth:true,token:token,refreshToken:refreshToken,details:details,message:"User Registered Successfully"}

    }


    async loginUser(loginUserDto:LoginUserDto){

      const email = loginUserDto.email;
      const password = loginUserDto.password;
      
      const userexist = await this.userRepository.findOne({where:{email:email}})
      
       if(userexist){
        
        const validatePassword = await bcrypt.compare(
            password,
            userexist.password
          );

          if (validatePassword) {
            const id = userexist.id;
            const token = jwt.sign({ id }, jwtSecret, {
              expiresIn: parseInt(tokenLife),
            });  
            const refreshToken = jwt.sign({ id }, jwtRefreshSecret, {
                expiresIn: parseInt(refreshTokenLife),
              });
            const details = {
                id: userexist.id,
                name: userexist.name,
                email: userexist.email,
              };

            return {auth:true,token:token,refreshToken:refreshToken,details:details, message:"User Logged in successfully"}
       } 

    }
}


    getUserByName(name:string){
        
       const names = this.userRepository.findOne({where: {name:name}})
       return names;
              
    }

    getUserById(id:number){

        return this.userRepository.findOne(id,{relations:['savedcontests']})
    }

}
