import { React, useEffect, useState } from 'react'
import { Modal, Button, Form, Row, ModalFooter } from "react-bootstrap";
import { ImEnter} from "react-icons/im";
import './StatsModal.css'
import logo from '../logonews.png'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { BrowserRouter as Router, useNavigate, useLocation, useParams, Link } from "react-router-dom";


const StatsModalWrong = (props) => {
    const [fullscreen, setFullscreen] = useState(true);
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
                aria-labelledby="example-modal-sizes-title-lg">

                <Modal.Body>
                    <div className="sportsmagazine-main-wrapper">
                        <header id="sportsmagazine-header" className="sportsmagazine-header-one">

                            <div className="sportsmagazine-topstrip">
                                <div className="container">
                                    <div className="row">
                                        <aside className="col-md-4">
                                            <ul className="sportsmagazine-social-network">
                                                <li><a href="#">
                                                    <img src={logo} alt="image_not_found" className='roll-in-left' />
                                                </a></li>

                                            </ul>
                                        </aside>

                                    </div>
                                </div>
                            </div>


                        </header>

                        <div className="sportsmagazine-main-content">

                            <div className="sportsmagazine-main-section">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className=" sportsmagazine-match-result" id="wrongresult" >
                                                <div className="sportsmagazine-match-title">
                                                    <h4>Statistics </h4>
                                                    <span>Oh no! Incorrect answer</span>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <img src="extra-images/resultred1.png" className='heartbeat' alt="" />
                                                        <h4><a href="#">Initial Contestants</a></h4>
                                                        <span>21</span>
                                                    </li>
                                                    <li className="sportsmagazine-match-score">
                                                        <h5>Want To Re-enter </h5>
                                                        <p><strong className="sportsmagazine-color" style={{color:'red'}}>₹ {props.polldata[0]}</strong></p>
                                                    </li>
                                                    <li>
                                                        <img src="extra-images/resultred2.png" className='heartbeat' alt="" />
                                                        <h4><a href="#">Remaining Contestants</a></h4>
                                                        <span>{props.polldata[1]}</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="redtitle " ><h2>Advertisement</h2></div>

                                            <div className="row">
                                                <div className="col-md-6">

                                                </div>
                                                <div className="col-md-6">

                                                </div>
                                            </div>

                                            <figure className="sportsmagazine-add-banner">
                                                <img src="extra-images/add-thumb-1.jpg" alt="" />
                                                <span className="sportsmagazine-add-transparent"></span>
                                                <figcaption>
                                                    <div className="sportsmagazine-addbanner-caption">
                                                        <h2>Take a look at the brand New Uniforms for next season</h2>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Utac malesuada ante. Curabitur lacinia.</p>
                                                        <a href="#" className="sportsmagazine-banner-btn">Read More <span></span></a>
                                                    </div>
                                                </figcaption>
                                            </figure>

                                        </div>

                                        <aside className="col-md-4">

                                            <div className="widget widget_next_match">
                                                <div className="redtitle " ><h2>Next Round Starts In</h2></div>


                                                <div className="widget_match_countdown">
                                                    <h6>Countdown</h6>

                                                    <div id="sportsmagazine-countdown">

                                                        <CountdownCircleTimer
                                                            isPlaying
                                                            duration={30}
                                                            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                                            colorsTime={[7, 5, 2, 0]}

                                                            onComplete={() => {
                                                               if(!props.reentersuccess){
                                                                navigate('/userhome')
                                                               }
                                                               props.setReentersuccess(false)
                                                               
                                                            }}
                                                        >
                                                            {({ remainingTime }) => remainingTime}
                                                        </CountdownCircleTimer>


                                                    </div>
                                                </div>
                                              {!props.reentersuccess ?  <a onClick={()=>props.reenter()} className="widget_match_btn">Re-enter  <ImEnter /></a>:<a  className="widget_match_btn">Reentered  <ImEnter /></a>}

                                            </div>

                                            <div className="widget widget_team_ranking">
                                                <div className="sportsmagazine-fancy-title"><h2>Participants Rankings</h2></div>
                                                <div className="ranking-title-table">
                                                    <ul className="ranking-title-row">
                                                        <li>Player Rank</li>
                                                        <li>M</li>
                                                        <li>W</li>
                                                        <li>PTS</li>
                                                    </ul>
                                                </div>



                                                <div className="ranking-content-table">
                                                    <ul className="ranking-content-row">
                                                        <li>1</li>
                                                        <li> <img src="extra-images/ranking-widget-flag-4.png" alt="" /> <div className="ranking-logo"><span>Akhil Rawat</span> <small>akhil@gmail.com</small> </div> </li>
                                                        <li>07</li>
                                                        <li>06</li>
                                                        <li>12</li>
                                                    </ul>
                                                </div>
                                                <div className="ranking-content-table">
                                                    <ul className="ranking-content-row">
                                                        <li>2</li>
                                                        <li> <img src="extra-images/ranking-widget-flag-5.png" alt="" /> <div className="ranking-logo"><span>Test Rawat</span> <small>test@gmail.com</small> </div> </li>
                                                        <li>06</li>
                                                        <li>05</li>
                                                        <li>10</li>
                                                    </ul>
                                                </div>
                                                <div className="ranking-content-table">
                                                    <ul className="ranking-content-row">
                                                        <li>3</li>
                                                        <li> <img src="extra-images/ranking-widget-flag-6.png" alt="" /> <div className="ranking-logo"><span>Test2 Rawat</span> <small>test2@gmail.com</small> </div> </li>
                                                        <li>06</li>
                                                        <li>04</li>
                                                        <li>08</li>
                                                    </ul>
                                                </div>


                                            </div>

                                        </aside>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>


    
    
    </>
  )
}

export default StatsModalWrong