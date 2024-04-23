import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ContainerForm from "../../Components/ContainerForm";

import styles from "./styles.module.scss";
import Timer from "../../Components/Timer";
import Inputs from "../../Components/InputsArea";

export default function Challenge() {
  return (
    <div>
      <Row className={styles.row}>
        <Col className={styles.align} sm="12" lg="4">
          <Timer />
        </Col>
        <Col className={styles.title} sm="12" lg="4">
          Fase de Teste
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
          <Col className={styles.align} sm="1" lg="3"></Col>
          <Col className={styles.title} sm="6" lg="6">
            <ContainerForm></ContainerForm>
          </Col>
        </Row>
      </div>
    </div>
  );
}
