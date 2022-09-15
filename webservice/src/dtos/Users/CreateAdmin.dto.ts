import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, MinLength } from "class-validator";
import { RoleTypes } from "src/typeorm/Users/User";

export class CreateAdminDto {
     

     @IsEmail()
     @IsNotEmpty()
     email:string;

     @IsNotEmpty()
     @MinLength(3)
     name:string;
      
     @IsNotEmpty()
     password:string;

     

}