import React from 'react'
import axios from "axios";
import {useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { refreshTokens } from '../Utils/refreshToken';
import moment from "moment"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useNavigate,
	Navigate
  } from "react-router-dom";
  import { Modal, Button, Form, Row, ModalFooter } from "react-bootstrap";


const Table = (props) => {
    const [data , setDatas] = useState([]);
    const [questions,setQuestions] = useState([]);
    const [lgShowsview, setLgShowsview] = useState(false);
    const [ad,setAd] = useState([]);
    const navigate = useNavigate();
    const columns =  React.useMemo(() => [
	    
		{
		  name: "Ad Name",
		  selector: row=> `${row.adName}`,
		  sortable: true
		  
		},
		// {
		//   name: "Ad Details",
		//   selector:  row=> `${row.adDetails}`,
		//   sortable: true,
		//   wrap:true
		 
		  
		// },
		{
			name: "Ad Winning Amount",
			selector:  row=> `₹ ${row.winningAmount}`,
			sortable: true,
			wrap:true
		   
			
    },
    {
      name: "State",
      selector:  row=> `${row.Ads_target.state}`,
      sortable: true,
      wrap:true
        
      
    },
    {
      name: "District",
      selector:  row=> `${row.Ads_target.district}`,
      sortable: true,
      wrap:true
        
      
    },
    {
      name: "Income Group",
      selector:  row=> `${row.Ads_target.incomegroup}`,
      sortable: true,
      wrap:true
        
      
    },
    {
      name: "Age Group",
      selector:  row=> `${row.Ads_target.ageGroup}`,
      sortable: true,
      wrap:true
        
      
    },
    {
      name: "Gender",
      selector:  row=> `${row.Ads_target.gender}`,
      sortable: true,
      wrap:true
        
      
    },
		// {
		//   name: "Ad Time",
		//   selector: row=> `${moment(row.adTime).format("MMMM Do YYYY, h:mm:ss a")}`,
		//   sortable: true,
		  
		// },
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
				 
				 <button
				  className="btn btn-success btn-sm"
				  onClick={() => {
					AddMoreQuestions(record);
				  }}
				>
				  Add More Questions
				</button>
         
				&nbsp;
				  &nbsp; 
				  
                
						  </>
			  );
			  
			 },
			 
			

				}


	  ]);


      const AddMoreQuestions = async (record) =>{

      setQuestions(record.questions)
      setAd(record)
    //   console.log(record.questions)
      console.log(ad.id,"ssss")
      setLgShowsview(true)
     


      }

      const getAds = async () => {
        const token = sessionStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");
    const BASE_URL = `${process.env.REACT_APP_BASE_URL}/ads/getAdsAdmin`;
    try{	
    axios.get(BASE_URL,{
        headers: {
            "authorization": token,
          },
     }).then((res) => {
        
            const filteredData = res.data.ads.filter((item)=>
            item.admin.id == props.userId
            
           )
                console.log(filteredData ,props.userId,"aaa")
           setDatas(filteredData);
    
        
        
          });
        }catch(e){
            if (e.response.status === 401) {
                try {
                  await refreshTokens(refreshToken);
                  getAds();
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

      const tableData = {
       
	    columns,
		data

  }

  useEffect(() => {
	getAds();
		
	  }, [props.userId]);


  return (
    <>
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
          {questions && questions.map((questions,index)=>{
            return < >
          <table className="styled-table">
          <thead>
           <tr>
               <th>Ad Name</th>
               <th>Ad Time</th>
               <th>Question Type</th>
               <th>Total Questions</th>
       
           </tr>
          </thead>
          <tbody>
           <tr className="active-row">
               <td>{ad && ad.adName}</td>
               <td>{moment(ad &&ad.adTime).format("MMMM Do YYYY, h:mm:ss a")}</td>
               <td>{questions && questions.type}</td>
               <td>{questions && questions.question}</td>
              
           </tr>
       
        </tbody>
        </table>
            
   
          
              <main className='mainss'>
             <ol class="gradient-list ol">
             <li>
                 {questions && questions.options[0]}
                 
                 </li>
             <li>{questions && questions.options[1]}</li>
             <li>{questions && questions.options[2]}</li>
            <li>{questions && questions.options[3]}</li>
            </ol>
            </main>
          
           
            </>
                 
          
          })}
              </dl>   
 
	  
		 </Modal.Body>
           <ModalFooter>
           <Link to='/ads' state={{adId:ad.id,adminId:props.userId,user:props.user}}  className="btn btn-warning btn-sm">Add New Question</Link>
           </ModalFooter>
                   </Modal>
    
    </>

    
  )
}

export default Table