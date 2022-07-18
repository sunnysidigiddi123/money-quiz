import React from 'react'
import { Modal, Button, Form, Row, ModalFooter } from "react-bootstrap";
import { FaCrown,FaExclamation,FaSmile} from "react-icons/fa";
import {
	BrowserRouter as Router,
  useNavigate,
  useLocation,useParams,Link
  } from "react-router-dom";

const ModalPerQuestion = (props) => {
  return (
    <>
        
        <Modal
            size="md"
            show={props.lgShows}
            onHide={() => props.setLgShows(false)}
            backdrop="static"
            keyboard={false}
            aria-labelledby="example-modal-sizes-title-lg"
         
		
      >
        <Modal.Header >
          <Modal.Title id="example-modal-sizes-title-lg">
            Question Result 
          </Modal.Title>

          </Modal.Header>

           <Modal.Body>
           <div className="result_box">
           <div className="icon">
            <FaCrown />
            </div>
        <div className="complete_text">You've completed the {props.second} Question</div>
       
        {(props.correctoption === props.selectedans && props.correctoption !== '' && props.selectedans !== ''  ) ? 

          <div className="score_text" style={{color:'green',textAlign:'center'}}>
          Congrats! You gave correct answer
          </div>  : <div className="score_text"style={{color:'red',textAlign:'center'}}>
          Oops! You gave Wrong answer  
          </div> }
   
        <div className='buttons'>
              <Link to="/userhome"> <button className="quit1">Due You Want To Cash Out !</button></Link>
              <button className="quit" onClick={props.continuee}>Continue</button>
              </div>
    </div>
		
			      </Modal.Body>
           
                  </Modal>

        
        </>
  )
}

export default ModalPerQuestion