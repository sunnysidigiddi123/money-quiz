import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, useNavigate, Link } from "react-router-dom";
import { Modal, Button, Form, Row, ModalFooter } from "react-bootstrap";

//API URL
import CONSTANTS from '../../Constants/global'

//import common components
import AppHeader from "../../Components/AppHeader/AppHeader";
import BottomNav from "../../Components/BottomNav/BottomNav";

import { ToastContainer, toast } from 'react-toastify';


export default function UserWallet() {

    const [wallet, setWallet] = useState(0)
    const [lgShow, setLgShow] = useState(false)
    const [amount,setAmount] = useState(0)
    const navigate = useNavigate();
    console.log(amount)
    const getWalletDetails = async () => {
        const _URL = CONSTANTS.GETWALLETAMOUNT;
        const token = sessionStorage.getItem("token");
        const HEADERS = { "authorization": token, }
        try {
            axios.get(_URL, {
                headers: HEADERS,
            }).then((res) => {
                console.log(res);
                setWallet(res?.data?.userwallet);

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

    const addAmount = async () => {
        const _URL = CONSTANTS.ADDWALLETAMOUNT;
        const token = sessionStorage.getItem("token");
        const HEADERS = { "authorization": token, }
        let sendData = {
            amount: amount,
        };
        try {
            await axios.post(_URL, sendData, {
                headers: HEADERS,
            }).then((res) => {
                // console.log(res.data)
                setWallet(res?.data?.userwallet);
                setLgShow(false)
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
        getWalletDetails();
    }, [])



    return (
        <>
            <AppHeader wallet={wallet} />
            <div className="page-container bg-wallet h-91 ">
                <div className="container-fluid">
                    <section className='wallet-top '>
                        <div className="row bg-white">
                            <div className="col-sm-12 col-xs-12">
                                <div className="text-section py-2">
                                    <h1 className='fs-1 fw-bold'>Wallet</h1>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="row wallet-orange">
                            <div className="col-sm-12 text-center coin-section pt-5 pb-4">
                                <p className='wallet-page-coin fw-bold text-dark-orange'>{wallet}  <span className=' ms-2 big coin'></span></p>
                                <p className='text-white mt-3 position-relative'>Total G Coins <i className="fas fa-plus add-coin-icon"></i></p>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="row py-5 wallet-orange">
                            <div className="col-sm-12 text-center">
                                <div className='mb-3'>
                                    <button type="button" className="btn btn-secondary wallet-button">Withdraw</button>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-deposit wallet-button" onClick={(e) => setLgShow(true)}>Deposit</button>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <BottomNav />


            <Modal
                size="sm"
                show={lgShow}
                onHide={() => setLgShow(false)}
                backdrop="static"
                keyboard={false}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
            >
                <Modal.Header closeButton  >
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Add Amount
                    </Modal.Title>

                </Modal.Header >

                <Modal.Body>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Enter Amount</label>
                        <input type="number" class="form-control" id="example" placeholder="Amount" onChange={(e)=>{setAmount(e.target.value)}} />
                    </div>
                </Modal.Body>
                <Button className='btn btn-deposit wallet-button' onClick={addAmount} >Add</Button>
            </Modal>

        </>
    )
}
