import { User } from "./Users/User";
import { Admincontest } from "./contests/Admincontest";
import { Publishedcontest } from "./contests/Publishedcontests";
import { Auditcontest } from "./contests/Auditcontest";
import { Question } from "./questions/questions";
import { Applieduser } from "./participants/appliedusers";
import { Liveuser } from "./contests/Liveusers";

const entities = [User,Admincontest,Publishedcontest,Auditcontest,Question,Applieduser,Liveuser];


export {User,Admincontest,Publishedcontest,Auditcontest,Question,Applieduser,Liveuser};

export default entities ;
