import React from 'react';
import {useNavigate, Link} from "react-router-dom";

export default function BottomNav() {

  const navigate = useNavigate()
	const logout =()=>{
		localStorage.clear();
		sessionStorage.clear();
		navigate("/");
	  }
  return (
    <div>
      <div className="">
        <div className="container-fluid">
          <nav className="navbar fixed-bottom bottom-nav border-top-radius-50">
            <div className="container-fluid text-center">
              <a href="#" className="active"><i className="fa fa-home fa-2x" aria-hidden="true"></i></a>
              <Link to={'/userprofile'}><a href="#"><i className="fas fa-user fa-2x" aria-hidden="true"></i></a></Link>
              
              <a onClick={logout}><i className="fa fa-bolt  fa-2x" aria-hidden="true"></i></a>
              {/* <a onClick={logout}><i className='fas fa-wallet' style={{ fontSize: '24px' }}></i></a> */}
              <Link to={'/userwallet'}><a><i className='fas fa-wallet' style={{ fontSize: '24px' }}></i></a></Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
