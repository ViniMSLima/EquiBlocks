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
      <Row className={styles.body}>
          <div className={styles.border}>
            <div className={styles.title}>ERRO 404 :(</div>
            <div className={styles.text}>
              A página não foi encontrada ou você não tem acesso.
            </div>
          </div>
            <button onClick={goHome}  className={styles.button}>Voltar para a página Home</button>
      </Row>
    </div>
  );
}
