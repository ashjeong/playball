import { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import '../App.css';


function BaseObj(props) {
    const [allGuesses, setAllGuesses] = useState([]);
    const [guess, setGuess] = useState("");
    const [ans, setAns] = useState([]);
    const guessInput = useRef();
    

    const resetting = (e) => {
        setAllGuesses([]);
        props.setTotalGuesses(0);
        props.setGameNum(prev => prev + 1);
        var T = document.getElementById("success");
        T.style.display = "none";  // <-- Set it to block
        var A = document.getElementById("ginput");
        A.style.display = "initial";  // <-- Set it to block
        var R = document.getElementById("reset");
        R.style.display = "none";  // <-- Set it to block
        guessInput.current.focus();
    };

    const youwin = () => {
        props.setTotalGuessesGames(prev => prev + props.totalGuesses);
        console.log("Congrats you guessed the number");
        setGuess("");
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
            props.setTotalGuesses(prev => prev + 1);
            if (res["strikes"] === 4) {
                youwin();
            }
            else {
                console.log(allGuesses)
                setAllGuesses(prev => [...prev, {"val":val, "S":res["strikes"], "B":res["balls"]}]);
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
        console.log(props);
        console.log(ans)
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
        <div className="Base-start">
            <div className="Guesses Guesses-solo">
                <div className="form-group" id="ginput">
                    <label htmlFor="guess" className="Guesses-label">Guess!</label>
                    <input autoFocus ref={guessInput} autoComplete="off" type="text" className="form-control Guesses-input" id="guess" value={guess} onChange={(e) => setGuess(e.target.value)} onKeyDown={handleKeyDown}/>
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
                <Button className="Newgame" onClick={resetting} id="reset">New Game</Button>
            </div>
        </div> 
    )
}
export default BaseObj;