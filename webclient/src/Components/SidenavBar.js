import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useNavigate
  } from "react-router-dom";

const SidenavBar = () => {
	const navigate = useNavigate()
	const logout =()=>{
		localStorage.clear();
		sessionStorage.clear();
		navigate("/");
	  }
    return (
        <>
            <div className="left-side-bar">
		<div className="brand-logo">
			<Link to='/userhome'>
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
						<a  className="dropdown-toggle ">
							<span className="micon dw dw-house-1"></span><span className="mtext">Home</span>
						</a>
						
					</li>
					{/* <li className="dropdown">
						<a href="#" className="dropdown-toggle">
							<span className="micon dw dw-edit2"></span><span className="mtext">Contests</span>
						</a>
						<ul className="submenu">
							<li><a href="#">Menu 1</a></li>
							<li><a href="#">Menu 2</a></li>
							<li><a href="#">Menu 3</a></li>
						
							
						</ul>
					</li>
					<li className="dropdown">
						<a href="#" className="dropdown-toggle">
							<span className="micon dw dw-library"></span><span className="mtext">Wallet</span>
						</a>
						<ul className="submenu">
							<li><a href="#">Menu 1</a></li>
							<li><a href="#">Menu 2</a></li>
						</ul>
					</li>
					<li>
						<a href="#" className="dropdown-toggle no-arrow">
							<span className="micon dw dw-calendar1"></span><span className="mtext">Calendar</span>
						</a>
					</li>
					<li className="dropdown">
						<a href="#" className="dropdown-toggle">
							<span className="micon dw dw-apartment"></span><span className="mtext"> Previous Contests </span>
						</a>
						<ul className="submenu">
							<li><a href="#">Menu 1</a></li>
							<li><a href="#">Menu 2</a></li>
					
						
						</ul>
					</li>
					<li className="dropdown">
						<a href="#" className="dropdown-toggle">
							<span className="micon dw dw-paint-brush"></span><span className="mtext">Settings</span>
						</a>
						<ul className="submenu">
							<li><a href="#">Menu 1</a></li>
						
						</ul>
					</li>
					<li className="dropdown">
						<a href="#" className="dropdown-toggle">
							<span className="micon dw dw-analytics-21"></span><span className="mtext">Profile</span>
						</a>
						<ul className="submenu">
							<li><a href="#">Menu 1</a></li>
							
						</ul>
					</li>
					<li className="dropdown">
						<a href="#" className="dropdown-toggle">
							<span className="micon dw dw-right-arrow1"></span><span className="mtext">Pages</span>
						</a>
						<ul className="submenu">
							<li><a href="#">Menu 1</a></li>
							<li><a href="#">Menu 2</a></li>
							
						</ul>
					</li>
			
					<li>
						<a href="#" className="dropdown-toggle no-arrow">
							<span className="micon dw dw-diagram"></span><span className="mtext">Sitemap</span>
						</a>
					</li>
					<li>
						<a href="#" className="dropdown-toggle no-arrow">
							<span className="micon dw dw-chat3"></span><span className="mtext">Chat</span>
						</a>
					</li> */}
					<li>
					<a onClick={logout} className="dropdown-toggle no-arrow">
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
