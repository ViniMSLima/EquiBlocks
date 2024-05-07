import Col from "react-bootstrap/esm/Col";
import styles from "./styles.module.scss";
import erro from "../../Img/404.png"
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
           <img src={erro}/>

          </div>
          <div>
            <button onClick={goHome}  className={styles.button}>Voltar para a página Home</button>
          </div>
      </Row>
    </div>
  );
}
