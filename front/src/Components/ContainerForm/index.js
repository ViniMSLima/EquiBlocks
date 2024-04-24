import React, { useState } from "react";
import styles from "./styles.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import quadrado from "../../Img/formas/square.png";
import circulo from "../../Img/formas/circle.png";
import triangulo from "../../Img/formas/triangulo.png";
import pentagono from "../../Img/formas/pentagono.png";
import estrela from "../../Img/formas/star.png";
import Balance from "../Balance";

const formas = [quadrado, circulo, triangulo, pentagono, estrela];

export default function ContainerForm() {
    const [balance1, setBalance1] = useState({ left: 0, right: 0 });
    const [balance2, setBalance2] = useState({ left: 0, right: 0 });
  
    const handleDrop = (forma, balanca, lado) => {
      if (balanca === 1) {
        setBalance1((prevBalance) => ({
          ...prevBalance,
          [lado]: prevBalance[lado] + 1,
        }));
      } else {
        setBalance2((prevBalance) => ({
          ...prevBalance,
          [lado]: prevBalance[lado] + 1,
        }));
      }
    };
  
    return (
      <>
        <div style={{ display: "flex" }}>
          <Balance balance={balance1} balanca={1} handleDrop={handleDrop} />
          <Balance balance={balance2} balanca={2} handleDrop={handleDrop} />
        </div>
        <div className={styles.container}>
          <Row>
            {formas.map((forma, index) => (
              <Col key={index}>
                <div
                  className={styles.divForm}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("forma", forma);
                  }}
                >
                  <img
                    className={styles.forms}
                    src={forma}
                    alt={`Forma ${index}`}
                    onDragEnter={e => console.log(e)} 
                    onDragEnd={e => console.log(e)}
                  />
                  <p className={styles.qtd}>5</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </>
  );
}
