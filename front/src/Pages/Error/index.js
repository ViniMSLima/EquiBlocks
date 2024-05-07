import Col from "react-bootstrap/esm/Col";
import styles from "./styles.module.scss";
import erro from "../../Img/404.png"
import Container from "react-bootstrap/esm/Container";
import redLine from "../../Img/home/redLine.png";
import blueLine from "../../Img/home/blueLine.png";
import greenLine from "../../Img/home/greenLine.png";
import cyanLine from "../../Img/home/cyanLine.png";
import lightGreenLine from "../../Img/home/lightGreenLine.png";
import purpleLine from "../../Img/home/purpleLine.png";

import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";

export default function ErrorPage() {
  const navigate = useNavigate();

  function goHome() {
    navigate("/");
  }
  return (
    <div className={styles.container}>
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
      <Row className={styles.body}>
          <div className={styles.border}>
           <img src={erro}/>

          </div>
          <div>
            <button onClick={goHome}  className={styles.button}>Voltar para a página Home</button>
          </div>
      </Row>
      <Container className={styles.container2}>
          <img src={cyanLine} className={styles.lineCyan}></img>
          <img src={lightGreenLine} className={styles.lineLightGreen}></img>
          <img src={purpleLine} className={styles.linePurple}></img>
      </Container>
    </div>
  );
}
