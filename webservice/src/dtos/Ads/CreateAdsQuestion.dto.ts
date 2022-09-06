import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, MinLength } from "class-validator";
import { QuestionTypes } from "src/typeorm/ads/Ads_question";


export class CreateAdsQuestionDto {


    @IsNotEmpty()
    question: string;

    @IsNotEmpty()
    @IsEnum(QuestionTypes)
    type:QuestionTypes ;
     
    @IsNotEmpty()
    options: string[];

    @IsNotEmpty()
    correctanswer: string;
    
    videolink: string;

    imagepath: string;

    totalVideoTime: number;

    @IsNotEmpty()
    totalQuestionTime: number;

    @IsNotEmpty()
    adsId:number;

  
}