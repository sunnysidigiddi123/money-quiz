import React from 'react'

export default function BottomNav() {
  return (
    <div>
      <div className="">
        <div className="container-fluid">
          <nav className="navbar fixed-bottom bottom-nav border-top-radius-50">
            <div className="container-fluid text-center">
              <a href="#" className="active"><i className="fa fa-home fa-2x" aria-hidden="true"></i></a>
              <a href="#"><i className="fas fa-user fa-2x" aria-hidden="true"></i></a>
              <a href="#"><i className="fa fa-bolt  fa-2x" aria-hidden="true"></i></a>
              <a href="#"><i className='fas fa-wallet' style={{ fontSize: '24px' }}></i></a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
