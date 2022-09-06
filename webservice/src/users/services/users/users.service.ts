import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Otp as OtpEntity, User as UserEntity, user_profile } from 'src/typeorm';
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
const nodemailer = require("nodemailer")
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
  private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ContestEntity)
    private readonly contestRepository: Repository<ContestEntity>,
    @InjectRepository(OtpEntity)
    private readonly otpRepository: Repository<OtpEntity>,
    @InjectRepository(user_profile)
    private readonly userprofileRepository: Repository<user_profile>,

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
            role: userexist.role
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
      return this.userRepository.findOne({ where: { id }, relations: ['savedcontests', 'ads'] })

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
      if (user) {
        return { message: "Profile data", name: user.name, email: user.email, role: user.role, wallet: user.Wallet,userProfile:user.userProfile };
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
  
      if (existprofile) {


        existprofile.dob = userprofileDto.dob
        existprofile.gender=userprofileDto.gender
        existprofile.age=userprofileDto.age
        existprofile.incomegroup=userprofileDto.incomegroup
        existprofile.location=userprofileDto.location

        await this.userprofileRepository.save(existprofile)
        return {message:"profile update successfully ",profile:existprofile}


      }else{
        
          const profile = this.userprofileRepository.create({
            dob:userprofileDto.dob,
            gender:userprofileDto.gender,
            age:userprofileDto.age,
            incomegroup:userprofileDto.incomegroup,
            location:userprofileDto.location,
            user: user
          })
          await this.userprofileRepository.save(profile)
          user.userProfile = profile
          console.log(user.userProfile,"ddd",user)
          await this.userRepository.save(user)
          return {message:"profile update successfully ",profile:profile}

      }

    } catch (e) {

      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }

  }
  

  async getdetails(request: IGetUserAuthInfoRequest){

      
    return await this.userRepository.find({relations:['user_profile']})
  }


}
