import React from 'react'
import {
    useNavigate
  } from "react-router-dom";

  
const Header = (props) => {
	const navigate = useNavigate()

	const logout =()=>{
		localStorage.clear();
		sessionStorage.clear();
		navigate("/");
	  }
	
    
    return (
        <>
            	<div className="header">
		 <div className="header-left">
			<div className="menu-icon dw dw-menu"></div>
			<div className="search-toggle-icon dw dw-search2" data-toggle="header_search"></div>
			<div className="header-search">
				<form>
					<div className="form-group mb-0">
						<i className="dw dw-search2 search-icon"></i>
						<input type="text" className="form-control search-input" placeholder="Search Here"/>
						<div className="dropdown">
							<a className="dropdown-toggle no-arrow" href="#" role="button" data-toggle="dropdown">
								<i className="ion-arrow-down-c"></i>
							</a>
							<div className="dropdown-menu dropdown-menu-right">
								<div className="form-group row">
									<label className="col-sm-12 col-md-2 col-form-label">From</label>
									<div className="col-sm-12 col-md-10">
										<input className="form-control form-control-sm form-control-line" type="text"/>
									</div>
								</div>
								<div className="form-group row">
									<label className="col-sm-12 col-md-2 col-form-label">To</label>
									<div className="col-sm-12 col-md-10">
										<input className="form-control form-control-sm form-control-line" type="text"/>
									</div>
								</div>
								<div className="form-group row">
									<label className="col-sm-12 col-md-2 col-form-label">Subject</label>
									<div className="col-sm-12 col-md-10">
										<input className="form-control form-control-sm form-control-line" type="text"/>
									</div>
								</div>
								<div className="text-right">
									<button className="btn btn-primary">Search</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div className="header-right">
			<div className="dashboard-setting user-notification">
				<div className="dropdown" >
					<a className="dropdown-toggle no-arrow" href="#" data-toggle="right-sidebar">
						<i className="dw dw-settings2" data-toggle="tooltip" data-placement="bottom" title="Layout Settings"></i>
						
					</a>
					
				</div>
			</div>
			<div className="user-notification">
				<div className="dropdown">
					<a className="dropdown-toggle no-arrow" href="#" role="button" data-toggle="dropdown">
						<i className="icon-copy dw dw-notification" data-toggle="tooltip" data-placement="bottom" title="Notifications"></i>
						<span className="badge notification-active"></span>
					</a>
					<div className="dropdown-menu dropdown-menu-right">
						<div className="notification-list mx-h-350 customscroll">
							<ul>
								<li>
									<a href="#">
										<img src="vendors/images/img.jpg" alt=""/>
										<h3>John Doe</h3>
										{/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed...</p> */}
									</a>
								</li>
								<li>
									<a href="#">
										<img src="vendors/images/photo1.jpg" alt=""/>
										<h3>Lea R. Frith</h3>
										{/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed...</p> */}
									</a>
								</li>
								<li>
									<a href="#">
										<img src="vendors/images/photo2.jpg" alt=""/>
										<h3>Erik L. Richards</h3>
										{/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed...</p> */}
									</a>
								</li>
								<li>
									<a href="#">
										<img src="vendors/images/photo3.jpg" alt=""/>
										<h3>John Doe</h3>
										{/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed...</p> */}
									</a>
								</li>
								<li>
									<a href="#">
										<img src="vendors/images/photo4.jpg" alt=""/>
										<h3>Renee I. Hansen</h3>
										{/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed...</p> */}
									</a>
								</li>
								<li>
									<a href="#">
										<img src="vendors/images/img.jpg" alt=""/>
										<h3>Vicki M. Coleman</h3>
										{/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed...</p> */}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="user-info-dropdown">
				<div className="dropdown">
					<a className="dropdown-toggle" href="#" role="button" data-toggle="dropdown">
						<span className="user-icon">
							<img src="vendors/images/photo1.jpg" alt=""/>
						</span>
						<span className="user-name">{props.user}</span>
					</a>
					<div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list" style={{cursor:'pointer'}}>
						<a className="dropdown-item" href="profile.html"><i className="dw dw-user1"></i> Profile</a>
						<a className="dropdown-item" href="profile.html"><i className="dw dw-settings2"></i> Setting</a>
						<a className="dropdown-item" href="faq.html"><i className="dw dw-help"></i> Help</a>
						<a className="dropdown-item" onClick={logout}><i className="dw dw-logout"></i> Log Out</a>
					</div>
				</div>
			</div>
			
		</div>
	</div>

	<div className="right-sidebar">
		<div className="sidebar-title">
			<h3 className="weight-600 font-16 text-blue">
				Layout Settings
				<span className="btn-block font-weight-400 font-12">User Interface Settings</span>
			</h3>
			<div className="close-sidebar" data-toggle="right-sidebar-close">
				<i className="icon-copy ion-close-round"></i>
			</div>
		</div>
		<div className="right-sidebar-body customscroll">
			<div className="right-sidebar-body-content">
				<h4 className="weight-600 font-18 pb-10">Header Background</h4>
				<div className="sidebar-btn-group pb-30 mb-10">
					<a href={void(0)} className="btn btn-outline-primary header-white ">White</a>
					<a href={void(0)} className="btn btn-outline-primary header-dark active">Dark</a>
					
				</div>

				<h4 className="weight-600 font-18 pb-10">Sidebar Background</h4>
				<div className="sidebar-btn-group pb-30 mb-10">
					<a href={void(0)} className="btn btn-outline-primary sidebar-light ">White</a>
					<a href={void(0)} className="btn btn-outline-primary sidebar-dark active">Dark</a>
				</div>

				<h4 className="weight-600 font-18 pb-10">Menu Dropdown Icon</h4>
				<div className="sidebar-radio-group pb-10 mb-10">
					<div className="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebaricon-1" name="menu-dropdown-icon" className="custom-control-input" value="icon-style-1" defaultChecked=""/>
						<label className="custom-control-label" htmlFor="sidebaricon-1"><i className="fa fa-angle-down"></i></label>
					</div>
					<div className="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebaricon-2" name="menu-dropdown-icon" className="custom-control-input" value="icon-style-2"/>
						<label className="custom-control-label" htmlFor="sidebaricon-2"><i className="ion-plus-round"></i></label>
					</div>
					<div className="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebaricon-3" name="menu-dropdown-icon" className="custom-control-input" value="icon-style-3"/>
						<label className="custom-control-label" htmlFor="sidebaricon-3"><i className="fa fa-angle-double-right"></i></label>
					</div>
				</div>

				<h4 className="weight-600 font-18 pb-10">Menu List Icon</h4>
				<div className="sidebar-radio-group pb-30 mb-10">
					<div className="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebariconlist-1" name="menu-list-icon" className="custom-control-input" value="icon-list-style-1" defaultChecked=""/>
						<label className="custom-control-label" htmlFor="sidebariconlist-1"><i className="ion-minus-round"></i></label>
					</div>
					<div className="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebariconlist-2" name="menu-list-icon" className="custom-control-input" value="icon-list-style-2"/>
						<label className="custom-control-label" htmlFor="sidebariconlist-2"><i className="fa fa-circle-o" aria-hidden="true"></i></label>
					</div>
					<div className="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebariconlist-3" name="menu-list-icon" className="custom-control-input" value="icon-list-style-3"/>
						<label className="custom-control-label" htmlFor="sidebariconlist-3"><i className="dw dw-check"></i></label>
					</div>
					<div className="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebariconlist-4" name="menu-list-icon" className="custom-control-input" value="icon-list-style-4" defaultChecked=""/>
						<label className="custom-control-label" htmlFor="sidebariconlist-4"><i className="icon-copy dw dw-next-2"></i></label>
					</div>
					<div className="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebariconlist-5" name="menu-list-icon" className="custom-control-input" value="icon-list-style-5"/>
						<label className="custom-control-label" htmlFor="sidebariconlist-5"><i className="dw dw-fast-htmlForward-1"></i></label>
					</div>
					<div className="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebariconlist-6" name="menu-list-icon" className="custom-control-input" value="icon-list-style-6"/>
						<label className="custom-control-label" htmlFor="sidebariconlist-6"><i className="dw dw-next"></i></label>
					</div>
				</div>

				<div className="reset-options pt-30 text-center">
					<button className="btn btn-danger" id="reset-settings">Reset Settings</button>
				</div>
			</div>
		</div>
	</div>
        </>
    )
}

export default Header
