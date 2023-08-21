import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';

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
        <p style={{fontSize:"20px"}}>I've picked a 4-digit number. It's up to you to guess it! </p>
        <h4>Valid numbers</h4>
        <p style={{fontSize:"20px"}}>A valid guess or answer has 4 unique digits of 0-9.</p>
        <center>
          <div style={{fontSize:"20px", marginBottom:"15px"}}>For example:</div>
          <div style={{display:"flex", width:"100%", justifyContent:"space-around"}}>
            <div style={{display:"block", fontSize:"40px"}}>
              <font style={{backgroundColor:"lightgreen"}}>0382</font>
              <div>valid</div>
            </div>
            <div style={{display:"block", fontSize:"40px"}}>
                <font style={{backgroundColor:"lightpink"}}>3</font>0<font style={{backgroundColor:"lightpink"}}>3</font>4
                <div>invalid</div>
            </div>
          </div>
          <br></br>
        </center>
        <h4>Guessing Feedback</h4>
        <p style={{fontSize:"20px"}}>
          After submitting a number, I'll give you some feedback to tell you how close you are to my number!<br></br>
        </p>
        <font style={{fontSize:"18px"}}><center><strong>To win, you need 4 Strikes!<br></br></strong></center></font>
          <strong>"S": Strikes</strong> - You have a digit that is the correct number and in the same position as in the answer. <br></br>
          <strong>"B": Balls</strong> - You have a digit that is included in the answer, but it isn't in the correct position. <br></br><br></br>
        <center>
          <div style={{fontSize:"20px"}}>
            Example: 1 Strike, 1 Ball ("
            <font style={{backgroundColor:"lightgreen"}}>1S</font> &nbsp;
            <font style={{backgroundColor:"lightskyblue", textDecoration:"underline"}}>1B</font>"
            )
            </div>
          <div style={{display:"flex", width:"100%", justifyContent:"space-around"}}>
            <div style={{display:"block", fontSize:"40px"}}>
              <div>Answer</div>
              30
              <font style={{backgroundColor:"lightskyblue", textDecoration:"underline"}}>2</font>
              <font style={{backgroundColor:"lightgreen"}}>9</font>
            </div>
            <div style={{display:"block", fontSize:"40px"}}>
              <div>Guess</div>
              <font style={{backgroundColor:"lightskyblue", textDecoration:"underline"}}>2</font>
              87
              <font style={{backgroundColor:"lightgreen"}}>9</font>
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
        <Button style={{padding:"5px 10px 5px 10px"}} onClick={() => setModalShow(true)}>
            How to Play~
        </Button>
        <HowtoModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
    </>
    );
}

export default HowTo;