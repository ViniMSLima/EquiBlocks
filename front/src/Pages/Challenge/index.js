import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ContainerForm from "../../Components/ContainerForm";

import styles from "./styles.module.scss";
import Timer from "../../Components/Timer";
import Inputs from "../../Components/InputsArea";
import Balance from "../../Components/Balance";
import ExcelGenerator from "../../Components/ExcelGenerator";

import axios from "axios";

import { TimerContext } from "../../Context/timerContext";

export default function Challenge() {
  const [status, setStatus] = useState("Começar");
  const [phase, setPhase] = useState(localStorage.getItem("fase") || "Fase de Teste");
  
  const [timerStarted, setTimerStarted] = useState(false);
  const navigate = useNavigate();

  const { contextTimer, setContextTimer } = useContext(TimerContext);

  const prevPhaseRef = useRef(phase);

  useEffect(() => {
    localStorage.setItem("fase", phase);
  }, [phase]);

  const [fig1, setFig1] = useState("");
  const [fig2, setFig2] = useState("");
  const [fig3, setFig3] = useState("");
  const [fig4, setFig4] = useState("");
  const [fig5, setFig5] = useState("");

  const startReal = async () => {
    if (status === "Finalizar") {
      if (window.confirm("Deseja Finalizar?")) {
        
        var nome = localStorage.getItem("nome");
        var data = localStorage.getItem("data");
        var tempo = localStorage.getItem("tempo");
        
        // Update playerInfo with new information
        const playerInfo = {
          nome,
          data,
          tempo,
          f1: fig1,
          f2: fig2,
          f3: fig3,
          f4: fig4,
          f5: fig5,
        };
        
        try {
          const res = await axios.post(
            "http://localhost:8080/api/postplayer",
            playerInfo
            );
          } catch (error) {
            console.error("Error fetching game data:", error);
          }
          
          const existingPlayersJSON = localStorage.getItem("playerInfo");
          const existingPlayers = existingPlayersJSON
          ? JSON.parse(existingPlayersJSON)
          : [];
          
          const updatedPlayers = [...existingPlayers, playerInfo];
          
          localStorage.setItem("playerInfo", JSON.stringify(updatedPlayers));
          setTimerStarted(false);
          setFig1("");
          setFig2("");
          setFig3("");
          setFig4("");
          setFig5("");
          navigate("/finished");
        }
      }
    localStorage.setItem("fase", "Desafio");
    localStorage.setItem("balance1", JSON.stringify({ left: { total: 0, figures: {} }, right: { total: 0, figures: {} } }))
    localStorage.setItem("balance2", JSON.stringify( { left: { total: 0, figures: {} }, right: { total: 0, figures: {} } }))
    localStorage.removeItem("formas")
    setTimerStarted(true);
    setStatus("Finalizar");
    setPhase("Desafio");
    console.log(phase)
  };

  useEffect(() => {
    if (contextTimer > 0) {
      setStatus("Finalizar");
      startReal();
    }
  }, [contextTimer]);

  useEffect(() => {
    if (prevPhaseRef.current !== phase && phase === "Desafio") {
      window.location.reload();
    }
    prevPhaseRef.current = phase;
  }, [phase]);

  return (
    <div>
      <Row className={styles.row}>
        <Col className={styles.align} sm="12" lg="4">
          <Timer startTimer={timerStarted} />
        </Col>
        <Col className={styles.title} sm="12" lg="4">
          {phase}
        </Col>
        <Col></Col>
      </Row>
      <div>
        <Row className={styles.row}>
          <Container className={styles.cont}>
            <Col className={styles.align} sm="1" lg="3"></Col>
            <Col className={styles.title} sm="12" lg="4">
              <ContainerForm/>
            </Col>
            <Col className={styles.inputCol} sm="10" lg="2">
              <Inputs
                oC1={(e) => {
                  setFig1(e.target.value);
                }}
                oC2={(e) => {
                  setFig2(e.target.value);
                }}
                oC3={(e) => {
                  setFig3(e.target.value);
                }}
                oC4={(e) => {
                  setFig4(e.target.value);
                }}
                oC5={(e) => {
                  setFig5(e.target.value);
                }}
              />
              <div className={styles.button} onClick={startReal}>
                {status}
              </div>
            </Col>
          </Container>
        </Row>
      </div>
    </div>
  );
}
