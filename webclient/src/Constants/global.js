
const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
const GETPUBLISHEDCONTEST = `${BASE_URL}/publishedcontest/getPublishedContest`;
const CONTESTPLAYCHECK = `${BASE_URL}/publishedcontest/contestplaycheck`;
const APPLYCONTEST = `${BASE_URL}/publishedcontest/applycontest`;
const DETAILVIEWCONTEST = `${BASE_URL}/publishedcontest/detailviewcontest`;
const APPLIEDCONTESTLIST = `${BASE_URL}/publishedcontest/appliedcontests`;


export default {
    BASE_URL,
    CONTESTPLAYCHECK,
    GETPUBLISHEDCONTEST,
    APPLYCONTEST,
    DETAILVIEWCONTEST,
    APPLIEDCONTESTLIST
}