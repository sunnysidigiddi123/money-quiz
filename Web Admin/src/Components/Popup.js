import React from 'react'

const Popup = () => {
    return (
        <>
					<div className="col-md-4 col-sm-12 mb-30">
						<div className="pd-20 card-box height-100-p">
							<h5 className="h4">Success modal</h5>
							
							<div className="modal fade" id="success-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
								<div className="modal-dialog modal-dialog-centered" role="document">
									<div className="modal-content">
										<div className="modal-body text-center font-18">
											<h3 className="mb-20">Form Submitted!</h3>
											<div className="mb-30 text-center"><img src="vendors/images/success.png" /></div>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
										</div>
										<div className="modal-footer justify-content-center">
											<button type="button" className="btn btn-primary" data-dismiss="modal">Done</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
        </>
    )
}

export default Popup
