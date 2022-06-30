import axios from "axios";
import React, { memo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Navigate,useNavigate } from "react-router-dom";

const NewQuestionModal = (props) => {
  const { newQuestionModal = false, setnewQuestionModal,segment } = props;
  
  const closeNewQuestionModal = () => setnewQuestionModal(false);
  const handleChange = (e) => {
    setQuestionType(e.target.value);
  };
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctanswer, setCorrectAnswer] = useState("");
  const [questionType, setQuestionType] = useState("video");
  const [segmentId,setSegmentId] = useState();
  const [videolink,setVideolink] = useState("");
  const [questionTime,setQuestionTime] = useState();
  const [totalQuestions,setTotalQuestions] = useState();
  const [totaltiming,setTotalTiming] = useState();
  const navigate = useNavigate()
  console.log(segment,"pppp")
  const saveQuestion = async () => {
    console.log(segmentId,"pppp")
    const BASE_URL = `${process.env.REACT_APP_BASE_URL}/question/createQuestion`;
    let sendData = {
      question: question,
      correctanswer: correctanswer==''? optionA : correctanswer,
      type: questionType,
      videolink:videolink,
      totalQuestionTime:totaltiming,
      totalVideoTime:questionTime,
      contestId:props.contestId,
      segmentId: segmentId== undefined ? segment[0].id : segmentId
    };
    if (questionType == "video") {
      sendData.options = [optionA,optionB,optionC,optionD]
       
    }
    console.log(sendData);
    try {
      const data = await axios.post(BASE_URL, sendData);
      console.log(data);
      navigate('/adminHome')
    } catch (error) {}
  };
  console.log(
    optionA,
    optionB,
    optionC,
    optionD,
    correctanswer,
    question,
    questionType
  );
  return (
    <>
      <Modal
        show={newQuestionModal}
        onHide={closeNewQuestionModal}
        backdrop="static"
        size="lg modal-dialog-centered"
        className="sectionmaping createsection studdymaterial"
      >
        <Modal.Header closeButton>Add New Question</Modal.Header>
        <Modal.Body>
          <div className=" admincontainer">
            <div className="pd-ltr-20">
              <div className="card-box mb-30 admincreate">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
                  hic non repellendus debitis iure, doloremque assumenda. Autem
                  modi, corrupti, nobis ea iure fugiat, veniam non quaerat
                  mollitia animi error corporis.
                </p>
                <div>
                  {" "}
                  <div className="form-group questionType col-md-6">
                    <label for="exampleFormControlSelect1 questionheading">
                      Select Question Type
                    </label>
                    <select
                      value={questionType}
                      className="form-control"
                      id="exampleFormControlSelect1"
                      onChange={handleChange}
                    >
                      <option value="video">video</option>
                      <option value="Yes/No">Yes/No</option>
                    </select>
                  </div>
                </div>
                <div>
                  {" "}
                  <div className="form-group questionType col-md-6">
                    <label for="exampleFormControlSelect1 questionheading">
                      Select Segment 
                    </label>
                     <select
                      value={segmentId}
                      className="form-control"
                      id="exampleFormControlSelect1"
                      onChange={(e) => {
                        setSegmentId(e.target.value);
                      }}
                    >
                      {
                        segment && segment.map((result)=>( <option value={result.id}>{result.segmentName}</option>))
                      }
                      {/* <option value="MCQ">MCQ</option>
                      <option value="Yes/No">Yes/No</option> */}
                    </select> 
                  </div>
                </div>
                {questionType === "video" && (
                  <>
                    <form>
                      <div className="form-row">
                        <div className="col questionName">
                          <label for="question questionheading">Question</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Type your question here"
                            value={question}
                            onChange={(e) => {
                              setQuestion(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label for="inputOptionA questionheading">
                            Option-A
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Option-A"
                            value={optionA}
                            onChange={(e) => setOptionA(e.target.value)}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label for="inputOptionB questionheading">
                            Option-B
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Option-B"
                            value={optionB}
                            onChange={(e) => setOptionB(e.target.value)}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label for="inputOptionC questionheading">
                            Option-C
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Option-C"
                            value={optionC}
                            onChange={(e) => setOptionC(e.target.value)}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label for="inputOptionD questionheading">
                            Option-D
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Option-D"
                            value={optionD}
                            onChange={(e) => setOptionD(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col questionName">
                          <label for="question questionheading">Add Video Streaming Link</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Type Streaming Link"
                            value={videolink}
                            onChange={(e) => {
                              setVideolink(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col questionName">
                          <label for="question questionheading">Total Video Timing</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="In Secs"
                            value={questionTime}
                            onChange={(e) => {
                              setQuestionTime(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    
                
                      <div className="form-row">
                        <div className="col questionName">
                          <label for="question questionheading">Total Question timing</label>
                          <input
                            type='number'
                            className="form-control"
                            placeholder="In Secs"
                            
                            onChange={(e) => {
                              setTotalTiming(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      
                    </form>
                  </>
                )}
                {questionType === "video" && (
                  <>
                    <form>
                      <div className="form-row">
                        <div className="col">
                          <label for="exampleFormControlSelect1">
                            Select Correct Answer
                          </label>
                          <select
                            className="form-control"
                            id="exampleFormControlSelect1"
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                          >
                            <option value={optionA}>Option-A</option>
                            <option value={optionB}>Option-B</option>
                            <option value={optionC}>Option-C</option>
                            <option value={optionD}>Option-D</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </>
                )}
                {questionType === "Yes/No" && (
                  <>
                    <form>
                      <div className="form-row">
                        <div className="col questionheading">
                          <label for="question">Question</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Type your question here"
                            value={question}
                            onChange={(e) => {
                              setQuestion(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        {" "}
                        <div className="form-group questionType col-md-6">
                          <label for="exampleFormControlSelect1">
                            Select Correct Answer
                          </label>
                          <select
                            className="form-control"
                            id="exampleFormControlSelect1"
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
              {/* <div className="footer-wrap pd-20 mb-20 card-box adminfooter">
            MoneyQuiz - Copyright © 2022 By <Link to="/adminhome">Calance</Link>
          </div> */}
              {/* <Footer /> */}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {questionType == "video" ? (
            <Button
              disabled={
                !optionA ||
                !optionB ||
                !optionC ||
                !optionD ||
                // !correctanswer ||
                !question
              }
              onClick={() => saveQuestion()}
            >
              Save
            </Button>
          ) : (
            <Button
              disabled={!correctanswer || !question}
              onClick={() => saveQuestion()}
            >
              Savelk
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default memo(NewQuestionModal);
