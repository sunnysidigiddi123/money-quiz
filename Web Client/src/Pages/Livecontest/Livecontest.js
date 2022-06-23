import React, { useState , useEffect,useRef } from 'react'
import axios from "axios";
import Header from '../../Components/Header'
import SidenavBar from '../../Components/SidenavBar'
import "./Livecontest.css"
import {BrowserRouter as Router,useNavigate,useLocation,useParams,Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from "react-dom-confetti";
import moment from "moment"
import ModalSuccess from '../../Components/Modal/ModalSuccess';
import ModalPerQuestion from '../../Components/Modal/ModalPerQuestion';
import { Modal, Button, Form, Row, ModalFooter } from "react-bootstrap";
import { FaCrown,FaExclamation,FaSmile} from "react-icons/fa";
import ReactPlayer from 'react-player/youtube'



const Livecontest = () => {
    const [show ,setShow] = useState(false)
    const [question, setQuestions] = useState([])
    const [draftid , setDraftid] = useState('');
    const [videos , setVideos] = useState([]);
    const [filtquestion , setFiltQuestions] = useState([]);
    const [filtvideo , setFiltVideo] = useState([]);
    const [first , setFirst] = useState(0);
    const [second, setSecond] = useState(1);
    const [firsts , setFirsts] = useState(0);
    const [seconds, setSeconds] = useState(1);
    const [selectedans,setSelectedans] = useState('');
    const [disabl,setDisabled] = useState(false)
    const [ correctoption ,setCorrectoption] = useState('');
    const [wrong,setWrong] = useState(false)
    const [isChecked, setISchecked] = useState(false)
    const [score, setScore] = useState(0)
    const [lgShow, setLgShow] = useState(false);
    const [lgShows,setLgShows] = useState(false);
    const [lgShowss,setLgShowss] = useState(false);
    const [confetti,setConfetti] = useState(false);
    const [contesttime,setContestTime ] = useState();
    const [newvideoTime , setVideoTime] = useState('');
    const [questionEndTime , setQuestionEndTime] = useState(moment(contesttime));
    const [endTime , setEndTime] = useState([2,3,3])
    const [starttime , setStartTime] = useState([2,3,2]);
    const [run ,setRun] = useState(1)
    const [ii ,setII] = useState(0)
    const [times , setTimes] = useState([2,3,3])
    const [entryamount ,setEntryAmount] = useState();
    const [contestId , setContestId] = useState();
    const [lgShowe, setLgShowe] = useState(false);
    const [lgShowee, setLgShowee] = useState(false);
    const [userId,setUserId] = useState();
    const [lgShowend,setLgShowend] = useState(false);
    const [totalPoll,setTotalPoll] = useState();
    const [liveusers,setLiveUsers] = useState();
    const [eachpoll,setEachPoll] = useState();
    const [shownote,setShowNote] = useState(false);
    const [showenter , setShowEnter] = useState(false);
    const [information,setInformation] = useState([]);
    const [informationcorrect,setInformationcorrect] =useState([]);
    // const [reentersuccess,setReentersuccess] = useState(2);
    const [reenternow , setReenternow] = useState(true);
    const [reenternowsuccess , setReenternowsuccess] = useState(false);
    const [videoshow, setVideoshow] = useState(true)
    const [questionshow, setQuestionshow] = useState(false)
    const [totalsegement , setTotalSegment] = useState(localStorage.getItem('segment'))
    const [present , setPresent] = useState([])
    


    console.log(totalsegement) 
    const config = {
      angle: "360",
      spread: 360,
      startVelocity: 40,
      elementCount: 70,
      dragFriction: 0.12,
      duration: 6000,
      stagger: 3,
      width: "14px",
      height: "7px",
      perspective: "382px",
      colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
     
    };
   
   
    function nextQuestion() {
   
       if((first+1) < filtquestion.length ){
         setSecond(second+1)
          setFirst(first+1)
         
          setDisabled(false)
          setWrong(false)
       }else {
         
           toast.success('Reached Last Question')
           
       }
  

}


const quit = async (e) => {

  const correctans = localStorage.getItem('correctans');
  const selectedanss = localStorage.getItem('selectedanss');
  console.log('cat',selectedanss,correctans)
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/quitcontest`;
  const token = sessionStorage.getItem("token");
  let sendData = {
    correctoption:correctans,
    selectedans:selectedanss,
    contestId:contestId,
    userId:userId

   
  };
  try {
    let post = await axios.post(BASE_URL, sendData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
       });
   
    if(post.data.status== 1){
      localStorage.removeItem('selectedanss');
      localStorage.removeItem('correctans');
      setTimeout(()=>{
        setLgShowee(true)
       },1000)
       localStorage.setItem('success',1)
       
      
    }
    if(post.data.status== 0){
      localStorage.removeItem('selectedanss');
      localStorage.removeItem('correctans');
      quitbutton()
      setTimeout(()=>{
        setLgShowe(true)
      },1000)
      localStorage.setItem('success',2)
    }
     
    

  }catch (e){
   
     toast.error("Oops! Something Went Wrong")
  }



 }


 const quitbutton = async (e) => {
  
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/quitbutton`;
  const token = sessionStorage.getItem("token");
  let sendData = {
    contestId:contestId,
    userId:userId
  };
  try {
    let post = await axios.post(BASE_URL, sendData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
       }).then((res)=>{
        setInformation([res.data.remaining,res.data.reenteramount,res.data.initial])
       })
      
     
  }catch (e){
   
     console.log("Oops! Something Went Wrong")
  }
}


 

 const restrictuser = async (e) => {
  console.log(("wwwwww",e))
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/restrict`;
  const token = sessionStorage.getItem("token");
  let sendData = {
    contestId:contestId,
    userId:userId,
    
  };
  try {
    let post = await axios.post(BASE_URL, sendData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
       });
    
  }catch (e){
   
     console.log("Oops! Something Went Wrong")
  }



 }

 const notrestrictuser = async (e) => {
  
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/notrestrict`;
  const token = sessionStorage.getItem("token");
  let sendData = {
    contestId:contestId,
    userId:userId
  };
  try {
    let post = await axios.post(BASE_URL, sendData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
       });
       console.log('tttttt',post.data.remaining)
       if(post.data.remaining == 1){
         nouserleft();
        
       }
    
  }catch (e){
   
     console.log("Oops! Something Went Wrong")
  }



 }

 const segmentQuestion = async (e) => {
  setVideoshow(false)
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/segment`;
  const token = sessionStorage.getItem("token");
  let sendData = {
    contestId:contestId,
    userId:userId
  };
  try {
    let post = await axios.post(BASE_URL, sendData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
       });
    
  }catch (e){
   
     console.log("Oops! Something Went Wrong")
  }



 }

 const nosegmentQuestion = async (e) => {
  
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/nosegment`;
  const token = sessionStorage.getItem("token");
  let sendData = {
    contestId:contestId,
    userId:userId
  };
  try {
    let post = await axios.post(BASE_URL, sendData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
       });
       console.log('tttttt',post.data.remaining)
    
    
  }catch (e){
   
     console.log("Oops! Something Went Wrong")
  }



 }

 const nouserleft = async (e) => {
  
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/nouserleft`;
  const token = sessionStorage.getItem("token");
  let sendData = {
    contestId:contestId,
    userId:userId
  };
  try {
    let post = await axios.post(BASE_URL, sendData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
       });
    if(post.data.status == 1){
      navigate('/userhome')
      toast.success(post.data.message)
    }
   
      
  }catch (e){
   
     console.log("Oops! Something Went Wrong")
  }



 }

 const perquestiondata = async () => {
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/perquestiondata`;
  const token = sessionStorage.getItem("token");
  let sendData = {
    contestId:contestId,
    userId:userId
    
  };
  try {
    let post = await axios.post(BASE_URL, sendData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
       });
     setInformationcorrect([post.data.remaining,post.data.reenteramount,post.data.initial])
   
      
  }catch (e){
   
     console.log("Oops! Something Went Wrong")
  }



 }



 const broadcatingvalue = async (e) => {
  console.log("wwwwww",e)
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/broadcatingvalue`;
  const token = sessionStorage.getItem("token");
  let sendData = {
    contestId:contestId,
    userId:userId,
    question:e[0],
    questionnumber:e[1]
  };
  try {
    let post = await axios.post(BASE_URL, sendData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
       });
  
      
  }catch (e){
   
     console.log("Oops! Something Went Wrong")
  }



 }

 const reenter = async (e) => {
  e.preventDefault();
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/reenter`;
  const token = sessionStorage.getItem("token");
  let sendData = {
    contestId:contestId,
    userId:userId
  };
  try {
    let post = await axios.post(BASE_URL, sendData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
       });
     if(post.data.status == 0){
       toast.success(post.data.message)
       localStorage.setItem('success',2)
     }
     if(post.data.status == 2){
       toast.success(post.data.message);
       localStorage.setItem('success',1)
       setReenternowsuccess(true);
       setReenternow(false);
     }
    
  }catch (e){
   
     console.log("Oops! Something Went Wrong")
  }



 }




const cashout = async (e) => {

  e.preventDefault();
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/cashout`;
  const token = sessionStorage.getItem("token");
  let sendData = {
    contestId:contestId,
    userId:userId,
    entryamount:entryamount,
  };
  try {
    let post = await axios.post(BASE_URL, sendData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
       });
      if(post.data.status == 1){
        toast.success(post.data.message)
        // setParticularPoll(post.data.particularp)
       
        navigate('/userhome')
      }
    
  }catch (e){
   
    console.log("Oops! Something Went Wrong")
  }



}

const endOfContest = async (e) => {
   
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/cashoutlast`;
  const token = sessionStorage.getItem("token");
  let sendData = {
    contestId:contestId,
    userId:userId,
    entryamount:entryamount,
  };
  try {
    let post = await axios.post(BASE_URL, sendData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
       });
      if(post.data.status == 1){
        
        setTotalPoll([post.data.totalpoll,post.data.liveusers,post.data.eachpoll])
        // setLiveUsers(post.data.liveusers)
        // setEachPoll(post.data.eachpoll)
          setLgShowend(true)
       
        
        
      }
    
  }catch (e){
   
    console.log("Oops! Something Went Wrong")
  }



}




const quitofcontest = async (e) => {
  const correctans = localStorage.getItem('correctans');
  const selectedanss = localStorage.getItem('selectedanss');
  console.log('cat',selectedanss,correctans)
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/quitcontest`;
  const token = sessionStorage.getItem("token");
  let sendData = {
    correctoption:correctans,
    selectedans:selectedanss,
    contestId:contestId,
    userId:userId

   
  };
  try {
    let post = await axios.post(BASE_URL, sendData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
       });
   
    
    if(post.data.status== 0){
      quitbutton();
      setLgShowe(true)
      // setTimeout(()=>{
      //   navigate('/userhome')
      //  },15000)
       localStorage.removeItem('selectedanss');
      localStorage.removeItem('correctans');
      
     
    }
    if(post.data.status== 1){
    
      setTimeout(()=>{
        endOfContest();
       },1000)
         localStorage.removeItem('selectedanss');
      localStorage.removeItem('correctans');
     
  }
    
  }catch (e){
   
    console.log("Oops! Something Went Wrong")
  }



 }




    // useEffect(()=>{

    

    //   let contestDateTime = moment(contesttime) 
    //   console.log(contestDateTime)
    //   let currentdate = new Date()
    //   let currentTime = moment(currentdate).format("h:mm:ss")
    //   console.log(currentdate)
    //   let endTime = moment(contesttime).add(4,'minutes')
    //   console.log(endTime)
    //   let difference = endTime - contestDateTime
    //    console.log(difference)
    //    let newdifference = currentdate - contestDateTime;
    //    console.log(newdifference)
    //    let questionTime = difference /filtquestion.length
    //    console.log(questionTime)
    //    console.log(contestDateTime < currentdate)
       

    //    let perquestion = (currentdate - contestDateTime)/questionTime;
    //    console.log('@@@@@@@ round',Math.round(perquestion),Math.floor(perquestion))
    //    let perquestionss = Math.floor(perquestion)
    //    let presentquestion = Math.floor(perquestion) * questionTime
    //    let presentquestiondate = moment(contesttime).add(presentquestion,'milliseconds')
    //    console.log(presentquestiondate)
       
    
    
      
    //    if(contestDateTime <= currentdate ){
    //    let newquestionTime = questionTime - newdifference
       
    //      setVideoTime(Math.round(newdifference/1000))
        
    //     for(let i=0;i<filtquestion.length;i++){
    //       console.log("@@@@@@@@", i,newquestionTime+questionTime*i)
    //     const newss = setTimeout(()=>{
    //       console.log("@@@@@@  ran for this times @@@@@ ",perquestionss,i,newquestionTime+questionTime*i,newvideoTime)
          
    //       if(i+1 == filtquestion.length){
    //         quitcontest();
            
    //         }

 
    //       if(i+1 <filtquestion.length ) {
        
    //         if(presentquestion===0 ){
    //           setVideoTime('')
              
    //         }
          
    //          if(presentquestiondate<=currentdate && presentquestion!==0 && (i+1)==(perquestionss) ){
    //            console.log('value of i',i )
    //           let newquestion = currentdate - presentquestiondate
    //           setVideoTime(Math.round(newquestion/1000))
    //           console.log('@@@@@@@ 1st video',newvideoTime)
            
    //          }
    //          if((i+1)!=(perquestionss)){
    //           setVideoTime('')
    //           console.log('@@@@@@@ 2dn video',newvideoTime)
    //          }
            

          
    //        setFirst(i+1)
    //        setSecond(i+2)
    //        setDisabled(false)
    //        setWrong(false)
          
    //        console.log("sdfsdf")}
           
    //     },newquestionTime+questionTime*i)
        
        
    //   }
       

    //     }
       
   
    // },[filtquestion])
  
  

     
    // useEffect(()=>{

    

    //   let contestDateTime = moment(contesttime)
    //   console.log(contestDateTime)
    //   let currentdate = new Date()
    //   let currentTime = moment(currentdate).format("h:mm:ss")
    //   console.log(currentdate)
    //   let endTime = moment(contesttime).add(7+filtquestion.length,'minutes')
    //   console.log(endTime)
    //   let difference = endTime - contestDateTime
    //    console.log(difference)
    //    let newdifference = currentdate - contestDateTime;
    //    console.log(newdifference)
    //    let questionTime = difference /filtquestion.length
    //    console.log(questionTime)
    //    console.log(contestDateTime < currentdate)
       

    //    let perquestion = (currentdate - contestDateTime)/questionTime;
    //    console.log('@@@@@@@ round',Math.round(perquestion),Math.floor(perquestion))
    //    let perquestionss = Math.floor(perquestion)
    //    let presentquestion = Math.floor(perquestion) * questionTime
    //    let presentquestiondate = moment(contesttime).add(presentquestion,'milliseconds')
    //    console.log(presentquestiondate)
       
    //   //  let newperquestionss = Math.floor(perquestion) + 1
    //   //  let newpresentquestion = newperquestionss * questionTime
    //   //  let newpresentquestiondate = moment(contesttime).add(newpresentquestion,'milliseconds')
    
      
    //    if(contestDateTime <= currentdate ){
    //    let newquestionTime = questionTime - newdifference
       
    //      setVideoTime(Math.round(newdifference/1000))
         
           
    //     for(let i=0;i<filtquestion.length;i++){
    //       console.log("@@@@@@@@", i,newquestionTime+questionTime*i)
        
   
    //       const newss = setTimeout(()=>{
    //         console.log("@@@@@@  ran for this times @@@@@ ",perquestionss,i)
      
    //       //   if(i+1 == filtquestion.length){
    //       //     quitofcontest();
              
    //       //     }
        
  
    //       //   if(i+1 <filtquestion.length && (i+1)!=(perquestionss) ){
            
    //       //     quit();
    //       //   console.log("dsfd")
           
          
          
    //       // }
          
    //       if(i+1 == filtquestion.length){
    //         navigate("/userhome")
            
    //         }

 
    //       if(i+1 <filtquestion.length ) {
    //         notrestrictuser();
    //         if(presentquestion===0 ){
    //           // setLgShows(false)
    //           setVideoTime('')
             

              
    //         }
          
    //          if(presentquestiondate<=currentdate && presentquestion!==0 && (i+1)==(perquestionss) ){
    //            console.log('value of i',i )
    //           //  setLgShows(false)
    //           let newquestion = currentdate - presentquestiondate
    //           setVideoTime(Math.round(newquestion/1000))
    //           console.log('@@@@@@@ 1st video',newvideoTime)
            
    //          }
    //          if((i+1)!=(perquestionss)){
    //           // setLgShows(false)
    //           setVideoTime('')
    //           console.log('@@@@@@@ 2dn video',newvideoTime)
            
    //          }
            
    //          if(localStorage.getItem('success') == 2){
    //           navigate('/userhome')
            
    //          }

    //          if(localStorage.getItem('segment') && i+1 == localStorage.getItem('segment') ){
    //            nosegmentQuestion();
               
               
    //          }
             
           
    //        setFirst(i+1)
    //        setSecond(i+2)
    //        setDisabled(false)
    //        setLgShowe(false)
    //        setWrong(false)
    //        setShowNote(false)
    //        setLgShowee(false)
    //        setReenternowsuccess(false);
    //        setReenternow(true);
    //        setVideoshow(true)   
    //        console.log("sdfsdf")
    //         } 
           
          
          
         
    //       },newquestionTime+questionTime*i)


    //      setTimeout(()=>{
    //            console.log("persss",perquestionss,i+1)
              
    //            if(i+1 == filtquestion.length){
    //           quitofcontest();
              
    //           }
        
             
    //         if(i+1 <filtquestion.length){
              
    //           // if((i+1)>(perquestionss)){
    //           //   quit();
    //           //   console.log("persss1111")
             
    //           // }
              
    //           if(i+1 != perquestionss){
    //            if(i+1 > perquestionss){
    //             quit();
    //             restrictuser();
    //            console.log("persss22222")
  
    //            }
             
    //         }
         
              
    //         }
    //         setLgShowee(false)
    //         setLgShowe(false)
    //         setTimeout(()=>{
    //           perquestiondata();
    //         },900)
    //      },newquestionTime+(questionTime*i)-60000)

         
    //   }

    //     }
       
    // },[filtquestion])



    // new one 


    
    useEffect(()=>{

    

      let contestDateTime = moment(contesttime)
      console.log(contestDateTime)
      let currentdate = new Date()
      let currentTime = moment(currentdate).format("h:mm:ss")
      console.log(currentdate)
      let endTime = moment(contesttime).add(4,'minutes')
      console.log(endTime)
      let difference = endTime - contestDateTime
       console.log(difference)
       let newdifference = currentdate - contestDateTime;
       console.log(newdifference)
       console.log(contestDateTime < currentdate)
       let questionTime = filtquestion.slice(0,1).map((question,index) =>{ return question.totaltiming*60000 })
       console.log("kkkk",questionTime[0])
       let questionTimee = questionTime[0]
       console.log("hhhhhh",questionTimee)
       let newquestionTime = questionTimee - newdifference

      //  let perquestion = (currentdate - contestDateTime)/questionTimee;
      //  console.log('@@@@@@@ round',perquestion,Math.round(perquestion),Math.floor(perquestion))
      //  let perquestionss =  Math.floor(perquestion)
      //  let presentquestion = Math.floor(perquestion) * questionTimee
      //  let presentquestiondate = moment(contesttime).add(presentquestion,'milliseconds')
      //  console.log(presentquestiondate)

       

      //  important logic for tommorow
       
      //  let perquestion = questionTime[0]+questionTime[0]
       
      //  perquestionss  = length(questionTime if it is quest[0]+ques[1] then perquestionss will 2 )
       
      //  presentquestion = (questionTime[0]+questionTime[1])

      //  presentquestiondate = moment(contestTime).add(presentquestion,'milliseconds')

      
       let  perquestionss = present.length
       let  presentquestion
       if(present.length == 1){
          presentquestion = present[0]
          
       }
       if(present.length == 2 ){
         presentquestion = present[0]+present[1]
         
       }
       if(present.length > 2){
         presentquestion = present[0]+present[present.length-1]
        
       }

         
        console.log("qqqq",present,present.length,presentquestion)

        let presentquestiondate = moment(contesttime).add((presentquestion*60000)+(60000*present.length),'milliseconds')

        console.log("qqqq",presentquestiondate,(presentquestion*60000)+60000)


      //  let newperquestionss = Math.floor(perquestion) + 1
      //  let newpresentquestion = newperquestionss * questionTime
      //  let newpresentquestiondate = moment(contesttime).add(newpresentquestion,'milliseconds')
    
      
       if(contestDateTime <= currentdate ){
      
       
         setVideoTime(Math.round(newdifference/1000))
         
           
        for(let i=0;i<filtquestion.length;i++){


          let questionsTime = filtquestion.slice(i,i+1).map((question,index)=>{ return question.totaltiming*60000} )
          let ques = questionsTime[0]
          console.log("@@@@@@@@",questionsTime,ques)
          console.log("qqqqq",(i<=1 ? (newquestionTime+ques*i) : (newquestionTime+ques)))
        
          // filtquestion.slice(i,i+1).map((question,index)=>{return console.log("aaaaaaa",question.totaltiming*60000) })
          const newss = setTimeout(()=>{
            console.log("@@@@@@  ran for this times @@@@@ ",perquestionss,i+1,presentquestion)
            
           

            if(i+1 == filtquestion.length){
              quitofcontest();
              
              }
          
  
          //   if(i+1 <filtquestion.length && (i+1)!=(perquestionss) ){
            
          //     quit();
          //   console.log("dsfd")
           
          
          
          // }
          
          if(i+1 == filtquestion.length){
            navigate("/userhome")
            
            }

 
          if(i+1 <filtquestion.length ) {
            notrestrictuser();
            if(presentquestion===0 ){
              // setLgShows(false)
              setVideoTime('')
             

              
            }
          
             if(presentquestiondate<=currentdate && presentquestion!==0 && (i+1)==(perquestionss) ){
               console.log('value of i',i )
              //  setLgShows(false)
              let newquestion = currentdate - presentquestiondate
              setVideoTime(Math.round(newquestion/1000))
              console.log('@@@@@@@ 1st video',newvideoTime)
            
             }
             if((i+1)!=(perquestionss)){
              // setLgShows(false)
              setVideoTime('')
              console.log('@@@@@@@ 2dn video',newvideoTime)
            
             }
            
             if(localStorage.getItem('success') == 2){
              navigate('/userhome')
            
             }

             if(localStorage.getItem('segment') && i+1 == localStorage.getItem('segment') ){
               nosegmentQuestion();
               
               
             }
             
         
           setFirst(i+1)
           setSecond(i+2)
           setDisabled(false)
           setLgShowe(false)
           setWrong(false)
           setShowNote(false)
           setLgShowee(false)
           setReenternowsuccess(false);
           setReenternow(true);
           setVideoshow(true)   
           console.log("sdfsdf")
            } 
           
          
           
         
          },(i<=1 ? (newquestionTime+ques*i)+(60000*(i+1)) : (newquestionTime+ques)+(60000*(i+1))))
          

        setTimeout(()=>{
               console.log("persss",perquestionss,i+1)
               let questionsTimeee = filtquestion.slice(i,i+1).map((question,index)=>{ return question.totaltiming} )
               if(i+1 == filtquestion.length){
               quitofcontest();
              
              }
        
             
            if(i+1 <filtquestion.length){
              
              // if((i+1)>(perquestionss)){
              //   quit();
              //   console.log("persss1111")
             
              // }
              
              if(i+1 != perquestionss){
               if(i+1 > perquestionss){
                quit();
                restrictuser();
               console.log("persss22222")
  
               }
             
            }

            setTimeout(()=>{
              broadcatingvalue([questionsTimeee[0],i+1]);
            },45000)  
          
            }
            setLgShowee(false)
            setLgShowe(false)
            setTimeout(()=>{
              perquestiondata();
            },900)
          
          
         },(i<=1 ? (newquestionTime+ques*i)+(60000*(i)) : (newquestionTime+ques)+(60000*(i))))
        
         
      }

        }
       
    },[filtquestion])











    // useEffect(()=>{

    

    //   let contestDateTime = moment(contesttime)
    //   console.log(contestDateTime)
    //   let currentdate = new Date()
    //   let currentTime = moment(currentdate).format("h:mm:ss")
    //   console.log(currentdate)
    //   let endTime = moment(contesttime).add(4,'minutes')
    //   console.log(endTime)
    //   let difference = endTime - contestDateTime
    //    console.log(difference)
    //    let newdifference = currentdate - contestDateTime;
    //    console.log(newdifference)
    //    console.log(contestDateTime < currentdate)
    //    let questionTime = (starttime[0] * 60000)
    //    let newquestionTime = questionTime - newdifference


    //    let perquestion = (currentdate - contestDateTime)/questionTime;
    //    console.log('@@@@@@@ round',Math.round(perquestion),Math.floor(perquestion))
    //    let perquestionss = Math.floor(perquestion)
    //    let presentquestion = Math.floor(perquestion) * questionTime
    //    let presentquestiondate = moment(contesttime).add(presentquestion,'milliseconds')
    //    console.log(presentquestiondate)
       
     
    
      
    //    if(contestDateTime <= currentdate ){
       
      
       
    //      setVideoTime(Math.round(newdifference/1000))
        
        

    //     for(let i=0;i<filtquestion.length;i++){
       

    //       let questionsTime = (starttime[i] * 60000)
          
    //       console.log('@@@@@ times',questionsTime,newquestionTime)
    //       const newss = setTimeout(()=>{
          
          
    //           if(i+1 == filtquestion.length){
    //             quitcontest();
                
    //             }
    
     
    //           if(i+1 <filtquestion.length ) {
            
    //             if(presentquestion===0 ){
             
    //               setVideoTime('')
  
                  
    //             }
              
    //              if(presentquestiondate<=currentdate && presentquestion!==0 && (i+1)==(perquestionss) ){
    //                console.log('value of i',i )
                
    //               let newquestion = currentdate - presentquestiondate
    //               setVideoTime(Math.round(newquestion/1000))
    //               console.log('@@@@@@@ 1st video',newvideoTime)
                
    //              }

    //               if((i+1)!=(perquestionss)){
                              
    //               setVideoTime('')
    //               console.log('@@@@@@@ 2dn video',newvideoTime)
    //               }
                
                
    //            setFirst(i+1)
    //            setSecond(i+2)
    //            setDisabled(false)
    //            setWrong(false)
              
    //            console.log("sdfsdf")}
              
             
             
    //       },i<=1 ? newquestionTime+questionsTime*i : newquestionTime+((starttime[i-1] * 60000)+(starttime[i] * 60000)))
    //   }

    //     }
       
    // },[filtquestion])



   


  //  useEffect(()=>{
   
  //     let CurrentDateTiming = new Date()
  //     console.log(CurrentDateTiming)
     
       
  //     let QuestionStartTiming = moment(contesttime)
  //     console.log(QuestionStartTiming);
  //     let QuestionEndTiming = moment(contesttime).add(2,'minutes');
  //     console.log(QuestionEndTiming);
  //     let Difference = QuestionEndTiming - QuestionStartTiming
  //     console.log(Difference)
  //     let newDifference = CurrentDateTiming - QuestionStartTiming
  //     let newQuestionTime = Difference - newDifference
  //     let totalQuestion = filtquestion.length
  //     times[0] = newQuestionTime
  //     console.log(times[0])
  //     setVideoTime(Math.round(newDifference/1000))
  //    for(let i=0;i<filtquestion.length;i++){
  //     const newss = setTimeout(()=>{
        
  //       if(i+1 == totalQuestion){
  //         quitcontest();
  //       }
        
        
  //       if(i+1 < totalQuestion){

  //              setFirst(first+1)
  //              setSecond(second+1)
  //              setDisabled(false)
  //              setWrong(false)
              
  //       }
          
            
  //              },times[i])
               
     
  
  //           }

  //   }

  //   ,[filtquestion])




    // useEffect(()=>{
      
    //   for(let i=0;i<filtquestion.length;i++){
    //  const ddd = filtquestion.slice(first, second).map((it)=>{
    //     return  it.questionTime
    //    })
    //    console.log(ddd[0])
    //   let QuestionStartTiming = moment(contesttime)
    //   console.log(QuestionStartTiming);
    //   let QuestionEndTiming = moment(contesttime).add(ddd[0],'minutes');
    //   console.log(QuestionEndTiming);
    //   let Difference = QuestionEndTiming - QuestionStartTiming
    //   console.log(Difference)
    //   let CurrentDateTiming = new Date()
    //   let VideoDelay = CurrentDateTiming - QuestionStartTiming

    //   setVideoTime(Math.round(VideoDelay/1000))
      
    //   const newss = setTimeout(()=>{
      
    //            setFirst(i+1)
    //            setSecond(i+2)
    //            setDisabled(false)
    //            setWrong(false)
             
    //            console.log("sdfsdf")},Difference)
    //   }

    // },[filtquestion])


  const newVideo = filtvideo.slice(firsts, seconds);
 


    const newArr = filtquestion.slice(first, second);
     console.log(score)
     console.log(first , second)
     console.log('@@@@',selectedans)
     console.log('@@@',correctoption)
     console.log("questionss",newArr)



    const videoplayed = ()=> {

      console.log("eee")
      setVideoshow(false)
      setShow(true)
    }

    const navigate = useNavigate();
    let location = useLocation();
     
    useEffect(()=>{
        
        const filteredQuestions = location.state.question.filter((item)=>
        item.contestId == location.state.draftid
        )
    
          setFiltQuestions(filteredQuestions)
         console.log(filteredQuestions);

         
         const filteredVideo = location.state.video.filter((item)=>
         item.contestId == location.state.draftid
         )
     
         setFiltVideo(filteredVideo)
          console.log(filteredVideo);
           setContestTime(location.state.ContestTime)
           setEntryAmount(location.state.entryamount)
           setContestId(location.state.contests)
           setUserId(location.state.userid)
           setPresent(location.state.present)
           console.log("aaaaa",location.state.ContestTime,location.state.entryamount,location.state.contests)
           
    //    setQuestions(location.state.question )
    //     setDraftid(location.state.draftid)
    //      setVideos(location.state.video)
       

       
      
     },[])

function correctAns(e){
    
    
     setSelectedans(e.target.value)
    //  localStorage.setItem('selectedanss',e.target.value );
    //  console.log(newArr[0].correctanswer)
    //  localStorage.setItem('correctans',newArr[0].correctanswer );
    
}

function submitans(){
     localStorage.setItem('selectedanss',selectedans );
     console.log(newArr[0].correctanswer)
     localStorage.setItem('correctans',newArr[0].correctanswer );
    var ele = document.getElementsByName("options");
    for(var i=0;i<ele.length;i++){
       ele[i].disabled = true;
    }
    setShowNote(true)

    if(newArr[0].correctanswer === selectedans){
        
        setScore(score+1)
        setCorrectoption(newArr[0].correctanswer)
        setDisabled(true)
        setWrong(false)
        // setLgShowss(true)
        // setConfetti(true)

        
    }else{
        
      //  setLgShows(true)
        setWrong(true)
        setDisabled(false)
       
    }

}

function quitcontest(){
   setLgShow(true)
  
   
}



function fff(){
  // let vid = document.getElementById('video')
  // console.log("hhhhhhhh",Math.round(vid.currentTime*1000))
  
  // setQuestionshow(true)
  // setVideoshow(false)
  // segmentQuestion();

}

function continuee(){

  setLgShowee(false)

}




 return (
   
   <>
    <Header />
    <SidenavBar />
    
    <div className="mobile-menu-overlay"></div>

<div className="main-container admincontainer">
 
  <div className="pd-ltr-20">
    <div className="card-box mb-30 admincreate">
  
    {/* <span id="currentFrame">0</span> */}


                <div className="question bg-white p-3 border-bottom">
                    <div className="d-flex flex-row justify-content-between align-items-center mcq">
                       <h4>Contest</h4>{show && <span>({second} of {filtquestion.length})</span>}
                       
                    </div>
                </div>
                <div className="question bg-white p-3 border-bottom">
                <Confetti active={confetti} config={config} style={{width:'100%',height:'100%'}} />
                <br></br>
                { newArr.map((question,index)=>{
                    return <>
                    {question.totalquestions && localStorage.setItem("segment",question.totalquestions)}
                    {/* {question.videolink ? setVideoshow(true) : setVideoshow(false)} */}
                   {/* {question.videolink && <iframe width="890" height="500" id='player' src={`https://www.youtube.com/embed/${question.videolink}?autoplay=1&mute=1&start=${newvideoTime}&end=45`} frameborder="0" allowfullscreen allow="autoplay" onLoad={ffff} ></iframe>} */}
                   {videoshow && question.videolink ? <ReactPlayer  id='player' url={`https://www.youtube.com/embed/${question.videolink}?autoplay=1&mute=1&start=${newvideoTime}&end=${question.questionTime}`} frameborder="0" allowfullscreen playing={true} allow="autoplay" onEnded={segmentQuestion} muted></ReactPlayer>
                   :<><div className="d-flex flex-row align-items-center question-title">
                        
                        <h4 className="text-danger">Q.{second}</h4>

                        <h5 className="mt-1 ml-2">{question.question}</h5>
                    </div>
                    <br></br>
                    
                    <div className="ans ml-2 dpx" onChange={(e) => correctAns(e)}   >
                       <label>
                       <input type="radio" name="options" value='option1' class="option-input radio"   /> {question.options[0].option1}</label>
                       <label> <input type="radio" name="options" value='option2' class="option-input radio"   /> {question.options[0].option2}</label>
                      
                       
                       <label> <input type="radio" name="options" value='option3'class="option-input radio"  /> {question.options[0].option3}</label>
                       <label> <input type="radio" name="options" value='option4' class="option-input radio" />{question.options[0].option4}</label>
                    </div>
                     </> 
                }
                    </>
                } )}
            
                   
                    <br></br>
               { shownote &&  <span style={{color:'green'}}>Option got Selected Please Wait for Result!!</span> }
               {/* { wrong &&  <span style={{color:'red'}}>Wrong Answer  </span> } */}
                    
                </div>
               {
                <div className="d-flex flex-row justify-content-between align-items-center p-3 bg-white"><button className="btn btn-primary d-flex align-items-center btn-warning" type="button"onClick={submitans} >Submit</button>
               <div> <button className='btn btn-primary border-danger align-items-right btn-danger' id="quit" onClick={quitcontest}>Quit</button>
            { second == filtquestion.length ?  null :
            <button className="btn btn-primary border-success align-items-center btn-success nextbutton" style={{marginLeft:'8px'}} type="button" id="nextbutton" disabled onClick={nextQuestion}>Next<i className="fa fa-angle-right ml-2"></i></button>}
            </div>
            </div>}
            
            </div>
            
        </div>
    </div>
  
    <ToastContainer  autoClose={3000} />
     
   
     <ModalSuccess  score={score} filtquestionlength={filtquestion.length} lgShow={lgShow} setLgShow={setLgShow} />


     <ModalPerQuestion correctoption={correctoption} selectedans={selectedans} second={second} continuee={continuee} lgShows={lgShows} setLgShows={setLgShows} />

     <Modal
            size="md"
            show={lgShowe}
            onHide={() => setLgShowe(false)}
            backdrop="static"
            keyboard={false}
            aria-labelledby="example-modal-sizes-title-lg"
         
		
      >
        <Modal.Header >
          <Modal.Title id="example-modal-sizes-title-lg">
          Statistics
          </Modal.Title>

          </Modal.Header>

           <Modal.Body className='bb2'>
          
              <div className="row">
                    <div className="col-md-6">
                        <div className="text-center mt-2"> <img src="https://i.imgur.com/zZUiqsU.png" width="200" /> </div>
                    </div>
                    <div className="col-md-6">
                        <div className="text-white mt-4"> <span className="intro-1">Oh no! Incorrect answer </span>
                        <div className="mt-2"> <span className="intro-2">Initial Contestants : {informationcorrect &&informationcorrect[2]}</span> </div>
                            <div className="mt-2"> <span className="intro-2">Remaining Contestants :{informationcorrect && informationcorrect[0]}</span> </div>
                           { second !=filtquestion.length  &&<> <div className="mt-2"> <span className="intro-2">Do You Want To Re-enter :{informationcorrect &&informationcorrect[1]}</span> </div>
                            <div className="mt-4 mb-5"> { reenternow && <button className="btn btn-primary" onClick={reenter} >Re-enter<i className="fa fa-cloud-download"></i></button>}
                            { reenternowsuccess && <button className="btn btn-success" >Re-entered<i className="fa fa-check"></i></button>} 
                            </div></>}
                        </div>
                    </div>
                </div>

			      </Modal.Body>
           
                  </Modal>
  
  


  
                  <Modal
            size="md"
            show={lgShowee}
            onHide={() => setLgShowee(false)}
            backdrop="static"
            keyboard={false}
            aria-labelledby="example-modal-sizes-title-lg"
         
		
      >
        <Modal.Header >
          <Modal.Title id="example-modal-sizes-title-lg">
           Statistics 
          </Modal.Title>

          </Modal.Header>

           <Modal.Body className='bb'>

                <div className="row">
                    <div className="col-md-6">
                        <div className="text-center mt-2"> <img src="https://i.imgur.com/zZUiqsU.png" width="200" /> </div>
                    </div>
                    <div className="col-md-6">
                        <div className="text-white mt-4"> <span className="intro-1">Congrats! You gave correct answer</span>
                        <div className="mt-2"> <span className="intro-2">Initial Contestants : {informationcorrect &&informationcorrect[2]}</span> </div>
                            <div className="mt-2"> <span className="intro-2">Remaining Contestants : {informationcorrect && informationcorrect[0]}</span> </div>
                            <div className="mt-2"> <span className="intro-2">Your Total Earning : {informationcorrect &&informationcorrect[1]}</span> </div>
                            <div className="mt-4 mb-5"> <button className="btn btn-primary" onClick={cashout}>Cash Out<i className="fa fa-cloud-download"></i></button> </div>
                        </div>
                    </div>
                </div>

			      </Modal.Body>
                   
                  </Modal>
  


  
                  <Modal
            size="md"
            show={lgShowend}
            onHide={() => setLgShowend(false)}
            backdrop="static"
            keyboard={false}
            aria-labelledby="example-modal-sizes-title-lg"
         
		
      >
        <Modal.Header >
          <Modal.Title id="example-modal-sizes-title-lg">
            Contest Result  
          </Modal.Title>

          </Modal.Header>

           <Modal.Body className='bb3'>

              <div className="row">
                    <div className="col-md-6">
                        <div className="text-center mt-2"> <img src="https://i.imgur.com/zZUiqsU.png" width="200" /> </div>
                    </div>
                    <div className="col-md-6">
                        <div className="text-white mt-4"> <span className="intro-1">Congrats! You are at the end of Contest</span>
                            <div className="mt-2"> <span className="intro-2">Total Poll : {totalPoll && totalPoll[0]}</span> </div>
                            <div className="mt-2"> <span className="intro-2">Total Winners : {totalPoll &&totalPoll[1]}</span> </div>
                            <div className="mt-2"> <span className="intro-2">Each Contestant Won : {totalPoll && totalPoll[2]}</span> </div>
                            <div className="mt-4 mb-5"><Link to="/userhome"> <button className="btn btn-primary">Quit<i className="fa fa-cloud-download"></i></button></Link> </div>
                        </div>
                    </div>
                </div>
   
			      </Modal.Body>
                   
                  </Modal>
  
  
  
    
                  <Modal
            size="md"
            show={showenter}
            onHide={() => setShowEnter(false)}
            backdrop="static"
            keyboard={false}
            aria-labelledby="example-modal-sizes-title-lg"
         
		
      >
        

           <Modal.Body>
           <div className="result_box">
           <div className="icon">
            <FaCrown />
            </div>
            <div className="score_text" style={{color:'green',textAlign:'center'}}>
             Wait for 15 sec . We are let you enter in contest
            </div>   
              </div>
          
   
			      </Modal.Body>
                   
                  </Modal>
  
  
  
  
  
  
   </>


)

}




export default Livecontest