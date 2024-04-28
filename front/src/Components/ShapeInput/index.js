import Form from "react-bootstrap/Form";
import styles from "./styles.module.scss";

export default function ShapeInput({ shapeImg, shapeValue, oC }) {
  const inputValue = shapeValue === 500 ? 500 : null;
  const isDisabled = shapeValue === 500;

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
              <Form.Control
                className={styles.input}
                type="number"
                value={inputValue}
                placeholder="???"
                onChange={oC}
                disabled={isDisabled}
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}
