
const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
const GETPUBLISHEDCONTEST = `${BASE_URL}/publishedcontest/getPublishedContest`;
const CONTESTPLAYCHECK = `${BASE_URL}/publishedcontest/contestplaycheck`;
const APPLYCONTEST = `${BASE_URL}/publishedcontest/applycontest`;
const DETAILVIEWCONTEST = `${BASE_URL}/publishedcontest/detailviewcontest`;
const APPLIEDCONTESTLIST = `${BASE_URL}/publishedcontest/appliedcontests`;
const PAYNEWPOLLAMOUNT = `${BASE_URL}/publishedcontest/paynewpollamount`;
const FORGOTPASS = `${BASE_URL}/users/forgotPassword`;
const USERLOGIN = `${BASE_URL}/users/login`;
const USERSIGNUP = `${BASE_URL}/users/signup`;
const GETUSER = `${BASE_URL}/users`;
const  GETUSERPROFILE= `${BASE_URL}/users/profileinfo`;
const UPDATEPROFILE = `${BASE_URL}/users/update-profile`;
const GETADLIST = `${BASE_URL}/ads/getAds`;
const GETADBYID = `${BASE_URL}/ads`;
const ADSANSWERCHECK = `${BASE_URL}/ads/answerCheck`;
const GETPINDETAILS = `${BASE_URL}/users/getpincodedata`;
const GETENUMVALUES = `${BASE_URL}/users/getenumvalues`

export default {
    BASE_URL,
    CONTESTPLAYCHECK,
    GETPUBLISHEDCONTEST,
    APPLYCONTEST,
    DETAILVIEWCONTEST,
    APPLIEDCONTESTLIST,
    PAYNEWPOLLAMOUNT,
    GETADLIST,
    GETADBYID,
    ADSANSWERCHECK,
    FORGOTPASS,
    USERLOGIN,
    USERSIGNUP,
    GETUSER,
    GETUSERPROFILE,
    UPDATEPROFILE,
    GETPINDETAILS,
    GETENUMVALUES
}