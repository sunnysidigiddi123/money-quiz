import React from 'react'
import { Modal, Button, Form, Row, ModalFooter } from "react-bootstrap";
import { FaCrown,FaExclamation,FaSmile} from "react-icons/fa";
import {
	BrowserRouter as Router,
  useNavigate,
  useLocation,useParams,Link
  } from "react-router-dom";
const ModalSuccess = (props) => {
  return (
       
       <>
         <Modal
            size="md"
            show={props.lgShow}
            onHide={() => props.setLgShow(false)}
            backdrop="static"
            keyboard={false}
            aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header >
          <Modal.Title id="example-modal-sizes-title-lg">
            Result
          </Modal.Title>

          </Modal.Header>

           <Modal.Body>
           <div className="result_box">
           <div className="icon">
            <FaCrown />
            </div>
        <div className="complete_text">You've completed the Contest!</div>
       { props.score==props.filtquestionlength ? 
           <div className="score_text" style={{color:'green',textAlign:'center'}}>
           Congrats! You got cleared for next round! Please check your email for further details
         </div>
       
       : <div className="score_text"style={{color:'red',textAlign:'center'}}>
          Sorry! You are not Qualify for next round!  
        </div> }
        <div className='buttons'>
              <Link to="/userhome"> <button className="quit">Quit Contest</button></Link>
              </div>
    </div>
		
			      </Modal.Body>
           
                  </Modal>


       </>
  )
}

export default ModalSuccess