import ShapeInput from "../ShapeInput";
import styles from "./styles.module.scss";

import square from '../../Img/formas/square.png';
import circle from '../../Img/formas/circle.png';
import pentagon from '../../Img/formas/pentagono.png';
import star from '../../Img/formas/star.png';
import triangle from '../../Img/formas/triangulo.png';

export default function Inputs({oC1, oC2, oC3, oC4, oC5}) {
    return (
        <>
          <div className={styles.card}>
            <ShapeInput oC={oC1} shapeImg={square} shapeValue='500'/>
            <ShapeInput oC={oC2} shapeImg={circle} shapeValue='?'/>
            <ShapeInput oC={oC3} shapeImg={pentagon} shapeValue='?'/>
            <ShapeInput oC={oC4} shapeImg={star} shapeValue='1000000'/>
            <ShapeInput oC={oC5} shapeImg={triangle} shapeValue='1000000'/>
          </div>
        </>
      );
}