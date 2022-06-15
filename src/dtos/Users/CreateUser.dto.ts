import { IsEmail, IsNotEmpty, IsNumberString, MinLength } from "class-validator";

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
     role:string;

     @IsNotEmpty()
     Wallet:number;

}