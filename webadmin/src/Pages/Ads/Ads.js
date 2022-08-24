import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../Components/Header";
import SidenavBar from "../../Components/SidenavBar";
import {
	BrowserRouter as Router,
  useNavigate,
  useLocation,useParams
  } from "react-router-dom";

const Ads = () => {
   
    const [adId, setAdId] = useState()
    const [adminId, setAdminId] = useState()
    const [user, setUser] = useState()
    console.log(adId,adminId)

    let location = useLocation();

    useEffect(()=>{
  
        addData();
       
      },[])

      function addData(){
     
        setAdId(location.state.adId);
         setAdminId(location.state.adminId)
         setUser(location.state.user)
   
         }


  return (
    <>
     
     <Header user={user} />

      <SidenavBar />
    
    
    
    </>
  )
}

export default Ads