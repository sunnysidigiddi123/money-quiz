import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "./Contest.css";
import './QuestionList.css';
const QuestionList = ({questionList,setCurrentPage,setnewQuestionModal}) => {
  
  return  (
    <Container fluid>
      <Row>
        <Col md={12}>
          <div class="table-responsive tapp-addstudent-flextable">
              <div className="questionList">
              <div >Question Lists</div>
              <div className="newQues" onClick={()=>setnewQuestionModal(true)} style={{cursor:'pointer'}}>+ Add New Question</div>
              </div>
            <table class="table">
              <thead>
                <tr>
                  
                  <th scope="col" className="tapp-addstudent-tablecell2">
                    S.No
                  </th>
                  <th scope="col" className="tapp-addstudent-tablecell3">
                    Question Title
                  </th>
                  <th scope="col" className="tapp-addstudent-tablecell4">
                    Correct Answer
                  </th>
                  <th scope="col" className="tapp-addstudent-tablecell5">
                    Question Type
                  </th>
                
                </tr>
              </thead>
              <tbody>
                {questionList.length > 0 ? (
                  <>
                  {questionList.map((question, index) => (
                    <tr
                      key={question["S.no"]+" "+index}
                                          >
                      
                      <td className="tapp-addstudent-tablecell3">
                        {" "}
                       {index+1}
                      </td>
                      <td className="tapp-addstudent-tablecell4">
                       {question.question}
                      </td>
                      <td className="tapp-addstudent-tablecell5">
                        {" "}
                        {question.correctanswer}
                      </td>
                      <td className="tapp-addstudent-tablecell6">
                        {question.type}
                      </td>
                    
                    </tr>
                  ))}
                  </>
                ) : questionList.length==0 ? (
                  <tr className="tapp-addstudent-tablecellminh">
                    <td colspan="8">
                      {" "}
                      <p
                        className
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          marginBottom: "10px"
                        }}
                      >
                        No data Found
                      </p>
                    </td>
                  </tr>
                ) :""}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </Container>
  )
};
export default memo(QuestionList);
