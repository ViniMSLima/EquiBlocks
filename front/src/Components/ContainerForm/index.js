import React, { useState, useEffect, useRef, useContext } from "react";

import { PesoContext } from "../../Context/pesoContext";
import Button from "../Button/index"

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

export default function ContainerForm() {
  const { contextPeso } = useContext(PesoContext);
  const [formas, setFormas] = useState([]);
  const [phase, setPhase] = useState("Fase de Teste");

  useEffect(() => {
    setPhase(localStorage.getItem("fase"));
    console.log(localStorage.getItem("fase"));
    if (contextPeso.length === 5) {
      const formasIniciais = [
        { imagem: quadrado, quantidade: 5, peso: contextPeso[0], onBalance: false },
        { imagem: circulo, quantidade: 5, peso: contextPeso[1], onBalance: false },
        { imagem: triangulo, quantidade: 5, peso: contextPeso[2], onBalance: false },
        { imagem: pentagono, quantidade: 5, peso: contextPeso[3], onBalance: false },
        { imagem: estrela, quantidade: 5, peso: contextPeso[4], onBalance: false },
      ];

      const middleIndex = Math.floor(formasIniciais.length / 2);
      const index500 = formasIniciais.findIndex(forma => forma.peso === 500);

      if (index500 !== -1 && index500 !== middleIndex) {
        [formasIniciais[middleIndex], formasIniciais[index500]] = [formasIniciais[index500], formasIniciais[middleIndex]];
      }

      setFormas(formasIniciais);
    }
  }, [contextPeso]);

  // useEffect(() => {
    // setPhase(localStorage.getItem("fase"));
    // console.log(localStorage.getItem("fase"));
  // }, [])

  const [balance1, setBalance1] = useState(
    getLocalStorageItem("balance1", {
      left: { total: 0, figures: {} },
      right: { total: 0, figures: {} },
    })
  );
  const [balance2, setBalance2] = useState(
    getLocalStorageItem("balance2", {
      left: { total: 0, figures: {} },
      right: { total: 0, figures: {} },
    })
  );

  function getLocalStorageItem(key, defaultValue) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  }

  const disableF5 = useRef(null);

  const handleKeyDown = (event) => {
    if (event.keyCode === 116 || event.keyCode === 82) {
      event.preventDefault();
    }
  };

  disableF5.current = handleKeyDown;

  document.addEventListener("keydown", handleKeyDown);

  const handleDrop = (forma, balanca, lado) => {
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

  const clearBalance = () => {

    formas.map((item) => {
      item.quantidade = 5;
    });

    setBalance1(getLocalStorageItem("balance1", {
      left: { total: 0, figures: {} },
      right: { total: 0, figures: {} },
    }));

    setBalance2(getLocalStorageItem("balance2", {
      left: { total: 0, figures: {} },
      right: { total: 0, figures: {} },
    }));

    localStorage.setItem(
      "balance1",
      JSON.stringify({
        left: { total: 0, figures: {} },
        right: { total: 0, figures: {} },
      })
    );
    localStorage.setItem(
      "balance2",
      JSON.stringify({
        left: { total: 0, figures: {} },
        right: { total: 0, figures: {} },
      })
    );
  }

  return (
    <>
      <Container style={{ margin: 0, padding: 0 }}>
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
      {phase != "Desafio" ? (
        <div
          className={styles.button}
          onClick={clearBalance}
        >
          Limpar Balanças
        </div>
      ) : null}
      <Container className={styles.container}>
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
      </Container>
    </>
  );
}
