import Col from "react-bootstrap/esm/Col";
import styles from "./styles.module.scss";

import Container from "react-bootstrap/esm/Container";

import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";

export default function ErrorPage() {
  const navigate = useNavigate();

  function goHome() {
    navigate("/");
  }
  return (
    <div className={styles.container}>
      <Row>
        <Col className={styles.col} lg={2}>
          <button onClick={goHome}>Voltar para a página Home</button>
        </Col>
        <Col className={styles.col} lg={8}>
          <div className={styles.title}>Erro</div>
          <div className={styles.text}>
            A página não foi encontrada ou você não tem acesso.
          </div>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}
