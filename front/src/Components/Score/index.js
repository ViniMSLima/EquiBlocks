import styles from "./styles.module.scss";
import quadrado from "../../Img/formas/square.png";
import circulo from "../../Img/formas/circle.png";
import triangulo from "../../Img/formas/triangulo.png";
import pentagono from "../../Img/formas/pentagono.png";
import estrela from "../../Img/formas/star.png";

export default function Score({ balance }) {
  return (
    <div className={styles.global}>
      <div className={styles.conjunto}>
        <img src={quadrado} className={styles.forms}/>
        <p className={styles.number}>x1</p>
      </div>
      <div className={styles.conjunto}>
        <img src={circulo} className={styles.forms}/>
        <p className={styles.number}>x1</p>
      </div>
      <div className={styles.conjunto}>
        <img src={triangulo} className={styles.forms}/>
        <p className={styles.number}>x1</p>
      </div>
      <div className={styles.conjunto}>
        <img src={pentagono} className={styles.forms}/>
        <p className={styles.number}>x1</p>
      </div>
      <div className={styles.conjunto}>
        <img src={estrela} className={styles.forms}/>
        <p className={styles.number}>x1</p>
      </div>
    </div>
  );
}
