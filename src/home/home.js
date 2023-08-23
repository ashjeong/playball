import { Link } from 'react-router-dom';
import '../App.css';
import HowTo from '../extras/how_to';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';

const soloTooltip = (
  <Tooltip id="soloT">
    <strong>Play casually by yourself.</strong> <br></br>
    Try to lower your average<br></br>
    guess count per game.
  </Tooltip>
);

const easyTooltip = (
  <Tooltip id="easyT" style={{width:"400px"}}>
    <strong>Play against an easy opponent.</strong><br></br>
    Give them a number to guess<br></br>
    and try to guess theirs. Learn the<br></br>
    game and its strategies while <br></br>
    honing your skills.
  </Tooltip>
);

const hardTooltip = (
  <Tooltip id="HardT">
    <strong>Play against a hard opponent.</strong><br></br>
    Give them a number to guess<br></br>
    and try to guess theirs. Be<br></br>
    careful and calculative with<br></br>
    your guesses to triumph.
  </Tooltip>
);

function Home() {
  return (
    <div className="App">
      <div className="Title-header">
        <Link to="/" className="Title">
          ⚾ Strike and Ball ⚾
        </Link>
      </div>
      <div style={{position:"absolute", top:"125px", whiteSpace:"nowrap"}}>
        <HowTo/>
      </div>
      
      <font className="mode-colors">Choose a Mode<br></br></font>
      <font className="mode-colors" style={{fontSize:"20px"}}>Guess the 4-digit number!</font>
      <div style={{marginTop:"50px"}}>
        <ul className="nav justify-content-center" style={{display:"block"}}>
          <li className="nav-item" style={{marginBottom:"15px"}}>
            <OverlayTrigger placement="right" overlay={soloTooltip}>
              <Button className="nav-link mode-button" href="solo">💫 Solo 💫</Button>
            </OverlayTrigger>
          </li>
          <li className="nav-item" style={{marginBottom:"15px"}}>
            <OverlayTrigger placement="right" overlay={easyTooltip}>
              <Button className="nav-link mode-button" href="easy">💡 Easy CPU 💡</Button>
            </OverlayTrigger>
          </li>
          <li className="nav-item" style={{marginBottom:"15px"}}>
            <OverlayTrigger placement="right" overlay={hardTooltip}>
              <Button className="nav-link mode-button" href="hard">🔥 Hard CPU 🔥</Button>
            </OverlayTrigger>
          </li>
        </ul>
      </div>
      <div className="Ack"> 
        Started Dev 7.18.23 @ Ashley Jeong
      </div>
    </div>
  );
}

export default Home;