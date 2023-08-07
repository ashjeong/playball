import { Link } from 'react-router-dom';
import '../App.css';

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
          <ul class="nav justify-content-center">
        <li class="nav-item">
          <a class="nav-link" href="solo">Solo</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="easy">Easy CPU</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="hard">Hard CPU</a>
        </li>
      </ul>
      </div>
      <div style={{position:"absolute", bottom:"10px", right:"15px", fontSize:"10px"}}> 
        Started Dev 7.18.23 @ Ashley Jeong
      </div>
      </header>
    </div>
  );
}

export default Home;