import Form from "react-bootstrap/Form";
import styles from "./styles.module.scss";

export default function ShapeInput({ shapeValue, oC }) {
  const inputValue = shapeValue === 500 ? 500 : undefined;
  const isDisabled = shapeValue === 500;

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
                placeholder = {inputValue? 500 : "???"}
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
