import React from 'react';
import AppHeader from "../../Components/AppHeader/AppHeader";
import BottomNav from "../BottomNav/BottomNav";

export default function SingleQuizDetail() {
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
                                    <h1 className='inner-page-heading'>Quiz 1</h1>
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
                                                <div className="card-text"><div className='text-white text-center fs-1'><i className="big coin pe-5"></i>  100</div></div>
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
                                        <p className="mb-0 fw-500  fs-1 text-white">516</p>
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
                                        <p className="mb-0 fs-1 text-white"><i className="big coin pe-5"></i>51600</p>
                                    </div>
                                </div>
                                <div className="info-oval-ribbon bg-dark-orange">
                                    <p className="mb-0 text-info-gray text-center">Enter Competition</p>
                                    <div className="d-flex justify-content-between py-3">
                                        <div className="user-icon ms-3 bg-light-gray ps-2">
                                            <span className=''><i className="fas fa-times fa-2x text-white px-1"></i>
                                            </span>
                                        </div>
                                        <div className="user-no">

                                            <div className='text-white text-center fs-1'><i className="big coin pe-5"></i>  100</div>
                                        </div>
                                        <div className="user-icon me-3 bg-dark-gray">
                                            <span className=''><i className="fas fa-check fa-2x text-white"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="info-oval-ribbon bg-dark-orange py-3">
                                    <p className="text-info-gray text-center fs-1">Good Luck !</p>
                                    <p className='text-white text-center fs-3'>Starting in 2:34 seconds</p>

                                </div>
                            </div>
                        </div>
                    </section>{/* Active player ribbon ends */}
                </div>
            </div>
            <BottomNav />
        </div>
    )
}
