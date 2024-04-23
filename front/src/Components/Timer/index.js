import React, { useState, useRef, useEffect } from 'react';
import styles from "./styles.module.scss";
import clock from "../../Img/clock.svg"

export default function Timer() {
    const [timer, setTimer] = useState(0);
    const startTimeRef = useRef(null);

    useEffect(() => {
        startTimeRef.current = Date.now(); // Armazena o tempo de início quando o componente é montado
        const intervalId = setInterval(() => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTimeRef.current;
            setTimer(elapsedTime); // Atualiza o timer com o tempo decorrido
        }, 1000); // Atualiza a cada segundo

        return () => clearInterval(intervalId);
    }, []);

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
            <div className={styles.time}>{minutes}m{seconds}s</div>
        </div>
    );
}
