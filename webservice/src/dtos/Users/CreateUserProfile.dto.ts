import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, MinLength } from "class-validator";
import { RoleTypes } from "src/typeorm/Users/User";
import { GenderTypes } from "src/typeorm/Users/user_profile";

export class CreateUserProfileDto {
     


    dob: Date

     @IsEnum(GenderTypes)
     gender:GenderTypes;
     
     age:number;

     location:string;

     incomegroup: string

}