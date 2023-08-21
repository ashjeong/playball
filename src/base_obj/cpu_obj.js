import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../App.css';


function CPU_OBJ(props) {
    const [allGuesses, setAllGuesses] = useState([]);
    const [allCPUGuesses, setAllCPUGuesses] = useState([]);
    const [ans, setAns] = useState([]);
    const [gameNum, setGameNum] = useState(0);
    const [yourNum, setYourNum] = useState("");
    const [guess, setGuess] = useState("");
    

    const resetting = (e) => {
        setAllGuesses([]);
        setGuess("");
        setGameNum(prev => prev + 1);
        setYourNum("")
        props.setTotalGuesses(0)
        setAllCPUGuesses([])
        var T = document.getElementById("success");
        T.style.display = "none";  // <-- Set it to block
        var Q = document.getElementById("failure");
        Q.style.display = "none";  // <-- Set it to block
        var A = document.getElementById("ginput");
        A.style.display = "initial";  // <-- Set it to block
        var R = document.getElementById("reset");
        R.style.display = "none";  // <-- Set it to block
        var G = document.getElementById("struct");
        G.style.display = "none";  // <-- Set it to block
        var E = document.getElementById("tinput");
        E.style.display = "initial";  // <-- Set it to block
    };

    const ending = (win) => {
        var A = document.getElementById("ginput");
        A.style.display = "none";  // <-- Set it to block
        var R = document.getElementById("reset");
        R.style.display = "initial";  // <-- Set it to block
        if (win) {
            console.log("Congrats you guessed the number")
            var T = document.getElementById("success");
            T.style.display = "block";  // <-- Set it to block
            props.setWins(prev => prev + 1);
        }
       else {
            console.log("You lost ;-;")
            var Q = document.getElementById("failure");
            Q.style.display = "block";  // <-- Set it to block
            props.setLoses(prev => prev + 1);
       }
    }

    async function checkGuess(val, ans) {
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
        return res
    }
    async function tryGuess(e) {
        var val = e.target.value;
        const res = await checkGuess(val, ans)
        //invalid guess
        if (!res["valid"]) {
            e.target.classList.add('error');
            // remove the class after the animation completes
            setTimeout(function() {
                e.target.classList.remove('error');
            }, 300);
        }
        else {
            props.setTotalGuesses(prev => prev + 1);
            if (res["strikes"] === 4) {
                ending(true);
            }
            else {
                setAllGuesses(prev => [...prev, {"val":val, "S":res["strikes"], "B":res["balls"]}]);
                CPUGuessing();
                var inv = document.getElementById("invis1");
                inv.scrollIntoView({behavior: "smooth"})
                var vinv = document.getElementById("invis2");
                vinv.scrollIntoView({behavior: "smooth"})
            }
        }
    }

    async function CPUGuessing() {
        const rawResponse = await fetch('/cpu?' + new URLSearchParams({
            len: props.NUM_LENGTH,
            mode: props.mode
        }), {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({allCPUGuesses: allCPUGuesses})
        });
        const res = await rawResponse.json();
        console.log(res);
        const checked = await checkGuess(res["guess"], yourNum)
        console.log(checked);
        setAllCPUGuesses(prev => [...prev, {"guess":res["guess"], "strikes":checked["strikes"], "balls":checked["balls"]}]);
        if (checked["strikes"] === 4) {
            ending(false);
        }
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

    async function handleQuest (e) {
        var val = e.target.value;
        const res = await checkGuess(val, [0, 0, 0, 0])
        if (e.key === 'Enter') {
            //invalid guess
            if (!res["valid"]) {
                e.target.classList.add('error');
                // remove the class after the animation completes
                setTimeout(function() {
                    e.target.classList.remove('error');
                }, 300);
                setYourNum("")
            }
            else {
                setYourNum(e.target.value)
                var G = document.getElementById("struct");
                G.style.display = "flex";  // <-- Set it to block
                var T = document.getElementById("tinput");
                T.style.display = "none";  // <-- Set it to block
            }
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
        console.log(props.NUM_LENGTH);
        getAns();
    }, [gameNum, props.NUM_LENGTH]);

    return (
        <div>
            <div className="form-group" style={{display:"block", marginTop:"50px", fontSize:"35px"}} id="tinput">
                <div>The CPU has chosen their number~ </div>
                <label className="Guesses-label">Choose a number for it to guess!</label>
                <input autocomplete="off" type="text" className="form-control Guesses-input" id="ournum" value={yourNum} onChange={(e) => setYourNum(e.target.value)} onKeyDown={handleQuest}/>
            </div>
            <div style={{display:'none', gap: "50px"}} id="struct">
                <div className="Guesses Guesses-cpu">
                    <div className="form-group" id="ginput">
                        <label className="Guesses-label">Guess!</label>
                        <input autocomplete="off" type="text" className="form-control Guesses-input" id="guess" value={guess} onChange={(e) => setGuess(e.target.value)} onKeyDown={handleKeyDown}/>
                    </div>
                    <div className="Success" id="success">
                        <div className="Success-congrat">You got it!</div>
                        <div className="Success-ans">{ans}</div>
                    </div>
                    <div className="Success" id="failure">
                        <div className="Success-congrat">You lost! The answer was:</div>
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
                        <div style={{gridColumn: "1/-1"}} id="invis1"></div>
                    </div>
                </div>
                <div className="Guesses Guesses-cpu">
                    <div className="Guesses-label" style={{marginBottom:0}}>The CPU is trying to guess your number: {yourNum}</div>
                    <div className="Guesses-items">
                        {allCPUGuesses.map((guess) => {
                            return (
                                <div className="Guesses-guess">
                                    {guess.guess === yourNum ?
                                        <div style={{color:"hotpink"}}>
                                            <div style={{fontSize:"50px"}}>{guess.guess}</div>
                                            <div style={{fontSize:"20px"}}>{guess.strikes}S & {guess.balls}B</div>
                                        </div>
                                    :
                                        <div style={{fontSize:"50px"}}>
                                            <div style={{fontSize:"50px"}}>{guess.guess}</div>
                                            <div style={{fontSize:"20px"}}>{guess.strikes}S & {guess.balls}B</div>
                                        </div>
                                    }
                                </div>
                            );
                        })}
                        <div style={{gridColumn: "1/-1"}} id="invis2"></div>
                    </div>
                </div>
            </div>
        <div> 
            <Button className="Newgame" onClick={resetting} id="reset" style={{backgroundColor:"royalblue", color:"white"}}>New Game</Button>
        </div>
    </div>
    )
}
export default CPU_OBJ;