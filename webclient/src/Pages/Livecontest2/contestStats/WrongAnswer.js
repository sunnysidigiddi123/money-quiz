import { React, useEffect, useState } from 'react'
import { Modal, Button, Form, Row, ModalFooter } from "react-bootstrap";
import { ImEnter } from "react-icons/im";

import logo from '../logonews.png'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { BrowserRouter as Router, useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { STATS_DELAY_IN_SEC } from '../../../config/config';
//import common components
import AppHeader from "../../../Components/AppHeader/AppHeader";
import BottomNav from "../../../Components/BottomNav/BottomNav";

export default function WrongAnswer(props) {
    const [fullscreen, setFullscreen] = useState(true);
    // const [showConfirmation, setShowConfirmation] = useState(false)
    const navigate = useNavigate();
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
                                                                            if (!props.reentersuccess) {
                                                                                navigate('/appuserhome')
                                                                            }
                                                                            props.setReentersuccess(false)
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
                                                                    onComplete={() => {
                                                                        if (!props.reentersuccess) {
                                                                            console.log("reenter is false here")
                                                                            navigate('/appuserhome')
                                                                        }
                                                                        props.setReentersuccess(false)

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
                                        <h2 className='stats-num-text'>Oh No! </h2>
                                        <span className='fw-bold'>Incorrect Answer</span>
                                    </div>
                                    <div className="row py-3">
                                    </div>
                                    <div className="row py-2 ">
                                        <p>Stats Chart will goes here.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {!props.showConfirmation
                            ? <>
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
                                                {props.totalquestions != sessionStorage.getItem('questionIndex') ? <span className='fw-bold'>Do you want to re-enter</span> : <span className='fw-bold'>Contest Winning Amount</span>}

                                                <div className='py-2 d-flex justify-content-between'>
                                                    <div>
                                                        <h2 className='stats-num-text'>₹
                                                            {props.polldata[0]}
                                                            <span className='user-info-item  d-inline-block'><i className="fas fa-star"></i></span></h2>
                                                    </div>
                                                    <div>
                                                        {props.totalquestions != sessionStorage.getItem('questionIndex') && (!props.reentersuccess ? <a onClick={() => props.setShowConfirmation(true)} className="btn btn-sm btn-green text-white py-2">Re-enter  <ImEnter /></a> : <a className="btn btn-sm btn-green text-white py-2">Reentered  <ImEnter /></a>)}
                                                        {/* <button className='btn btn-sm btn-green text-white py-2'>Re-enter</button> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="exit mt-3 text-center">
                                            {/* <button className='btn btn-sm btn-orange px-4' onClick={() => navigate('/appuserhome')}>Exit</button> */}
                                        </div>
                                    </div>
                                </section>
                            </> :
                            <>
                                <section className='reEnter-confirm'>
                                    <div className="row bg-white py-5 mt-3">
                                        <div className="col-sm-12">
                                            <div className="info-text text-center">
                                                <h1>Are you sure?</h1>
                                                <p className='fw-bold text-gray'>G coins will be deducted from your Wallet to re-enter the quiz for next quwstion.</p>
                                            </div>
                                        </div>
                                        <div className='col0sm-12 px-0'>
                                            <div className="button-section">
                                                <button className="btn btn-block btn-confirmation text-uppercase" onClick={() => props.reenter()}>Yes</button>
                                                <button className="btn btn-block btn-confirmation text-uppercase" onClick={() => props.setShowConfirmation(false)}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </>
                        }

                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
