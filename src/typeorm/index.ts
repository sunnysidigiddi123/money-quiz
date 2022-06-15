import { User } from "./Users/User";
import { Savedcontest } from "./contests/Savedcontest";
import { Livecontest } from "./contests/Livecontests";
import { Auditcontest } from "./contests/Auditcontest";
import { Question } from "./questions/questions";
import { Applieduser } from "./participants/appliedusers";

const entities = [User,Savedcontest,Livecontest,Auditcontest,Question,Applieduser];


export {User,Savedcontest,Livecontest,Auditcontest,Question,Applieduser};

export default entities ;
