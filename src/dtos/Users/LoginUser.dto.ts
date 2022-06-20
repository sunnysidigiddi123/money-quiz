import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, MinLength } from "class-validator";


export class LoginUserDto {
     

     @IsEmail()
     @IsNotEmpty()
     email:string;
      
     @IsNotEmpty()
     password:string;


}