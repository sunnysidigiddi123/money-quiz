import { Type } from "class-transformer";
import { isDate, IsDate, IsDateString, IsEmail, IsEnum, IsISO8601, IsNotEmpty, IsNumberString, MinLength } from "class-validator";
import { IncomeTypes } from "src/typeorm/ads/Ads_target";
import { RoleTypes } from "src/typeorm/Users/User";
import { GenderTypes } from "src/typeorm/Users/user_profile";

export class CreateUserProfileDto {
     

   
     dob: Date

     @IsEnum(GenderTypes)
     gender:GenderTypes;
     
     age:number;

     location:string;

     @IsEnum(IncomeTypes)
     incomegroup: IncomeTypes

}