import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Admin, Otp as OtpEntity, profile_address, User as UserEntity, user_profile } from 'src/typeorm';
import { Admincontest as ContestEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/dtos/Users/CreateUser.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { LoginUserDto } from 'src/dtos/Users/LoginUser.dto';
import * as dotenv from "dotenv";
import { IGetUserAuthInfoRequest, resfreshAuth } from 'src/users/middlewares/validate-user.middleware';
import { Request } from 'express';
import { Response } from 'express';
import { CreateUserProfileDto } from 'src/dtos/Users/CreateUserProfile.dto';
import { CreateAdminDto } from 'src/dtos/Users/CreateAdmin.dto';
import { AgeGroupTypes, GenderTypes, IncomeTypes } from 'src/utils/enums';
const nodemailer = require("nodemailer")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pincode = require('get-indian-places-on-pincodes')
dotenv.config();

const jwtSecret = process.env.JWT_SECRET
const tokenLife = process.env.TOKEN_LIFE
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE
const jwtRefreshSecret = process.env.REFRESH_JWT_SECRET



@Injectable()
export class UsersService {

  // to get repo of db 

  constructor(@InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ContestEntity)
    private readonly contestRepository: Repository<ContestEntity>,
    @InjectRepository(OtpEntity)
    private readonly otpRepository: Repository<OtpEntity>,
    @InjectRepository(user_profile)
    private readonly userprofileRepository: Repository<user_profile>,
    @InjectRepository(profile_address)
    private readonly profileaddressRepository: Repository<profile_address>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

  ) {

  }

  findUsers() {
    return this.userRepository.find();

    // use map function for restrict to send password in client side by using plainToclass(serialdata , original data) 
  }

  async signupUser(userDto: CreateUserDto) {

    try {

      const userexist = await this.userRepository.findOne({ where: { email: userDto.email } })
      if (userexist) {
        throw new HttpException("Email Already Exist", HttpStatus.BAD_REQUEST);
      }
      const password = encodePassword(userDto.password);
      const newUser = this.userRepository.create({ ...userDto, password });
      await this.userRepository.save(newUser);
      console.log("adasdsads", newUser.id)
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
      console.log(token, refreshToken)
      return { auth: true, token: token, refreshToken: refreshToken, details: details, message: "User Registered Successfully" }

    } catch (e) {

      throw new HttpException(e, HttpStatus.BAD_REQUEST)

    }

  }


  async signupAdmin(adminDto: CreateAdminDto) {

    try {

      const userexist = await this.adminRepository.findOne({ where: { email: adminDto.email } })
      if (userexist) {
        throw new HttpException("Email Already Exist", HttpStatus.BAD_REQUEST);
      }
      const password = encodePassword(adminDto.password);
      const newUser = this.adminRepository.create({ ...adminDto, password });
      await this.adminRepository.save(newUser);
      console.log("adasdsads", newUser.id)
      const id = newUser.id;
      const token = jwt.sign({ id }, jwtSecret, {
        expiresIn: parseInt(tokenLife),
      });
      const refreshToken = jwt.sign({ id }, jwtRefreshSecret, {
        expiresIn: parseInt(refreshTokenLife),
      });
      const details = {
        id: id,
        name: adminDto.name,
        email: adminDto.email,
      };
      console.log(token, refreshToken)
      return { auth: true, token: token, refreshToken: refreshToken, details: details, message: "User Registered Successfully" }

    } catch (e) {

      throw new HttpException(e, HttpStatus.BAD_REQUEST)

    }

  }




  async loginUser(loginUserDto: LoginUserDto) {

    try {
      const email = loginUserDto.email;
      const password = loginUserDto.password;

      const userexist = await this.userRepository.findOne({ where: { email: email } })

      if (userexist) {

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

          return { auth: true, token: token, refreshToken: refreshToken, details: details, message: "User Logged in successfully" }
        }

      }
    } catch (e) {

      throw new HttpException(e, HttpStatus.BAD_REQUEST)

    }
  }

  async loginAdmin(loginUserDto: LoginUserDto) {

    try {
      const email = loginUserDto.email;
      const password = loginUserDto.password;

      const userexist = await this.adminRepository.findOne({ where: { email: email } })

      if (userexist) {

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

          return { auth: true, token: token, refreshToken: refreshToken, details: details, message: "User Logged in successfully" }
        }

      }
    } catch (e) {

      throw new HttpException(e, HttpStatus.BAD_REQUEST)

    }
  }


  getUserByName(name: string) {

    try {

      const names = this.userRepository.findOne({ where: { name: name } })
      return names;

    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }

  }

  getUserById(id: number) {

    try {

      // return this.userRepository.findOne(id, { relations: ['savedcontests'] })
      return this.adminRepository.findOne({ where: { id }, relations: ['savedcontests', 'ads'] })

    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }

  }

  async home(request: IGetUserAuthInfoRequest) {
    console.log(request.userId, "Dsfsfdsdss")

    try {
      const user = await this.userRepository.findOne({ where: { id: request.userId } })
      return user

    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST)

    }

  }

  async adminhome(request: IGetUserAuthInfoRequest) {
    console.log(request.userId, "Dsfsfdsdss")

    try {
      const user = await this.adminRepository.findOne({ where: { id: request.userId } })
      return user

    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST)

    }

  }


  async refreshtoken(request: IGetUserAuthInfoRequest) {

    try {
      const refreshToken = request.body.refreshToken;
      if (!refreshToken) {
        throw new HttpException("Please send Refresh Token", HttpStatus.BAD_REQUEST)
      } else {
        const userId = resfreshAuth(refreshToken);
        if (userId) {
          const token = jwt.sign({ userId }, jwtSecret, {
            expiresIn: parseInt(tokenLife),
          });
          const user = await this.userRepository.findOne({ where: { id: userId } })
          return { token: token, userId: userId, name: user.name }
        } else {
          throw new HttpException("Refresh Token expired", HttpStatus.UNAUTHORIZED);
        }

      }
    } catch (e) {

      throw new HttpException(e, HttpStatus.BAD_REQUEST)


    }
  }


  async forgotPassword(request: IGetUserAuthInfoRequest,response:Response) {

    const email = request.body.email;
    console.log(email)

    try {
      const user = await this.userRepository.findOne({ where: { email: email } });

      if (user) {

        let otpcode = Math.floor(Math.random() * 10000 + 1);
        console.log(otpcode, "ssss")
        const otpData = this.otpRepository.create({
          email: email,
          code: otpcode,
          expireIn: new Date().getTime() + 300 * 1000,
        });

        await this.otpRepository.save(otpData)
        console.log(otpData, "ssssss")
        var transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          }
        });

        var mailOptions = {
          from: process.env.SMTP_USER,
          to: email,
          subject: "Password Reset",
          html: `<h1>Welcome To MoneyQuiz </h1><p>\
              <h3>Hello ${user.email.split("@")[0]}</h3>\
              Your one time password (OTP) is ${otpcode}.<br/>\
              This OTP is valid for 5 mins. Never share this OTP with anyone else.\
              </p>
              `,
        };
        transporter.sendMail(mailOptions, function (error: any, info: { response: string; }) {
          if (error) {
            console.log("error", error);
          } else {
            console.log("Email sent: " + info.response);
            if (info.response) {
             response.status(201).send({ message: "OTP has been sent successfully. Please check your mail.", status: 1 })
            }
          }
        });

      } else {
        return { message: "E-mail doesn't exists" };
      }

    } catch (e) {

      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }

  }


  async otpVerification(request: IGetUserAuthInfoRequest) {

    try {
      const otp = await this.otpRepository.findOne({
        where: {
          email: request.body.email,
          code: request.body.otpCode,
        },
      });

      if (otp) {
        let currentTime = new Date().getTime();
        let diff = Number(otp.expireIn) - currentTime;
        if (diff < 0) {
          return { message: "Token Expired" };
        } else {
          return { message: "OTP verified successfully", status: 1 };
        }

      } else {
        return { message: "Invalid Otp" };
      }
    } catch (e) {

      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }

  }

  async resetPassword(request: IGetUserAuthInfoRequest) {

    try {
      const user = await this.userRepository.findOne({
        where: {
          email: request.body.email,
        },
      });
      console.log(user)
      if (user) {
        const hashedPassword = encodePassword(request.body.password);
        console.log(hashedPassword)
        user.password = hashedPassword
        const updatedPass = await this.userRepository.save(user);
        return { message: "Password changed successfully", status: 2 };
      }


    } catch (e) {

      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }

  }

  async profileinfo(request: IGetUserAuthInfoRequest) {

    try {
      const user = await this.userRepository.findOne({
        where: {
          id: request.userId,
        },
        relations:['userProfile']
      });
      const address = await this.profileaddressRepository.findOne({relations:{user_profile:true}, where:{user_profile:{user:{id:request.userId}}}})
      if (user) {
        return { message: "Profile data", name: user.name, email: user.email, wallet: user.Wallet,userProfile:user.userProfile , address:address };
      }

    } catch (e) {

      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }

  }


  async updateprofile(request: IGetUserAuthInfoRequest,userprofileDto:CreateUserProfileDto) {

    try {
      const user = await this.userRepository.findOne({
        where: {
          id: request.userId,
        },
        relations:['userProfile']
      });

      const existprofile = await this.userprofileRepository.findOne({relations:{user:true},where:{user:{id:request.userId}}})
      const existprofileaddress = await this.profileaddressRepository.findOne({relations:{user_profile:true}, where:{user_profile:{user:{id:request.userId}}}})
      console.log("sghjgss",existprofileaddress,existprofile)
      if (existprofile) {


        existprofile.dob = userprofileDto.dob
        existprofile.gender = userprofileDto.gender
        existprofile.ageGroup = userprofileDto.ageGroup
        existprofile.incomegroup = userprofileDto.incomegroup

        existprofileaddress.address1 = request.body.address1
        existprofileaddress.address2 = request.body.address2
        existprofileaddress.pin = request.body.pin,
        existprofileaddress.district = request.body.district,
        existprofileaddress.state = request.body.state,
        existprofileaddress.country = request.body.country,
        existprofileaddress.location = request.body.location

       console.log(existprofile.id)
        await this.userprofileRepository.save(existprofile)
        await this.profileaddressRepository.save(existprofileaddress)
        const profile = await this.userprofileRepository.findOne({where:{id:existprofile.id}}) 
        const address = await this.profileaddressRepository.findOne({where:{id:existprofileaddress.id}})
        return { message: "profile update successfully ", profile:profile ,address:address}


      } else {

          const profile = this.userprofileRepository.create({
            dob:userprofileDto.dob,
            gender:userprofileDto.gender,
            ageGroup:userprofileDto.ageGroup,
            incomegroup:userprofileDto.incomegroup,
            user: user
          })
      
          const profile_address = this.profileaddressRepository.create({
                    
             address1:request.body.address1,
             address2:request.body.address2,
             pin:request.body.pin,
             district:request.body.district,
             state:request.body.state,
             country:request.body.country,
             location:request.body.location

          })
          profile.address = profile_address
          user.userProfile = profile
            await this.profileaddressRepository.save(profile_address)
          await this.userprofileRepository.save(profile)
          await this.userRepository.save(user)
          return {message:"profile update successfully ",profile:profile,address:profile_address}

      }

    } catch (e) {

      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }

  }
  

  async getdetails(request: IGetUserAuthInfoRequest){

    return await this.userRepository.find({relations:['userProfile']})
    
  }



  async getpincodedata(request: IGetUserAuthInfoRequest){

    
    try{
      console.log(request.userId,request.body.pincode)
      const user = await this.userRepository.findOne({where:{id:request.userId}});
    
      if(user){
        console.log("sdssa")
         const pincodeData = pincode(request.body.pincode)
         console.log(pincodeData)
    
         return { message:"Pincode details" , pincode:pincodeData }
      }


  } catch (e) {

    throw new HttpException(e, HttpStatus.BAD_REQUEST)
  
    
  }
}

async getpincodedataadmin(request: IGetUserAuthInfoRequest){

    
  try{
    console.log(request.userId,request.body.pincode)
    const user = await this.adminRepository.findOne({where:{id:request.userId}});
  
    if(user){
      console.log("sdssa")
       const pincodeData = pincode(request.body.pincode)
       console.log(pincodeData)
  
       return { message:"Pincode details" , pincode:pincodeData }
    }


} catch (e) {

  throw new HttpException(e, HttpStatus.BAD_REQUEST)

  
}
}


async getenumvalues(request: IGetUserAuthInfoRequest){
   
  try{
       
  
       return { message:"Enum Values" , Gender:GenderTypes,AgeGroup:AgeGroupTypes,IncomeGroup:IncomeTypes}
    }

 catch (e) {

  throw new HttpException(e, HttpStatus.BAD_REQUEST)

  
}
}


async getuserwallet(request: IGetUserAuthInfoRequest){
   
  try{
       
       const user = await this.userRepository.findOne({where:{id:request.userId}})
       return { message:"Wallet Amount" , userwallet :user.Wallet}
    }

 catch (e) {

  throw new HttpException(e, HttpStatus.BAD_REQUEST)

  
}
}

async addmoneywallet(request: IGetUserAuthInfoRequest){
   
  try{
       
       const user = await this.userRepository.findOne({where:{id:request.userId}})
         user.Wallet = user.Wallet + parseInt(request.body.amount)
         this.userRepository.save(user)
       return { message:"Amount Added" , userwallet :user.Wallet}
    }

 catch (e) {

  throw new HttpException(e, HttpStatus.BAD_REQUEST)

  
}
}



}
