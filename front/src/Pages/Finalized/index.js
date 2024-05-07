import styles from "./styles.module.scss";

import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";

export default function Finalized() {
  const navigate = useNavigate();

  function goHome() {
    navigate("/");
  }

  return (
    <div className={styles.body}>
      <Container className={styles.container}>
        <div className={styles.title}>Desafio Concluído.</div>
        <div className={styles.text}>Aguarde por mais instruções dos instrutores.</div>
        <button onClick={goHome} className={styles.button}>INÍCIO</button>
      </Container>
    </div>
  );
}
