import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "./styles.module.scss";
import Timer from "../../Components/Timer";

export default function Challenge() {
  return (
    <Container>
      <Row style={{ marginTop: "0.5em" }}>
        <Col className={styles.align} sm="12" lg="4">
          <Timer />
        </Col>
        <Col className={styles.title} sm="12" lg="4">
          Fase de Teste
        </Col>
        <Col></Col>
      </Row>
      <Row style={{ marginTop: "0.5em" }}>
        <Col className={styles.align} sm="6" lg="4">
        </Col>
        <Col className={styles.title} sm="6" lg="4">
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
