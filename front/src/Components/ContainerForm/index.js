import React, { useState } from "react";
import styles from "./styles.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Balance from "../Balance";

import quadrado from "../../Img/formas/square.png";
import circulo from "../../Img/formas/circle.png";
import triangulo from "../../Img/formas/triangulo.png";
import pentagono from "../../Img/formas/pentagono.png";
import estrela from "../../Img/formas/star.png";

const formas = [
  { imagem: quadrado, quantidade: 5 },
  { imagem: circulo, quantidade: 5 },
  { imagem: triangulo, quantidade: 5 },
  { imagem: pentagono, quantidade: 5 },
  { imagem: estrela, quantidade: 5 }
];

export default function ContainerForm() {
  const [balance1, setBalance1] = useState({ left: 0, right: 0 });
  const [balance2, setBalance2] = useState({ left: 0, right: 0 });

  const handleDrop = (forma, balanca, lado) => {
    if (balanca === 1) {
      setBalance1((prevBalance) => ({
        ...prevBalance,
        [lado]: prevBalance[lado] + 1
      }));
    } else {
      setBalance2((prevBalance) => ({
        ...prevBalance,
        [lado]: prevBalance[lado] + 1
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
          {formas.map((item, index) => (
            <Col key={index}>
              <div
                className={styles.divForm}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("forma", item.imagem);
                }}
              >
                <img
                  className={styles.forms}
                  src={item.imagem}
                  alt={`Forma ${index}`}
                  onDragEnd={() => {
                    const updatedFormas = [...formas];
                    updatedFormas[index].quantidade--;
                    formas[index].quantidade = Math.max(0, updatedFormas[index].quantidade);
                  }}
                />
                <p className={styles.qtd}>{item.quantidade}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
