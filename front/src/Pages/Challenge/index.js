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
import { PesoContext } from "../../Context/pesoContext";

export default function Challenge() {
  const [status, setStatus] = useState("Começar");
  const [phase, setPhase] = useState(localStorage.getItem("fase") || "Fase de Teste");
  
  const [timerStarted, setTimerStarted] = useState(false);
  const navigate = useNavigate();

  const { contextTimer, setContextTimer } = useContext(TimerContext);
  const { contextPeso, setContextPeso } = useContext(PesoContext);
  
  const prevPhaseRef = useRef(phase);

  useEffect(() => {
    localStorage.setItem("fase", phase);
  }, [phase]);

  useEffect(() => {
    if(localStorage.getItem("fase") == "Desafio")
      setStatus("Finalizar");
      setTimerStarted(true);
  }, []);

  useEffect(() => {
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    const pesos = [100, 200, 500, 700, 1000];
    const newPesos = shuffleArray(pesos);
      
    setContextPeso(newPesos);
  }, []);

  const [fig1, setFig1] = useState("");
  const [fig2, setFig2] = useState("");
  const [fig3, setFig3] = useState("");
  const [fig4, setFig4] = useState("");
  const [fig5, setFig5] = useState("");

  async function playersToMongoDB() {

  }

  const startReal = async () => {
    if (status === "Finalizar") {
      if (window.confirm("Deseja Finalizar?")) {

        var nome = localStorage.getItem("nome");
        var data = localStorage.getItem("data");
        var tempo = localStorage.getItem("tempo");

        const formas1 = localStorage.getItem("formas");

        const formas2 = JSON.parse(formas1);

        console.log(formas2);

        const palpites = [fig1, fig2, fig3, fig4, fig5]

        let count = 0;

        formas2.forEach(element => {
          console.log(palpites[count] + " = " + element.peso);
          if (palpites[count] == element.peso)
            palpites[count] = 2;
          else
            palpites[count] = 1;

          count += 1;
        });

        console.log(palpites);

        const playerInfo = {
          nome,
          data,
          tempo,
          f1: parseInt(palpites[0]),
          f2: parseInt(palpites[1]),
          f3: parseInt(palpites[2]),
          f4: parseInt(palpites[3]),
          f5: parseInt(palpites[4]),
        };
        
        try {
          //IP do senai
          // const res = await axios.post(
          //   "http://10.196.20.101:8080/api/postplayer",
          //   playerInfo
          //   );
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

          localStorage.clear()

          navigate("/finished");
        }
      }
    localStorage.setItem("balance1", JSON.stringify({ left: { total: 0, figures: {} }, right: { total: 0, figures: {} } }))
    localStorage.setItem("balance2", JSON.stringify( { left: { total: 0, figures: {} }, right: { total: 0, figures: {} } }))
    setTimerStarted(true);
    setStatus("Finalizar");
    setPhase("Desafio");
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
            <Col className={styles.title} sm="12" lg="10">
              <ContainerForm />
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



