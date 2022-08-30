import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, useNavigate, Link } from "react-router-dom";


import AppHeader from "../AppHeader/AppHeader";
import BottomNav from "../BottomNav/BottomNav";
//API URL
import CONSTANTS from '../../Constants/global'
import { ToastContainer, toast } from 'react-toastify';
import moment from "moment";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

export default function AppliedContestList() {
    const [appliedcontests, setAppliedContests] = useState([]);

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

    const getAppliedQuizList = async () => {
        const appliedContest_URL = CONSTANTS.APPLIEDCONTESTLIST;
        const token = sessionStorage.getItem("token");
        const HEADERS = { "authorization": token, }
        try {
            await axios.get(appliedContest_URL, {
                headers: HEADERS,
            }).then((res) => {
                //console.log('response is ',response)
                setAppliedContests([...res?.data?.contest]);
                console.log('appliedcontests list is ', appliedcontests)

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


    useEffect(() => {
        getAppliedQuizList();
    }, []);

    useEffect(() => {
        console.log('appliedcontests in use effec are ', appliedcontests)
    }, [appliedcontests]);

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return <div className="timer text-dark-orange">Live</div>;
        }

        return (
            <div className="timer">

                <div className="value fs-6 text-blue">{remainingTime}</div>

            </div>
        );
    };
    return (
        <div>
            <AppHeader />
            <div className="inner-page-container">
                <div className="container-fluid">
                    {/* inner-page-top starts */}
                    <section className="inner-page-top">
                        <div className="row bg-dark-orange pb-1">
                            <div className="col-xs-12 bg-white border-bottom-left-round">
                                <div className="d-flex justify-content-between py-3">
                                    <h1 className='inner-page-heading ps-3'>Applied Quizzes</h1>
                                </div>
                            </div>
                        </div>
                    </section>{/* inner-page-top Ends */}
                    {appliedcontests.map((item, index) => {

                        return (
                            <>
                                <section>

                                    <div className="row py-5  bg-dark-orange">
                                        <div className="col-xs-12 col-sm-12 col-md-12">
                                            <div className="card-parent-gray">
                                                <div className="single-q-fee-box  py-4 d-flex justify-content-center">
                                                    <div className="card entry-fee-card small my-2">
                                                        <div className="card-header bg-yellow-orange text-black">
                                                            ENTRY FEE
                                                        </div>
                                                        <div className="card-body bg-dark-gray">
                                                            <div className="card-text"><div className='text-white text-center fs-1'><i className="big coin pe-5"></i>  {item.EntryAmount}</div></div>
                                                            <div className="entry-card-footer d-flex justify-content-around">
                                                                <div className='quiz-prize text-white'> {item.totalwinningamount} <i class="small coin ps-1"></i></div>
                                                                <div className='quiz-user text-white'>{item.liveplayers} <i class="fas fa-users text-white"></i> </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row bg-white py-3">
                                        <div className="col-xs-12">
                                            <div className="card-quiz-detail d-flex justify-content-between">
                                                <Link to="/singleQuizdetail" state={{ contestName: item.contestName, EntryAmount: item.EntryAmount, contestTime: item.contestTime, contestid: item.id }} >
                                                    <div className='add-circle bg-dark-orange' role="button"><i className="fas fa-plus fa-2x text-white" aria-hidden="true"></i></div>
                                                </Link>

                                                <div className='quiz-name-small pt-1'>{item.contestName}</div>
                                                <div className='start-in-time'>Starts in</div>
                                                <div className='quizTimer position-relative'>
                                                    <span className="countdown-wrapper text-white position-absolute">
                                                        <CountdownCircleTimer
                                                            isPlaying
                                                            duration={calculateDifference(item.contestTime)}
                                                            initialRemainingTime={calculateDifference(item.contestTime)}
                                                            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                                            colorsTime={[15, 10, 5, 0]}
                                                            size={70}
                                                            strokeWidth={5}
                                                            onComplete={() => ({ shouldRepeat: false, delay: 0 })}

                                                            onUpdate={(remainingTime) => {
                                                                if (remainingTime == 0) {

                                                                }
                                                            }}
                                                        >
                                                            {renderTime}</CountdownCircleTimer>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </>
                        )
                    })}

                    {/* single Entry fee card starts */}
                    {/* <section className="single-quiz-entry-fee">
                    <div className="row bg-dark-orange">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                           <div className="card-parent-gray">
                                <div className="single-q-fee-box  py-4 d-flex justify-content-center">                                
                                    <div className="card entry-fee-card small my-2">
                                        <div className="card-header bg-yellow-orange text-black">
                                            ENTRY FEE
                                        </div>
                                        <div className="card-body bg-dark-gray">
                                            <div className="card-text"><div className='text-white text-center fs-1'><i className="big coin pe-5"></i>  100</div></div>
                                            <div className="entry-card-footer d-flex justify-content-around">
                                            <div className='quiz-prize text-white'> 56000 <i class="small coin ps-1"></i></div>
                                            <div className='quiz-user text-white'>516 <i class="fas fa-users text-white"></i> </div>

                                        </div>
                                        </div>
                                    </div>
                                </div>
                           </div>
                        </div>
                    </div>
                    <div className="row bg-white py-3">
                        <div className="col-xs-12">
                        <div className="card-quiz-detail d-flex justify-content-between">
                            <div className='add-circle bg-dark-orange'><i className="fas fa-plus fa-2x text-white" aria-hidden="true"></i></div>
                            <div className='quiz-name-small pt-1'>Quiz 1</div>
                            <div className='start-in-time'>Starts in 03.45 seconds</div>
                            </div>
                        </div>
                    </div>
                </section> */}
                    {/* single Entry fee card Ends */}
                    {/* single Entry fee card starts */}
                    {/* <section className="single-quiz-entry-fee">
                    <div className="row bg-dark-orange">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                           <div className="card-parent-gray">
                                <div className="single-q-fee-box  py-3 d-flex justify-content-center">                                
                                    <div className="card entry-fee-card small my-2">
                                        <div className="card-header bg-yellow-orange text-black">
                                            ENTRY FEE
                                        </div>
                                        <div className="card-body bg-dark-gray">
                                            <div className="card-text"><div className='text-white text-center fs-1'><i className="big coin pe-5"></i>  100</div></div>
                                            <div className="entry-card-footer d-flex justify-content-around">
                                            <div className='quiz-prize text-white'> 56000 <i class="small coin ps-1"></i></div>
                                            <div className='quiz-user  text-white'>516 <i class="fas fa-users text-white"></i> </div>

                                        </div>
                                        </div>
                                    </div>
                                </div>
                           </div>
                        </div>
                    </div>
                    <div className="row bg-white py-3">
                        <div className="col-xs-12">
                        <div className="card-quiz-detail d-flex justify-content-between">
                            <div className='add-circle bg-dark-orange'><i className="fas fa-plus fa-2x text-white" aria-hidden="true"></i></div>
                            <div className='quiz-name-small pt-1'>Quiz 1</div>
                            <div className='start-in-time'>Starts in 03.45 seconds</div>
                            </div>
                        </div>
                    </div>
                </section>  */}
                    {/* single Entry fee card Ends */}


                </div>
            </div>
            <BottomNav />
            <ToastContainer autoClose={3000} />
        </div>
    )
}
