import React from 'react';
import { useState, useRef } from 'react';

import styles from "./styles.module.scss";
import clock from "../../Img/clock.svg"

export default function Timer() {
    const[timer, setTimer] = useState(0);
    const[isRunning, setIsRunning] = useState(false);
    let timeInterval = useRef(null);

    const handleStart = () => {
        if(isRunning) return;
        setIsRunning(true);
        timeInterval.current = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 10);
    };

    const handlePause = () => {
        if(!isRunning) return;
        setIsRunning(false);
        clearInterval(timeInterval.current);
    };

    const handleReset = () => {
        setIsRunning(false);
        clearInterval(timeInterval.current);
        setTimer(0);
    }

    const formatTime = (timer) => {
        const minutes = Math.floor(timer / 60000).toString().padStart(2, "0");
        const seconds = Math.floor((timer / 1000) % 60).toString().padStart(2, "0");

        return { minutes, seconds };
    };

    const { minutes, seconds } = formatTime(timer);

  return (
    <>
      <div className={styles.card}>
        <img src={clock} className={styles.clockIcon}></img>
        <div className={styles.time}>{minutes}m{seconds}s</div>
      </div>
    </>
  );
}
