import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import * as dotenv from "dotenv";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/typeorm";
import { Request ,Response} from 'express';
const jwt = require("jsonwebtoken");
dotenv.config();

export interface IGetUserAuthInfoRequest extends Request {
    userId: number ,
    refreshToken: string// or any other type
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
      res.status(401).send("Please authenticate");
    } else {
      jwt.verify(token, jwtSecret, async (err: any, decoded: { id: any,userId:any }) => {
        if (err) {
          res.status(401).json({ message: "You failed to authenticate" });
        } else {
          req.userId = decoded.id || decoded.userId;
          // const user = await this.UserRepository.findOne({where:{id:decoded.id}})
          // console.log("sssss",user)
          next();
        }
      });
    }
   } 



}

@Injectable()
export class FakeValidateUserMiddleWare implements NestMiddleware {


   use(req: IGetUserAuthInfoRequest, res: Response , next : NextFunction) {
          req.userId = 24;
          next();
        }
    
    }




export const resfreshAuth = (refreshTok:any) => {
  const refreshToken = refreshTok.replace("Bearer ", "");
  let userId = jwt.verify(refreshToken, jwtRefreshSecret, (err: any, decoded: { id: any; }) => {
    if (err) {
      console.log("expire", err);
      return;
    } else {
      const id = decoded.id;
      return id;
    }
  });

  return userId;
};


