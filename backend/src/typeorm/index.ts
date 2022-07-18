import { User } from "./Users/User";
import { Admincontest } from "./contests/Admincontest";
import { Publishedcontest } from "./contests/Publishedcontests";
import { Auditcontest } from "./contests/Auditcontest";
import { Question } from "./questions/questions";
import { Applieduser } from "./participants/appliedusers";
import { Liveuser } from "./contests/Liveusers";
import { Segment } from "./questions/segments";

const entities = [User,Admincontest,Publishedcontest,Auditcontest,Question,Applieduser,Liveuser,Segment];


export {User,Admincontest,Publishedcontest,Auditcontest,Question,Applieduser,Liveuser,Segment};

export default entities ;
