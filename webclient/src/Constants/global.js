
const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
const GETPUBLISHEDCONTEST = `${BASE_URL}/publishedcontest/getPublishedContest`;
const CONTESTPLAYCHECK = `${BASE_URL}/publishedcontest/contestplaycheck`;
const APPLYCONTEST = `${BASE_URL}/publishedcontest/applycontest`;
const DETAILVIEWCONTEST = `${BASE_URL}/publishedcontest/detailviewcontest`

export default {
    BASE_URL,
    CONTESTPLAYCHECK,
    GETPUBLISHEDCONTEST,
    APPLYCONTEST,
    DETAILVIEWCONTEST
}