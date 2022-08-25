import React from 'react';
import { Link } from 'react-router-dom';
import AppHeader from "../../AppHeader/AppHeader"


export default function WinningMsg(props) {
    let winningcoin = props.winningcoin;
    let nextUrl = props.nextUrl | '';
    return (
        <>
            <div className="inner-page-container">
                <div className="container-fluid">
                    <div className="position-fixed ads-winning-popup">
                        <div className="d-flex align-items-center justify-content-center vh-100">
                            <div className="winning-inner-text bg-white p-5">
                                <h3 className='fw-bold text-dark-orange mb-0'>Congratulation !</h3>
                                <p className='fs-3'>You won <span className='me-4 d-inline-block'><i className="coin ps-1"></i></span> {winningcoin}</p>
                                <div className="winning-navigation text-right pt-3">                                    
                                    <Link to={'/appuserhome'}><button type="button" className="btn btn-secondary btn-sm me-2">Home</button></Link>
                                    <Link to={nextUrl}><button type="button" className="btn btn-primary btn-sm">Next</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
