import { User } from "./Users/User";
import { Admincontest } from "./contests/Admincontest";
import { Publishedcontest } from "./contests/Publishedcontests";
import { Auditcontest } from "./contests/Auditcontest";
import { Question } from "./questions/questions";
import { Applieduser } from "./participants/appliedusers";
import { Liveuser } from "./contests/Liveusers";
import { Segment } from "./questions/segments";
import { Otp } from "./Users/forgetpassword/otp";
import { Ads } from "./ads/Ads";
import { Ads_target } from "./ads/Ads_target";
import { Ads_question } from "./ads/Ads_question";
import { Ads_played_users } from "./ads/Ads_played_users";
import { userInfo } from "os";
import { user_profile } from "./Users/user_profile";
import { profile_address } from "./Users/profile_address";

const entities = [User,Admincontest,Publishedcontest,Auditcontest,Question,Applieduser,Liveuser,Segment,Otp,user_profile, Ads,Ads_target,Ads_question,Ads_played_users,profile_address];

export {User,Admincontest,Publishedcontest,Auditcontest,Question,Applieduser,Liveuser,Segment,Otp,user_profile,Ads,Ads_target,Ads_question,Ads_played_users,profile_address};

export default entities ;
