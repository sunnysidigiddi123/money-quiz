import { Exclude } from "class-transformer";
import { QuestionTypes } from "src/typeorm/questions/questions";
import { RoleTypes } from "src/typeorm/Users/User";




export class Serializeduser {
    id:number;
    email:string;
    name:string;
    role:RoleTypes;
    Wallet:number

    @Exclude()  //for restrict it to send in client side 
    password:string
   
    constructor(partial: Partial<Serializeduser>){
        Object.assign(this, partial);
    }
}

export class Serializedquestion {

    question: string;
    type: QuestionTypes;
    options: string[];
    videolink: string;
    totalVideoTime: number;
    totalQuestionTime: number;

    @Exclude()  //for restrict it to send in client side 
    correctanswer: string;
   
    constructor(partial: Partial<Serializedquestion>){
        Object.assign(this, partial);
    }
}