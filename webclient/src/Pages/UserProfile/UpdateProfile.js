import React, { useState, useEffect } from 'react';
import axios from "axios";

import { Form } from "react-bootstrap";
import moment from "moment"
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { alternateEmailValidation, charactersValidation, emailValidation, isNumberKey, numberValidation, } from "../../Utils/Utils"

//import common components
import AppHeader from "../../Components/AppHeader/AppHeader";
import BottomNav from "../../Components/BottomNav/BottomNav";
//API URL
import CONSTANTS from '../../Constants/global'

export default function UpdateProfile() {
    const navigate = useNavigate();
    const location = useLocation()
    const [username, setUsername] = useState('');
    const [error, setError] = useState({});
    const [stateList, setStateList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [locationList, setLocationList] = useState([])
    const [profileInfo, setProfileInfo, getProfileInfo] = useState({
        age: "",
        dob: "",
        gender: "",
        incomegroup: "",
        name: "",
    });
    const [userAddress, setUserAddress, getUserAddress] = useState({
        pin: "",
        address1: "",
        address2: "",
        district: "",
        state: "",
        country: "",
        location: "",
    });  
    // const initialFormData = {
    //     age: "",
    //     dob: "",
    //     gender: "", 
    //     incomegroup:"", 
    //     name: "",
    //     pin: "",
    //     address1: "",
    //     address2: "",
    //     district:"",
    //     state: "",
    //     country:"",
    //     location:"",

    //     // altContact: "",
    //     // aadhar: "",
    //     // pan: "", 
    // };
    //const [formData, updateFormData] = useState(initialFormData);

    //Sync the form data with the user changes
    const handlePinfoChange = (e) => {
        profileInfo[e.target.name] = e.target.value.trim();
        setProfileInfo({
            ...profileInfo
        })
        // updateFormData({
        //     ...formData,           
        //     // Trimming any whitespace
        //     [e.target.name]: e.target.value.trim()
        // });
        console.log(e.target.name)

    };
    const handleAddressChange = (e) => {
        userAddress[e.target.name] = e.target.value.trim();
        setUserAddress({
            ...userAddress
        })
        console.log(e.target.name)
        if (e.target.name == 'pin' && e.target.value.length == 6) {
            console.log(e.target.value)
            getPinData(parseInt(e.target.value));
        } else if (e.target.name == 'pin' && e.target.value.length != 6) {
            setDistrictList([])
            setStateList([])
            setLocationList([])
            userAddress.district=""
            userAddress.state=""
            userAddress.location=""
            setUserAddress({
                ...userAddress
            })
            console.log('useraddress afer update', userAddress)
        }
    };

    //Handle Update profile Submit
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            age: profileInfo.age,
            dob: profileInfo.dob,
            gender: profileInfo.gender,
            incomegroup: profileInfo.incomegroup,
            name: profileInfo.name,
            pin: userAddress.pin,
            address1: userAddress.address1,
            address2: userAddress.address2,
            district: userAddress.district,
            state: userAddress.state,
            country: userAddress.country,
            location: userAddress.location,

            // altContact: "",
            // aadhar: "",
            // pan: "", 
        };
        console.log(formData);
        let _URL = CONSTANTS.UPDATEPROFILE;
        const token = sessionStorage.getItem("token");
        const HEADER = { "authorization": token, }
        try {
            await axios.post(_URL, formData, {
                headers: HEADER,
            }).then((res) => {
                console.log(res.data)
                toast.success(res?.data?.message);
                setFormData(res?.data?.profile, res?.data?.address);                              
            });

        } catch (error) {
            console.log('error is ', error)
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

    // get City & stated based on PIN entered
    const getPinData = async (pin) => {
        const _URL = CONSTANTS.GETPINDETAILS;
        const token = sessionStorage.getItem("token");
        const HEADER = { "authorization": token, }
        let sendData = {
            pincode: pin,
        };
        try {
            await axios.post(_URL, sendData, {
                headers: HEADER,
            }).then((res) => {
               // console.log(res.data)
                let pinRes = res?.data?.pincode?.result;
                setDistrictList([...new Set(pinRes.map(item => item.District))])
                setStateList([...new Set(pinRes.map(item => item.StateName))])
                setLocationList([...new Set(pinRes.map(item => item.LocationName))])

                setUserAddress({
                    ...userAddress
                })
                //setSelectedCity("New Delhi South West Division");
            })
        } catch (error) {
            console.log('error is ', error)
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
       
        if (userAddress.pin && userAddress.pin.toString().length == 6) {
            console.log("pin change use effect trigger")
            getPinData(parseInt(userAddress.pin));
        }

    }, [userAddress.pin])
    const setFormData = (userProfileData, userAddressData) => {
        setProfileInfo({ ...userProfileData })
        setUserAddress({ ...userAddressData })

    }

    // const MobileValidate = ()=>{
    //     if (numberValidation(formData.altContact)) {
    //         error.altContact = "Mobile Number must be a number";

    //       } else if (
    //         formData.altContact &&
    //         formData.altContact.toString().length !== 10
    //       ) {
    //         error.altContact = "Mobile Number must have 10 digits";       
    //       } else {
    //         error.altContact = "";
    //       }
    // }
    // update form data from location
    // useEffect(() => {
    //     console.log(location.state.userData)
    //     // updateFormData({
    //     //     userProfile:[{...location.state.userData.userProfile}]           
    //     // });
    //     //setUsername(location.state.userData.name)
    //     setFormData(location.state.userProfileData, location.state.userAddressData);

    // }, [])
    const getUserDetails = async () => {
        const _URL = CONSTANTS.GETUSERPROFILE;
        const token = sessionStorage.getItem("token");
        const HEADERS = { "authorization": token, }
        try {
            axios.get(_URL, {
                headers: HEADERS,
            }).then((res) => {
                console.log(res);
                setUsername(res?.data?.name);
                setFormData(res?.data?.userProfile, res?.data?.address);
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
                <div className="container-fluid">
                    <div className="card my-3" >
                        <div className="card-body">
                            <h4 className="card-title">Hello <span className='text-dark-orange'>{username} !</span></h4>
                            <h5 className="card-subtitle mb-2 text-muted">Fill the information to complete your profile.</h5>
                        </div>
                    </div>
                    <form className="row g-3" onSubmit={(e) => { handleFormSubmit(e) }}>
                        <div className="accordion" id="profileaccordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header border-orange" id="headingOne">
                                    <button className="accordion-button py-2 text-dark-orange fs-5 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Profile Info
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#profileaccordion">
                                    <div className="accordion-body">
                                        {/* City :{JSON.stringify(cityList )}<br/>
                                   State: {JSON.stringify(stateList )}<br/>
                                  Location:{JSON.stringify(locationList)} <br/> */}
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6  pb-3">
                                                <label htmlFor="age" className="form-label fw-bold">Age</label>
                                                <input type="number" className="form-control" id="age" name="age" value={profileInfo.age} onChange={handlePinfoChange} />
                                            </div>
                                            <div className="col-sm-12 col-md-6 pb-3">
                                                <Form.Label className=' fw-bold'>Gender</Form.Label>
                                                <Form.Select aria-label="Default select example" name="gender" value={profileInfo.gender} onChange={handlePinfoChange} >
                                                    <option>Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="others">Others</option>
                                                </Form.Select>
                                            </div>
                                            <div className="col-md-6 pb-3">
                                                <label htmlFor="dob" className="form-label fw-bold">DOB</label>
                                               
                                                <input className="form-control" id="dob" name="dob" type={"date"}
                                                    value={moment(profileInfo.dob).format("YYYY-MM-DD")} onChange={handlePinfoChange} />
                                            </div>
                                            <div className="col-md-6 pb-3">
                                                <label htmlFor="incomegroup" className="form-label fw-bold">Income Group</label>
                                                <input className="form-control" id="incomegroup" name="incomegroup" type="number" value={profileInfo.incomegroup} onChange={handlePinfoChange} />
                                            </div>
                                            {/* <div className="col-md-6 pb-3">
                                                <label htmlFor="altContact" className="form-label fw-bold">Alternate Contact Number</label>
                                                <input className={(error.altContact && error.altContact) ? "form-control is-invalid" : "form-control"} id="altContact" name="altContact" type="text" onChange={handleChange} defaultValue={formData.altContact} 
                                                 maxLength="10"
                                                 onKeyPress={(e) => {
                                                   if (!isNumberKey(e)) {e.preventDefault(); e.stopPropagation(); }
                                                 }} 
                                                onBlur={() => {MobileValidate();setError({ ...error }); }}/>
                                                {(error.altContact && error.altContact) ? <><p className='text-danger'>Mobile Number must have 10 digits</p></> : ""}
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed py-2 text-dark-orange fs-5 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Other Info
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#profileaccordion">
                                    <div className="accordion-body">
                                        <div className="row">
                                            {/* <div className="col-md-6 pb-3">
                                                <label htmlFor="pan" className="form-label fw-bold">PAN Number</label>
                                                <input className="form-control" id="pan" name="pan" type="text" defaultValue={formData.pan} onChange={handleChange} />
                                            </div> */}

                                            {/* <div className="col-md-6 pb-3">
                                                <label htmlFor="aadhar" className="form-label fw-bold">Aadhar Number</label>
                                                <input className="form-control" id="aadhar" name="aadhar" type="text" defaultValue={formData.aadhar} onChange={handleChange} />
                                            </div> */}
                                            <div className="col-12 pb-3">
                                                <label htmlFor="address1" className="form-label fw-bold">Address</label>
                                                <input type="text" className="form-control" id="address1" name="address1" placeholder="Address Line 1" value={userAddress.address1} onChange={handleAddressChange} />
                                            </div>
                                            <div className="col-12 pb-3">
                                                <label htmlFor="address2" className="form-label fw-bold">Address 2</label>
                                                <input type="text" className="form-control" id="address2" name="address2" placeholder="Apartment, studio, or floor" value={userAddress.address2} onChange={handleAddressChange} />
                                            </div>
                                            <div className="col-md-2 pb-3">
                                                <label htmlFor="pin" className="form-label  fw-bold">PIN</label>
                                                <input type="text" className="form-control" id="pin" name="pin" value={userAddress.pin} onChange={handleAddressChange} />
                                            </div>
                                            <div className="col-md-4 col-sm-6 col-xs-12 pb-3">

                                                <Form.Label htmlFor="state" className='fw-bold'>State</Form.Label>
                                                <Form.Select aria-label="Default select example" onChange={handleAddressChange} id="state" name="state" value={userAddress.state ? userAddress.state : "Select State"} disabled={(stateList.length == 0) ? 'disabled' : ''}>
                                                    <option value="">Select State</option>
                                                    {stateList.map((stateitem, stateIdx) => {
                                                        return (<option key={stateIdx} value={stateitem}>{stateitem}</option>)
                                                    })
                                                    }
                                                </Form.Select>
                                            </div>
                                            <div className="col-md-6  col-xs-12 pb-3">
                                                <Form.Label htmlFor="district" className='fw-bold'>District</Form.Label>
                                                <Form.Select aria-label="Select district" value={userAddress.district ? userAddress.district : "Select district"} onChange={handleAddressChange} id="district" name="district" disabled={(districtList.length == 0) ? 'disabled' : ''}>
                                                    <option value="">Select district</option>
                                                    {districtList.map((cityitem, cityIdx) => {
                                                        return (<option key={cityIdx} value={cityitem}>{cityitem}</option>)
                                                    })
                                                    }
                                                </Form.Select>
                                            </div>
                                            <div className="col-md-6 col-xs-12 pb-3">
                                                <Form.Label htmlFor="location" className='fw-bold'>Area</Form.Label>
                                                <Form.Select aria-label="Select Location" value={userAddress.location ? userAddress.location : "Select Area"} onChange={handleAddressChange} id="location" name="location" disabled={(locationList.length == 0) ? 'disabled' : ''}>
                                                    <option value="">Select Area</option>
                                                    {locationList.map((areaitem, areaIdx) => {
                                                        return (<option key={areaIdx} value={areaitem}>{areaitem}</option>)
                                                    })
                                                    }
                                                </Form.Select>
                                            </div>
                                            <div className="col-md-6 col-xs-12 pb-3">
                                                <Form.Label htmlFor="country" className='fw-bold'>Country</Form.Label>
                                                <Form.Select aria-label="Select Country" value={userAddress.country} onChange={handleAddressChange} id="country" name="country">
                                                    <option value="">Select Country</option>
                                                    <option value={userAddress.country}>India</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed  py-2 text-dark-orange fs-5 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Some other Category
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#profileaccordion">
                                    <div className="accordion-body">
                                        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 text-center">
                            {/* <button type="submit" className="btn btn-orange" disabled={!(Object.keys(error).length == 0) ? "disabled" : ""} title={!(Object.keys(error).length == 0) ? "form fields validation" : "Submit to Update profile"}>Update Profile</button> */}
                            <button type="submit" className="btn btn-orange" title={!(Object.keys(error).length == 0) ? "form fields validation" : "Submit to Update profile"}>Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
            <BottomNav />
            <ToastContainer autoClose={3000} />
        </>
    )
}
