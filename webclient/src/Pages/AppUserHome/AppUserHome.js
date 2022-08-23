import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, useNavigate, Link } from "react-router-dom";

import moment from "moment";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import ReactPaginate from 'react-paginate';
import { STATS_DELAY_IN_SEC } from '../../config/config';

//API URL
import CONSTANTS from '../../Constants/global'

//import common components
import AppHeader from "../../Components/AppHeader/AppHeader";
import BottomNav from "../../Components/BottomNav/BottomNav";

import { ToastContainer, toast } from 'react-toastify';
//import noQuizz from "../../../public/assets/images/no-quiz.webp"




export default function AppUserHome() {
    //  console.log('this is base url from global ', CONSTANTS.BASE_URL)
    const [contests, setContest] = useState([]);
    const [appliedcontests, setAppliedContests] = useState([]);
    const [user, setUser] = useState("");
    const [wallet, setUserWallet] = useState();
    const [pagenumber, setPagenumber] = useState("1");//need to remove after getting data from API
    const [pagelimit, setPagelimit] = useState("3"); //need to remove after getting data from API
    const [totalrecCount, setTotalrecCount] = useState();//need to remove after getting data from API
    const [startsin, setStartsin] = useState();
    const [pageCount, setPageCount] = useState()

    const navigate = useNavigate();
    const calculateDifference = (contestTime) => {

        let contestDateTime = moment(contestTime)
        // console.log(contestDateTime)
        let currentdate = new Date()
        let currentTime = moment(currentdate).format("h:mm:ss")
        // console.log(currentdate)     
        let newdifference = contestDateTime - currentdate;
        console.log(newdifference)
        return Math.floor(newdifference / 1000)
    }
    // Handle Pagination click
    const handlePageClick = (item) => {
        let pageclicked = item.selected + 1;
        console.log('page clicked ', pageclicked)
        setPagenumber(pageclicked)
        getContest(pageclicked, pagelimit)

    }

    // get all contest data
    const getSingleContest = async () => {
        const allContestUrl = CONSTANTS.APPLIEDCONTESTLIST;
        const token = sessionStorage.getItem("token");
        const HEADERS = { "authorization": token, }
        try {
            await axios.get(allContestUrl, {
                headers: HEADERS,
            }).then((res) => {
                // console.log('from single for timer', res.data.contest);
                let response = res?.data?.contest;
                console.log('response is ',response);                
                const sortedres = response.sort(function (a, b) {
                    return moment.utc(a.contestTime).diff(moment.utc(b.contestTime))
                });
                console.log('soreted response is', sortedres);
                let contesttime = sortedres[0]?.contestTime;
                setStartsin(calculateDifference(contesttime));

            });
        } catch (error) {
            console.log('error is ', error.response)
            if (error && error.response) {
                toast.error(error.response.data.message);
                if (error.response.status === 401) {
                    navigate("/");
                }
            } else {
                toast.error('Something went wrong');
            }
        }
    }

    // get all contest data
    const getContest = async (number, limit) => {
        console.log('inside get contest1')
        const allContestUrl = `${CONSTANTS.GETPUBLISHEDCONTEST}?page=${number}&limit=${limit}`;
        const token = sessionStorage.getItem("token");
        const HEADERS = { "authorization": token, }
        try {
            axios.get(allContestUrl, {
                headers: HEADERS,
            }).then((res) => {
                console.log(res);
                let responseAll = res?.data?.contests;
                const sortedAll = responseAll.sort(function (a, b) {
                    return moment.utc(a.contestTime).diff(moment.utc(b.contestTime))
                });
                setContest([...sortedAll]);
                setAppliedContests([...res?.data?.appliedcontests]);
                setUser(res?.data?.user)
                setUserWallet(res?.data?.wallet);
                setTotalrecCount(res?.data?.count);
                setPagelimit(res?.data?.page_size);
                let totalcount = Math.ceil(totalrecCount / pagelimit);
                //setPageCount(totalcount);
            });
        } catch (error) {
            console.log(error.response)
            if (error && error.response) {
                console.log('error is ', error)
                toast.error(error.response.data.message);
                if (error.response.status === 401) {
                    navigate("/");
                }
            } else {
                toast.error('Something went wrong');
            }
        }
    }

    //Render will return template to display on clock timer
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return <div className="timer text-success">Live</div>;
        }

        return (
            <div className="timer">

                <div className="value fs-5">{remainingTime}</div>

            </div>
        );
    };
    // Get All COntest Data
    useEffect(() => {
        getContest(pagenumber, pagelimit);
    }, []);
    // get single record for timier
    useEffect(() => {
        getSingleContest();
    }, []);
    // update page count
    useEffect(() => {
        let totalcount = Math.ceil(totalrecCount / pagelimit);
        setPageCount(totalcount);
        console.log('totalrecCount use effr=ect called', totalrecCount)
    }, [totalrecCount]);
    // useEffect(() => {

    //     console.log('totalcount  is here', pageCount)
    // }, [pageCount]);

    //Navigate if user is not logged-in
    useEffect(() => {
        let status = localStorage.getItem("loginStatus");
        if (!status) {
            navigate("/");
        }
    }, []);

    return (
        <div>
            <AppHeader user={user} wallet={wallet} />
            <div className="page-container">
                <div className="container-fluid">
                    <section className='advertisement '>
                        <div className="row bg-light-orange pb-5">
                            <div className="col-sm-12 col-xs-12">
                                <div className="text-section py-3 text-white text-center">
                                    <h1>Answer Daily questions to Win Money</h1>
                                    <a href="#" className='go-advertisement p-2'><i className="fas fa-plus fa-3x" aria-hidden="true"></i></a>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <section className="remaining-quiz">
                        <div className="row bg-lighter-gray py-5 b-radius-25">
                            <div className="col-3 col-xs-3">
                                <i className="fa fa-trophy fa-5x trophy" aria-hidden="true"></i>
                            </div>
                            <div className="col-9 col-xs-9">
                                <h3 className='fs-5 fw-normal text-center text-orange'> Remaining Quiz</h3>
                                <p className='fs-2 text-center'>{contests.length} quizzes <i className="fas fa-arrow-right " aria-hidden="true"></i></p>
                            </div>
                        </div>
                    </section> */}
                    {/* next-quiz section starts */}
                    <section className="next-quiz">
                        <div className="row py-3">
                            <div className="col-sm-12 col-xs-12 ">

                                <div className='text-center py-3 section-head'>Next quiz starts in </div>
                                {appliedcontests.length > 0 ?

                                    <div className="row">

                                        <div className="col-xs-12 clock_area countdown_timer d-flex justify-content-center text-center" >
                                            <Link to={'/appliedcontest'}>
                                                <div className="position-relative" role="button">
                                                    <img src="./assets/images/clock/clock.png" alt="timer_image" />
                                                    <span className="countdown-wrapper text-white position-absolute">
                                                        <CountdownCircleTimer
                                                            isPlaying
                                                            duration={startsin}
                                                            initialRemainingTime={startsin}
                                                            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                                            colorsTime={[15, 10, 5, 0]}
                                                            onComplete={() => ({ shouldRepeat: false, delay: 0 })}
                                                            onUpdate={(remainingTime) => {
                                                                if (remainingTime == 5) {
                                                                    getSingleContest();
                                                                }
                                                            }}

                                                        >
                                                            {renderTime}</CountdownCircleTimer>
                                                    </span>
                                                </div></Link>
                                        </div>

                                    </div>
                                    :
                                    <div className='row pt-2'>
                                        <div className="col-4 col-xs-4 col-sm-4">
                                            <img src="./assets/images/no-quiz.webp" alt="" />
                                        </div>
                                        <div className="col-8 col-xs-8 col-sm-8">
                                            <div className="no-quiz-text text-secondary fs-3 lh-lg pt-2 fw-500">
                                                <p className='mb-2 '>No Quiz registered. </p>
                                                <p className='mb-0 '>Please register to play.</p>
                                            </div>
                                        </div>
                                    </div>
                                }


                            </div>
                        </div>
                    </section>{/* next-quiz section Ends */}
                    {/* quiz today section starts */}
                    <section className="quiz-today">
                        <div className="row py-3">
                            <div className="col-sm-12 col-xs-12">
                                <p className='py-3 section-head'>Quizzes </p>
                            </div>
                        </div>
                        {
                            contests.length > 0 
                            ?
                            <div className="row">
                            {contests.map((res, index) => {
                                return (<>
                                    {/* card item starts */}
                                    <div className="col-xl-3  col-sm-12 col-xs-12 mb-30" key={index}>
                                        <Link to="/singleQuizdetail" state={{ contestName: res.contestName, EntryAmount: res.EntryAmount, contestTime: res.contestTime, contestid: res.id }} >
                                            <div className="card-item-box height-100-p card-item" >
                                                <div className="d-flex flex-wrap align-items-center">
                                                    <div className="quiz-image"><div>
                                                        <img src="./assets/images/quiz-icon.jpg" />
                                                    </div>
                                                    </div>
                                                    <div className="quiz-text">
                                                        <div className="h6 mb-0 pb-1">{res?.contestName}</div>
                                                        <div className="fs-6 mb-0 pb-1">Time:{moment(res.contestTime).format("h:mm")}</div>
                                                        <div className="">
                                                            <span className='text-gray d-inline-block pe-3 fs-4'>Prize</span>
                                                            <span className='text-yellow fs-5'>{`₹ ${res.EntryAmount}`} <i className='coin'></i></span>
                                                        </div>
                                                    </div>
                                                    <div className="quiz-arrow text-end">
                                                        {
                                                            (calculateDifference(res.contestTime) > 0)
                                                                ? ""
                                                                : <button className='btn btn-sm btn-success btn-live'>Live</button>
                                                        }

                                                        <i className="fas fa-arrow-right"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>

                                    </div>{/* card item Ends */}
                                </>
                                )
                            })}
                        </div> 
                            :
                            <div className="row">
                                <div className="col-sm-12 text-center no-quiz">
                                    <h1>No Quiz !!</h1>
                                    <img src="./assets/images/no-quiz.png" alt="" />
                                </div>
                            </div>
                        }
                        
                    </section> {/* quiz today section Ends */}
                    {/* pagination starts */}
                    <section>
                        <div className="row">
                            <div className="col-sm-12 d-flex justify-content-center">
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="next >"
                                    previousLabel="< previous"
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={3}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination pagination-sm'}
                                    pageClassName={'page-item'}
                                    pageLinkClassName={'page-link'}
                                    previousClassName={'page-item'}
                                    previousLinkClassName={'page-link'}
                                    nextClassName={'page-item'}
                                    nextLinkClassName={'page-link'}
                                    breakClassName={'page-item'}
                                    breakLinkClassName={'page-link'}
                                    activeClassName={'active'}
                                    renderOnZeroPageCount={null}
                                />
                                {/* <nav aria-label="Page navigation">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                            </a>
                                        </li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav> */}
                            </div>
                        </div>
                    </section>{/* pagination ends */}
                </div>
            </div>

            <BottomNav />
            <ToastContainer autoClose={3000} />
        </div>
    )
}

