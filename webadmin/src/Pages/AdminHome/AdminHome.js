import React from 'react'
import axios from "axios";
import {useState, useEffect } from "react";
import Header from '../../Components/Header';
import SidenavBar from '../../Components/SidenavBar';
import './AdminHome.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Form, Row, ModalFooter } from "react-bootstrap";
import moment from "moment"
import { FaBullseye, FaPlus, FaStackOverflow } from "react-icons/fa";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { refreshTokens } from '../../Utils/refreshToken';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useNavigate,
	Navigate
  } from "react-router-dom";
  import { TiInputChecked } from "react-icons/ti";
import Table from '../../Components/Table';



const AdminHome = () => {
   
	const [dataads,setAdsDatas] = useState([]);
	const [data , setDatas] = useState([]);
	const [user, setUser] = useState("");
	const [drafttime, setDraftTime] = useState("")
    const [draftcontestName, setDraftContestName] = useState("")
    const [draftcontestDetails, setDraftContestDetails] = useState("")
	const [lgShow, setLgShow] = useState(false);
	const [lgShows, setLgShows] = useState(false);
	const [lgShowsview, setLgShowsview] = useState(false);
	const [userId, setUserId] = useState(0);
	const [FilePath, setFilePath] = useState("")
	const [editId , setEditId] = useState();
	const [editcontestName,setEditContestName] = useState('');
	const [editcontestDetails,setEditContestDetails] = useState('');
	const [editcontestTime,setEditContestTime] = useState('');
	const [publishedData ,setPublishedData] = useState([]);
	const [records,setRecord] = useState([]);
	const [questions,setQuestions ] = useState([]);
	const [questionss,setQuestionss ] = useState([]);
	const [showquestion, setShowquestion] = useState(false);
	const [first , setFirst] = useState(0);
    const [second, setSecond] = useState(1);
	const [totalcon,setTotal] =useState([])
	const [entryamount,setEntryAmount] = useState();
	const [segment,setSegment] = useState();
	const [lgShowads,setLgShowAds] = useState(false);
	const [uploaded,setUploaded] = useState(false);
	const [filepath,setFilepath] = useState("");
	const [adname,setAdName] = useState("");
	const [adtime,setAdTime] = useState("");
	const [adwinningamount,setAdWinningAmount] = useState();
	const [selectedFile, setSelectedFile] = useState("");
	const [addetails,setAdDetails] = useState("");
	const [agefrom,setAgeFrom] = useState();
	const [ageto , setAgeTo] = useState();
	const [location,setLocation] = useState("");
	

	const onChangeHandler = (event) =>{
		setSelectedFile(event.target.files[0]);
		console.log(event.target.files[0]);
	}

    const navigate = useNavigate();
   
	const newArr = records.questions && records.questions.slice(first, second);
     const nextQuestion = ()=> {
     
   
     
         if((first+1) < records.questions.length ){
            setFirst(first+1)
            setSecond(second+1)
           
         }else {
             
            
			 setFirst(0)
            setSecond(1)
             
         }

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    // formData.append("document", JSON.stringify(obj))

    const BASE_URL = `${process.env.REACT_APP_BASE_URL}/admincontest/upload`;

    try {
      let data = await axios.post(BASE_URL, formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },


      }
      );
      toast.success("Image Uploaded Successfully");
      setFilepath(data.data.filePath)
      setUploaded(true)
      console.log(data.data.filePath);
    } catch (e) {
      toast.error(e.message);
      console.log(e.response)
    }
  }

	function onEdit(record) {
         setEditId(record._id)
		 setEditContestName(record.contestName)
		 setEditContestDetails(record.contestDetails)
		 setEditContestTime(record.contestTime)
		 setLgShows(true)


	}

	const onView= async(record) => {
        
		 setRecord(record)
	// 	 const BASE_URL = `${process.env.REACT_APP_BASE_URL}/getQuestions`
 
	// 	 try {
	// 		let data = await axios.get(BASE_URL).then((res)=>{

	// 			const filteredQuestions = res.data.filter((item)=>
	// 			item.contestId == record._id
	// 			)

    //             setQuestions(filteredQuestions)
	// 		console.log(filteredQuestions[0]);
	// 		 });
			
		  
		 
	//    } catch (e) {
	   
	// 	 toast.error(e.message);
			 
	//    }


         

		 setLgShowsview(true)

	}

	const onDelete = async (record)=> {
		 const id = record._id
		 console.log(id)
		const BASE_URL = `${process.env.REACT_APP_BASE_URL}/getDraftContests/${id}`
 
		try {
			const data = await axios.delete(BASE_URL);
            console.log("dfdsfsdfsd",data.data)
		   const filteredData = data.data.draftcontestnew.filter((item)=>
		   item.adminId == userId

		  )
	 
		   setDatas(filteredData);
		   toast.success("Contest Deleted Successfully")
		 
		
	  } catch (e) {
	  
		toast.error(e.message);
			
	  }
  
			
	 }




	const onEditUpdate = async (e)=> {
        e.preventDefault()
		const BASE_URL = `${process.env.REACT_APP_BASE_URL}/getDraftContests/${editId}`
		 let sendData = {
			   contestName:editcontestName,
			   contestDetails:editcontestDetails,
			   contestTime:editcontestTime
		 }
		 try {
			const data = await axios.put(BASE_URL,sendData);
			console.log(data)
			setLgShows(false)
			axios.get(`${process.env.REACT_APP_BASE_URL}/getDraftContests`).then((res) => {
           console.log(res.data)
	       const filteredData = res.data.filter((item)=>
	        item.adminId == userId
	          )

	       setDatas(filteredData);
	 
            });
			toast.success("Contest Updated Successfully")


		 }
		 
		 catch(e){
			toast.error(e)
		 }

	}

	

	
	const columns =  React.useMemo(() => [
	
		{
		  name: "Name",
		  selector: row=> `${row.contestName}`,
		  sortable: true
		},
		{
		  name: "Details",
		  selector:  row=> `${row.contestDetails}`,
		  sortable: true,
		  wrap:true
		 
		  
		},
		{
			name: "Entry Amount",
			selector:  row=> `₹ ${row.EntryAmount}`,
			sortable: true,
			wrap:true
		   
			
		  },
		{
		  name: "Time",
		  selector: row=> `${moment(row.contestTime).format("MMMM Do YYYY, h:mm:ss a")}`,
		  sortable: true,
		  
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
					  onEdit(record);
					  
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
					  onDelete(record);
					}}
				  >
					Delete
				  </button>
				  &nbsp;
				  &nbsp;
				
				 
				
				 <button
				  className="btn btn-success btn-sm"
				  onClick={() => {
					onView(record);
				  }}
				>
				  View
				</button>
         
				&nbsp;
				  &nbsp; 
				  {!record.publish == true ?
					<button
					className="btn btn-primary btn-sm"
				 
					onClick={() => {
					  publishContest(record,index);
					  
					}}
				  >
					Publish
				  </button>:
				 <h6 className="success">Published</h6>}

                
						  </>
			  );
			  
			 },
			 
			

				}
	  ]);
    
	 
  const tableData = {
       
	    columns,
		data

  }
 

 

  const createAd = async (e)=> {
	e.preventDefault()
	const token = sessionStorage.getItem("token");
	const refreshToken = localStorage.getItem("refreshToken");
	const BASE_URL = `${process.env.REACT_APP_BASE_URL}/ads/createAd`
	let sendData = {
		adName:adname,
		adImage:filepath,
		adDetails:addetails,
		adTime: adtime,
		winningAmount: adwinningamount,
	    publish:false,
		ageGroup:[agefrom,ageto],
		location:location
	  
	}
	try {
	  let post = await axios.post(BASE_URL, sendData,{ 
		headers: {
		"authorization": token,
	  },
	});
   
   
      console.log(post.data.Ad.id,post.data.Ad.user.name,"cccccc")
	
	 
  
	  toast.success("Ad Created")
	  setAdName("")
	  setAdTime("")
	  setAdDetails("")
	  setLgShowAds(false)
	  setUploaded(false)
	 
	  navigate("/ads",{state:{ adId:post.data.Ad.id,adminId:userId,user:user }   
		});
	} catch (e) {
	
	  toast.error(e.message);

		  
	}

		  
   }
 

	const getContest = async (e)=> {
	e.preventDefault()
	const token = sessionStorage.getItem("token");
	const refreshToken = localStorage.getItem("refreshToken");
	const BASE_URL = `${process.env.REACT_APP_BASE_URL}/admincontest/createContest`
	let sendData = {
	  contestName:draftcontestName,
	  contestDetails:draftcontestDetails,
	  contestTime: drafttime,
	  EntryAmount: entryamount,
	  segment:segment,
	  publish:false
	  
	}
	try {
	  let post = await axios.post(BASE_URL, sendData,{ 
		headers: {
		"authorization": token,
	  },
	});
    axios.get(`${process.env.REACT_APP_BASE_URL}/admincontest/getContest`,{
		headers: {
			"authorization": token,
		  },
	 }).then((res) => {
   

	 const filteredData = res.data.filter((item)=>
	  item.user.id == userId
	  
	 )


	  setDatas(filteredData);
	 
    });
	  toast.success("Contest Created")
	  setDraftContestName("")
	  setDraftTime("")
	  setDraftContestDetails("")
	  setLgShow(false)
	 
	  navigate("/contest",{state:{ state:post.data.contest.id,adminId:userId,user:user,segment:post.data.Segment }   
		});
	} catch (e) {
	
	  toast.error(e.message);

	//   if (e.response.status === 401) {
	// 	try {
	// 	  await refreshTokens(refreshToken);
	// 	  getContest();
	// 	} catch (e) {
	// 	  //console.log(e.response);
	// 	  if (e.response.status === 401) {
	// 		localStorage.clear();
	// 		navigate("/");
	// 	  }
	// 	}
	//   }
		  
	}

		  
   }
 
    const getUser =async()=>{
        const token = sessionStorage.getItem("token");
		const refreshToken = localStorage.getItem("refreshToken");
		const BASE_URL = `${process.env.REACT_APP_BASE_URL}/users/getuserid`;
        try{
         let data = await axios.get(BASE_URL,{
			headers: {
				"authorization": token,
			  },
         })
		
         setUser(data.data.name);
		 setUserId(data.data.id);
	
        }catch(e){
            // console.log(e.response)
		
			if (e.response.status === 401) {
				try {
				  await refreshTokens(refreshToken);
				  getUser();
				} catch (e) {
				  //console.log(e.response);
				  if (e.response.status === 401) {
					localStorage.clear();
					navigate("/");
				  }
				}
			  }	
        }
       
    }
    
    const publishContest = async (record) => {
	    const token = sessionStorage.getItem("token");
		const contestNames = record.contestName
		const  contestDetails = record.contestDetails
		const contestTime = record.contestTime
		const EntryAmount = record.EntryAmount
		
        const BASE_URL = `${process.env.REACT_APP_BASE_URL}/publishedcontest/liveContest`
        let sendData = {
          contestName:contestNames,
          contestDetails:contestDetails,
          contestTime:contestTime,
		  admincontestId:record.id,
		  EntryAmount:EntryAmount,
		 
        }
    
         
        try {
          let post = await axios.post(BASE_URL, sendData)
         
		//   (post.data.contests)
		//   const filteredData = post.data.draft.filter((item)=>
		//   item.adminId == userId
		//  )
		//  setDatas(filteredData);

        axios.get(`${process.env.REACT_APP_BASE_URL}/admincontest/getContest`,{
			headers: {
				"authorization": token,
			  },
		 }).then((res) => {
    
			const filteredData = res.data.filter((item)=>
			item.user.id == userId
			
		   )
		  
		  
		  setDatas(filteredData);
		  toast.success("Contest Published")
		}) 
        } catch (e) {
        
		  toast.error(e.message);
              
        }
      }
	
	  
	const getDraftContest = async () => {
	    const token = sessionStorage.getItem("token");
		const refreshToken = localStorage.getItem("refreshToken");
	const BASE_URL = `${process.env.REACT_APP_BASE_URL}/admincontest/getContest`;
	try{	
	axios.get(BASE_URL,{
		headers: {
			"authorization": token,
		  },
	 }).then((res) => {
			setTotal(res.data)
			const filteredData = res.data.filter((item)=>
			item.user.id == userId
			
		   )
        
				setDatas(filteredData);	

		
	    
		  });
		}catch(e){
			if (e.response.status === 401) {
				try {
				  await refreshTokens(refreshToken);
				  getDraftContest();
				} catch (e) {
				  //console.log(e.response);
				  if (e.response.status === 401) {
					localStorage.clear();
					navigate("/");
				  }
				}
			  }	
		}
	
   
}

  



const getSegment =async(e)=>{
	e.preventDefault()
	const token = sessionStorage.getItem("token");
	const BASE_URL = `${process.env.REACT_APP_BASE_URL}/admincontest/getSegment`
	let sendData = {
	 contestId:records.id
	  
	}
	try {
	  let post = await axios.post(BASE_URL, sendData);
	
	  navigate("/contest",{state:{ state:records.id,adminId:userId,user:user,segment:post.data.Segment }   
		});
	} catch (e) {
	
	  toast.error(e.message);
		  
	}
   
}




useEffect(() => {
    let status = localStorage.getItem("loginStatus");
    if (!status) {
      navigate("/");
    }
  }, []);


useEffect(() => {
	getUser();

	getDraftContest();
		
	  }, [userId]);

function showq(){
	setShowquestion(true)
 }

 



  return (
    <>
      
	<Header user={user} />

	<SidenavBar />

	<div className="mobile-menu-overlay"></div>
	<div className="main-container admincontainer">
    <div className="pd-ltr-20">
			<div className="card-box pd-20 height-100-p mb-30 adminhead">
				<div className="row align-items-center">
					<div className="col-md-4">
						<img src="vendors/images/banner-img.png" alt=""/>
					</div>
					<div className="col-md-8">
						<h4 className="font-20 weight-500 mb-10 text-capitalize">
							Welcome back <div className="weight-600 font-30 text-blue">{user}</div>
						</h4>
						<p className="font-18 max-width-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde hic non repellendus debitis iure, doloremque assumenda. Autem modi, corrupti, nobis ea iure fugiat, veniam non quaerat mollitia animi error corporis.</p>
					</div>
				</div>
			</div>
			<div className="row adminrow">
				<div className="col-xl-3 mb-30">
					<div className="card-box height-100-p widget-style1">
						<div className="d-flex flex-wrap align-items-center">
							<div className="progress-data">
								<div id="chart">
                                <img src="https://img.icons8.com/external-sbts2018-flat-sbts2018/58/000000/external-live-streaming-social-media-sbts2018-flat-sbts2018.png"/>
                                </div>
							</div>
							<div className="widget-data">
								<div className="h4 mb-0">{totalcon.length}</div>
								<div className="weight-600 font-14">Total Contests</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-3 mb-30">
					<div className="card-box height-100-p widget-style1">
						<div className="d-flex flex-wrap align-items-center">
							<div className="progress-data">
								<div id="chart2">
                                <img src="https://img.icons8.com/color/48/000000/contest.png"/>
                                </div>
							</div>
							<div className="widget-data">
								<div className="h4 mb-0">{data.length}</div>
								<div className="weight-600 font-14">Created Contests</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-3 mb-30">
					<div className="card-box height-100-p widget-style1">
						<div className="d-flex flex-wrap align-items-center">
							<div className="progress-data">
								<div id="chart3">
                                <img src="https://img.icons8.com/color/48/000000/prize.png"/>
                                </div>
							</div>
							<div className="widget-data">
								<div className="h4 mb-0">20</div>
								<div className="weight-600 font-14">Total Participants</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-3 mb-30">
					<div className="card-box height-100-p widget-style1">
						<div className="d-flex flex-wrap align-items-center">
							<div className="progress-data">
								<div id="chart4">
                                <img src="https://img.icons8.com/color/50/000000/wallet--v1.png"/>
                                </div>
							</div>
							<div className="widget-data">
								<div className="h4 mb-0">$660</div>
								<div className="weight-600 font-14">Wallet</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div className="card-box mb-30 admincreate" >
			<div className="pd-20">
			{/* <Dropzone 
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={800000000}>
                    {({ getRootProps, getInputProps }) => (
                        <div style={{ width: '50px', height: '50px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                          
                            <FaPlus />

                        </div>
                    )}
                </Dropzone> */}


			<Button onClick={() => setLgShow(true)} style={{position:'absolute',right:'84px'}}>Create Contests</Button>
			<Button onClick={() => setLgShowAds(true)} >Create Ads</Button>
			<Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
		
      >
        <Modal.Header >
          <Modal.Title id="example-modal-sizes-title-lg">
            Create Contests 
          </Modal.Title>
		  <button  onClick={() => setLgShow(false)} type="button" class="close close-btn" data-dismiss="modal" aria-label="Close"><span class="" aria-hidden="true">&times;</span></button>
          </Modal.Header>

           <Modal.Body>
			   
		   <form style={{padding:'20px',paddingTop:'0px'}} className='createcontest'  id="style-1" onSubmit={getContest}>
                        <div className='row'>
					    <div className="col-md-6 col-sm-12 form-group con">
	                  	<label>Contest Name</label>
	                 	<input className="form-control" type="text"  
                         placeholder="TalenX"  onChange={e => setDraftContestName(e.target.value)}  required/>
                     	</div>

						 <div className="col-md-6 col-sm-12 form-group con">
		                <label>Contest Time</label>
			             <input className="form-control"    
                         type={"datetime-local"}
                         onChange={e => setDraftTime(e.target.value)}
						 required />     
	                     </div>
                          

						 </div>
                    
                      <div className="form-group con">
		             <label>Contest Details</label>
		             <textarea className="form-control" onChange={e => setDraftContestDetails(e.target.value)}  required></textarea>
                    	</div>

                        <div className='row'>
                        <div className="col-md-6 col-sm-12 form-group con">
		                <label>Entry Amount</label>
			             <input className="form-control"    
                         type='number'
						 placeholder='Enter Contest amount'
                         onChange={e => setEntryAmount(e.target.value)}
						 required /> 
	                     </div>

						 <div className="col-md-6 col-sm-12 form-group con ">
		                <label>Total Segments in Contest</label>
			             <input className="form-control"    
                         type='number'
						 placeholder='Enter Segments in contest'
                         onChange={e => setSegment(e.target.value)}
						 required /> 
	                     </div>



						 </div>
						 
						<button  className="btn btn-primary" type='submit' >Create</button>
                        </form>   
			   
			      </Modal.Body>
                   </Modal>
                 {/* edit contest modal  */}

			     <Modal
                size="lg"
                show={lgShows}
                onHide={() => setLgShows(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                 >
               <Modal.Header closeButton>
               <Modal.Title id="example-modal-sizes-title-lg">
               Edit Contests 
               </Modal.Title>

              </Modal.Header>

               <Modal.Body> 
			   
		   <form style={{padding:'20px',paddingTop:'0px'}} className='createcontest'  id="style-1" onSubmit={onEditUpdate}>
                        <div className='row'>
					    <div className="col-md-6 col-sm-12 form-group con">
	                  	<label>Contest Name</label>
	                 	<input className="form-control" type="text"   value={editcontestName}
                         placeholder="TalenX"  onChange={e => setEditContestName(e.target.value)}  required/>
                     	</div>

						 <div className="col-md-6 col-sm-12 form-group con">
		                <label>Contest Time</label>
			             <input className="form-control"    
                         type={"datetime-local"}
						 value={moment(editcontestTime).format("YYYY-MM-DDTHH:mm:ss")}
                         onChange={e => setEditContestTime(e.target.value)}
						
						 required />     
	                     </div>

						 </div>
                    
                    <div className="form-group con">
		             <label>Contest Details</label>
		             <textarea className="form-control" onChange={e => setEditContestDetails(e.target.value)} value={editcontestDetails}  required></textarea>
                    	</div>

						<button  className="btn btn-primary" type='submit' >Create</button>
                        </form>   
			   
			   </Modal.Body>

		
               </Modal>

			   <Modal
            size="lg"
            show={lgShowsview}
            onHide={() => setLgShowsview(false)}
            aria-labelledby="example-modal-sizes-title-lg"
		
      >
        <Modal.Header >
          <Modal.Title id="example-modal-sizes-title-lg">
            View Questions
          </Modal.Title>
		  <button  onClick={() => setLgShowsview(false)} type="button" className="close close-btn" data-dismiss="modal" aria-label="Close"><span class="" aria-hidden="true">&times;</span></button>
          </Modal.Header>
         
           <Modal.Body id="modalview" style={{overflowY:'scroll',maxHeight:'450px'}}>
           
	   <dl className="row">

	   {showquestion && newArr.map((question,index)=>{
              return < >

	   <table className="styled-table">
       <thead>
        <tr>
            <th>Contest Name</th>
            <th>Contest Time</th>
			<th>Contest Details</th>
            <th>Question Type</th>
			<th>Question {second}</th>
            <th>Video Link</th>
        </tr>
       </thead>
       <tbody>
        <tr className="active-row">
            <td>{records.contestName}</td>
            <td>{moment(records.contestTime).format("MMMM Do YYYY, h:mm:ss a")}</td>
			<td>{records.contestDetails}</td>
            <td>{question.type}</td>
			<td>{question.question}</td>
            <td>{question.videolink}</td>
        </tr>
    
     </tbody>
     </table>
         

          { question.type =='video' &&
           <main className='mainss'>
          <ol class="gradient-list ol">
          <li>
			  {question.options[0]}
			  
			  </li>
          <li>{question.options[1]}</li>
          <li>{question.options[2]}</li>
         <li>{question.options[3]}</li>
         </ol>
         </main>
		}
         
			  </>
       
	} )} 
           </dl>   
		 </Modal.Body>
           <ModalFooter>
		   {showquestion &&   <button className="btn btn-primary btn-sm" onClick={nextQuestion} style={{position:'absolute',left:'12px'}}>Next</button>}
		  <button className="btn btn-primary btn-sm" onClick={showq}>View Questions</button>
            <button  onClick={getSegment} className="btn btn-warning btn-sm">Add New Question</button>
           </ModalFooter>
                   </Modal>

		     	</div>
					<div className="pd-20">
						<h4 className="text-blue h4">Contests List</h4>
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
						  <div className="pd-20">
						<h4 className="text-blue h4">Ads List</h4>
					</div>
						  <div className="pl-20 pr-20">

							 
                        <Table userId={userId} user={user}/>

						  </div>

					  </div>
				  </div>

				
           { /* //Create Ads  */}

		   
           

		   <Modal
            size="lg"
            show={lgShowads}
            onHide={() => setLgShowAds(false)}
            aria-labelledby="example-modal-sizes-title-lg"
		
      >
        <Modal.Header >
          <Modal.Title id="example-modal-sizes-title-lg">
            Create Ads
          </Modal.Title>
		  <button  onClick={() => setLgShowAds(false)} type="button" class="close close-btn" data-dismiss="modal" aria-label="Close"><span class="" aria-hidden="true">&times;</span></button>
          </Modal.Header>

           <Modal.Body>
			   
		   <form style={{padding:'20px',paddingTop:'0px'}} className='createcontest'  id="style-1" onSubmit={createAd}>
                        <div className='row'>
					    <div className="col-md-6 col-sm-12 form-group con">
	                  	<label>Ad Name</label>
	                 	<input className="form-control" type="text"  
                         placeholder="TalenX"  onChange={e => setAdName(e.target.value)}  required/>
                     	</div>

						 <div className="col-md-6 col-sm-12 form-group con">
		                <label>Ad Time</label>
			             <input className="form-control"    
                         type={"datetime-local"}
                         onChange={e => setAdTime(e.target.value)}
						 required />     
	                     </div>
                          

						 </div>

						 <Form>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label><h4>Upload Ad Image here</h4></Form.Label>
                        <Form.Control
                          className="fileupload"
                          type="file"
                          name="file"
                          accept="image/*"
                          onChange={onChangeHandler}
                        />
                      </Form.Group>

                      {uploaded ? <Button variant="primary">Uploaded <TiInputChecked /></Button> :<Button variant="primary" onClick={handleSubmit}>Upload</Button>}
                    </Form>
                    
                      <div className="form-group con">
		             <label>Ad Details</label>
		             <textarea className="form-control" onChange={e => setAdDetails(e.target.value)}  required></textarea>
                    	</div>

                        <div className='row'>
                        <div className="col-md-6 col-sm-12 form-group con">
		                <label>Winning Amount</label>
			             <input className="form-control"    
                         type='number'
						 placeholder='Enter Contest amount'
                         onChange={e => setAdWinningAmount(e.target.value)}
						 required /> 
	                     </div>

						 </div>

						 <div className='row'>
					    <div className="col-md-6 col-sm-12 form-group con">
	                  	<label>Age Group From</label>
	                 	<input className="form-control" type="number"  
                         placeholder="from"  onChange={e => setAgeFrom(e.target.value)}  required/>
                     	</div>
						 <div className="col-md-6 col-sm-12 form-group con">
	                  	<label>To</label>
	                 	<input className="form-control" type="number"  
                         placeholder="to"  onChange={e => setAgeTo(e.target.value)}  required/>
                     	</div>
						 <div className="col-md-6 col-sm-12 form-group con">
		                <label>Location</label>
			             <input className="form-control"    
                         type="text"
						 placeholder='Gurgaon'
                         onChange={e => setLocation(e.target.value)}
						 required />     
	                     </div>
                          

						 </div>


						 
						<button  className="btn btn-primary" type='submit' >Create</button>
                        </form>   
			   
			      </Modal.Body>
                   </Modal>



                <div className="footer-wrap pd-20 mb-20 card-box adminfooter">
				MoneyQuiz - Copyright © 2022 By <Link to='/adminhome'>Calance</Link>
		    	</div> 
	         	</div>
        	    </div>  

             	<ToastContainer  autoClose={3000} />
	

                </>
    )
}

export default AdminHome
