import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, MinLength } from "class-validator";
import { QuestionTypes } from "src/typeorm/questions/questions";


export class CreateQuestionDto {


    @IsNotEmpty()
    question: string;

    @IsNotEmpty()
    @IsEnum(QuestionTypes)
    type:QuestionTypes ;
     
    @IsNotEmpty()
    options: string[];

    @IsNotEmpty()
    correctanswer: string;

    @IsNotEmpty()
    videolink: string;

    @IsNotEmpty()
    totalVideoTime: number;

    @IsNotEmpty()
    totalQuestionTime: number;

    @IsNotEmpty()
    contestId:number;


}