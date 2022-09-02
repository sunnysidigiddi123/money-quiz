import React, { useState, useEffect } from 'react';
import axios from "axios";

import { Form } from "react-bootstrap";
import moment from "moment"
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

//import common components
import AppHeader from "../../Components/AppHeader/AppHeader";
import BottomNav from "../../Components/BottomNav/BottomNav";
//API URL
import CONSTANTS from '../../Constants/global'

export default function UpdateProfile() {
    const navigate = useNavigate();
    const location = useLocation()


    const initialFormData = Object.freeze({
        name: "",
        age: "",
        dob: "",
        gender: "",
        address1: "",
        address2: "",
        state: "",
        city: "",
        zip: "",
        altContact: "",
        aadhar: "",
        pan: ""
    });
    const [formData, updateFormData] = useState(initialFormData);
    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleFormSubmit = async (e) => {

        e.preventDefault();
        console.log(formData);
        let _URL = "users/profileUpdate";
        const token = sessionStorage.getItem("token");        
        const HEADER = { "authorization": token, }
        try {
            await axios.post(_URL, formData, {
                headers: HEADER,
            }).then((res) => {
                console.log(res.data)
                
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
    // update form data from location
    useEffect(() => {
        updateFormData({
            ...location.state.userData
        });

    }, [])

    return (
        <>
            <AppHeader></AppHeader>
            <div className="page-container">
                <div className="container-fluid">
                    <div className="card my-3" >
                        <div className="card-body">
                            <h4 className="card-title">Hello <span className='text-dark-orange'>{formData.name} !</span></h4>
                            <h5 className="card-subtitle mb-2 text-muted">Fill the information to complete your profile.</h5>
                        </div>
                    </div>
                    <form className="row g-3" onSubmit={(e) => { handleFormSubmit(e) }}>
                        <div className="accordion" id="profileaccordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header border-orange" id="headingOne">
                                    <button className="accordion-button py-2 text-dark-orange fs-5 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Personal Info
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#profileaccordion">
                                    <div className="accordion-body">
                                        Age from Form data:{formData.age}
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6  pb-3">
                                                <label htmlFor="age" className="form-label fw-bold">Age</label>
                                                <input type="number" className="form-control" id="age" name="age" defaultValue={formData.age} onChange={handleChange} />
                                            </div>
                                            <div className="col-sm-12 col-md-6 pb-3">
                                                <Form.Label className=' fw-bold'>Gender</Form.Label>
                                                <Form.Select aria-label="Default select example" name="gender" onChange={handleChange} value={formData.gender}>
                                                    <option>Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="others">Others</option>
                                                </Form.Select>
                                            </div>
                                            <div className="col-md-6 pb-3">
                                                <label htmlFor="dob" className="form-label fw-bold">DOB</label>
                                                <input className="form-control" id="dob" name="dob" type={"date"}
                                                    defaultValue={formData.dob} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6 pb-3">
                                                <label htmlFor="altContact" className="form-label fw-bold">Alternate Contact Number</label>
                                                <input className="form-control" id="altContact" name="altContact" type="number" onChange={handleChange} defaultValue={formData.altContact} />
                                            </div>
                                            <div className="col-12 pb-3">

                                                <label htmlFor="address1" className="form-label fw-bold">Address</label>
                                                <input type="text" className="form-control" id="address1" name="address1" placeholder="Address Line 1" defaultValue={formData.address1} onChange={handleChange} />
                                            </div>
                                            <div className="col-12 pb-3">
                                                <label htmlFor="address2" className="form-label fw-bold">Address 2</label>
                                                <input type="text" className="form-control" id="address2" name="address1" placeholder="Apartment, studio, or floor" defaultValue={formData.address2} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6 pb-3">
                                                <label htmlFor="city" className="form-label fw-bold">City</label>
                                                <input type="text" className="form-control" id="city" name="city" defaultValue={formData.city} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-4 pb-3">

                                                <Form.Label htmlFor="state" className='fw-bold'>State</Form.Label>
                                                <Form.Select aria-label="Default select example" onChange={handleChange} id="state" name="state">
                                                    <option>Select State</option>
                                                    <option value="haryana">Haryana</option>
                                                    <option value="delhi">Delhi</option>
                                                    <option value="up">Utter Pradesh</option>
                                                </Form.Select>
                                            </div>
                                            <div className="col-md-2 pb-3">
                                                <label htmlFor="zip" className="form-label  fw-bold">Zip</label>
                                                <input type="text" className="form-control" id="zip" name="zip" defaultValue={formData.zip} onChange={handleChange} />
                                            </div>
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
                                            <div className="col-md-6 pb-3">
                                                <label htmlFor="pan" className="form-label fw-bold">PAN Number</label>
                                                <input className="form-control" id="pan" name="pan" type="text" defaultValue={formData.pan} onChange={handleChange} />
                                            </div>

                                            <div className="col-md-6 pb-3">
                                                <label htmlFor="aadhar" className="form-label fw-bold">Aadhar Number</label>
                                                <input className="form-control" id="aadhar" name="aadhar" type="text" defaultValue={formData.aadhar} onChange={handleChange} />
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
                            <button type="submit" className="btn btn-orange">Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
            <BottomNav />
            <ToastContainer autoClose={3000} />
        </>
    )
}
