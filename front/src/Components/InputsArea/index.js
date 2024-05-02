import { useContext, useMemo } from "react";
import { PesoContext } from "../../Context/pesoContext";
import ShapeInput from "../ShapeInput";
import styles from "./styles.module.scss";
import square from '../../Img/formas/square.png';
import circle from '../../Img/formas/circle.png';
import pentagon from '../../Img/formas/pentagono.png';
import star from '../../Img/formas/star.png';
import triangle from '../../Img/formas/triangulo.png';

export default function Inputs({ oC1, oC2, oC3, oC4, oC5, clear }) {
  const { contextPeso } = useContext(PesoContext);
  const shapes = useMemo(() => {
    const shapeList = [
      { shapeImg: square, shapeValue: contextPeso[0], oC: oC1 },
      { shapeImg: circle, shapeValue: contextPeso[1], oC: oC2 },
      { shapeImg: triangle, shapeValue: contextPeso[2], oC: oC3 },
      { shapeImg: pentagon, shapeValue: contextPeso[3], oC: oC4 },
      { shapeImg: star, shapeValue: contextPeso[4], oC: oC5 }
    ];
    const middleIndex = Math.floor(shapeList.length / 2);
    const index500 = shapeList.findIndex(shape => shape.shapeValue === 500);

    if (index500 !== -1 && index500 !== middleIndex) {
      [shapeList[middleIndex], shapeList[index500]] = [shapeList[index500], shapeList[middleIndex]];
    }

    return shapeList;
  }, [contextPeso]);

  const clearBalance = () => {
    clear(true)
  }

  return (
    <>
      <div className={styles.card}>
        {shapes.map((shape, index) => (
          <ShapeInput key={index} oC={shape.oC} shapeImg={shape.shapeImg} shapeValue={shape.shapeValue} />
        ))}
      </div>
      <div className={styles.button2} onClick={clearBalance}>
          Limpar Balanças
      </div>
    </>
  );
}
