import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import SidenavBar from "../../Components/SidenavBar";
import "./Contest.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuestionList from "./QuestionList";
import NewQuestionModal from "./NewQuestionModal";
import {
	BrowserRouter as Router,
  useNavigate,
  useLocation,useParams
  } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import moment from "moment";
import { refreshTokens } from "../../Utils/refreshToken";


const Contest = () => {
  const [user, setUser] = useState("");
  const [data , setDatas] = useState([]);
  const [questionType, setQuestionType] = useState("");
  const [questionList,setQuestionList] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [adminId,setAdminId] = useState("")
  const [newQuestionModal,setnewQuestionModal] = useState(false);
  const [contestId , setContestId] = useState('');
  const [all ,setAll] = useState({});
  const [segment , setSegment] = useState();

 
  const navigate = useNavigate();
  let location = useLocation();
   
  useEffect(()=>{
  
     addData();
    
   },[])

   function addData(){
     console.log(location , location.state)
     setUser(location.state.user )
     setContestId(location.state.state)
      setAdminId(location.state.adminId)
      setSegment(location.state.segment)
   
    

      }
      
   

  // const getUser = async () => {
  //   const token = sessionStorage.getItem("token");
  //   const BASE_URL = `${process.env.REACT_APP_BASE_URL}/home`;
  //   try {
  //     let data = await axios.get(BASE_URL, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setAdminId(data.data.id)
  //     setUser(data.data.user);
  //   } catch (e) {
  //     // console.log(e.response)
  //   }
  // };

  const getQuestions = async () => {
 
    const BASE_URL = `${process.env.REACT_APP_BASE_URL}/question/getQuestion`;
    try {
      let data = await axios.get(BASE_URL);

      setDatas(data.data);
    } catch (e) {
     toast.error(e)
  }
}

  useEffect(() => {
    
    getQuestions()
  }, []);






  const columns =  React.useMemo(() => [
	
		{
		  name: "Question",
		  selector: row=> `${row.question}`,
		  sortable: true
		},
		{
		  name: "Options",
		  selector:  row=> `${row.options}`,
		  sortable: true,
		  wrap:true
		 
		  
		},
		{
			name: "Video Link",
			selector:  row=> `${row.videolink}`,
			sortable: true,
			wrap:true
		   
			
		  },
      {
        name: "Total Video Time",
        selector:  row=> `${row.totalVideoTime}`,
        sortable: true,
        wrap:true
         
        
        },
		{ 
			 
			name: "Actions",
			key: "action",
			text: "Action",
			className: "action",
			width: 100,
			align: "left",
			sortable: false,
			cell: (record ,e,index) => {
			  return (
				<>
				 {!record.publish == true ?
				  <button
					className="btn btn-warning btn-sm"
					onClick={() => {
					  // onEdit(record);
					  
					}}
				  >
					 Modify
				  </button>:
				   <button
				   className="btn btn-warning btn-sm"
				   disabled
				 >
					Modify
				 </button>}

				   &nbsp;
				   &nbsp;
				  <button
					className="btn btn-danger btn-sm"
					onClick={() => {
					  // onDelete(record);
					}}
				  >
					Delete
				  </button>
				  &nbsp;
				  &nbsp;
				
				 
				
				 <button
				  className="btn btn-success btn-sm"
				  onClick={() => {
					// onView(record);
				  }}
				>
				  View
				</button>
         
		

                
						  </>
			  );
			  
			 },
			 
			

				}
	  ]);


  const tableData = {
       
	    columns,
		data

  }

  useEffect(() => {
    let status = localStorage.getItem("loginStatus");
    if (!status) {
      navigate("/");
    }
    
      
  }, []);

  

  return (
    <>
      <Header user={user} />

      <SidenavBar />

      <div className="mobile-menu-overlay"></div>

      <div className="main-container admincontainer" >
        <div className="pd-ltr-20" style={{height:'100vh'}}>
          <div className="card-box mb-30 admincreate">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde hic
              non repellendus debitis iure, doloremque assumenda. Autem modi,
              corrupti, nobis ea iure fugiat, veniam non quaerat mollitia animi
              error corporis.
            </p>
            <h1>Please Add Question</h1>
              <br></br>
            <button class="custom-btn btn-12" onClick={()=>setnewQuestionModal(true)}><span>Add Now!</span><span>Add Question</span></button>
            
            {/* <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {questionType?questionType:"Please choose option"}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button className="dropdown-item" onClick={()=> setQuestionType("Video")}>
                  Based on Video
                </button>
                <button className="dropdown-item" onClick={()=> setQuestionType("MCQ")}>
                  MCQ based
                </button>
                <button className="dropdown-item" onClick={()=> setQuestionType("Yes/No")}>
                  Yes/No based
                </button>
              </div>
            </div>
            <div className="questionType">
                {questionType === "Video" && <div>
                
                  <QuestionList questionList={questionList} setCurrentPage={setCurrentPage} setnewQuestionModal={setnewQuestionModal}/>
                </div> }
                {questionType === "MCQ" && <div>
                  <QuestionList questionList={questionList} setCurrentPage={setCurrentPage} setnewQuestionModal={setnewQuestionModal}/>
                </div> }
                {questionType === "Yes/No" && <div>
                  <QuestionList questionList={questionList} setCurrentPage={setCurrentPage} setnewQuestionModal={setnewQuestionModal}/>
                </div> }

            </div> */}
          <div className="pd-30" style={{paddingLeft:'6px',paddingTop:'45px'}}>
					<h4 className="text-blue h4">Question List</h4>
					</div>
					<div className="pb-20">
                       
					<div className="pl-20 pr-20">

					<DataTableExtensions {...tableData}  print={false}
		            export={false}>
                    <DataTable
                    columns = {columns}
                    data={data}
                    noHeader
                    defaultSortField="id"
                    defaultSortAsc={false}
                    pagination
                    highlightOnHover
		                paginationRowsPerPageOptions = {[10, 15, 20, 25, 30]}
					
		 
                    />
                   </DataTableExtensions>
		
            </div>
				 	  </div>
		
            
          <NewQuestionModal segment={segment} adminId={adminId} newQuestionModal={newQuestionModal} setnewQuestionModal={setnewQuestionModal} contestId={contestId}/>
          </div>

          {/* <Footer /> */}
        </div>
      </div>

      <ToastContainer autoClose={7000} />
    </>
  );
};

export default Contest;
