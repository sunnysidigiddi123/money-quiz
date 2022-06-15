import { IsEmail, IsNotEmpty, IsNumberString, MinLength } from "class-validator";


export class CreateQuestionDto {


    @IsNotEmpty()
    question: string;

    @IsNotEmpty()
    type: string;
     
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




}