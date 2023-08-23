import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import './how_to.css'

export function HowtoModal (props) {
    return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          How to Play - Strike and Ball
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{fontSize:"20px"}}><strong>Guess the 4-digit number!</strong></p>
        <hr className="mb-3 mt-4" style={{width:"80%", margin:"auto"}}/>
        <h4>Valid Numbers</h4>
        <p style={{fontSize:"20px"}}>A valid guess or answer has 4 <font style={{textDecoration:"underline"}}>unique</font> digits of 0-9.</p>
        <center>
          <div style={{fontSize:"20px", marginBottom:"10px"}}>For example:</div>
          <div className="HowTo-example">
            <div className="HowTo-example-block">
              <font className="HowTo-example-correct">0382</font>
              <div style={{fontSize:"25px"}}>valid</div>
            </div>
            <div className="HowTo-example-block">
                <font className="HowTo-example-wrong">3</font>0<font className="HowTo-example-wrong">3</font>4
                <div style={{fontSize:"25px"}}>invalid</div>
            </div>
          </div>
          <br></br>
        </center>
        <hr className="mb-4" style={{width:"80%", margin:"auto"}}/>
        <h4>Guessing Feedback</h4>
        <p style={{fontSize:"20px"}}>
          After guessing a number, I'll give you some feedback to tell you how close you are to my number!<br></br>
        </p>
        <font style={{fontSize:"18px"}}><center><strong>To win, you need 4 Strikes!<br></br></strong></center></font>
          <strong>Strikes (S)</strong> - You have a digit that is the correct number and in the same position as in the answer. <br></br>
          <strong>Balls (B)</strong> - You have a digit that is included in the answer, but it isn't in the correct position. <br></br><br></br>
        <center>
          <div style={{fontSize:"20px"}}>
            Example: 1 Strike, 1 Ball ("
            <font className="HowTo-example-correct">1S</font> &nbsp;
            <font className="HowTo-example-ball">1B</font>"
            )
            </div>
          <div className="HowTo-example">
            <div className="HowTo-example-block">
              <div>Answer</div>
              30
              <font className="HowTo-example-ball">2</font>
              <font className="HowTo-example-correct">9</font>
            </div>
            <div className="HowTo-example-block">
              <div>Guess</div>
              <font className="HowTo-example-ball">2</font>
              87
              <font className="HowTo-example-correct">9</font>
            </div>
          </div>
        </center>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
}

function HowTo() {
    const [modalShow, setModalShow] = useState(false);
    return (
    <>
        <Button className="HowTo-button" style={{padding:"5px 10px 5px 10px"}} onClick={() => setModalShow(true)}>
            How to Play
        </Button>
        <HowtoModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
    </>
    );
}

export default HowTo;