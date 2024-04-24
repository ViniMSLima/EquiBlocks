import React, { useState, useRef, useEffect, useContext } from 'react';
import styles from "./styles.module.scss";
import clock from "../../Img/clock.svg"

import { TimerContext } from '../../Context/timerContext';

export default function Timer({ startTimer }) {

    const {contextTimer, setContextTimer} = useContext(TimerContext);

    const [timer, setTimer] = useState(0);
    const startTimeRef = useRef(null);

    useEffect(() => {
        let intervalId;

        if(startTimer) {
            startTimeRef.current = Date.now();
            intervalId = setInterval(() => {
                const currentTime = Date.now();
                const elapsedTime = currentTime - startTimeRef.current;
                setTimer(elapsedTime);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [startTimer]);

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
        const seconds = (totalSeconds % 60).toString().padStart(2, "0");

        return { minutes, seconds };
    };

    const { minutes, seconds } = formatTime(timer);

    return (
        <div className={styles.card}>
            <img src={clock} className={styles.clockIcon} alt="Clock Icon" />
            <div className={styles.time}>{minutes}:{seconds}</div>
            {setContextTimer(parseInt(minutes))}
            {localStorage.setItem("tempo", minutes + ":" + seconds)}
        </div>
    );
}
