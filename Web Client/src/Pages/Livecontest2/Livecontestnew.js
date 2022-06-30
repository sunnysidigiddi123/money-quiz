import {React,useEffect,useState} from 'react'
import logo from './logonews.png'
import ReactPlayer from 'react-player/youtube'
import {BrowserRouter as Router,useNavigate,useLocation,useParams,Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment"

const Livecontestnew = () => {
    
   const [value,setValue] = useState('')
   const [viewVideo,setViewVideo] = useState(true)
   const [questions,setQuestions] = useState({})
   const [entryamount,setEntryAmount] = useState()
   const [contestid,setContestId] = useState()
   const [contesttime,setContestTime] = useState()
   const [present,setPresent] = useState([])
   const [totalquestions,setTotalQuestions] = useState()
   const [newvideoTime,setVideoTime] = useState('');
 
   // For adding values from userhome 

   console.log(present.length,present)
   const navigate = useNavigate();
   let location = useLocation();
   console.log(questions.totalQuestionTime)
   console.log(location.state,"location state",location,value);

   useEffect(()=>{

      addData();
   

   },[])

   function addData(){

        setQuestions(location.state.question1)
        setContestTime(location.state.ContestTime)
        setEntryAmount(location.state.entryamount)
        setContestId(location.state.contestid)
        setPresent(location.state.present == null ? [] :location.state.present )
        setTotalQuestions(location.state.totalquestions)
        console.log(questions)

   }

 //broadcast Alogorithm 
 
 useEffect(()=>{

    let contestStartTime = moment(contesttime)
    let userEntersTime = new Date()
    let userDelayTime = userEntersTime - contestStartTime
    let questionTime = questions.totalQuestionTime * 1000
    console.log("Question Time",questionTime)
    let afterDelayQuestionTime = questionTime - userDelayTime

   // present is array which storing questions timing for exapmle if we have 

    // 1. question time : 1  
    // 2. question time : 2 

    // every time when set timeout runs it will call an api and store that value in contest table 
    // as BroadcastingValue and we are getting that value from userhome played function and stroing that value
    // in present state : [1,2]
    
    // it is mainly for late users . when someone enters late in contest then we will get correct question index by present array .

    let  perquestionss = present.length 
    let  presentquestion
    if( present.length == 1){
       presentquestion = present[0]
       
    }
    if( present.length == 2 ){
      presentquestion = present[0]+present[1]
      
    }
    if(present.length  > 2){
      presentquestion = present[0]+present[present.length-1]
     
    }

    let presentQuestionTime =  moment(contesttime).add((presentquestion*1000)+(60000*present.length),'milliseconds')

    if(contestStartTime <= userEntersTime ){

      setVideoTime(Math.round(userDelayTime/1000))

      for(let i=0;i<totalquestions;i++){
         
         // without for loop algo . 

      }

    }


 },[questions])

 //for  getting selected option value . 

   function add(e){
      const allActiveClasses = document.querySelectorAll('.step_1')
      for(let i=0 ;i<allActiveClasses.length;i++){
         allActiveClasses[i].classList.remove('active');
      }
      
      e.currentTarget.classList.add('active');
      if(e.target.value === undefined){
         setValue('')
      }else
      setValue(e.target.value)

   }
  

  return (
    <>
      <div className="wrapper position-relative overflow-hidden">
      <div className="container-fluid p-0">
         <div className="row">
            <div className="col-md-6">
               <div className="logo_area mt-5 ms-5 ">
                  <a href="index.html">
                     <img src={logo} alt="image_not_found" className='roll-in-left'/>
                  </a>
               </div>
            </div>
            <div className="col-md-6 d-none d-md-block">
            <div class="clock_area countdown_timer position-relative mt-5 me-5 float-end" data-countdown="2022/10/24">
               <img src="./assets/images/clock/clock.png" alt="image_not_found"/>
            <span class="text-white position-absolute">12</span></div>
            </div>
         </div>
      </div>
      <div className="container p-0">
         <form className="multisteps_form" id="wizard" >
          
            <div className="multisteps_form_panel" style={{display:'block'}}>
               <div className="row">
                  <div className="col-md-7 m-auto">
                     <div className="content_box position-relative">
                      
                   {viewVideo && questions ?  
                   
                      <div className="player-wrapper">
                      <ReactPlayer className="react-player" id='player' url={`https://www.youtube.com/embed/${questions.videolink}?autoplay=1&rel=0&mute=1&start=${newvideoTime}&end=${questions.totalVideoTime}&modestbranding=1&showinfo=0&fs=0`} frameborder="0" allowfullscreen playing={true} allow="autoplay" onEnded={()=>setViewVideo(false)} width='100%'
                       height='100%' muted></ReactPlayer></div>
                       :
                        <>
                        <div className="question_number text-uppercase">
                           <span>question 1 / 4</span>
                        </div>
                        <div className="question_title py-3 text-uppercase">
                           <h1>{questions.question}</h1>
                        </div>
                        <div className="form_items"  >
                           <label  className="step_1 rounded-pill position-relative bg-white" onClick={(e)=> add(e)}>
                             {questions.options[0]}
                              <input  type="radio" name="stp_1_select_option" value={questions.options[0]} />
                              <span className="position-absolute">A</span>
                           </label>
                           <label  className="step_1 rounded-pill position-relative bg-white " onClick={(e)=> add(e)}>
                           {questions.options[1]}
                              <input  type="radio" name="stp_1_select_option" value={questions.options[1]} />
                              <span className="position-absolute">B</span>
                           </label>
                           <label className="step_1 rounded-pill position-relative bg-white " onClick={(e)=> add(e)}>
                           {questions.options[2]}
                              <input  type="radio" name="stp_1_select_option" value={questions.options[2]} />
                              <span className="position-absolute">C</span>
                           </label>
                           <label  className="step_1 rounded-pill position-relative bg-white" onClick={(e)=> add(e)}>
                           {questions.options[3]}
                              <input  type="radio" name="stp_1_select_option" value={questions.options[3]} />
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
            <button type="button" className="f_btn prev_btn text-uppercase rounded-pill position-absolute" id="prevBtn" ><span><i className="fas fa-arrow-left"></i></span> Last
               Question</button>
               <button type="button" className="f_btn next_btn text-uppercase rounded-pill position-absolute" id="nextBtn"
              >Next Question <span><i className="fas fa-arrow-right"></i></span></button>
            </div>
         </div>
      </div>
      
    
    
    
    </>
  )
}

export default Livecontestnew