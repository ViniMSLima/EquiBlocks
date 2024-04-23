import Form from "react-bootstrap/Form";

import styles from "./styles.module.scss";

export default function ShapeInput({ shapeImg, shapeValue }) {
  return (
    <div className={styles.bg}>
      <div className={styles.cardBody}>
        <img src={shapeImg} className={styles.imgFormat} alt="Shape"></img>
        <div className={styles.text}>
          <Form>
            <Form.Group controlId="Input">
              <Form.Control type="number" placeholder="???" />
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}
