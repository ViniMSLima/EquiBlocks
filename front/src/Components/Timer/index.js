import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./styles.module.scss";
import clock from "../../Img/clock.svg";

import { TimerContext } from "../../Context/timerContext";

export default function Timer({ startTimer }) {
  const { contextTimer, setContextTimer } = useContext(TimerContext);

  const [timer, setTimer] = useState(
    () => localStorage.getItem("tempo") || "00:00"
  );
  const startTimeRef = useRef(null);

  useEffect(() => {
    let intervalId;

    if (startTimer) {
      if (localStorage.getItem("tempo")) {
        const [minutes, seconds] = localStorage.getItem("tempo").split(":");
        const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
        startTimeRef.current = Date.now() - totalSeconds * 1000;
        setTimer(localStorage.getItem("tempo"));
      } else {
        startTimeRef.current = Date.now();
      }

      intervalId = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTimeRef.current;
        setTimer(formatTime(elapsedTime));
        localStorage.setItem("tempo", formatTime(elapsedTime));
      }, 1000);
      
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [startTimer]);

  useEffect(() => {
    localStorage.setItem("tempo", timer);
    const [minutes, seconds] = timer.split(":");
    setContextTimer(parseInt(minutes));
  }, [timer, setContextTimer]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  var minutes = "00";
  var seconds = "00";

  if (localStorage.getItem("tempo")) {
    minutes = localStorage.getItem("tempo").substring(0, 2);
    seconds = localStorage.getItem("tempo").substring(3, 5);
  }

  return (
    <>
    {/* <div className={styles.card}>
      <img src={clock} className={styles.clockIcon} alt="Clock Icon" />
      <div className={styles.time}>
        {minutes}:{seconds}
      </div>
    </div> */}
    </>
  );
}