import React from 'react'
import { Link } from 'react-router-dom';

export default function AppHeader(props) {
  let user = props.user;
  let wallet = props.wallet;
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <div className="top-nav d-flex justify-content-around py-3 fixed-top">
              <div className="profile">
                <Link to={'/userprofile'}><img src="./assets/images/profile.png" alt="Profile image" /></Link>                
              </div>
              <Link to={"/appuserhome"}><div className="logo"><img src="./assets/images/logo2.webp" alt="Profile image" /></div></Link>              
              <div className="total-coin">
                <div className="wallet-coin">
                  {wallet} <i className="coin"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

