import { IsEmail, IsNotEmpty, IsNumberString, MinLength } from "class-validator";

export class CreateAdsDto {
   
     @IsNotEmpty()
     adName:string;

     @IsNotEmpty()
     adDetails:string;
      
     @IsNotEmpty()
     adTime:string;

     @IsNotEmpty()
     adImage:string;

     @IsNotEmpty()
     winningAmount:number;
     
      @IsNotEmpty()
      publish:boolean;
      
      @IsNotEmpty()
      ageGroup:number[];
      
      @IsNotEmpty()
      location:string;

      @IsNotEmpty()
      state:string;

      @IsNotEmpty()
      gender:string;

      @IsNotEmpty()
      income:string;


}