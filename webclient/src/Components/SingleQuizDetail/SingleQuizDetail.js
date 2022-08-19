import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

//from lib
import { ToastContainer, toast } from 'react-toastify';
import moment from "moment";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Modal, Button, Form, Row, ModalFooter } from "react-bootstrap";


//App components
import AppHeader from "../../Components/AppHeader/AppHeader";
import BottomNav from "../BottomNav/BottomNav";
//API URL
import CONSTANTS from '../../Constants/global'

export default function SingleQuizDetail() {
    const navigate = useNavigate();
    //const history = useHistory();
    const location = useLocation()
    const [locationState, setLocationState] = useState({ contestName: "" });
    const [currentContestId, setCurrentContestId] = useState();
    const [currentContestName, setCurrentContestName] = useState();
    const [entryFee, setEntryFee] = useState();
    const [activePlayerCount, setActivePlayerCount] = useState();
    const [totalPrize, setTotalPrize] = useState();
    const [isApplied, setIsApplied] = useState()
    const [quizStartTime, setQuizStartTime] = useState();
    const [newpoll, setNewPoll] = useState([]);
    const [alldata, setAllData] = useState([]);
    const [lgShowsss, setLgShowsss] = useState(false);
    const [startsin, setStartsin] = useState();
    const [showPlaybtn, setShowPlaybtn] = useState(false);



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
    //get detailed view of contest
    const getDetailedView = async (currentContestId) => {
        const DETAIL_VIEW_URL = CONSTANTS.DETAILVIEWCONTEST;
        //console.log(DETAIL_VIEW_URL);
        const token = sessionStorage.getItem("token");
        let dataToPost = { contestid: currentContestId, };
        const HEADER = { "authorization": token, }
        try {
            await axios.post(DETAIL_VIEW_URL, dataToPost, {
                headers: HEADER,
            }).then((res) => {
                console.log(res.data)
                let response = res?.data;
                setEntryFee(response?.entryamount);
                setActivePlayerCount(response?.liveplayers)
                setTotalPrize(response?.totalwinningamount)
                setIsApplied(response?.isApplied);
                setCurrentContestName(response?.contestName);
                setStartsin(calculateDifference(response?.contestTime));
            });

        } catch (error) {

            console.log('error is ', error)
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
    // Apply to a contest
    const applyContest = async (item) => {
        const APPLY_URL = `${CONSTANTS.APPLYCONTEST}`;
        const token = sessionStorage.getItem("token");
        let sendToData = { contestid: item, };
        const HEADER = { "authorization": token, }

        try {
            let post = await axios.post(APPLY_URL, sendToData, {
                headers: HEADER,
            });

            getDetailedView(locationState.contestid);
            console.log(post.data)
            toast.success(post.data.message)

            //getContest();
        } catch (e) {
            console.log(e.response.data);
            toast.error(e.response.data.message)
        }
    };
    //Play Now- First check if user already sted to play. If status 1 then he will enter to the contest, if status is 2 he have to pay some amount
    const PlayNow = async (result) => {
        sessionStorage.removeItem('questionIndex')
        const playcheck_URL = CONSTANTS.CONTESTPLAYCHECK;

        const token = sessionStorage.getItem("token");
        let dataToSend = { contestid: result, };
        const HEADER = { "authorization": token, }
        try {
            let post = await axios.post(playcheck_URL, dataToSend, {
                headers: HEADER,
            });

            if (post.data.status == 1) {
                console.log(post.data.question1, "questions")
                navigate("/livecontestnew", { state: { question1: post.data.question1, totalquestions: post.data.totalquestions, ContestTime: post.data.contestTime, InititalUsers: post.data.totalIntitalUsers, entryamount: result.EntryAmount, contestid: result.id, questionIndex: post.data.questionIndex } })
            }
            if (post.data.status == 2) {
                // localStorage.clear('success')
                setAllData([post.data.question1, post.data.totalquestions, post.data.contestTime, result.EntryAmount, result.id])
                setNewPoll([post.data.entryamount, post.data.particularPoll])
                setLgShowsss(true)
            }

        } catch (e) {

            toast.error(e.response.data.message)
        }
    }


    const entered = async (e) => {
        e.preventDefault();
        const payNewPoll_URL = CONSTANTS.PAYNEWPOLLAMOUNT;
    
        const token = sessionStorage.getItem("token");
        let dataToSend = { contestid: alldata[4], };
        const HEADERS = {"authorization": token,}
        try {
          let post = await axios.post(payNewPoll_URL, dataToSend, {
            headers: HEADERS,
          });
    
          if (post.data.status == 1) {
            console.log("aaaaaa", alldata[0], alldata[1], alldata[2])
            navigate("/livecontestnew", { state: { question1: alldata[0], totalquestions: alldata[1], ContestTime: alldata[2], InititalUsers: post.data.totalIntitalUsers, entryamount: alldata[3], contestid: alldata[4], questionIndex: post.data.questionIndex } })
          }
    
        } catch (e) {
    
          toast.error(e.response.data.message)
        }
      }
    useEffect(() => {
        if (location.state) {
            let _state = location.state;
            setLocationState(_state);
            // console.log('current contest id is ', location);
            setCurrentContestId(_state.id);
            getDetailedView(_state.contestid);
        }
    }, [location]);
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
                        <div className="row bg-white border-bottom-left-round pb-1">
                            <div className="col-xs-12">
                                <div className="d-flex justify-content-between py-3">
                                    <h1 className='inner-page-heading'>{currentContestName}</h1>
                                    <div className="start-in-time position-relative sigleQuiztimer">
                                    <span className="countdown-wrapper text-white position-absolute">
                                                    <CountdownCircleTimer
                                                        isPlaying
                                                        duration={startsin}
                                                        initialRemainingTime={startsin}
                                                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                                        colorsTime={[15, 10, 5, 0]}
                                                        size={70}
                                                        strokeWidth={5}
                                                        onComplete={() => ({ shouldRepeat: false, delay: 0 })}

                                                        onUpdate={(remainingTime) => {
                                                            if (remainingTime == 5) {
                                                                
                                                            }
                                                        }}

                                                    >

                                                        {renderTime}</CountdownCircleTimer>
                                                </span></div>
                                </div>
                            </div>
                        </div>
                    </section>{/* inner-page-top Ends */}
                    {/* single Entry fee card starts */}
                    <section className="single-quiz-entry-fee">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-parent-gray bg-light-gray">
                                    <div className="single-q-fee-box  width-80 bg-dark-orange  py-5 d-flex justify-content-center">
                                        <div className="card entry-fee-card small my-2">
                                            <div className="card-header bg-yellow-orange text-black">
                                                ENTRY FEE
                                            </div>
                                            <div className="card-body bg-dark-gray">
                                                <div className="card-text"><div className='text-white text-center fs-1'><i className="big coin pe-5"></i>  {entryFee}</div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> {/* single Entry fee card Ends */}

                    {/*Active player ribbon starts */}
                    <section className="active-player">
                        <div className="row">
                            <div className="col-xs-12 col-md-12">
                                <div className="info-oval-ribbon d-flex justify-content-between bg-dark-orange ps-5 py-3">
                                    <div className="user-icon bg-black">
                                        <span className=''><i className="fas fa-users fa-2x text-white"></i>
                                        </span>
                                    </div>
                                    <div className="user-no">
                                        <p className="mb-0 text-info-gray">Active Players</p>
                                        <p className="mb-0 fw-500  fs-1 text-center text-white">{activePlayerCount}</p>
                                    </div>
                                    <div className="user-grp-icons">
                                        <img src="./assets/images/profile.png" alt="" />
                                        <img src="./assets/images/profile.png" alt="" />
                                        <img src="./assets/images/profile.png" alt="" />
                                    </div>
                                </div>
                                <div className="info-oval-ribbon d-flex justify-content-center bg-dark-orange py-3">

                                    <div className="user-no">
                                        <p className="mb-0 text-info-gray">Total winning prize</p>
                                        <p className="mb-0 fs-1 text-white"><i className="big coin pe-5"></i>{totalPrize} </p>
                                    </div>
                                </div>
                                {isApplied
                                    ?
                                    // <Link to={"/livecontestnew"}  state= {{question1: alldata[0], totalquestions: alldata[1], ContestTime: alldata[2], InititalUsers: post.data.totalIntitalUsers, entryamount: alldata[3], contestid: alldata[4], questionIndex: post.data.questionIndex }}>
                                    <div className="info-oval-ribbon bg-dark-orange py-3 text-center">
                                        <p className="text-info-gray text-center fs-1">Good Luck !</p>
                                        {/* <p className='text-white text-center fs-3'>Starting in 2:34 seconds</p> */}
                                        {!showPlaybtn ?
                                        <div className="start-in-time position-relative goodlucktimer">
                                        <span className="countdown-wrapper text-white position-absolute">
                                                    <CountdownCircleTimer
                                                        isPlaying
                                                        duration={20}
                                                        initialRemainingTime={20}
                                                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                                        colorsTime={[15, 10, 5, 0]}
                                                        size={70}
                                                        strokeWidth={5}
                                                        onComplete={() => ({ shouldRepeat: false, delay: 0 })}

                                                        onUpdate={(remainingTime) => {
                                                            if (remainingTime == 0) {
                                                                setShowPlaybtn(true)                                                         
                                                            }
                                                        }}
                                                    >
                                                        {renderTime}</CountdownCircleTimer>
                                                </span>
                                                </div> 
                                        
                                        : <button type="button" className="btn btn-sm btn-success" onClick={() => { PlayNow(locationState.contestid) }}>Play</button>
                                        }
                                        
                                        
                                    </div>
                                    // </Link>

                                    : <div className="info-oval-ribbon bg-dark-orange">
                                        <p className="mb-0 text-info-gray text-center">Enter Competition</p>
                                        <div className="d-flex justify-content-between py-3">
                                            <button onClick={() => navigate(-1)} className="user-icon ms-3 bg-light-gray ps-2">
                                                <span className='' ><i className="fas fa-times fa-2x text-white px-1"></i>
                                                </span>
                                            </button>
                                            <div className="user-no">

                                                <div className='text-white text-center fs-1'><i className="big coin pe-5"></i>  {entryFee}</div>
                                            </div>
                                            <button className="user-icon me-3 bg-dark-gray" onClick={() => { applyContest(locationState.contestid); }}>
                                                <span className='' ><i className="fas fa-check fa-2x text-white"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>}


                            </div>
                        </div>
                    </section>{/* Active player ribbon ends */}
                </div>
            </div>
            <BottomNav />
            <ToastContainer autoClose={3000} />
            <Modal
        size="md"
        show={lgShowsss}
        onHide={() => setLgShowsss(false)}
        backdrop="static"
        keyboard={false}
        aria-labelledby="example-modal-sizes-title-lg"
      >

        {/* <Modal.Title id="example-modal-sizes-title-lg">
         Do You Want To Enter in Contest ?
          </Modal.Title> */}

        <Modal.Body>

          {/* <form>
        <div class="form-group">
       <label for="exampleInputEmail1">Entry Amount : {newpoll && newpoll[0]}</label>
       <label for="exampleInputEmail1">Current Entry Amount : {newpoll && newpoll[1]}</label>
       <label for="exampleInputEmail1">You Have To Pay : {newpoll && (parseInt(newpoll[1])-(parseInt(newpoll[0])))}</label>
       
       </div>
       <button type="submit" class="btn btn-primary" onClick={entered}>Yes</button>&nbsp;
       <button type="submit" class="btn btn-danger" onClick={(e)=>{ e.preventDefault(); setLgShowsss(false)}}>Close</button>
       </form> */}
            
       <div className="modal-content py-md-5 px-md-4 p-sm-3 p-4">

            <h3>Do You Want To Enter in Contest ?</h3> <i className="fa fa-bell ss"></i>
            <p className="r3 px-md-5 px-sm-1">Entry Amount : {newpoll && newpoll[0]}</p>
            <br></br>
            <p className="r3 px-md-5 px-sm-1">Current Entry Amount : {newpoll && newpoll[1]}</p>
            <br>
            </br>
            <p className="r3 px-md-5 px-sm-1">You Have To Pay : {newpoll && (parseInt(newpoll[1]) - (parseInt(newpoll[0])))}</p>
            <div className="text-center mb-3"> <button className="btn btn-primary w-50 rounded-pill b1" onClick={(e) => entered(e)}>Yes</button> </div> <a onClick={(e) => { e.preventDefault(); setLgShowsss(false) }}>Not now</a>
          </div>

        </Modal.Body>

      </Modal>
        </div>
    )
}
