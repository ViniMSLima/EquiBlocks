import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import request from "../../Img/request.png";
import help from "../../Img/regras.gif";
import styles from "./styles.module.scss";

export function Help() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <div onClick={handleShow}>
            <img src={request} className={styles.button}/>
        </div>

        <Modal show={show} onHide={handleClose} className={styles.modal}>
            <img src={help} className={styles.img}/>
        </Modal>
    </>
  );
}