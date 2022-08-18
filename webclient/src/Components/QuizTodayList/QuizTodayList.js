import React from 'react';
import  AppHeader  from "../../Components/AppHeader/AppHeader";
import BottomNav from "../BottomNav/BottomNav"; 

export default function QuizTodayList() {
  return (
    <div>
         <AppHeader />
       <div className="inner-page-container">
            <div className="container-fluid">
            {/* inner-page-top starts */}
                <section className="inner-page-top">
                    <div className="row bg-dark-orange pb-1">
                        <div className="col-xs-12 bg-white border-bottom-left-round">
                            <div className="d-flex justify-content-between py-3">
                                <h1 className='inner-page-heading ps-3'>Quiz Today</h1>                                
                            </div>
                        </div>
                    </div>
                </section>{/* inner-page-top Ends */}

                <section>
                    <div className="row py-5  bg-dark-orange">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                           <div className="card-parent-gray">
                                <div className="single-q-fee-box  py-4 d-flex justify-content-center">                                
                                    <div className="card entry-fee-card small my-2">
                                        <div className="card-header bg-yellow-orange text-black">
                                            ENTRY FEE
                                        </div>
                                        <div className="card-body bg-dark-gray">
                                            <div className="card-text"><div className='text-white text-center fs-1'><i className="big coin pe-5"></i>  100</div></div>
                                            <div className="entry-card-footer d-flex justify-content-around">
                                            <div className='quiz-prize text-white'> 56000 <i class="small coin ps-1"></i></div>
                                            <div className='quiz-user text-white'>516 <i class="fas fa-users text-white"></i> </div>

                                        </div>
                                        </div>
                                    </div>
                                </div>
                           </div>
                        </div>                    
                    </div>
                    <div className="row bg-white py-3">
                        <div className="col-xs-12">
                        <div className="card-quiz-detail d-flex justify-content-between">
                            <div className='add-circle bg-dark-orange'><i className="fas fa-plus fa-2x text-white" aria-hidden="true"></i></div>
                            <div className='quiz-name-small pt-1'>Quiz 1</div>
                            <div className='start-in-time'>Starts in 03.45 seconds</div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* single Entry fee card starts */}
                <section className="single-quiz-entry-fee">
                    <div className="row bg-dark-orange">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                           <div className="card-parent-gray">
                                <div className="single-q-fee-box  py-4 d-flex justify-content-center">                                
                                    <div className="card entry-fee-card small my-2">
                                        <div className="card-header bg-yellow-orange text-black">
                                            ENTRY FEE
                                        </div>
                                        <div className="card-body bg-dark-gray">
                                            <div className="card-text"><div className='text-white text-center fs-1'><i className="big coin pe-5"></i>  100</div></div>
                                            <div className="entry-card-footer d-flex justify-content-around">
                                            <div className='quiz-prize text-white'> 56000 <i class="small coin ps-1"></i></div>
                                            <div className='quiz-user text-white'>516 <i class="fas fa-users text-white"></i> </div>

                                        </div>
                                        </div>
                                    </div>
                                </div>
                           </div>
                        </div>
                    </div>
                    <div className="row bg-white py-3">
                        <div className="col-xs-12">
                        <div className="card-quiz-detail d-flex justify-content-between">
                            <div className='add-circle bg-dark-orange'><i className="fas fa-plus fa-2x text-white" aria-hidden="true"></i></div>
                            <div className='quiz-name-small pt-1'>Quiz 1</div>
                            <div className='start-in-time'>Starts in 03.45 seconds</div>
                            </div>
                        </div>
                    </div>
                </section> {/* single Entry fee card Ends */}
                {/* single Entry fee card starts */}
                <section className="single-quiz-entry-fee">
                    <div className="row bg-dark-orange">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                           <div className="card-parent-gray">
                                <div className="single-q-fee-box  py-3 d-flex justify-content-center">                                
                                    <div className="card entry-fee-card small my-2">
                                        <div className="card-header bg-yellow-orange text-black">
                                            ENTRY FEE
                                        </div>
                                        <div className="card-body bg-dark-gray">
                                            <div className="card-text"><div className='text-white text-center fs-1'><i className="big coin pe-5"></i>  100</div></div>
                                            <div className="entry-card-footer d-flex justify-content-around">
                                            <div className='quiz-prize text-white'> 56000 <i class="small coin ps-1"></i></div>
                                            <div className='quiz-user  text-white'>516 <i class="fas fa-users text-white"></i> </div>

                                        </div>
                                        </div>
                                    </div>
                                </div>
                           </div>
                        </div>
                    </div>
                    <div className="row bg-white py-3">
                        <div className="col-xs-12">
                        <div className="card-quiz-detail d-flex justify-content-between">
                            <div className='add-circle bg-dark-orange'><i className="fas fa-plus fa-2x text-white" aria-hidden="true"></i></div>
                            <div className='quiz-name-small pt-1'>Quiz 1</div>
                            <div className='start-in-time'>Starts in 03.45 seconds</div>
                            </div>
                        </div>
                    </div>
                </section> {/* single Entry fee card Ends */}

                
            </div>
       </div>
       <BottomNav />
    </div>
  )
}
