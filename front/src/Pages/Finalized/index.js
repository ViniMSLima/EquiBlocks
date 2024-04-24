import styles from "./styles.module.scss";

import Container from "react-bootstrap/esm/Container";

export default function Finalized() {
  const nome = localStorage.getItem("nome");

  return (
    <Container className={styles.container}>
      <div className={styles.title}>Desafio Concluído.</div>
      <div className={styles.text}>Aguarde por mais instruções dos instrutores.</div>
    </Container>
  );
}
