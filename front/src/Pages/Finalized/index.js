import styles from "./styles.module.scss";

import { useNavigate } from "react-router-dom";

import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";

import redLine from "../../Img/home/redLine.png";
import blueLine from "../../Img/home/blueLine.png";
import greenLine from "../../Img/home/greenLine.png";
import cyanLine from "../../Img/home/cyanLine.png";
import lightGreenLine from "../../Img/home/lightGreenLine.png";
import purpleLine from "../../Img/home/purpleLine.png";

export default function Finalized() {
  const navigate = useNavigate();

  function goHome() {
    navigate("/");
  }

  return (
    <div className={styles.body}>
      <Row className={styles.rowLines}>
        <Col l="6" className={styles.redLine}>
          <img src={redLine} className={styles.lineRed}></img>
        </Col>
        <Col l="3" className={styles.blueLine}>
          <img src={blueLine} className={styles.lineBlueGreen}></img>
        </Col>
        <Col l="3" className={styles.greenLine}>
          <img src={greenLine} className={styles.lineBlueGreen}></img>
        </Col>
      </Row>
      <Row className={styles.row}>
        <Container className={styles.container}>
          <div className={styles.title}>Desafio Concluído.</div>
          <div className={styles.text}>
            Aguarde por mais instruções dos instrutores.
          </div>
          <button onClick={goHome} className={styles.button}>
            INÍCIO
          </button>
        </Container>
        <Container className={styles.container2}>
          <img src={cyanLine} className={styles.lineCyan}></img>
          <img src={lightGreenLine} className={styles.lineLightGreen}></img>
          <img src={purpleLine} className={styles.linePurple}></img>
        </Container>
      </Row>
    </div>
  );
}
