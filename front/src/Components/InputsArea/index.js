import ShapeInput from "../ShapeInput";
import styles from "./styles.module.scss";

import square from '../../Img/formas/square.png';
import circle from '../../Img/formas/circle.png';
import pentagon from '../../Img/formas/pentagono.png';
import star from '../../Img/formas/star.png';
import triangle from '../../Img/formas/triangulo.png';

export default function Inputs() {
    return (
        <>
          <div className={styles.card}>
            <ShapeInput shapeImg={square} shapeValue='500'/>
            <ShapeInput shapeImg={circle} shapeValue='?'/>
            <ShapeInput shapeImg={pentagon} shapeValue='?'/>
            <ShapeInput shapeImg={star} shapeValue='1000000'/>
            <ShapeInput shapeImg={triangle} shapeValue='1000000'/>
          </div>
        </>
      );
}