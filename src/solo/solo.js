import { useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import BaseObj from '../base_obj/base_obj';
import HowTo from '../extras/how_to';

const NUM_LENGTH = 4;

function Solo() {
    const [totalGuessesGames, setTotalGuessesGames] = useState(sessionStorage.getItem('soloTotGuessesNum')  === null ? 0 : sessionStorage.getItem('soloTotGuessesNum'));
    const [totalGuesses, setTotalGuesses] = useState(0);
    const [gameNum, setGameNum] = useState(sessionStorage.getItem('soloGameNum')  === null ? 0 : sessionStorage.getItem('soloGameNum'));

    useEffect(() => {
        if (sessionStorage.getItem('soloGameNum') === null) {
            sessionStorage.setItem('soloGameNum', 0);
            sessionStorage.setItem('soloTotGuessesNum', 0);
        }
        else {
            sessionStorage.setItem('soloTotGuessesNum', totalGuessesGames);
            sessionStorage.setItem('soloGameNum', gameNum);
        }
    },[gameNum]);

    return (
        <div className="App">
            <div className="Title-header">
                <Link to="/" className="Title">
                    ⚾ Strike and Ball ⚾
                </Link>
                <div className="Mode" style={{whiteSpace:"nowrap"}}>
                    ~ 💫 Solo Mode 💫 ~
                </div>
                <font style={{fontSize:"18px", whiteSpace:"nowrap"}}>
                    I've chosen a 4-digit number. Try to guess it!
                </font>
                <div style={{display:"flex", justifyContent:"center", marginTop:"10px", flexWrap:"wrap"}}>
                    <div style={{padding:"3px 10px 5px 10px", fontSize:"15px", backgroundColor:"#252B2D", margin: "0px 5px 5px 5px", borderRadius:"3px", whiteSpace:"nowrap"}}>
                        total games: {gameNum}
                    </div>
                    <div style={{padding:"3px 10px 5px 10px", fontSize:"15px", backgroundColor:"#252B2D", marginRight:"5px", marginBottom:"5px", borderRadius:"3px", whiteSpace:"nowrap"}}>
                        avg guesses/round: {gameNum === 0 ? 0 : Math.round(totalGuessesGames*100.0/gameNum)/100}
                    </div>
                    <div style={{padding:"3px 10px 5px 10px", fontSize:"15px", backgroundColor:"#252B2D", margin: "0px 5px 5px 0px", borderRadius:"3px", whiteSpace:"nowrap"}}>
                        total guesses this round: {totalGuesses}
                    </div>
                </div>
            </div>
                <BaseObj NUM_LENGTH={NUM_LENGTH} totalGuesses={totalGuesses} gameNum={gameNum} totalGuessesGames={totalGuessesGames} setGameNum={setGameNum} setTotalGuesses={setTotalGuesses} setTotalGuessesGames={setTotalGuessesGames}/>
            <div className="Ack"> 
                Started Dev 7.18.23 @ Ashley Jeong
            </div>
            <div className="How-to">
                <HowTo/>
            </div>
        </div>
    );
}

export default Solo;