import { Type } from "class-transformer";
import { isDate, IsDate, IsDateString, IsEmail, IsEnum, IsISO8601, IsNotEmpty, IsNumberString, MinLength } from "class-validator";
import { RoleTypes } from "src/typeorm/Users/User";
import { AgeGroupTypes, GenderTypes, IncomeTypes } from "src/utils/enums";


export class CreateUserProfileDto {
     

   
     dob: Date

     // @IsEnum(GenderTypes)
     gender:string;
     
     // @IsEnum(AgeGroupTypes)
     ageGroup: string;

     location:string;

     // @IsEnum(IncomeTypes)
     incomegroup: string

}