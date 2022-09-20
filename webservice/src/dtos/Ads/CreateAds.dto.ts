import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, MinLength } from "class-validator";
import { AgeGroupTypes, GenderTypes, IncomeTypes } from "src/utils/enums";


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

      @IsEnum(AgeGroupTypes)
      ageGroup: AgeGroupTypes;
      
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