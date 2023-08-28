import { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import CPU_OBJ from '../base_obj/cpu_obj';
import HowTo from '../extras/how_to';

const NUM_LENGTH = 4;

function CPU(props) {
    var type = props.mode;
    const [wins, setWins] = useState(sessionStorage.getItem(type + 'Wins') === null ? 0 : sessionStorage.getItem(type + 'Wins'));
    const [loses, setLoses] = useState(sessionStorage.getItem(type + 'Losses') === null ? 0 : sessionStorage.getItem(type + 'Losses'));


    useEffect(() => {
        if (sessionStorage.getItem(type + 'Wins') === null) {
            sessionStorage.setItem(type + 'Wins', 0);
            sessionStorage.setItem(type + 'Losses', 0);
        }
        else {
            sessionStorage.setItem(type + 'Wins', wins);
            sessionStorage.setItem(type + 'Losses', loses);
        }
    },[wins, loses]);

    return (
        <div className="App">
            <div className="Title-header">
                <Link to="/" className="Title">
                    ⚾ Strike and Ball ⚾
                </Link>
                <div className="Mode" style={{whiteSpace:"nowrap"}}>
                    {props.mode === "easy" ? "💡 VS Easy CPU 💡" : "🔥 VS Hard CPU 🔥"}
                </div>
                <div style={{display:"flex", justifyContent:"center", marginTop:"10px"}}>
                    <div style={{padding:"3px 10px 5px 10px", fontSize:"15px", backgroundColor:"#252B2D", marginRight:"5px", borderRadius:"3px", whiteSpace:"nowrap"}}>
                        wins: {wins}
                    </div>
                    <div style={{padding:"3px 10px 5px 10px", fontSize:"15px", backgroundColor:"#252B2D", marginRight:"5px", borderRadius:"3px", whiteSpace:"nowrap"}}>
                        losses: {loses}
                    </div>
                </div>
            </div>
            <CPU_OBJ NUM_LENGTH={NUM_LENGTH} setWins={setWins} setLoses={setLoses} mode={props.mode}/>
            <div className="Ack"> 
                Started Dev 7.18.23 @ Ashley Jeong
            </div>
            <div className="How-to">
                <HowTo/>
            </div>
        </div>
    );
}

export default CPU;