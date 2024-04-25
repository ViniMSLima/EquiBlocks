import React, { useState, useEffect } from "react";
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
  const [formas, setFormas] = useState(getLocalStorageItem("formas", [
    { imagem: quadrado, quantidade: 5, peso: 100, onBalance: false },
    { imagem: circulo, quantidade: 5, peso: 200, onBalance: false },
    { imagem: triangulo, quantidade: 5, peso: 500, onBalance: false },
    { imagem: pentagono, quantidade: 5, peso: 700, onBalance: false },
    { imagem: estrela, quantidade: 5, peso: 1000, onBalance: false },
  ]));

  const [balance1, setBalance1] = useState(getLocalStorageItem("balance1", { left: { total: 0, figures: {} }, right: { total: 0, figures: {} } }));
  const [balance2, setBalance2] = useState(getLocalStorageItem("balance2", { left: { total: 0, figures: {} }, right: { total: 0, figures: {} } }));

  function getLocalStorageItem(key, defaultValue) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  }

  function updateLocalStorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

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
      setBalance1(prevBalance => {
        const updatedBalance = updateBalance(prevBalance);
        updateLocalStorageItem("balance1", updatedBalance);
        return updatedBalance;
      });
    } else {
      setBalance2(prevBalance => {
        const updatedBalance = updateBalance(prevBalance);
        updateLocalStorageItem("balance2", updatedBalance);
        return updatedBalance;
      });
    }

    const updatedFormas = formas.map(item => {
      if (item.peso === forma && item.quantidade > 0) {
        return {
          ...item,
          quantidade: item.quantidade - 1,
          onBalance: true
        };
      }
      return item;
    });
    setFormas(updatedFormas);
    updateLocalStorageItem("formas", updatedFormas);
  };

  const handleDragEnd = (index) => {
    if (formas[index].onBalance) {
      const updatedFormas = [...formas];
      updatedFormas[index] = {
        ...updatedFormas[index],
        onBalance: false
      };
      setFormas(updatedFormas);
      updateLocalStorageItem("formas", updatedFormas);
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
                  className={styles.forms }
                  src={item.imagem}
                  alt={`Forma ${index}`}
                  draggable={item.quantidade > 0 && !item.onBalance}
                  onDragStart={(e) => {
                    if(item.quantidade > 0 && !item.onBalance)
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
