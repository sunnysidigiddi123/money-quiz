import { User } from "./Users/User";
import { Admincontest } from "./contests/Admincontest";
import { Publishedcontest } from "./contests/Publishedcontests";
import { Auditcontest } from "./contests/Auditcontest";
import { Question } from "./questions/questions";
import { Applieduser } from "./participants/appliedusers";
import { Liveuser } from "./contests/Liveusers";
import { Segment } from "./questions/segments";
import { Otp } from "./Users/forgetpassword/otp";
import { userInfo } from "os";
import { user_profile } from "./Users/user_profile";

const entities = [User,Admincontest,Publishedcontest,Auditcontest,Question,Applieduser,Liveuser,Segment,Otp,user_profile];


export {User,Admincontest,Publishedcontest,Auditcontest,Question,Applieduser,Liveuser,Segment,Otp,user_profile};

export default entities ;
