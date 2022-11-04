import { useEffect, useState } from "react";
import "./index.css";

const Clock = () => {
    const [displayTime, setDisplayTime] = useState(25 * 60);
    const [timerOn, setTimerOn] = useState(false);
    const [sessionTime, setSessionTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);



    //tramsformar o displayTime em segundos
    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        return (
            (minutes < 10 ? "0" + minutes : minutes) +
            ":" +
            (seconds < 10 ? "0" + seconds : seconds)
        );
    };

    const changeTime = (amount, type) => {
        if (type === "session") {
            if (sessionTime <= 1 && amount < 0) {
                return;
            }
            setSessionTime(sessionTime + amount);
        } else {
            if (breakTime <= 1 && amount < 0) {
                return;
            }
            setBreakTime(breakTime + amount);
        }
    };



    const handleSessionDecrease = () => {
        if (sessionTime > 1 && sessionTime < 60 && !timerOn) {
            changeTime(-1, "session");
            setDisplayTime((sessionTime - 1) * 60);
        }


    };

    const handleSessionIncrease = () => {
        if (sessionTime < 60 && !timerOn) {
            changeTime(1, "session");
            setDisplayTime((sessionTime + 1) * 60);
        }
    };

    const handleBreakDecrease = () => {
        if (breakTime > 1 && !timerOn) {
            changeTime(-1, "break");
        }
    };

    const handleBreakIncrease = () => {
        if (breakTime < 60 && !timerOn) {
            changeTime(1, "break");
        }
    };


    const resetTime = () => {
        setDisplayTime(25 * 60);
        setBreakTime(5);
        setSessionTime(25);
        setTimerOn(false);
    };

    const handleStart = () => {
        setTimerOn(true);
    };

    const handleStop = () => {
        setTimerOn(false);
    };

    useEffect(() => {
        let interval = null;
        if (timerOn) {
            interval = setInterval(() => {
                setDisplayTime(displayTime => displayTime - 1);
            }, 1000);
        } else if (!timerOn && displayTime !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerOn, displayTime]);

    return (
        <>
            <div className="clock">
                <h1>25 + 5 O' Clock</h1>
                <div className="container __session">
                    <button id="session-decrement" onClick={handleSessionDecrease}>-</button>
                    <h5 id="session-label">Session Length</h5>
                    <h6 id="session-length">{sessionTime}</h6>
                    <button id="session-increment" onClick={handleSessionIncrease}>+</button>
                </div>
                <div className="container __break">
                    <button id="break-decrement" onClick={() => {
                        if (!timerOn) { setBreakTime(breakTime - 1) };

                    }}>-</button>
                    <h5 id="break-label">Break Lenght</h5>
                    <h6 id="break-length">{breakTime}</h6>
                    <button id="break-increment" onClick={() => {
                        if (!timerOn) {
                            setBreakTime(breakTime + 1);
                        }


                    }}>+</button>
                </div>
                <div className="container __timer">
                    <h5 id="timer-label">Session</h5>
                    <h2 id="time-left">{formatTime(displayTime)}</h2>
                    <button id="start_stop" onClick={handleStart}>Start</button>
                    <button onClick={handleStop}>Stop</button>
                    <button id="reset" onClick={resetTime}>Reset</button>
                </div>
            </div>
        </>
    );
};

export default Clock;
