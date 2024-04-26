import React, { useState, useEffect, useRef, useContext } from "react";

import { PesoContext } from "../../Context/pesoContext";

import Container from "react-bootstrap/Container";
import styles from "./styles.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Balance from "../Balance";
import quadrado from "../../Img/formas/square.png";
import circulo from "../../Img/formas/circle.png";
import triangulo from "../../Img/formas/triangulo.png";
import pentagono from "../../Img/formas/pentagono.png";
import estrela from "../../Img/formas/star.png";
import Score from "../Score";

export default function ContainerForm() {
  const { contextPeso, setContextPeso } = useContext(PesoContext);
  const newPesos = contextPeso;
  const [formas, setFormas] = useState([]);

  useEffect(() => {
    if (contextPeso.length === 5) {
      setFormas([
        { imagem: quadrado, quantidade: 5, peso: parseInt(contextPeso[0]), onBalance: false },
        { imagem: circulo, quantidade: 5, peso: parseInt(contextPeso[1]), onBalance: false },
        { imagem: triangulo, quantidade: 5, peso: parseInt(contextPeso[2]), onBalance: false },
        { imagem: pentagono, quantidade: 5, peso: parseInt(contextPeso[3]), onBalance: false },
        { imagem: estrela, quantidade: 5, peso: parseInt(contextPeso[4]), onBalance: false },
      ]);
    }
  }, [contextPeso]);

  const [balance1, setBalance1] = useState({
    left: { total: 0, figures: {} },
    right: { total: 0, figures: {} },
  });
  const [balance2, setBalance2] = useState({
    left: { total: 0, figures: {} },
    right: { total: 0, figures: {} },
  });

  const disableF5 = useRef(null);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Tem certeza que quer sair da página?";
    };

    const handleKeyDown = (event) => {
      if (event.keyCode === 116 || event.keyCode === 82) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    disableF5.current = handleKeyDown;

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("keydown", disableF5.current);
    };
  }, []);

  const handleDrop = (forma, balanca, lado) => {
    console.log(forma);
    if (!forma) return;
    forma = parseInt(forma);
    const formaKey = Object.keys(
      formas.reduce((acc, item) => ({ ...acc, [item.peso]: item }), {})
    ).find((key) => parseInt(key) === forma);

    const updateBalance = (balance) => ({
      ...balance,
      [lado]: {
        ...balance[lado],
        total: balance[lado].total + forma,
        figures: {
          ...balance[lado].figures,
          [formaKey]: (balance[lado].figures[formaKey] || 0) + 1,
        },
      },
    });

    if (balanca === 1) {
      setBalance1((prevBalance) => updateBalance(prevBalance));
    } else {
      setBalance2((prevBalance) => updateBalance(prevBalance));
    }

    const updatedFormas = formas.map((item) => {
      if (item.peso === forma && item.quantidade > 0) {
        return {
          ...item,
          quantidade: item.quantidade - 1,
          onBalance: true,
        };
      }
      return item;
    });
    localStorage.setItem("formas", JSON.stringify(updatedFormas));
    setFormas(updatedFormas);
  };

  const handleDragEnd = (index) => {
    if (formas[index].onBalance) {
      const updatedFormas = [...formas];
      updatedFormas[index] = {
        ...updatedFormas[index],
        onBalance: false,
      };
      setFormas(updatedFormas);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col sm="12" lg="6" className={styles.coluna}>
            {/* <Score balance={ balance1 }/> */}
            <Balance balance={balance1} balanca={1} handleDrop={handleDrop} />
            {/* <Score balance={ balance1 }/> */}
          </Col>
          <Col sm="12" lg="6" className={styles.coluna}>
            {/* <Score balance={ balance2 }/> */}
            <Balance balance={balance2} balanca={2} handleDrop={handleDrop} />
            {/* <Score balance={ balance2 }/> */}
          </Col>
        </Row>
      </Container>
      <div className={styles.container}>
        <Row>
          {formas.map((item, index) => (
            <Col key={index}>
              <div className={styles.divForm}>
                <img
                  className={styles.forms}
                  src={item.imagem}
                  alt={`Forma ${index}`}
                  draggable={item.quantidade > 0 && !item.onBalance}
                  onDragStart={(e) => {
                    if (item.quantidade > 0 && !item.onBalance) {
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
