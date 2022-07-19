import { IsEmail, IsNotEmpty, IsNumberString, MinLength } from "class-validator";

export class CreatePublishedContestDto {
   
     @IsNotEmpty()
     contestName:string;

     @IsNotEmpty()
     contestDetails:string;
      
     @IsNotEmpty()
     contestTime:string;

     @IsNotEmpty()
     EntryAmount:number;
     
     @IsNotEmpty()
     admincontestId:number;
}