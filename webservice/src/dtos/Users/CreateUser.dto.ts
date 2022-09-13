import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, MinLength } from "class-validator";
import { RoleTypes } from "src/typeorm/Users/User";

export class CreateUserDto {
     

     @IsEmail()
     @IsNotEmpty()
     email:string;

     @IsNotEmpty()
     @MinLength(3)
     name:string;
      
     @IsNotEmpty()
     password:string;

     @IsNotEmpty()
     @IsEnum(RoleTypes)
     role:RoleTypes;

     @IsNotEmpty()
     Wallet:number;

     

}