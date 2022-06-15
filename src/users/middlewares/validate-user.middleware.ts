import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
export interface IGetUserAuthInfoRequest extends Request {
    userId: string // or any other type
  }

@Injectable()
export class ValidateUserMiddleWare implements NestMiddleware {

   use(req: IGetUserAuthInfoRequest, res: Response , next : NextFunction) {
       console.log("hello validated",req.userId)
       next();

   } 
}