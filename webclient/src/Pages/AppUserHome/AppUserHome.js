import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";

import moment from "moment";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

//API URL
import CONSTANTS from '../../Constants/global'

//import common components
import AppHeader from "../../Components/AppHeader/AppHeader";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import SidenavBar from "../../Components/SidenavBar";
import BottomNav from "../../Components/BottomNav/BottomNav";
//import noQuizz from "../../../public/assets/images/no-quiz.webp"



export default function AppUserHome() {
    console.log('this is base url from global ', CONSTANTS.BASE_URL)
    const [contests, setContest] = useState([]);

    const getContest = async () => {
        const allContestUrl = CONSTANTS.GETPUBLISHEDCONTEST;
        const token = sessionStorage.getItem("token");
        axios.get(allContestUrl, {
            headers: {
                "authorization": token,
            },
        }).then((res) => {
            setContest([...res.data.contests]);
            // setAppliedContests([...res.data.appliedcontests]);
            //  setUser(res.data.user)
            //   setUserWallet(res.data.wallet) 


        });
    }
    useEffect(() => {
        getContest();

    }, []);

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return <div className="timer">Too lale...</div>;
        }

        return (
            <div className="timer">

                <div className="value">{remainingTime}</div>

            </div>
        );
    };
    return (
        <div>
            <AppHeader />
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
                    <section className="remaining-quiz">
                        <div className="row bg-lighter-gray py-5 b-radius-25">
                            <div className="col-3 col-xs-3">
                                <i className="fa fa-trophy fa-5x trophy" aria-hidden="true"></i>
                            </div>
                            <div className="col-9 col-xs-9">
                                <h3 className='fs-5 fw-normal text-center text-orange'> Remaining Quiz for the day</h3>
                                <p className='fs-2 text-center'>3 quizzes <i className="fas fa-arrow-right " aria-hidden="true"></i></p>
                            </div>
                        </div>
                    </section>
                    {/* next-quiz section starts */}
                    <section className="next-quiz">
                        <div className="row py-3">
                            <div className="col-sm-12 col-xs-12 ">

                                <div className='text-center py-3 section-head'>Next quiz starts in </div>
                                <div className="row">
                                    <div className="col-xs-12 clock_area countdown_timer d-flex justify-content-center text-center">
                                        <div className="position-relative">
                                            <img src="./assets/images/clock/clock.png" alt="timer_image" />
                                            <span class="countdown-wrapper text-white position-absolute">
                                                <CountdownCircleTimer
                                                    isPlaying
                                                    duration={60}
                                                    initialRemainingTime={30}
                                                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                                    colorsTime={[15, 10, 5, 0]}
                                                    onComplete={() => ({ shouldRepeat: true, delay: 1 })}
                                                >{renderTime}</CountdownCircleTimer></span>
                                        </div>
                                    </div>
                                </div>
                                <div className='row pt-2'>
                                    <div className="col-4 col-xs-4 col-sm-4">
                                        <img src="./assets/images/no-quiz.webp" alt="" />
                                    </div>
                                    <div className="col-8 col-xs-8 col-sm-8">
                                        <div className="no-quiz-text text-secondary fs-3 lh-lg pt-2 fw-500">
                                            <p className='mb-2 '>No Quiz registered. </p>
                                            <p className='mb-0 '>Click here to join.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>{/* next-quiz section Ends */}
                    {/* quiz today section starts */}
                    <section className="quiz-today">
                        <div className="row py-3">
                            <div className="col-sm-12 col-xs-12">
                                <p className='py-3 section-head'>Quizzes Today </p>
                            </div>
                        </div>
                        <div className="row">
                            {contests.map((res, index) => {
                                return (<>
                                    {/* card item starts */}
                                    <div className="col-xl-3  col-sm-3 col-xs-12 mb-30" key={index}>
                                        <div className="card-item-box height-100-p card-item">
                                            <div className="d-flex flex-wrap align-items-center">
                                                <div className="quiz-image"><div>
                                                    <img src="./assets/images/quiz-icon.jpg" />
                                                </div>
                                                </div>
                                                <div className="quiz-text">
                                                    <div className="h4 mb-0 pb-4">{moment(res.contestTime).format("h:mm")}</div>
                                                    <div className="">
                                                        <span className='text-gray d-inline-block pe-3 fs-4'>Prize</span>
                                                        <span className='text-yellow fs-5'>{`₹ ${res.EntryAmount}`} <i className='coin'></i></span>
                                                    </div>
                                                </div>
                                                <div className="quiz-arrow text-end">
                                                    <i className="fas fa-arrow-right"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>{/* card item Ends */}
                                </>
                                )
                            })}
                            {/* card item starts */}
                            {/* <div className="col-xl-3  col-sm-3 col-xs-12 mb-30">
                            <div className="card-item-box height-100-p card-item">
                                <div className="d-flex flex-wrap align-items-center">
                                    <div className="quiz-image"><div>
                                        <img src="./assets/images/quiz-icon.jpg" />
                                    </div>
                                    </div>
                                    <div className="quiz-text">
                                        <div className="h4 mb-0 pb-4">3:00 PM</div>
                                        <div className="">
                                            <span className='text-gray d-inline-block pe-3 fs-4'>Prize</span>
                                            <span className='text-yellow fs-5'>5000 <i className='coin'></i></span>
                                        </div>
                                    </div>
                                    <div className="quiz-arrow text-end">
                                    <i className="fas fa-arrow-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                            {/* card item Ends */}

                        </div>
                    </section> {/* quiz today section Ends */}
                    {/* pagination starts */}
                    <section>
                        <div className="row">
                            <div className="col-sm-12 d-flex justify-content-center">
                                <nav aria-label="Page navigation">
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
                                </nav>
                            </div>
                        </div>
                    </section>{/* pagination ends */}
                </div>
            </div>

            <BottomNav />
        </div>
    )
}

