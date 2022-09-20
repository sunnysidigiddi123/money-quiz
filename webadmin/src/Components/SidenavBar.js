import React from 'react'
import {  Link, NavLink } from "react-router-dom";
import {
    useNavigate
  } from "react-router-dom";

const SidenavBar = () => {
	const navigate = useNavigate()
	const logout =()=>{
		localStorage.clear();
		sessionStorage.clear();
		navigate("/");
	  }

	  const navigateToAds =()=>{
		navigate("/adhome");
	  }

	  const navigateToContest =()=>{
		navigate("/adminhome");
	  }
    return (
        <>
            <div className="left-side-bar">
		<div className="brand-logo">
			<Link to='/adminhome'>
				<img src="vendors/images/money1.png" alt="MoneyQuiz" className="dark-logo"/>
				<img src="vendors/images/money1.png" alt="MoneyQuiz" className="light-logo"/>
			</Link>
			<div className="close-sidebar" data-toggle="left-sidebar-close">
				<i className="ion-close-round"></i>
			</div>
		</div>
		<div className="menu-block customscroll">
			<div className="sidebar-menu">
				<ul id="accordion-menu">
					<li className="dropdown">
						<a href="#" className="dropdown-toggle ">
							<span className="micon dw dw-house-1"></span><span className="mtext">Home</span>
						</a>
						
					</li>
					<li className="dropdown">
						<a href="#" className="dropdown-toggle" onClick={navigateToContest}>
							<span className="micon dw dw-edit2"></span><span className="mtext">Contests</span>
						</a>
					
					</li>
					<li className="dropdown">
						<a href="#" className="dropdown-toggle" onClick={navigateToAds}>
							<span className="micon dw dw-library"></span><span className="mtext">Ads</span>
						</a>
						
					</li>
					
					<li className="dropdown">
						<a href="#" className="dropdown-toggle">
							<span className="micon dw dw-paint-brush"></span><span className="mtext">Settings</span>
						</a>
						
					</li>
					<li className="dropdown">
						<a href="#" className="dropdown-toggle">
							<span className="micon dw dw-analytics-21"></span><span className="mtext">Profile</span>
						</a>
						<ul className="submenu">
							<li><a href="#">Menu 1</a></li>
							
						</ul>
					</li>				
					<li>
					<a  className="dropdown-toggle no-arrow" onClick={logout}>
							<span className="micon dw dw-invoice"></span><span className="mtext">Signout</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
        </>
    )
}

export default SidenavBar
