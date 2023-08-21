import { useState } from 'react';
import '../App.css';
import './solo.css';
import { Link } from 'react-router-dom';
import BaseObj from '../base_obj/base_obj';
import HowTo from '../extras/how_to';

const NUM_LENGTH = 4;

function Solo() {
    const [totalGuessesGames, setTotalGuessesGames] = useState(0);
    const [totalGuesses, setTotalGuesses] = useState(0);
    const [gameNum, setGameNum] = useState(0);

    return (
        <div className="App">
            <header className="App-header">
                <div className="Title-header">
                    <Link to="/" className="Title" style={{margin:"auto"}}>
                        ⚾ Strike and Ball ⚾
                    </Link>
                    <div className="Mode">
                        ~ 💫 Solo Mode 💫 ~
                    </div>
                    <div style={{fontSize:"20px"}}>
                        I've chosen a 4-digit number~ Try to guess it!
                    </div>
                    <div style={{fontSize:"15px"}}>
                        total games: {gameNum} || 
                        average number of guesses: {gameNum === 0 ? 0 : Math.round(totalGuessesGames*100.0/gameNum)/100}
                    </div>
                    <div style={{fontSize:"15px"}}>
                        total guesses: {totalGuesses}
                    </div>
                </div>
                <BaseObj NUM_LENGTH={NUM_LENGTH} totalGuesses={totalGuesses} gameNum={gameNum} setGameNum={setGameNum} setTotalGuesses={setTotalGuesses} setTotalGuessesGames={setTotalGuessesGames}/>
                <div className="Ack"> 
                    Started Dev 7.18.23 @ Ashley Jeong
                </div>
            </header>
            <div style={{position:"absolute", top:"250px", left:"100px"}}>
                <HowTo/>
            </div>
        </div>
    );
}

export default Solo;