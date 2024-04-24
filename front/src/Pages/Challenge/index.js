import { useState } from "react";
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

export default function Challenge() {
  const [status, setStatus] = useState("Começar");
  const [phase, setPhase] = useState("Fase de Teste");
  const [timerStarted, setTimerStarted] = useState(false);
  const navigate = useNavigate();

  const [fig1, setFig1] = useState("");
  const [fig2, setFig2] = useState("");
  const [fig3, setFig3] = useState("");
  const [fig4, setFig4] = useState("");
  const [fig5, setFig5] = useState("");

  const startReal = () => {
    if (status === "Finalizar") {
      console.log(fig1);
      console.log(fig2);
      console.log(fig3);
      console.log(fig4);
      console.log(fig5);

      var nome = sessionStorage.getItem("nome");
      var data = sessionStorage.getItem("data");

      // sessionStorage.setItem('playerInfo', {nome: nome, date: data, f1: fig1, f2: fig2, f3: fig3, f4: fig4, f5: fig5});

      // <ExcelGenerator
      //   nome={nome}
      //   data={data}
      //   f1={fig1}
      //   f2={fig2}
      //   f3={fig3}
      //   f4={fig4}
      //   f5={fig5}
      // />

      if (window.confirm("Deseja Finalizar?")) {
        setTimerStarted(false);
        navigate("/finished");
      }
    }
    setTimerStarted(true);
    setStatus("Finalizar");
    setPhase("Desafio");
  };

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
              <ContainerForm />
            </Col>
            <Col className={styles.align} sm="1" lg="3"></Col>
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
