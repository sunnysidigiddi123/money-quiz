import { User } from "./Users/User";
import { Admincontest } from "./contests/Admincontest";
import { Publishedcontest } from "./contests/Publishedcontests";
import { Auditcontest } from "./contests/Auditcontest";
import { Question } from "./questions/questions";
import { Applieduser } from "./participants/appliedusers";
import { Liveuser } from "./contests/Liveusers";
import { Segment } from "./questions/segments";
import { Otp } from "./Users/forgetpassword/otp";

const entities = [User,Admincontest,Publishedcontest,Auditcontest,Question,Applieduser,Liveuser,Segment,Otp];


export {User,Admincontest,Publishedcontest,Auditcontest,Question,Applieduser,Liveuser,Segment,Otp};

export default entities ;
