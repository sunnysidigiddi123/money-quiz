import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import SidenavBar from "../../Components/SidenavBar";
import "jquery/dist/jquery.min";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import 'react-toastify/dist/ReactToastify.css';
import $, { data } from "jquery";
import "./UserHome.css";
import { Modal, Button, Form, Row, ModalFooter } from "react-bootstrap";
import { FaCrown, FaExclamation, FaSmile } from "react-icons/fa";
// import DataTable from "react-data-table-component";
// import DataTableExtensions from "react-data-table-component-extensions";
// import "react-data-table-component-extensions/dist/index.css";
import moment from "moment"
import {
  BrowserRouter as Router,
  useNavigate,
  useLocation, useParams, Link, Navigate
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import CountdownTimer from 'react-awesome-countdowntimer';


const UserHome = () => {
  const [contests, setContest] = useState([]);
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [applied, setApplied] = useState();
  const [showmessage, setshowMesaage] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");
  const [question, setQuestions] = useState([]);
  const [video, setVideo] = useState([]);
  const [playedd, setPlayed] = useState(0);
  const [wallet, setUserWallet] = useState();
  const [lgShowed, setLgShowed] = useState();
  const [amount, setAmount] = useState();
  const [lgShowsss, setLgShowsss] = useState(false);
  const [newpoll, setNewPoll] = useState([]);
  const [alldata, setAllData] = useState([]);
  const [appliedcontests, setAppliedContests] = useState([]);
  const [lgShowss, setLgShowss] = useState(false);

  console.log(appliedcontests)

  const navigate = useNavigate();
  let DailyDate = new Date()
  console.log(moment(DailyDate).format("MMMM Do YYYY, h:mm:ss a"))
  console.log(userId)
  const Played = async (result) => {
    sessionStorage.removeItem('questionIndex')
    const BASE_URL = `${process.env.REACT_APP_BASE_URL}/publishedcontest/contestplaycheck`;

    const token = sessionStorage.getItem("token");
    let sendData = {
      contestid: result.id,

    };
    try {
      let post = await axios.post(BASE_URL, sendData, {
        headers: {
          "authorization": token,
        },
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
    const BASE_URL = `${process.env.REACT_APP_BASE_URL}/publishedcontest/paynewpollamount`;

    const token = sessionStorage.getItem("token");
    let sendData = {
      contestid: alldata[4],

    };
    try {
      let post = await axios.post(BASE_URL, sendData, {
        headers: {
          "authorization": token,
        },
      });

      if (post.data.status == 1) {
        console.log("aaaaaa", alldata[0], alldata[1], alldata[2])
        navigate("/livecontestnew", { state: { question1: alldata[0], totalquestions: alldata[1], ContestTime: alldata[2], InititalUsers: post.data.totalIntitalUsers, entryamount: alldata[3], contestid: alldata[4], questionIndex: post.data.questionIndex } })
      }

    } catch (e) {

      toast.error(e.response.data.message)
    }
  }



  const addamount = async (e) => {
    e.preventDefault();
    const BASE_URL = `${process.env.REACT_APP_BASE_URL}/addmoney`;
    console.log(amount)
    const token = sessionStorage.getItem("token");
    let sendData = {
      userid: userId,
      wallet: amount

    };
    try {
      let post = await axios.post(BASE_URL, sendData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLgShowed(false)
      toast.success("Amount Added Successfully")
      setUserWallet(post.data.Wallet)

    } catch (e) {

      toast.error("Oops! Something Went Wrong")
    }

  }

  const applyContest = async (item) => {
    const BASE_URL = `${process.env.REACT_APP_BASE_URL}/publishedcontest/applycontest`;
    const token = sessionStorage.getItem("token");
    let sendData = {
      contestid: item.id,
    };
    try {
      let post = await axios.post(BASE_URL, sendData, {
        headers: {
          "authorization": token,
        },
      });
      console.log(post.data)
      toast.success(post.data.message)

      getContest();
    } catch (e) {
      console.log(e.response.data);
      toast.error(e.response.data.message)
    }
  };

  const getContest = async () => {

    const BASE_URL = `${process.env.REACT_APP_BASE_URL}/publishedcontest/getPublishedContest`;
    const token = sessionStorage.getItem("token");


      axios.get(BASE_URL, {
        headers: {
          "authorization": token,
        },
      }).then((res) => {
        setContest([...res.data.contests]);
        setAppliedContests([...res.data.appliedcontests]);
        setUser(res.data.user)
        setUserWallet(res.data.wallet)


      }).catch((e) =>{
            if (e.response.status === 401) {
					localStorage.clear();
					navigate("/");
				  }
      });

      //initialize datatable
      $(document).ready(function () {
        setTimeout(function () {
          $("#contest").DataTable({
            'destroy': true,
            "order": [],
            'scrollY': "200px",
            'order': [[4, 'asc']]

          });
        }, 1000);
      });
   
  }


  useEffect(() => {
    getContest();

  }, []);


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

      <div className="main-container">

        <div className="pd-ltr-20">
          <div className="card-box  usertable height-100-p mb-30" >
            <div className="row align-items-center">
              <div className="col-md-4">
                <img src="vendors/images/banner-img.png" alt="" />
              </div>
              <div className="col-md-8">
                <h4 className="font-20 weight-500 mb-10 text-capitalize" >
                  Welcome back{" "}
                  <div className="weight-600 font-30 text-blue">{user}</div>
                </h4>
                <p className="font-18 max-width-600">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
                  hic non repellendus debitis iure, doloremque assumenda. Autem
                  modi, corrupti, nobis ea iure fugiat, veniam non quaerat
                  mollitia animi error corporis.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 mb-30">
              <div className="card-box height-100-p widget-style1">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="progress-data">
                    <div id="chart">
                      <img src="https://img.icons8.com/external-sbts2018-flat-sbts2018/58/000000/external-live-streaming-social-media-sbts2018-flat-sbts2018.png" />
                    </div>
                  </div>
                  <div className="widget-data">
                    <div className="h4 mb-0">{contests.length}</div>
                    <div className="weight-600 font-14">Live Contests</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 mb-30">
              <div className="card-box height-100-p widget-style1">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="progress-data">
                    <div id="chart2">
                      <img src="https://img.icons8.com/color/48/000000/contest.png" />
                    </div>
                  </div>
                  <div className="widget-data">
                    <div className="h4 mb-0">{appliedcontests.length}</div>
                    <div className="weight-600 font-14">Applied Contests</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 mb-30">
              <div className="card-box height-100-p widget-style1">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="progress-data">
                    <div id="chart3">
                      <img src="https://img.icons8.com/color/48/000000/prize.png" />
                    </div>
                  </div>
                  <div className="widget-data">
                    <div className="h4 mb-0">{playedd}</div>
                    <div className="weight-600 font-14">Played Contests</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 mb-30" onClick={() => setLgShowed(true)} style={{ cursor: 'pointer' }}>
              <div className="card-box height-100-p widget-style1">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="progress-data">
                    <div id="chart4">
                      <img src="https://img.icons8.com/color/50/000000/wallet--v1.png" />
                    </div>
                  </div>
                  <div className="widget-data" >
                    <div className="h4 mb-0">₹ {wallet}</div>
                    <div className="weight-600 font-14">Wallet</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-box mb-30">
            <div className="pd-20 usertable">
              <h4 className="text-blue h4">All Contests</h4>
            </div>
            <div className="pb-20">
              <div className="pl-20 pr-20">
                <table id="contest" className="table table-hover table-bordered" >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Details</th>
                      <th>Date & Time</th>
                      <th>Entry Amount</th>
                      <th className="unsorting">Apply</th>
                      <th className="unsorting">Segment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contests.map((result, index) => {
                      return (
                        <tr key={index}>
                          <td>{result.contestName}</td>
                          <td>{result.contestDetails}</td>
                          <td>{moment(result.contestTime).format("MMMM Do YYYY, h:mm:ss a")}{" "}</td>
                          <td>{`₹ ${result.EntryAmount}`}</td>
                          <td>
                            {!appliedcontests.find((item) => { if (item.contestid == result.id) return true; }) ?
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                  applyContest(result);
                                }}
                              >
                                Apply Now
                              </button>
                              :
                              <h6 className="success">Applied</h6>}
                            &nbsp;
                            &nbsp;
                            {moment(DailyDate).isBetween(result.contestTime, moment(result.contestTime).add(20, 'minutes')) && appliedcontests.find((item) => { if (item.contestid == result.id) return true; })
                              ?

                              <button className="btn btn-danger"
                                onClick={() => {
                                  Played(result);
                                }}
                              >Live!</button>
                              : null
                            }
                          </td>
                          <td>
                            {moment(result.LivecontestTime).isSame(result.SegmentGoingOn) && result.LiveQuestionIndex > 0 ? <h6>Enter Now</h6> :
                              result.LiveQuestionIndex > 0 && <CountdownTimer endDate={moment(result.SegmentGoingOn)} />
                            }

                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
          <Footer />
        </div>

      </div>
      <ToastContainer autoClose={3000} />


      <Modal
        size="md"
        show={lgShowed}
        onHide={() => setLgShowed(false)}
        backdrop="static"
        keyboard={false}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header >
          <Modal.Title id="example-modal-sizes-title-lg">
            Add Money in Wallet
          </Modal.Title>


        </Modal.Header>


        <Modal.Body>

          <form>
            <div className="form-group">
              <label for="exampleInputEmail1">Amount</label>
              <input type='number' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Amount" onChange={(e) => { setAmount(e.target.value) }} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={addamount}>Add Now</button>&nbsp;
            <button type="submit" className="btn btn-danger" onClick={(e) => { e.preventDefault(); setLgShowed(false) }}>Close</button>
          </form>




        </Modal.Body>

      </Modal>

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
        <div className="form-group">
       <label for="exampleInputEmail1">Entry Amount : {newpoll && newpoll[0]}</label>
       <label for="exampleInputEmail1">Current Entry Amount : {newpoll && newpoll[1]}</label>
       <label for="exampleInputEmail1">You Have To Pay : {newpoll && (parseInt(newpoll[1])-(parseInt(newpoll[0])))}</label>
       
       </div>
       <button type="submit" className="btn btn-primary" onClick={entered}>Yes</button>&nbsp;
       <button type="submit" className="btn btn-danger" onClick={(e)=>{ e.preventDefault(); setLgShowsss(false)}}>Close</button>
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

    </>
  );
};

export default UserHome;