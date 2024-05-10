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

  var minutes = "00";
  var seconds = "00";

  return (
    <>
    <div className={styles.card}>
      {/* <img src={clock} className={styles.clockIcon} alt="Clock Icon" /> */}
      <div className={styles.time}>
        {minutes}:{seconds}
      </div>
    </div>
    </>
  );
}
