import Form from "react-bootstrap/Form";
import styles from "./styles.module.scss";

export default function ShapeInput({ shapeValue, oC }) {
  let middleValue = parseInt(localStorage.getItem('middleValue'));
  const inputValue = shapeValue === middleValue ? middleValue : undefined;
  const isDisabled = shapeValue === middleValue;

  const preventDragHandler = (e) => {
    e.preventDefault();
  }

  return (
    <div className={styles.bg}>
      <div className={styles.cardBody}>
        <div className={styles.text}>
          <Form style={{ display: 'flex', justifyContent: 'center' }}>
            <Form.Group controlId="Input" className={styles.centralize}>
              <Form.Control
                bg="primary"
                className={`${styles.input} ${styles.inputColor}`}
                style={{ width: '90%' }}
                type="text"
                value={inputValue}
                placeholder = {inputValue? middleValue : "???"}
                onChange={oC}
                onDragOver={(e) => e.preventDefault()}
                disabled={isDisabled}
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}
