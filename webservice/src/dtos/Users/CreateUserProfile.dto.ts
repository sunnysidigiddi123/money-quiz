import { Type } from "class-transformer";
import { isDate, IsDate, IsDateString, IsEmail, IsEnum, IsISO8601, IsNotEmpty, IsNumberString, MinLength } from "class-validator";
import { RoleTypes } from "src/typeorm/Users/User";
import { GenderTypes } from "src/typeorm/Users/user_profile";

export class CreateUserProfileDto {
     

    @IsISO8601({ strict: true })
     dob: Date

     @IsEnum(GenderTypes)
     gender:GenderTypes;
     
     age:number;

     location:string;

     incomegroup: string

}