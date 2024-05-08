import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import { PesoContext } from "../../Context/pesoContext";
import Button from "../Button/index";
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
import ShapeInput from "../ShapeInput";
import desafio from "../../Img/DESAFIO.gif"
import Modal from 'react-bootstrap/Modal';

export default function ContainerForm({
  startReal,
  phaseC,
  oC1,
  oC2,
  oC3,
  oC4,
  oC5,
}) {
  const { contextPeso } = useContext(PesoContext);
  const [formas, setFormas] = useState([]);
  const [phase, setPhase] = useState("Fase de Teste");
  const [attempt, setAttempt] = useState(false);
  const [countAttempt, setCountAttempt] = useState(1);
  const [qtdFormas, setQtdFormas] = useState(1);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const shapes = useMemo(() => {
    const shapeList = [
      { shapeImg: quadrado, shapeValue: contextPeso[0], oC: oC1 },
      { shapeImg: circulo, shapeValue: contextPeso[1], oC: oC2 },
      { shapeImg: triangulo, shapeValue: contextPeso[2], oC: oC3 },
      { shapeImg: pentagono, shapeValue: contextPeso[3], oC: oC4 },
      { shapeImg: estrela, shapeValue: contextPeso[4], oC: oC5 },
    ];
    let middleValue = parseInt(localStorage.getItem('middleValue'));
    const middleIndex = 0;
    const index500 = shapeList.findIndex((shape) => shape.shapeValue === middleValue);

    if (index500 !== -1 && index500 !== middleIndex) {
      [shapeList[middleIndex], shapeList[index500]] = [
        shapeList[index500],
        shapeList[middleIndex],
      ];
    }

    return shapeList;
  }, [contextPeso]);

  useEffect(() => {
    setPhase(localStorage.getItem("fase"));
    if (contextPeso.length === 5) {
      const storedFormas = getLocalStorageItem("forms", null);
      if (storedFormas) {
        setFormas(storedFormas);
      } else {
        const formasIniciais = [
          {
            imagem: quadrado,
            quantidade: 5,
            peso: contextPeso[0],
            onBalance: false,
          },
          {
            imagem: circulo,
            quantidade: 5,
            peso: contextPeso[1],
            onBalance: false,
          },
          {
            imagem: triangulo,
            quantidade: 5,
            peso: contextPeso[2],
            onBalance: false,
          },
          {
            imagem: pentagono,
            quantidade: 5,
            peso: contextPeso[3],
            onBalance: false,
          },
          {
            imagem: estrela,
            quantidade: 5,
            peso: contextPeso[4],
            onBalance: false,
          },
        ];

        let middleValue = parseInt(localStorage.getItem('middleValue'));
        const middleIndex = 0;
        const index500 = formasIniciais.findIndex(
          (forma) => forma.peso === middleValue
        );

        if (index500 !== -1 && index500 !== middleIndex) {
          [formasIniciais[middleIndex], formasIniciais[index500]] = [
            formasIniciais[index500],
            formasIniciais[middleIndex],
          ];
        }

        setFormas(formasIniciais);
      }
    }
  }, [contextPeso]);

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

  function updateLocalStorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  let status = localStorage.getItem("status");

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
      setBalance1((prevBalance) => {
        const updatedBalance = updateBalance(prevBalance);
        updateLocalStorageItem("balance1", updatedBalance);
        return updatedBalance;
      });
    } else {
      setBalance2((prevBalance) => {
        const updatedBalance = updateBalance(prevBalance);
        updateLocalStorageItem("balance2", updatedBalance);
        return updatedBalance;
      });
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
    updateLocalStorageItem("forms", updatedFormas);
    setFormas(updatedFormas);
    if(localStorage.getItem("fase") === "DESAFIO") 
    {
      setQtdFormas(qtdFormas + 1);
      localStorage.setItem("qtdFormas", qtdFormas);
    }
  };

  const handleDragEnd = (index) => {
    if (formas[index].onBalance) {
      const updatedFormas = [...formas];
      updatedFormas[index] = {
        ...updatedFormas[index],
        onBalance: false,
      };
      setFormas(updatedFormas);
      updateLocalStorageItem("forms", updatedFormas);
    }
  };

  // useEffect(() => {
  //   formas.map((item) => {
  //     item.quantidade = 5;
  //   });

  //   setBalance1(
  //     getLocalStorageItem("balance1", {
  //       left: { total: 0, figures: {} },
  //       right: { total: 0, figures: {} },
  //     })
  //   );

  //   setBalance2(
  //     getLocalStorageItem("balance2", {
  //       left: { total: 0, figures: {} },
  //       right: { total: 0, figures: {} },
  //     })
  //   );

  //   localStorage.setItem(
  //     "balancee1",
  //     JSON.stringify({
  //       left: { total: 0, figures: {} },
  //       right: { total: 0, figures: {} },
  //     })
  //   );
  //   localStorage.setItem(
  //     "balancee2",
  //     JSON.stringify({
  //       left: { total: 0, figures: {} },
  //       right: { total: 0, figures: {} },
  //     })
  //   );

  //   setCountAttempt(0);
  //   setAttempt(!attempt);
  // }, [clear]);

  const handleButtonClick = () => {
    setAttempt(!attempt);
    if(localStorage.getItem("fase") === "DESAFIO") 
    {
      setCountAttempt(countAttempt + 1);
      localStorage.setItem("countAttempt", countAttempt);
    }
  };

  const startRealClean = () => {
    if(phase !== "DESAFIO")
    {
      updateLocalStorageItem("forms", null);
      const balance1Value = {
        left: { total: 0, figures: {} },
        right: { total: 0, figures: {} }
      };
      setBalance1(balance1Value);
      updateLocalStorageItem("balance1", balance1Value);
      const balance2Value = {
        left: { total: 0, figures: {} },
        right: { total: 0, figures: {} }
      };
      setBalance2(balance2Value);
      updateLocalStorageItem("balance2", balance2Value);
    }
    phaseC("DESAFIO")
    setAttempt(!attempt);
    startReal();
    handleShow()
  };

  const cleanBalanca = () => {
    const formasAtualizadas = formas.map((item) => {
      return { ...item, quantidade: 5 };
    });
    setFormas(formasAtualizadas);
    updateLocalStorageItem("forms", formasAtualizadas);
    const balance1Value = {
      left: { total: 0, figures: {} },
      right: { total: 0, figures: {} }
    };
    setBalance1(balance1Value);
    updateLocalStorageItem("balance1", balance1Value);
    const balance2Value = {
      left: { total: 0, figures: {} },
      right: { total: 0, figures: {} }
    };
    setBalance2(balance2Value);
    updateLocalStorageItem("balance2", balance2Value);

    setAttempt(!attempt);
  };

  return (
    <>
      <Container fluid style={{ margin: 0, padding: 0 }}>
        {phase === "DESAFIO" ? (
          <Row>
            <Col sm="12" lg="6" className={styles.coluna}>
              <Balance
                balance={balance1}
                balanca={1}
                handleDrop={handleDrop}
                attempt={attempt}
                setAttempt={setAttempt}
              />
            </Col>
            <Col sm="12" lg="6" className={styles.coluna}>
              <Balance
                balance={balance2}
                balanca={2}
                handleDrop={handleDrop}
                attempt={attempt}
                setAttempt={setAttempt}
              />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col lg="12" className={styles.coluna}>
              <Balance
                balance={balance1}
                balanca={1}
                handleDrop={handleDrop}
                attempt={attempt}
                setAttempt={setAttempt}
              />
            </Col>
          </Row>
        )}
      </Container>
      <Container
        className={`${styles.contorno} ${
          phase !== "DESAFIO" ? styles.contornoTeste : ""
        }`}
      >
        <div
          className={`${styles.container} ${
            phase !== "DESAFIO" ? styles.smallerContainer : ""
          }`}
        >
          <div className={styles.border}>
            <Row style={{ display: "flex", alignItems: "flex-end" }}>
              {formas.map((item, index) => (
                <Col key={index} className={styles.imgInput}>
                  <div className={styles.divForm}>
                    <img
                      className={styles.forms}
                      src={shapes[index].shapeImg}
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
                  {phase == "DESAFIO" && (
                    <ShapeInput
                      key={index}
                      oC={shapes[index].oC}
                      shapeValue={shapes[index].shapeValue}
                    />
                  )}
                </Col>
              ))}
            </Row>
          </div>
          <div className={styles.buttonIniciar} onClick={startRealClean}>
            <span className={styles.iniciar}>{status}</span>
          </div>
        </div>
      </Container>
      <div
        className={`${styles.borderstyle} ${
          phase !== "DESAFIO" ? styles.borderstyleTest : ""
        }`}
        onClick={handleButtonClick}
      >
        <div className={styles.button}>CALCULAR</div>
      </div>
      {phase !== "DESAFIO" && (
        <div className={styles.borderstylecleanTest} onClick={cleanBalanca}>
          <div className={styles.button}>LIMPAR</div>
        </div>
      )}
      <Modal show={show} onHide={handleClose}>
            <img src={desafio} className={styles.img}/>
      </Modal>
    </>
  );
}
