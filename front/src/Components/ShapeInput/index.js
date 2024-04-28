import Form from "react-bootstrap/Form";

import styles from "./styles.module.scss";

export default function ShapeInput({ shapeImg, shapeValue, oC }) {

  const preventDragHandler = (e) => {
    e.preventDefault();
  }

  return (
    <div className={styles.bg}>
      <div className={styles.cardBody}>
        <img src={shapeImg} className={styles.imgFormat} onDragStart={preventDragHandler} alt="Shape"></img>
        <div className={styles.text}>
          <Form>
            <Form.Group controlId="Input" className={styles.centralize}>
              <Form.Control className={styles.input} type="number" placeholder="???" onChange={oC}/>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}
