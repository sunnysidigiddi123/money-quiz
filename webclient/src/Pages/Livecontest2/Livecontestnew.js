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
import { FaCrown,FaExclamation,FaSmile} from "react-icons/fa";
import StatsModal from './StatsModal/StatsModal';
import StatsModalWrong from './StatsModal/StatsModalWrong';
import { STATS_DELAY_IN_MILLISEC,STATS_DELAY_IN_SEC } from '../../config/config';

const Livecontestnew = () => {

   const [value, setValue] = useState('')
   const [viewVideo, setViewVideo] = useState(true)
   const [questions, setQuestions] = useState({})
   const [entryamount, setEntryAmount] = useState()
   const [contestid, setContestId] = useState()
   const [contesttime, setContestTime] = useState()
   const [present, setPresent] = useState([])
   const [totalquestions, setTotalQuestions] = useState()
   const [newvideoTime, setVideoTime] = useState('');
   const [questionIndex, setQuestionIndex] = useState(0);
   const [timertime, setTimerTime] = useState(0);
   const [runtimer , setRunTimer] = useState(true);
   const [fullscreen, setFullscreen] = useState(true);
   const [lgShows,setLgShows] = useState(false);
   const [lgShowss,setLgShowss] = useState(false);
   const [totalQuestionTime,setQuestionTotalTime] = useState();
   const [key, setKey] = useState(0);
   const [reentersuccess, setReentersuccess] = useState(false);
   const [polldata , setPollData] = useState([]);
   const [creditlastamount , setCreditLastAmount] = useState(0);
   const [initialusers , setInitialUsers] = useState(0);
   
   // For adding values from userhome 
   // console.log(present.length,present)
   const navigate = useNavigate();
   let location = useLocation();
   // console.log(questions.totalQuestionTime)
   console.log(questionIndex,totalquestions,"vvvvvvvv",value);

   useEffect(() => {

      addData();

   }, [])

   function addData() {

      setQuestions(location.state.question1)
      if(location.state.question1.videolink == ''){
         setViewVideo(false)
      }
      setContestTime(location.state.ContestTime)
      setEntryAmount(location.state.entryamount)
      setContestId(location.state.contestid)
      // setPresent(location.state.present == null ? [] : location.state.present)
      setTotalQuestions(location.state.totalquestions)
      setQuestionIndex(location.state.questionIndex+1)
      sessionStorage.setItem("questionIndex",location.state.questionIndex+1)
      console.log(questions)

   }

   //broadcast Alogorithm 

   useEffect(() => {

      let contestStartTime = moment(contesttime)
      let userEntersTime = new Date()
      let userDelayTime = userEntersTime - contestStartTime
      let questionTime = questions.totalQuestionTime * 1000
      console.log("Question Time", questionTime, userDelayTime)
      let afterDelayQuestionTime = questionTime - userDelayTime
      setTimerTime(afterDelayQuestionTime/1000)
      console.log("Qufdd", afterDelayQuestionTime, contestStartTime,questionIndex)
      
      if (contestStartTime <= userEntersTime) {
      

         setVideoTime(Math.round(userDelayTime / 1000))
         console.log('userdelay',userDelayTime/1000)

         if(userDelayTime/1000 >= questions.totalVideoTime){

            setViewVideo(false)
         }
      
         //when contest is running 
         if (afterDelayQuestionTime > 0) {
          
            const setTime = setTimeout(function () {

               // checkAnswers();
               getQuestions();
               setLgShowss(false)
               setLgShows(false)
               setKey(key+1)
               console.log("aaaaaafffdss")
               // clearTimeout(setTime)
            },afterDelayQuestionTime+STATS_DELAY_IN_MILLISEC)

            const setNewTime = setTimeout(function () {

               checkAnswers();
              
               console.log("aaaaaafffdss")
               // clearTimeout(setNewTime)
            },afterDelayQuestionTime)

             
            return () => {
               clearTimeout(setTime);
               clearTimeout(setNewTime);
             };
     
         }

      }

   }, [questions])

  // Cashout 

  const cashout = async (e) => {
   const BASE_URL = `${process.env.REACT_APP_BASE_URL}/broadcast/cashout`;
   const token = sessionStorage.getItem("token");
   let sendData = {
      contestId: contestid,
   };
   try {
      let post = await axios.post(BASE_URL, sendData,{
         headers: {
            "authorization": token,
           },
       });
    
      if(post.data.status == 1){
         toast.success(post.data.message)
         navigate('/userhome')
       }
      
   } catch (e) {

      console.log("Oops! Something Went Wrong")
   }

}


  // Reenter 

  const reenter = async (e) => {
   const BASE_URL = `${process.env.REACT_APP_BASE_URL}/broadcast/reenter`;
   const token = sessionStorage.getItem("token");
   let sendData = {
      contestId: contestid,
   };
   try {
      let post = await axios.post(BASE_URL, sendData,{
         headers: {
            "authorization": token,
           },
       });
    
      

       if(post.data.status == 1){
         setReentersuccess(true)
         toast.success(post.data.message)
       }
      
   } catch (e) {

     
         toast.error(e.response.data.message)
       
   }

}



   // It get calls every question end (question+stats page time )


   const getQuestions = async (e) => {
       
     //  when contest gets over
     if (totalquestions == sessionStorage.getItem('questionIndex')) {
          
      navigate('/userhome')
     }
      const selectedans = localStorage.getItem('selectedans');
      const BASE_URL = `${process.env.REACT_APP_BASE_URL}/publishedcontest/getData`;
      
      const token = sessionStorage.getItem("token");
      let sendData = {
         contestId: contestid,
         segmentId: questions.segmentId,
         questionIndex: sessionStorage.getItem('questionIndex'),
         LivecontestTime:moment(contesttime).add(questions.totalQuestionTime+STATS_DELAY_IN_SEC, 'seconds')
         // questionId: questions.id,
         // selectedOption: selectedans

      };
      try {
         let post = await axios.post(BASE_URL, sendData,{
            headers: {
               "authorization": token,
              },
          });
          //  when contest gets over
          if (totalquestions == questionIndex) {
            
            navigate('/userhome')
         }
         
         console.log(post.data.question)
         setContestTime(moment(contesttime).add(questions.totalQuestionTime+STATS_DELAY_IN_SEC, 'seconds'))
         if (post.data.question !== null) {
            // setLgShows(true)
            setQuestions(post.data.question)
            setTimerTime(post.data.question.totalQuestionTime+STATS_DELAY_IN_SEC)
            setQuestionIndex(parseInt(post.data.liveindex) + 1)
            console.log("qqqqqqq",parseInt(post.data.liveindex)+1)
            sessionStorage.setItem("questionIndex",parseInt(post.data.liveindex)+1)
            if (post.data.question.videolink !== '') {
               setViewVideo(true)
            }
            
         }
         
         nextQuestion()
         // if(post.data.status == 0){
         //    setLgShows(true)
         // }
         // if(post.data.status == 1){
         //    setLgShowss(true)
         // }
       
         console.log("aaddddd", contesttime)


      } catch (e) {
          console.log(e.response.data.status,'qqqqq')
         if(e.response.data.status == 400){
              navigate('/userhome')
            //   toast.success(e.response.data.message)
         }
      }

   }

   // It get calls after Question before stats screen 
   
   const checkAnswers = async (e) => {
      const selectedans = localStorage.getItem('selectedans');
      console.log(value, questions.totalQuestionTime);
      const BASE_URL = `${process.env.REACT_APP_BASE_URL}/broadcast/answerCheck`;
      const token = sessionStorage.getItem("token");
      let sendData = {
         contestId: contestid,
         questionId: questions.id,
         selectedOption: selectedans

      };
      try {
         let post = await axios.post(BASE_URL, sendData,{
            headers: {
               "authorization": token,
              },
          });
         console.log(post.data.status)
         if(post.data.status == 0){
            setLgShows(true)
            console.log("cccccc",post.data.LiveUsers)
         }
         if(post.data.status == 1){
            setLgShowss(true)


         }

         setTimeout(()=>{

                getpollvalues();
         },1000)

       localStorage.removeItem('selectedans')
         


      } catch (e) {

         console.log("Oops! Something Went Wrong")
      }



   }

   const getpollvalues = async (e) => {
      
      const BASE_URL = `${process.env.REACT_APP_BASE_URL}/broadcast/getpollvalues`;
      const token = sessionStorage.getItem("token");
      let sendData = {
         contestId: contestid
      };
      try {
         let post = await axios.post(BASE_URL, sendData,{
            headers: {
               "authorization": token,
              },
          });
       
       setPollData([post.data.ParticularPoll,post.data.LiveUsers])
      
         


      } catch (e) {

         console.log("Oops! Something Went Wrong")
      }



   }

   // getting initial user data 

   
   const getInitialUsers = async (e) => {
      
      const BASE_URL = `${process.env.REACT_APP_BASE_URL}/broadcast/getInitialUsers`;
      let sendData = {
         contestId: contestid
      };
      try {
         let post = await axios.post(BASE_URL, sendData);
        
         setInitialUsers(post.data.InitialUsers)

      } catch (e) {

         console.log("Oops! Something Went Wrong")
      }



   }
   




   

   //for  getting selected option value . 

   function add(e) {
      const allActiveClasses = document.querySelectorAll('.step_1')
      for (let i = 0; i < allActiveClasses.length; i++) {
         allActiveClasses[i].classList.remove('active');
      }

      e.currentTarget.classList.add('active');
      if (e.target.value === undefined) {
         setValue('')
      } else
         setValue(e.target.value)

         

   }



   //submit of answer 

   function submitAns() {

      var childNodes = document.getElementById("containers");
      childNodes.style.pointerEvents = 'none';
      localStorage.setItem('selectedans',value );


   }

   // for next question
   
   function nextQuestion() {

      var childNodes = document.getElementById("containers");
      childNodes.style.pointerEvents = 'auto';


   }


   return (
      <>
         <div className="wrapper position-relative overflow-hidden">
            <div className="container-fluid p-0">
               <div className="row">
                  <div className="col-md-6">
                     <div className="logo_area mt-5 ms-5 ">
                        <a href="#">
                           <img src={logo} alt="image_not_found" className='roll-in-left' />
                        </a>
                     </div>
                  </div>
                  <div className="col-md-6  d-md-block" >
                     {questions && <> <div class="clock_area countdown_timer position-relative mt-5 me-5 float-end" data-countdown="2022/10/24">
                        <img src="./assets/images/clock/clock.png" alt="image_not_found" />
                        <span class="text-white position-absolute"> <CountdownCircleTimer
                           key={key}
                           isPlaying
                           duration={timertime}
                           colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                           colorsTime={[7, 5, 2, 0]}
                           initialRemainingTime
                           onComplete={() => {
                              // do your stuff here
                            
                                 return { shouldRepeat: true , isPlaying: true , newInitialRemainingTime:timertime-STATS_DELAY_IN_SEC}
                        
                               // repeat animation in 1.5 seconds
                            }}
                            onUpdate={(remainingTime)=>{
                                   if(remainingTime== 5 ){
                                      getInitialUsers();
                                   }
                            }} 
                        >
                           {({ remainingTime }) => remainingTime}
                        </CountdownCircleTimer></span></div> </>}
                  </div>
               </div>
            </div>
            <div className="container p-0">
               <form className="multisteps_form" id="wizard" >

                  <div className="multisteps_form_panel" style={{ display: 'block' }}>
                     <div className="row">
                        <div className="col-md-7 m-auto">
                           <div className="content_box position-relative">

                              {viewVideo && questions ?

                                 <div className="player-wrapper">
                                    <ReactPlayer className="react-player" id='player' url={`https://www.youtube.com/embed/${questions.videolink}?autoplay=1&rel=0&mute=1&start=${newvideoTime}&end=${questions.totalVideoTime}&modestbranding=1&showinfo=0&fs=0`} frameborder="0" allowfullscreen playing={true} allow="autoplay" onEnded={() => setViewVideo(false)} width='100%'
                                       height='100%' muted></ReactPlayer></div>
                                 :
                                 <>
                                   {questions.imagepath != '' ?<img src={questions.imagepath} alt="image" width="500" height="600"></img>:<></>}
                                    <div className="question_number text-uppercase">
                                       <span>question {questionIndex} / {totalquestions}</span>
                                    </div>
                                    <div className="question_title py-3 text-uppercase">
                                       <h1>{questions.question}</h1>
                                    </div>
                                    <div className="form_items  " id='containers'   >
                                       <label className="step_1 rounded-pill position-relative bg-white" onClick={(e) => add(e)}>
                                          {questions.options[0]}
                                          <input type="radio" name="stp_1_select_option" value={questions.options[0]} />
                                          <span className="position-absolute">A</span>
                                       </label>
                                       <label className="step_1 rounded-pill position-relative bg-white " onClick={(e) => add(e)}>
                                          {questions.options[1]}
                                          <input type="radio" name="stp_1_select_option" value={questions.options[1]} />
                                          <span className="position-absolute">B</span>
                                       </label>
                                       <label className="step_1 rounded-pill position-relative bg-white " onClick={(e) => add(e)}>
                                          {questions.options[2]}
                                          <input type="radio" name="stp_1_select_option" value={questions.options[2]} />
                                          <span className="position-absolute">C</span>
                                       </label>
                                       <label className="step_1 rounded-pill position-relative bg-white" onClick={(e) => add(e)}>
                                          {questions.options[3]}
                                          <input type="radio" name="stp_1_select_option" value={questions.options[3]} />
                                          <span className="position-absolute">D</span>
                                       </label>
                                    </div></>
                              }
                            
                           </div>
                        </div>
                     </div>
                  </div>



                  <div className="left-side-img">
                     <img src="./assets/images/background/bg_1.png" alt="image_not_found" />
                  </div>


                  <div className="step_progress position-absolute">
                     <div className="step rounded-pill position-relative text-center active">1</div>
                     <div className="step rounded-pill position-relative text-center mt-4">2</div>
                     <div className="step rounded-pill position-relative text-center mt-4">3</div>
                     <div className="step rounded-pill position-relative text-center mt-4">4</div>
                  </div>


               </form>

               <div className="form_btn">
                  <button type="button" className="f_btn prev_btn text-uppercase rounded-pill position-absolute" id="prevBtn" onClick={(e) => nextQuestion(1)} > Next
                     Question <span><i className="fas fa-arrow-right"></i></span></button>
                  <button type="button" className="f_btn next_btn text-uppercase rounded-pill position-absolute" id="nextBtn" onClick={submitAns}
                  >Submit </button>
               </div>
            </div>
         </div>



        {/* modal for stats  */}


{/* 
        <Modal
            size="lg"
            fullscreen={fullscreen}
            show={lgShows}
            onHide={() => setLgShows(false)}
            // backdrop="static"
            // keyboard={false}
            aria-labelledby="example-modal-sizes-title-lg"
         
		
      >
        <Modal.Header >
          <Modal.Title id="example-modal-sizes-title-lg">
          Statistics
          </Modal.Title>

          </Modal.Header>

           <Modal.Body className='bb2'>
          
              <div className="row">
              <CountdownCircleTimer
                           isPlaying
                           duration={30}
                           colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                           colorsTime={[7, 5, 2, 0]}
                           onComplete={() => {
                           
                              // setLgShows(false)
                              // setKey(key+1)
                              
                             
                            }}
                        >
                           {({ remainingTime }) => remainingTime}
                        </CountdownCircleTimer>

                    <div className="col-md-6">
                        <div className="text-center mt-2"> <img src="https://i.imgur.com/zZUiqsU.png" width="200" /> </div>
                    </div>
                    <div className="col-md-6">
                        <div className="text-white mt-4"> <span className="intro-1">Oh no! Incorrect answer </span>
                        <div className="mt-2"> <span className="intro-2">Initial Contestants : </span> </div>
                            <div className="mt-2"> <span className="intro-2">Remaining Contestants :</span> </div>
                           <div className="mt-2"> <span className="intro-2">Do You Want To Re-enter :</span> </div>
                            
                        </div>
                    </div>
                </div>

			      </Modal.Body>
           
                  </Modal> */}


{/* 
     
                  <Modal
            size="lg"
            fullscreen={fullscreen}
            show={lgShowss}
            onHide={() => setLgShowss(false)}
            // backdrop="static"
            // keyboard={false}
            aria-labelledby="example-modal-sizes-title-lg"
         
		
      >
        <Modal.Header >
          <Modal.Title id="example-modal-sizes-title-lg">
          Statistics
          </Modal.Title>

          </Modal.Header>

           <Modal.Body className='bb3'>
          
              <div className="row">
              <CountdownCircleTimer
                           isPlaying
                           duration={30}
                           colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                           colorsTime={[7, 5, 2, 0]}
                           onComplete={() => {
                              // setLgShowss(false)
                            
                              // setKey(key+1)
                              
                              
                            }}
                        >
                           {({ remainingTime }) => remainingTime}
                        </CountdownCircleTimer>

                    <div className="col-md-6">
                        <div className="text-center mt-2"> <img src="https://i.imgur.com/zZUiqsU.png" width="200" /> </div>
                    </div>
                    <div className="col-md-6">
                        <div className="text-white mt-4"> <span className="intro-1">Correct Answer</span>
                        <div className="mt-2"> <span className="intro-2">Initial Contestants : </span> </div>
                            <div className="mt-2"> <span className="intro-2">Remaining Contestants :</span> </div>
                           <div className="mt-2"> <span className="intro-2">Do You Want To Re-enter :</span> </div>
                            
                        </div>
                    </div>
                </div>

			      </Modal.Body>
           
                  </Modal> */}

                  <StatsModalWrong lgShow={lgShows} setLgShow={setLgShows} reenter={reenter} reentersuccess={reentersuccess} setReentersuccess={setReentersuccess} polldata={polldata} totalquestions={totalquestions} initalusers={initialusers} />
                  <StatsModal  lgShow={lgShowss} setLgShow={setLgShowss} cashout={cashout} polldata={polldata} creditlastamount={creditlastamount} contestid={contestid} totalquestions={totalquestions} initalusers={initialusers} />



      </>
   )
}

export default Livecontestnew