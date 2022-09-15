import React, { useEffect, useState } from 'react';
//API URL
import CONSTANTS from '../../Constants/global'
import { BrowserRouter as Router, useNavigate, Link } from "react-router-dom";

//import common components
import AppHeader from "../../Components/AppHeader/AppHeader";
import BottomNav from "../../Components/BottomNav/BottomNav";
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';

export default function UserProfile() {
    const navigate = useNavigate();
    const [userProfileInfo, setUserProfileInfo] = useState();
    const [userAddressInfo, setUserAddressInfo] = useState()

    const getUserDetails = async () => {
        const _URL = CONSTANTS.GETUSERPROFILE;
        const token = sessionStorage.getItem("token");
        const HEADERS = { "authorization": token, }
        try {
            axios.get(_URL, {
                headers: HEADERS,
            }).then((res) => {
                console.log(res);
                setUserProfileInfo(res?.data?.userProfile);
                setUserAddressInfo(res?.data?.address)
            })

        } catch (error) {
            console.log(error.response)
            if (error && error.response) {
                console.log('error is ', error)
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
        getUserDetails();
    }, [])
    return (
        <>
            <AppHeader></AppHeader>
            <div className="page-container">
                <section className='profile-banner'>
                    <img className='img-fluid w-100' src="./assets/images/banner.webp" alt="Profile Banner" />
                    <div className="banner-text">
                        <div className="user-detail text-center">
                            <h2 className='text-white mb-0 text-shadow-gray'>{userProfileInfo?.name}</h2>
                            <h5 className='text-white mt-0 text-shadow-gray'>{userProfileInfo?.location}</h5>
                        </div>
                    </div>
                </section>

                <div className="container-fluid ">
                    {/* Need to update stats later */}
                    {/* <div className="row">
                    <section className="profile-stats">                       
                            <div className="col-sm-12">
                                <div className="stats-box">
                                    <ul className="list-group">
                                        <li className="list-group-item">An item</li>
                                        <li className="list-group-item">A second item</li>
                                        <li className="list-group-item">A third item</li>
                                        <li className="list-group-item">A fourth item</li>
                                        <li className="list-group-item">And a fifth one</li>
                                    </ul>
                                </div>
                            </div>                        
                    </section>
                </div> */}
                    <div className="row">
                        <Link to={'/updateprofile'} state={{ userProfileData: userProfileInfo, userAddressData: userAddressInfo}}>
                            <div className="col-sm-12 my-5">
                                <div className="user-box d-flex justify-content-start">
                                    <div className="col-1 pt-4"><i className="fas fa-user-alt"></i></div>
                                    <div className='col-9'>
                                        <h3 className='mb-0'>My Account</h3>
                                        <p>Edit your information</p>
                                    </div>
                                    <div className="col-2 pt-4"><i className="fas fa-arrow-right"></i></div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="row">
                        <h2 className='fs-6 fw-bold text-danger'>This will be replaced with add list once merged with Ads</h2>
                        <h2 className='fs-4 text-uppercase'>Answer Questions To win Money</h2>
                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="./assets/images/banner.webp" className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="./assets/images/ques-img.jpeg" className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="./assets/images/banner.webp" className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="./assets/images/ques-img.jpeg" className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="./assets/images/ques-img.jpeg" className="d-block w-100" alt="..." />
                                </div>
                            </div>
                            {/* <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a> */}
                        </div>
                    </div>
                </div>
            </div>
            <BottomNav />
        </>
    )
}
