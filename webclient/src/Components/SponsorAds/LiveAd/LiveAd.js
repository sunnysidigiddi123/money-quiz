import { React, useEffect, useState } from 'react'
import logo from './logonews.png'
import ReactPlayer from 'react-player/youtube'
import { BrowserRouter as Router, useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import axios from "axios";
import { Modal, Button, Form, Row, ModalFooter } from "react-bootstrap";
import { STATS_DELAY_IN_MILLISEC, STATS_DELAY_IN_SEC } from '../../../config/config';
import AppHeader from "../../AppHeader/AppHeader";
import CONSTANTS from '../../../Constants/global';
import WinningMsg from "../WinningMsg/WinningMsg"

const LiveAd = () => {

   const [value, setValue] = useState('')
   const [viewVideo, setViewVideo] = useState(true)
   const [questions, setQuestions] = useState({})
   const [entryamount, setEntryAmount] = useState()
   const [contestid, setContestId] = useState()
   const [contesttime, setContestTime] = useState()
   const [present, setPresent] = useState([])
   const [totalquestions, setTotalQuestions] = useState()
   const [newvideoTime, setNewVideoTime] = useState('');
   const [questionIndex, setQuestionIndex] = useState(0);
   const [timertime, setTimerTime] = useState(0);
   const [runtimer, setRunTimer] = useState(true);
   const [fullscreen, setFullscreen] = useState(true);
   //R  const [lgShows, setLgShows] = useState(false);
   // R  const [lgShowss, setLgShowss] = useState(false);
   const [totalQuestionTime, setQuestionTotalTime] = useState();
   const [key, setKey] = useState(0);
   const [reentersuccess, setReentersuccess] = useState(false);
   const [polldata, setPollData] = useState([]);
   const [creditlastamount, setCreditLastAmount] = useState(0);
   const [initialusers, setInitialUsers] = useState(0);
   const [currentAdId, setCurrentAdId] = useState();
   const [adIndex, setAdIndex] = useState();
   const [adTime, setAdTime] = useState();
   const [allQuestionList, setAllQuestionList] = useState([]);

   // For adding values from userhome 
   // console.log(present.length,present)
   const navigate = useNavigate();
   let location = useLocation();
   // console.log(questions.totalQuestionTime)
   console.log(adIndex, totalquestions, "vvvvvvvv", value);

   // useEffect(() => {
   //    addData();
   // }, [])
   useEffect(() => {
      getAdById();
   }, [])
   const getAdById = async () => {
      console.log('get data by Id called')

      console.log('inside get single')
      const getAdById_URL = `${CONSTANTS.GETADBYID}/${location.state.adId}`;
      const token = sessionStorage.getItem("token");
      const HEADERS = { "authorization": token, }
      await axios.get(getAdById_URL, {
         headers: HEADERS
      }).then((result) => {

         let res = result?.data;
         console.log(res);
         setAllQuestionList([...res?.questions])
         setQuestions(res?.questions[0]);
         setAdTime(res?.adTime)
         setCurrentAdId(res?.id);
         setTotalQuestions(res?.questions?.length);
         setAdIndex(1);
         setTimerTime(res?.questions[0]?.totalQuestionTime);
         sessionStorage.setItem("adIndex", 1)
      })

      try {

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

   const getnewQuestion = () => {

      if (totalquestions == sessionStorage.getItem('adIndex')) {
         //navigate('/appuserhome')
         checkAnswers();
      } else {

         setQuestions(allQuestionList[adIndex]);
         if (allQuestionList[adIndex].videolink !== '') {
            setViewVideo(true)
         }

         setKey(key + 1);
         setAdIndex(adIndex + 1);
         setTimerTime(allQuestionList[adIndex].totalQuestionTime);
         sessionStorage.setItem("adIndex", adIndex + 1)
         setNewVideoTime(allQuestionList[adIndex].totalVideoTime)
         //console.log('next question called')
         console.log('video time is ', allQuestionList[adIndex].totalVideoTime, 'out of total', allQuestionList[adIndex].totalQuestionTime)
      }


   }

   function addData() {
      console.log('add data called')
      //R setQuestions(location.state.question1)
      // if(location.state.question1.videolink == ''){
      //    setViewVideo(false)
      // }
      //R setContestTime(location.state.ContestTime)
      //R setEntryAmount(location.state.entryamount)
      //R setContestId(location.state.contestid)
      // setPresent(location.state.present == null ? [] : location.state.present)
      //R setTotalQuestions(location.state.totalquestions)
      //R setQuestionIndex(location.state.questionIndex + 1)
      //R sessionStorage.setItem("questionIndex", location.state.questionIndex + 1)
      console.log(questions)
   }

   //broadcast Alogorithm 

   useEffect(() => {
      //R let contestStartTime = moment(contesttime)
      let contestStartTime = moment(adTime)
      //R let userEntersTime = new Date()
      //R  let userDelayTime = userEntersTime - contestStartTime
      let questionTime = questions.totalQuestionTime * 1000
      // R console.log("Question Time", questionTime, userDelayTime)
      //R let afterDelayQuestionTime = questionTime - userDelayTime
      //R  setTimerTime(afterDelayQuestionTime / 1000)
      //R console.log("Qufdd", afterDelayQuestionTime, contestStartTime, questionIndex)

      // if (contestStartTime <= userEntersTime) {
      //    setVideoTime(Math.round(userDelayTime / 1000))
      //    console.log('userdelay', userDelayTime / 1000)

      //    if (userDelayTime / 1000 >= questions.totalVideoTime) {
      //       setViewVideo(false)
      //    }

      //    //when contest is running 
      //    if (afterDelayQuestionTime > 0) {
      //       const setTime = setTimeout(function () {
      //          // checkAnswers();
      //          getQuestions();
      //          setLgShowss(false)
      //          setLgShows(false)
      //          setKey(key + 1)
      //          console.log("aaaaaafffdss")
      //          // clearTimeout(setTime)
      //       }, afterDelayQuestionTime + STATS_DELAY_IN_MILLISEC)

      //       const setNewTime = setTimeout(function () {
      //          checkAnswers();
      //          console.log("aaaaaafffdss")
      //          // clearTimeout(setNewTime)
      //       }, afterDelayQuestionTime)
      //       return () => {
      //          clearTimeout(setTime);
      //          clearTimeout(setNewTime);
      //       };

      //    }
      // }
   }, [questions])
   
   // It get calls after Question before stats screen 
   const checkAnswers = async (e) => {
      const selectedADans = localStorage.getItem('selectedADans');
      console.log(value, questions.totalQuestionTime);
      const BASE_URL = `${process.env.REACT_APP_BASE_URL}/broadcast/answerCheck`;
      const token = sessionStorage.getItem("token");
      let sendData = {
         contestId: currentAdId,
         questionId: questions.id,
         selectedOption: selectedADans
      };
      try {
         let post = await axios.post(BASE_URL, sendData, {
            headers: {
               "authorization": token,
            },
         });
         console.log(post.data.status)
         if (post.data.status == 0) {
            //R  setLgShows(true)
            console.log("cccccc", post.data.LiveUsers)
         }
         if (post.data.status == 1) {
            //R  setLgShowss(true)
         }

         // setTimeout(() => {
         //    getpollvalues();
         // }, 1000)

         localStorage.removeItem('selectedADans')
      } catch (e) {
         console.log("Oops! Something Went Wrong")
      }

   }

   //for  getting selected option value . 

   function add(e) {
      // const allActiveClasses = document.querySelectorAll('.step_1')
      // for (let i = 0; i < allActiveClasses.length; i++) {
      //    allActiveClasses[i].classList.remove('active');
      // }

      // e.currentTarget.classList.add('active');
      if (e.target.value === undefined) {
         setValue('')
      } else
         setValue(e.target.value)

   }



   //submit of answer 

   function submitAns() {
      localStorage.setItem('selectedADans', value);
      var childNodes = document.getElementById("containersoption");
      console.log(childNodes)
      childNodes.style.pointerEvents = 'none';
   }

   // for next question

   function nextQuestion() {

      var childNodes = document.getElementById("containersoption");
      childNodes.style.pointerEvents = 'auto';
      var radioNodes = document.getElementsByName('radio')
      console.log(radioNodes, "qqqqqq")
      for (var i = 0; i < radioNodes.length; i++) {
         radioNodes[i].checked = false;
      }

   }

   return (
      <>
         <AppHeader />
         <div className="inner-page-container">
            <div className="container-fluid">
               <section>
                  <div className="row">
                     <div className="col-sm-12 pt-3 bg-white live-top-info py-4 mt-3">
                        <div className="d-flex justify-content-around">
                           <div className="live-ques-detail">
                              <div className="d-flex flex-column text-center">
                                 <p className='fs-2 mb-0 fw-bold text-dark-orange'>Question {adIndex}</p>
                                 <p className='mb-0 fs-6 font-italic'>{adIndex}/{totalquestions}</p>
                              </div>
                           </div>
                           <div className="live-user-info">
                              <div className="">
                                 <span className='user-info-item d-inline-block'><i className="fas fa-user text-dark-orange"></i></span>
                                 <span className='user-info-item  d-inline-block'>{initialusers}</span>
                                 <span className='user-info-item  d-inline-block'><i className="fas fa-star"></i></span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>
               {/*Active player ribbon starts */}
               <section className="single-question">
                  <div className="row">
                     <div className="col-xs-12 col-md-12 mt-2">
                        <div className="page-timer d-flex justify-content-center">
                           <span className='text-white bg-dark-orange mt-2 d-inline-block small-ribbon'><CountdownCircleTimer
                              key={key}
                              isPlaying
                              duration={timertime}
                              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                              colorsTime={[7, 5, 2, 0]}
                              initialRemainingTime
                              size={70}
                              strokeWidth={5}
                              onComplete={() => {
                                 // do your stuff here

                                 return { shouldRepeat: true, isPlaying: true, }

                                 // repeat animation in 1.5 seconds
                              }}
                              onUpdate={(remainingTime) => {
                                 if (remainingTime == 3) {
                                    // getInitialUsers();
                                    getnewQuestion()
                                 }
                              }}
                           >
                              {({ remainingTime }) => remainingTime}
                           </CountdownCircleTimer></span>
                        </div>
                        {!viewVideo && questions ?
                           <div className="info-oval-ribbon d-flex justify-content-between bg-dark-orange ps-5 py-3">
                              <div className="question-text text-white"questions>
                                 {adIndex} / {totalquestions} {questions.question}
                              </div>
                           </div> : <></>}
                     </div>

                     {viewVideo && questions && !questions.imagepath ?
                        <div className="col-xs-12 col-sm-12 col-md-12 mt-3 d-flex justify-content-center">
                           <div className='video-player-wraper'>
                              <ReactPlayer className="react-player" id='player' url={`https://www.youtube.com/embed/${questions.videolink}?autoplay=1&rel=0&mute=1&start=${newvideoTime}&end=${questions.totalVideoTime}&modestbranding=1&showinfo=0&fs=0`} frameBorder="0" allowFullScreen playing={true} allow="autoplay" onEnded={() => setViewVideo(false)} width='100%'
                                 height='100%' muted></ReactPlayer>
                           </div>
                        </div>

                        : <>
                           {questions.imagepath && <div className="col-xs-12 col-sm-12 col-md-12 pt-3 d-flex justify-content-center">

                              <img src={questions.imagepath} className='ques-img' alt="No Add Image" />
                           </div>}

                           <div className="col-xs-12 col-sm-12 col-md-12 pt-3">
                              <div className="question-options" id='containersoption'>
                                 <div className="radio-tile-group">
                                    <div className="input-container">
                                       <input id="option1" className="radio-button" type="radio" name="radio" value={questions.options[0]} onClick={(e) => add(e)} />
                                       <div className="radio-tile">
                                          <label htmlFor="option1" className="radio-tile-label">A {questions.options[0]}</label>
                                       </div>
                                    </div>

                                    <div className="input-container">
                                       <input id="option2" className="radio-button" type="radio" name="radio" value={questions.options[1]} onClick={(e) => add(e)} />
                                       <div className="radio-tile">

                                          <label htmlFor="option2" className="radio-tile-label">B {questions.options[1]}</label>
                                       </div>
                                    </div>

                                    <div className="input-container">
                                       <input id="option3" className="radio-button" type="radio" name="radio" value={questions.options[2]} onClick={(e) => add(e)} />
                                       <div className="radio-tile">

                                          <label htmlFor="option3" className="radio-tile-label">C {questions.options[2]}</label>
                                       </div>
                                    </div>

                                    <div className="input-container">
                                       <input id="option4" className="radio-button" type="radio" name="radio" value={questions.options[3]} onClick={(e) => add(e)} />
                                       <div className="radio-tile">
                                          <label htmlFor="option4" className="radio-tile-label">D {questions.options[3]}</label>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="col-xs-12 col-sm-12 col-md-12 d-flex justify-content-center pt-2 mt-4">
                              <button type="button" className="btn btn-orange" onClick={submitAns}>Submit</button>
                           </div>
                        </>}

                  </div>
               </section>{/* Active player ribbon ends */}
            </div>
         </div>
         {/* <WinningMsg status={'success'} winningcoin={'47'} nextUrl={'/adslist'}></WinningMsg> */}
      </>
   )
}

export default LiveAd