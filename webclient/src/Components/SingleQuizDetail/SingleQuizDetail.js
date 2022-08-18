import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useLocation } from 'react-router-dom';

//from lib
import { ToastContainer, toast } from 'react-toastify';

//App components
import AppHeader from "../../Components/AppHeader/AppHeader";
import BottomNav from "../BottomNav/BottomNav";
//API URL
import CONSTANTS from '../../Constants/global'

export default function SingleQuizDetail() {
    const location = useLocation()
    const [locationState, setLocationState] = useState({ contestName: "" });
    const [currentContestId, setCurrentContestId] = useState();
    const [entryFee, setEntryFee] = useState();
    const [activePlayerCount, setActivePlayerCount] = useState();
    const [totalPrize, setTotalPrize] = useState();
    const [isApplied,setIsApplied] = useState(true)
    const [quizStartTime, setQuizStartTime] = useState();


    //get detailed view of contest
    const getDetailedView = async (currentContestId) => {
        const DETAIL_VIEW_URL = CONSTANTS.DETAILVIEWCONTEST;
        console.log(DETAIL_VIEW_URL);
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
               // setIsApplied(response?.isApplied)
            });
                    
        } catch (error) {
            console.log(error.response.data);
            toast.error(error.response.data.message)
        }



    }
    // Apply to a contest
    const applyContest = async (item) => {
        console.log('apply contest');
        const APPLY_URL = `${CONSTANTS.APPLYCONTEST}`;
        const token = sessionStorage.getItem("token");
        let sendToData = { contestid: item, };
        const HEADER = { "authorization": token, }

        try {
            let post = await axios.post(APPLY_URL, sendToData, {
                headers: HEADER,
            });
            console.log(post.data)
            toast.success(post.data.message)

            //getContest();
        } catch (e) {
            console.log(e.response.data);
            toast.error(e.response.data.message)
        }
    };
    useEffect(() => {
        if (location.state) {
            let _state = location.state;
            setLocationState(_state);
            console.log('current contest id is ', _state.contestid);
            setCurrentContestId(_state.id);
            getDetailedView(_state.contestid);
        }
    }, [location]);
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
                                    <h1 className='inner-page-heading'>{locationState.contestName}</h1>
                                    <div className="start-in-time">Starts in 02:34 seconds</div>
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
                                        <p className="mb-0 fw-500  fs-1 text-white">{activePlayerCount}</p>
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
                                ? <div className="info-oval-ribbon bg-dark-orange py-3">
                                <p className="text-info-gray text-center fs-1">Good Luck !</p>
                                <p className='text-white text-center fs-3'>Starting in 2:34 seconds</p>
                            </div> 
                                : <div className="info-oval-ribbon bg-dark-orange">
                                <p className="mb-0 text-info-gray text-center">Enter Competition</p>
                                <div className="d-flex justify-content-between py-3">
                                    <Link to="/appuserhome">
                                        <div className="user-icon ms-3 bg-light-gray ps-2">
                                            <span className=''  ><i className="fas fa-times fa-2x text-white px-1"></i>
                                            </span>
                                        </div>
                                    </Link>

                                    <div className="user-no">

                                        <div className='text-white text-center fs-1'><i className="big coin pe-5"></i>  {entryFee}</div>
                                    </div>
                                    <div className="user-icon me-3 bg-dark-gray">
                                        <button className='' onClick={() => { applyContest(locationState.contestid); }}><i className="fas fa-check fa-2x text-white"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>}
                                
                                
                            </div>
                        </div>
                    </section>{/* Active player ribbon ends */}
                </div>
            </div>
            <BottomNav />
            <ToastContainer autoClose={3000} />
        </div>
    )
}
