import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from "../../AppHeader/AppHeader"


export default function WinningMsg(props) {
    let winningcoin = props.winningcoin;
    let nextUrl = props.nextUrl;
    let status = props.status;
    let isCashout = props.isCashout;
    useEffect(()=>{console.log('winning called')},[])
    return (
        <>
            <div className="inner-page-container">
                <div className="container-fluid">
                    <div className="position-fixed ads-winning-popup">
                        <div className="d-flex align-items-center justify-content-center vh-100">
                            <div className="winning-inner-text bg-white p-5">
                                {status =='success' ? 
                                <><h3 className='fw-bold text-dark-orange mb-0'>Congratulation !</h3>
                                <p className='fs-3'>You won <span className='me-4 d-inline-block'><i className="coin ps-1"></i></span> {winningcoin}</p></>
                                : <>
                                <h3 className='fw-bold text-dark-orange mb-0'>Oh No !</h3>
                                <p className='fs-3'>You have given wrong answer. You don't win any money. </p></>
                                }
                                
                                <div className="winning-navigation text-right pt-3">  
                                {!isCashout
                                ? <>
                                <Link to={'/appuserhome'}><button type="button" className="btn  btn-sm me-2 btn-gray">Home</button></Link>
                                    <Link to={nextUrl}><button type="button" className="btn btn-sm btn-orange">Next</button></Link>
                                </>
                                :<>
                                <Link to={'/appuserhome'}><button type="button" className="btn btn-sm btn-orange">Ok</button></Link></>}                                  
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
