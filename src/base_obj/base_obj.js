import { useState, useEffect } from 'react';
import '../App.css';


function BaseObj(props) {
    const [allGuesses, setAllGuesses] = useState([]);
    const [guess, setGuess] = useState("");
    const [ans, setAns] = useState([]);
    

    const resetting = (e) => {
        setAllGuesses([]);
        props.setTotalGuessesGames(prev => prev + props.totalGuesses);
        props.setTotalGuesses(0);
        setGuess("");
        props.setGameNum(prev => prev + 1);
        var T = document.getElementById("success");
        T.style.display = "none";  // <-- Set it to block
        var A = document.getElementById("ginput");
        A.style.display = "initial";  // <-- Set it to block
        var R = document.getElementById("reset");
        R.style.display = "none";  // <-- Set it to block
    };

    const youwin = () => {
        console.log("Congrats you guessed the number")
        var T = document.getElementById("success");
        T.style.display = "block";  // <-- Set it to block
        var A = document.getElementById("ginput");
        A.style.display = "none";  // <-- Set it to block
        var R = document.getElementById("reset");
        R.style.display = "initial";  // <-- Set it to block
    }

    async function tryGuess(e) {
        var val = e.target.value;
        console.log(val)
        console.log(ans);
        const rawResponse = await fetch('/chkguess', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({guess: val, ans: ans})
        });
        const res = await rawResponse.json();
        console.log(res);
        //invalid guess
        
        if (!res["valid"]) {
            e.target.classList.add('error');
            // remove the class after the animation completes
            setTimeout(function() {
                e.target.classList.remove('error');
            }, 300);
            
            e.preventDefault();
        }
        else {
            if (res["strikes"] === 4) {
                youwin();
            }
            else {
                console.log(allGuesses)
                setAllGuesses(prev => [...prev, {"val":val, "S":res["strikes"], "B":res["balls"]}]);
                props.setTotalGuesses(prev => prev + 1);
                var inv = document.getElementById("invis");
                inv.scrollIntoView({behavior: "smooth"})
            }
        }
        return res;
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // send to jsx + get string result back (strike, balls)
            // if 4 strike set to win!
            // if null, set error message
            tryGuess(e);
            // reset form
            setGuess("");
        }

    };

    useEffect(() => {
        // Creating + set Ans
        async function getAns() {
            const res = await fetch("/ans?" + new URLSearchParams({
                len: props.NUM_LENGTH,
            }))
            const ans = await res.json();
            console.log(ans);
            setAns(ans["ans"]);
        }
        getAns();
    }, [props.gameNum]);

    return (
        <div style={{position:"absolute", top:"100px"}}>
            <div className="Guesses Guesses-solo">
                <div className="form-group" id="ginput">
                    <label htmlFor="guess" className="Guesses-label">Guess!</label>
                    <input type="text" className="form-control Guesses-input" id="guess" value={guess} onChange={(e) => setGuess(e.target.value)} onKeyDown={handleKeyDown}/>
                </div>
                <div className="Success" id="success">
                    <div className="Success-congrat">You got it!</div>
                    <div className="Success-ans">{ans}</div>
                </div>
                <div className="Guesses-items">
                    {allGuesses.map((guess) => {
                        return (
                            <div className="Guesses-guess">
                                <div style={{fontSize:"50px"}}>{guess.val}</div>
                                <div style={{fontSize:"20px"}}>{guess.S}S & {guess.B}B</div>
                            </div>
                        );
                    })}
                    <div style={{gridColumn: "1/-1"}} id="invis"></div>
                </div>
            </div>
            <div> 
                <button className="Newgame" onClick={resetting} id="reset">New Game</button>
            </div>
        </div> 
    )
}
export default BaseObj;