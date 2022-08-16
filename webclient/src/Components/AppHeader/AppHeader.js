import React from 'react'

export default function AppHeader() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <div className="top-nav d-flex justify-content-around py-3 fixed-top">
              <div className="profile">
                <img src="./assets/images/profile.png" alt="Profile image" />
              </div>
              <div className="logo"><h1>CLUTCH</h1></div>
              <div className="total-coin">
                <div className="wallet-coin">
                  140 <i className="coin"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

