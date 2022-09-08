import { React, useEffect, useState } from 'react'
import { Modal, Button, Form, Row, ModalFooter } from "react-bootstrap";
import { IoCashSharp } from "react-icons/io5";
import logo from '../logonews.png'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { STATS_DELAY_IN_SEC } from '../../../config/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
//import common components
import AppHeader from "../../../Components/AppHeader/AppHeader";
import BottomNav from "../../../Components/BottomNav/BottomNav";

export default function CorrectAnswer(props) {
    const [fullscreen, setFullscreen] = useState(true);
    const [cashOutConfirmation, setCashOutConfirmation] = useState(false)
    console.log("sssss",props.totalquestions , sessionStorage.getItem("questionIndex"))

    const creditWinningAmount = async (e) => {
        const BASE_URL = `${process.env.REACT_APP_BASE_URL}/broadcast/creditwinningamount`;
        const token = sessionStorage.getItem("token");
        let sendData = {
            contestId: props.contestid
        };
        try {
            let post = await axios.post(BASE_URL, sendData, {
                headers: {
                    "authorization": token,
                },
            });
            toast.success(post.data.message)
        } catch (e) {
            console.log("Oops! Something Went Wrong")
        }
    }


    return (

        <>
            <Modal
               size="md"
               show={props.lgShow}
               fullscreen={fullscreen}
               onHide={() => props.setLgShow(false)}
               backdrop="static"
               keyboard={false}
               aria-labelledby="example-modal-sizes-title-lg"
           
            >

                <Modal.Body className='bg-lighter-gray p-0'>
                    <div className="container-fluid stats">
                        {/* inner-page-top starts */}
                        <section className="inner-page-top ">
                            <div className="row bg-white border-bottom-left-round pb-1">
                                <div className="col-xs-12">
                                    <div className="d-flex justify-content-between py-4 ">
                                        <h1 className='inner-page-heading'>Statistics</h1>
                                       current quest id:  {props.currentQuesId}
                                        <div className="start-in-time position-relative pb-5">
                                            <span className="countdown-wrapper position-absolute">
                                                <div className="">
                                                    {props.totalquestions != sessionStorage.getItem('questionIndex')
                                                        ? <>
                                                           
                                                            <div className="widget_match_countdown">
                                                                <span className='timer-help-text'>Next Round Starts In</span>
                                                                <div id="">
                                                                    <CountdownCircleTimer
                                                                        isPlaying
                                                                        duration={STATS_DELAY_IN_SEC}
                                                                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                                                        colorsTime={[7, 5, 2, 0]}
                                                                        size={60}
                                                                        strokeWidth={5}
                                                                        onComplete={() => {
                                                                        }}
                                                                    >
                                                                        {({ remainingTime }) => remainingTime}
                                                                    </CountdownCircleTimer>
                                                                </div>
                                                            </div></>
                                                        : <>
                                                            {/* <h5>Result Viewing Time</h5> */}
                                                            <div className="">
                                                                <span className='timer-help-text'>Countdown</span>
                                                                <CountdownCircleTimer
                                                                    isPlaying
                                                                    duration={STATS_DELAY_IN_SEC}
                                                                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                                                    colorsTime={[7, 5, 2, 0]}
                                                                    size={60}
                                                                    strokeWidth={5}
                                                                    onUpdate={(remainingTime) => {
                                                                        if (remainingTime == 10) {
                                                                            creditWinningAmount();
                                                                        }
                                                                    }}
                                                                >
                                                                    {({ remainingTime }) => remainingTime}
                                                                </CountdownCircleTimer>
                                                            </div>
                                                        </>}
                                                    
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>{/* inner-page-top Ends */}
                        <section className="mt-3">
                            <div className="row pe-4">
                                <div className="col-sm-12 bg-white game-info-card py-5">
                                    <div className='py-5'>                                        
                                        <h2 className='stats-num-text'>Congrats! </h2>
                                        <span className='fw-bold'>You gave correct answer.</span>
                                    </div>
                                    <div className="row py-3">
                                       
                                    </div>
                                    <div className="row py-2 ">
                                        <p>Stats Chart will goes here.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                        {!cashOutConfirmation 
                        ?<>
                            <section className="mt-3">
                            <div className="row pe-4">
                                <div className="col-sm-12 bg-white game-info-card py-3">
                                    <div className='py-2'>
                                        <span className='fw-bold'>Initial Contestent</span>
                                        <h2 className='stats-num-text'>{props.initalusers} <span className='user-info-item d-inline-block'><i className="fas fa-user text-dark-orange"></i></span></h2>
                                    </div>
                                    <div className="row">
                                        <div className="py-3 bg-badge">
                                            <span className='fw-bold'>Remaining Contestent</span>
                                            <h2 className='stats-num-text'>
                                                {props.polldata[1]} 
                                                <span className='user-info-item d-inline-block'><i className="fas fa-user text-dark-orange"></i></span></h2>
                                        </div>
                                    </div>
                                    <div className="row py-2 ">
                                        <span className='fw-bold'>Your Total Earning</span>
                                        <div className='py-2 d-flex justify-content-between'>
                                            <div>
                                                <h2 className='stats-num-text'>
                                                    {props.polldata[0]} 
                                                    <span className='user-info-item  d-inline-block'><i className="fas fa-star"></i></span></h2>
                                            </div>
                                            <div>
                                            { props.totalquestions != sessionStorage.getItem('questionIndex') &&  <a onClick={() => setCashOutConfirmation(true)} className="btn btn-sm btn-green text-white py-2">Cashout  <IoCashSharp /></a>}
                                                {/* <button className='btn btn-sm btn-green text-white py-2'>Re-enter</button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        </> 
                        :<>
                        <section className='reEnter-confirm'>
                                    <div className="row bg-white py-5 mt-3">
                                        <div className="col-sm-12">
                                            <div className="info-text text-center">
                                                <h1 className='fw-bold '>Cashout?</h1>
                                                <p className='fw-bold text-gray'>You won't be able to participate in the following quiz if you cash out. Are you sure?</p>
                                            </div>
                                        </div>
                                        <div className='col0sm-12 px-0'>
                                            <div className="button-section">
                                                <button className="btn btn-block btn-confirmation text-uppercase" onClick={() =>props.cashout(props.currentQuesId)}>Yes</button>
                                                <button className="btn btn-block btn-confirmation text-uppercase" onClick={() => setCashOutConfirmation(false)}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </section></>
                        }
                        
                       
                       
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
