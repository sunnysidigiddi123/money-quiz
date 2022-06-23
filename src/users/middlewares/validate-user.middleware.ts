import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import * as dotenv from "dotenv";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/typeorm";
const jwt = require("jsonwebtoken");
dotenv.config();

export interface IGetUserAuthInfoRequest extends Request {
    userId: number // or any other type
  }

  const jwtSecret = process.env.JWT_SECRET
  const jwtRefreshSecret = process.env.REFRESH_JWT_SECRET 



@Injectable()
export class ValidateUserMiddleWare implements NestMiddleware {

   constructor(
  @InjectRepository(User)
  private readonly UserRepository: Repository<User>,){}

   use(req: IGetUserAuthInfoRequest, res: Response , next : NextFunction) {
    let token:string = req.headers["authorization"];
    console.log("ssss",token,req.headers)
    token = token.replace("Bearer ", "");
    if (!token) {
      throw new HttpException("Please authenticate", HttpStatus.BAD_REQUEST)
    } else {
      jwt.verify(token, jwtSecret, async (err: any, decoded: { id: any; }) => {
        if (err) {
          throw new HttpException("You failed to authenticate", HttpStatus.BAD_REQUEST)
        } else {
          req.userId = decoded.id;
          // const user = await this.UserRepository.findOne({where:{id:decoded.id}})
          // console.log("sssss",user)
          next();
        }
      });
    }
   } 



}