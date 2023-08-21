import { Link } from 'react-router-dom';
import '../App.css';
import HowTo from '../extras/how_to';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';

const soloTooltip = (
  <Tooltip id="soloT">
    <strong>Play casually by yourself.</strong> Try to lower your average guess count per game.
  </Tooltip>
);

const easyTooltip = (
  <Tooltip id="easyT">
    <strong>Play against an easy opponent.</strong> Give them a number to guess
          and try to guess theirs. Learn the game and its strategies while honing your skills.
  </Tooltip>
);

const hardTooltip = (
  <Tooltip id="HardT">
    <strong>Play against a hard opponent.</strong> Give them a number to guess
          and try to guess theirs. Be careful and calculative with your guesses to triumph.
  </Tooltip>
);

function Home() {
  return (
    <div className="App">
      <div style={{position:"absolute", top:"50px"}}>
        <Link to="/" style={{textDecoration:'none', color:"white"}}>
          ⚾ Strike and Ball ⚾
        </Link>
      </div>
      <div style={{position:"absolute", top:"125px"}}>
        <HowTo/>
      </div>
      
      Choose a Mode<br></br>
      <font style={{fontSize:"20px"}}>Guess the 4-digit number!</font>
      <div style={{marginTop:"50px"}}>
        <ul className="nav justify-content-center" style={{display:"block"}}>
          <li className="nav-item" style={{marginBottom:"15px"}}>
            <OverlayTrigger placement="right" overlay={soloTooltip}>
              <a className="nav-link" href="solo">💫 Solo 💫</a>
            </OverlayTrigger>
          </li>
          <li className="nav-item" style={{marginBottom:"15px"}}>
            <OverlayTrigger placement="right" overlay={easyTooltip}>
              <a className="nav-link" href="easy">💡 Easy CPU 💡</a>
            </OverlayTrigger>
          </li>
          <li className="nav-item" style={{marginBottom:"15px"}}>
            <OverlayTrigger placement="right" overlay={hardTooltip}>
              <a className="nav-link" href="hard">🔥 Hard CPU 🔥</a>
            </OverlayTrigger>
          </li>
        </ul>
      </div>
      <div style={{position:"absolute", bottom:"10px", right:"15px", fontSize:"10px", color:"white"}}> 
        Started Dev 7.18.23 @ Ashley Jeong
      </div>
    </div>
  );
}

export default Home;