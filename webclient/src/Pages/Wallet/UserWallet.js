import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";

//API URL
import CONSTANTS from '../../Constants/global'

//import common components
import AppHeader from "../../Components/AppHeader/AppHeader";
import BottomNav from "../../Components/BottomNav/BottomNav";

import { ToastContainer, toast } from 'react-toastify';

export default function UserWallet() {
    return (
        <>
            <AppHeader />
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
                                <p className='wallet-page-coin fw-bold text-dark-orange'>40  <span className=' ms-2 big coin'></span></p>
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
                                <button type="button" className="btn btn-deposit wallet-button">Deposit</button>
                                </div>
                                
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <BottomNav />

        </>
    )
}
