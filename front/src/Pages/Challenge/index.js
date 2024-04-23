import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ContainerForm from "../../Components/ContainerForm";

import styles from "./styles.module.scss";
import Timer from "../../Components/Timer";
import Inputs from "../../Components/InputsArea";

export default function Challenge() {
  const [status, setStatus] = useState("Começar");
  const [phase, setPhase] = useState("Fase de Teste");
  const [timerStarted, setTimerStarted] = useState(false);
  const navigate = useNavigate();

  const startReal = () => {
    if (status === "Finalizar") {
      navigate("/");
      setTimerStarted(false);
    }
    setStatus("Finalizar");
    setPhase("Desafio");
    setTimerStarted(true);
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
            <Col className={styles.title} sm="12" lg="4">
              Foto balança
            </Col>
            <Col className={styles.align} sm="1" lg="1"></Col>
            <Col className={styles.title} sm="12" lg="4">
              Foto balança
            </Col>
            <Col className={styles.align} sm="1" lg="1"></Col>
            <Col className={styles.title} sm="10" lg="2">
              <Inputs />
            </Col>
          </Container>
        </Row>
        <Row className={styles.row}>
          <Col className={styles.align} sm="0" lg="3"></Col>
          <Col className={styles.title} sm="10" lg="6">
            <ContainerForm />
          </Col>
          <Col className={styles.align} sm="0" lg="1"></Col>
          <Col className={styles.btnDiv} sm="0" lg="2">
            <div className={styles.button} onClick={startReal}>
              {status}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
