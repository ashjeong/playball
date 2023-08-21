import { useState } from 'react';
import '../App.css';
import './CPU.css'
import { Link } from 'react-router-dom';
import CPU_OBJ from '../base_obj/cpu_obj';

const NUM_LENGTH = 4;

function CPU(props) {
    const [totalGuesses, setTotalGuesses] = useState(0)
    const [wins, setWins] = useState(0);
    const [loses, setLoses] = useState(0);

    return (
        <div className="App">
        <header className="App-header">
            <div className="Title-header">
                <Link to="/" className="Title">
                    ⚾ Strike and Ball ⚾
                </Link>
                <div className="Mode">
                    {props.mode === "easy" ? "~ 💡 VS Easy CPU 💡 ~" : "~ 🔥 VS Hard CPU 🔥 ~"}
                </div>
                <div style={{fontSize:"15px"}}>
                    wins: {wins} || losses: {loses} || 
                    win %: {wins === 0 ? 0 : Math.round(wins*100.0/(wins + loses))}%
                </div>
                <div style={{fontSize:"15px"}}>
                    total guesses: {totalGuesses}
                </div>
            </div>
            <CPU_OBJ NUM_LENGTH={NUM_LENGTH} setTotalGuesses={setTotalGuesses} setWins={setWins} setLoses={setLoses} mode={props.mode}/>
            <div className="Ack"> 
                Started Dev 7.18.23 @ Ashley Jeong
            </div>
        </header>
        </div>
    );
}

export default CPU;