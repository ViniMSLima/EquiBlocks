import styles from "./styles.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import quadrado from "../../Img/formas/square.png";
import circulo from "../../Img/formas/circle.png";
import triangulo from "../../Img/formas/triangulo.png";
import pentagono from "../../Img/formas/pentagono.png";
import estrela from "../../Img/formas/star.png";


const formas = [quadrado, circulo, triangulo, pentagono, estrela];

export default function ContainerForm() {
  return (
    <div className={styles.container}>
      <Row>
        {formas.map((forma, index) => (
          <Col key={index}>
            <div>
              <img className={styles.forms} src={forma} alt={`Forma ${index}`} />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
