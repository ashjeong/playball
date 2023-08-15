import { useState, useEffect, useRef } from 'react';
import '../App.css';
import './solo.css';
import { Link } from 'react-router-dom';
import BaseObj from '../base_obj/base_obj';

const NUM_LENGTH = 4;

function Solo() {
    const [totalGuessesGames, setTotalGuessesGames] = useState(0);
    const [totalGuesses, setTotalGuesses] = useState(0);
    const [gameNum, setGameNum] = useState(0);

    return (
        <div className="App">
            <header className="App-header">
                <div style={{position:"absolute", top:"80px", left:"150px"}}>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                    How To Play
                    </button>
                </div>
                <div className="Title-header">
                    <Link to="/" className="Title" style={{margin:"auto"}}>
                        ⚾ Strike and Ball ⚾
                    </Link>
                    <div className="Mode">
                        ~ 💫 Solo Mode 💫 ~
                    </div>
                    <div style={{fontSize:"20px"}}>
                        I've chosen a number~ Try to guess it!
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
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Solo;