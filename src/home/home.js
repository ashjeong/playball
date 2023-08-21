import { Link } from 'react-router-dom';
import '../App.css';
import HowTo from '../extras/how_to';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{position:"absolute", top:"50px"}}>
          <Link to="/" style={{textDecoration:'none', color:"white"}}>
            ⚾ Strike and Ball ⚾
          </Link>
        </div>
        Choose a mode
        <div style={{marginTop:"50px"}}>
          <ul className="nav justify-content-center" style={{display:"block"}}>
            <li className="nav-item" style={{marginBottom:"15px"}}>
              <a className="nav-link" href="solo">💫 Solo 💫</a>
            </li>
            <li className="nav-item" style={{marginBottom:"15px"}}>
              <a className="nav-link" href="easy">💡 Easy CPU 💡</a>
            </li>
            <li className="nav-item" style={{marginBottom:"15px"}}>
              <a className="nav-link" href="hard">🔥 Hard CPU 🔥</a>
            </li>
          </ul>
        </div>
      
      </header>
      <div style={{position:"absolute", bottom:"10px", right:"15px", fontSize:"10px", color:"white"}}> 
        Started Dev 7.18.23 @ Ashley Jeong
      </div>
      <div style={{position:"absolute", top:"60px", left:"100px"}}>
        <HowTo/>
      </div>
    </div>
  );
}

export default Home;