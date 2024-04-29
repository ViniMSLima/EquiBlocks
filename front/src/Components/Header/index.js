import React, { useState, useRef, useEffect } from "react";
import { Links, Row, Supergraphic, Void } from "./styles";
import styles from "./supergraphic.module.css";
import { Outlet } from "react-router-dom";
import request from "../../Img/request.png";
import help from "../../Img/AJUDA.png";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const closeModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    if (modalOpen) {
      document.addEventListener("mousedown", closeModal);
      modalRef.current.focus();
    } else {
      document.removeEventListener("mousedown", closeModal);
    }
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [modalOpen]);

  return (
    <>
      {modalOpen && (
        <div className={styles.backdrop} onClick={closeModal}>
        </div>
      )}
      <Supergraphic className={styles.supergraphic} />
      <Row>
        <div className={styles.logo} />
        <Void />
        <Links>
          <div onClick={toggleModal}>
            <img className={styles.request} src={request} alt="Request" draggable={"false"}/>
          </div>
        </Links>
      </Row>
      <Outlet />
      {modalOpen && (
        <div className={styles.modal} ref={modalRef} tabIndex={-1}>
          <img className={styles.help} src={help} alt="Help" draggable={"false"}/>
        </div>
      )}
    </>
  );
}
