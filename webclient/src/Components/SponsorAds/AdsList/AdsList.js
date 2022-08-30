import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useNavigate, Link } from "react-router-dom";

import AppHeader from "../../AppHeader/AppHeader";
import CONSTANTS from '../../../Constants/global';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function AdsList() {
    const navigate = useNavigate();
    const [adList, setAdList] = useState([]);
    const [key, setKey] = useState(0);

    //get Ads List
    const getAdList = async () => {
        const getAdList_URL = CONSTANTS.GETADLIST;
        const token = sessionStorage.getItem("token");
        const HEADERS = { "authorization": token, }
        try {
            await axios.get(getAdList_URL, {
                headers: HEADERS
            }).then((res) => {

                setAdList([...res?.data?.ads]);

            })
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

    useEffect(() => {
        console.log('get ads list called')
        getAdList();
    }, []);
    return (
        <>
            <AppHeader />
            <div className="inner-page-container">
                <div className="container-fluid">
                    {/* inner-page-top starts */}
                    <section className="inner-page-top">
                        <div className="row bg-darker-gray">
                            <div className="col-xs-12 bg-white border-bottom-left-round">
                                <div className="d-flex justify-content-between py-3">
                                    <h1 className='inner-page-heading ps-3'>Advertisements</h1>
                                </div>
                            </div>
                        </div>
                    </section>{/* inner-page-top Ends */}                   
                    {/* single Entry fee card Ends */}
                    {
                        adList.map((adItem, addIndex) => {
                            return (
                                <>
                                    {/* single Advertisement card starts */}
                                    <Link to={'/livead'} state={{adId : adItem.id}}>
                                    <section className="single-quiz-entry-fee mb-3" >
                                        <div className="row bg-darker-gray">
                                            <div className="col-xs-12 col-sm-12 col-md-12">
                                                <div className="card-parent-gray">
                                                    <div className="single-q-fee-box  py-3 d-flex justify-content-center">
                                                        <div className="card ad-list-card small my-2 bg-white">

                                                            <div className="card-body">
                                                                <h2 className='fw-bold' key={adItem.adName}>{adItem.adName}</h2>
                                                                <img src={adItem.adImage} alt="No image for current Advertisement" />
                                                                <h4 className='ad-descrp text-center fw-bold mb-0' key={adItem.adDetails}>{adItem.adDetails}</h4>
                                                                <p className="mb-0 text-gray text-center fs-6">Give the right answer and win</p>

                                                                <p className='text-center'><span className="gold-coin-big me-2"></span><span className='fs-3' key={adItem.winningAmount}>{adItem.winningAmount}</span></p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    </Link>
                                   
                                    {/* single Advertisement card Ends */}
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <ToastContainer autoClose={3000} />
        </>
    )
}
