import React from 'react';
import AppHeader from "../../Components/AppHeader/AppHeader";
import BottomNav from "../BottomNav/BottomNav";
import ReactPlayer from 'react-player/youtube'

export default function SingleQuestion() {
    return (
        <div>
            <AppHeader />
            <div className="inner-page-container">
                <div className="container-fluid">
                    {/*Active player ribbon starts */}
                    <section className="single-question">
                        <div className="row">
                            <div className="col-xs-12 col-md-12 mt-2">
                                <span className='text-white bg-dark-orange mt-2 d-inline-block small-ribbon'> 5 Sec</span>
                                <div className="info-oval-ribbon d-flex justify-content-between bg-dark-orange ps-5 py-3">
                                    <div className="question-text text-white">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 pt-3 d-flex justify-content-center">

                                <img src="./assets/images/ques-img.jpeg" className='ques-img' alt="" />
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 mt-3 d-flex justify-content-center">
                                <div className='video-player-wraper'>
                                <ReactPlayer className="react-player" id='player' url="https://www.youtube.com/watch?v=1Upn-UAk2ZU" frameborder="0" allowfullscreen playing={true} allow="autoplay"  width='100%'
                                       height='100%' muted></ReactPlayer>
                                </div>
                            </div>
                            

                            <div className="col-xs-12 col-sm-12 col-md-12 pt-3">
                                <div className="question-options">
                                    <div className="radio-tile-group">
                                        <div className="input-container">
                                            <input id="walk" className="radio-button" type="radio" name="radio" />
                                            <div className="radio-tile">
                                                <label for="walk" className="radio-tile-label">A</label>
                                            </div>
                                        </div>

                                        <div className="input-container">
                                            <input id="bike" className="radio-button" type="radio" name="radio" />
                                            <div className="radio-tile">

                                                <label for="bike" className="radio-tile-label">B</label>
                                            </div>
                                        </div>

                                        <div className="input-container">
                                            <input id="drive" className="radio-button" type="radio" name="radio" />
                                            <div className="radio-tile">

                                                <label for="drive" className="radio-tile-label">C</label>
                                            </div>
                                        </div>

                                        <div className="input-container">
                                            <input id="fly" className="radio-button" type="radio" name="radio" />
                                            <div className="radio-tile">
                                                <label for="fly" className="radio-tile-label">D</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                

                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 d-flex justify-content-center pt-2 mt-4">                            
                                    <button type="button" className="btn btn-orange">Submit</button>                                
                            </div>
                        </div>
                    </section>{/* Active player ribbon ends */}
                </div>
            </div>
            <BottomNav />
        </div>
    )
}
