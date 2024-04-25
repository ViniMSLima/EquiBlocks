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

export default function ContainerForm() {
  const [formas, setFormas] = useState([
    { imagem: quadrado, quantidade: 5, peso: 100, naBalanca: false },
    { imagem: circulo, quantidade: 5, peso: 200, naBalanca: false },
    { imagem: triangulo, quantidade: 5, peso: 500, naBalanca: false },
    { imagem: pentagono, quantidade: 5, peso: 700, naBalanca: false },
    { imagem: estrela, quantidade: 5, peso: 1000, naBalanca: false },
  ]);
  const [balance1, setBalance1] = useState( { left: { total: 0, figures: {} }, right: { total: 0, figures: {} } });
  const [balance2, setBalance2] = useState({ left: { total: 0, figures: {} }, right: { total: 0, figures: {} } });

  const handleDrop = (forma, balanca, lado) => {
    if (!forma) return;
    forma = parseInt(forma);
    const formaKey = Object.keys(formas.reduce((acc, item) => ({ ...acc, [item.peso]: item }), {})).find(key => parseInt(key) === forma);

    const updateBalance = (balance) => ({
      ...balance,
      [lado]: {
        ...balance[lado],
        total: balance[lado].total + forma,
        figures: {
          ...balance[lado].figures,
          [formaKey]: (balance[lado].figures[formaKey] || 0) + 1
        }
      }
    });

    if (balanca === 1) {
      setBalance1(prevBalance => updateBalance(prevBalance));
    } else {
      setBalance2(prevBalance => updateBalance(prevBalance));
    }

    const updatedFormas = formas.map(item => {
      if (item.peso === forma && item.quantidade > 0) {
        return {
          ...item,
          quantidade: item.quantidade - 1,
          naBalanca: true
        };
      }
      return item;
    });
    setFormas(updatedFormas);
  };

  const handleDragEnd = (index) => {
    if (formas[index].naBalanca) {
      const updatedFormas = [...formas];
      updatedFormas[index] = {
        ...updatedFormas[index],
        naBalanca: false
      };
      setFormas(updatedFormas);
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Balance
          balance={balance1}
          balanca={1}
          handleDrop={handleDrop}
        />
        <Balance
          balance={balance2}
          balanca={2}
          handleDrop={handleDrop}
        />
      </div>
      <div className={styles.container}>
        <Row>
          {formas.map((item, index) => (
            <Col key={index}>
              <div className={styles.divForm}>
                <img
                  className={styles.forms}
                  src={item.imagem}
                  alt={`Forma ${index}`}
                  draggable={item.quantidade > 0 && !item.naBalanca}
                  onDragStart={(e) => {
                    if(item.quantidade > 0 && !item.naBalanca)
                    {
                      e.dataTransfer.setData("forma", item.peso);
                    }
                  }}
                  onDragEnd={() => handleDragEnd(index)}
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
