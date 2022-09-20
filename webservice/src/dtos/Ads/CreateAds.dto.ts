import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, MinLength } from "class-validator";
import { GenderTypes, IncomeTypes } from "src/typeorm/ads/Ads_target";

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
      
    
      ageGroup:number[];
      
      @IsNotEmpty()
      location:string;

      @IsNotEmpty()
      state:string;

      @IsEnum(GenderTypes)
      gender:GenderTypes;

      @IsEnum(IncomeTypes)
      income: IncomeTypes

      @IsNotEmpty()
      pin:number;

      @IsNotEmpty()
      district:string;

      @IsNotEmpty()
      country:string;




}