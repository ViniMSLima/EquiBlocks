import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ContainerForm from "../../Components/ContainerForm";

import styles from "./styles.module.scss";
import Timer from "../../Components/Timer";
import Inputs from "../../Components/InputsArea";

import quadrado from "../../Img/formas/square.png";
import circulo from "../../Img/formas/circle.png";
import triangulo from "../../Img/formas/triangulo.png";
import pentagono from "../../Img/formas/pentagono.png";
import estrela from "../../Img/formas/star.png";

import axios from "axios";
import { apiEquiblocks } from "../../api/apiEquiblocks";

import { TimerContext } from "../../Context/timerContext";
import { PesoContext } from "../../Context/pesoContext";
import { apiChallenge } from "../../api/apiChallenge";

export default function Challenge() {
  window.addEventListener(
    "DOMContentLoaded",
    function () {
      this.window.location.reload();
    },

    { once: true }
  );

  const [begin, setBegin] = useState(false);

  const [clear, setClear] = useState(false);
  const [phaseClear, setPhaseClear] = useState(true);

  const [status, setStatus] = useState(
    localStorage.getItem("status") || "COMEÇAR"
  );
  // const [tempoDeTeste] = useState(4);
  // const [tempoDesafio] = useState(29);

  const [phase, setPhase] = useState(
    localStorage.getItem("fase") || "FASE TESTE"
  );

  const [timerStarted, setTimerStarted] = useState(false);
  const navigate = useNavigate();

  const { contextTimer, setContextTimer } = useContext(TimerContext);
  const { contextPeso, setContextPeso } = useContext(PesoContext);

  const [pesitos, setPesos] = useState([]);

  const prevPhaseRef = useRef(phase);

  const [attempts, setAttempts] = useState(
    localStorage.getItem("countAttempt") || 0
  )
  const [qtd, setQtd] = useState(
    localStorage.getItem("qtdFormas") || 0
  )
  useEffect(() => {
    localStorage.setItem("status", status);
    localStorage.setItem("fase", phase);
    const updatedFormas = [
      {
        imagem: quadrado,
        quantidade: 5,
        peso: parseInt(contextPeso[0]),
        onBalance: false,
      },
      {
        imagem: circulo,
        quantidade: 5,
        peso: parseInt(contextPeso[1]),
        onBalance: false,
      },
      {
        imagem: triangulo,
        quantidade: 5,
        peso: parseInt(contextPeso[2]),
        onBalance: false,
      },
      {
        imagem: pentagono,
        quantidade: 5,
        peso: parseInt(contextPeso[3]),
        onBalance: false,
      },
      {
        imagem: estrela,
        quantidade: 5,
        peso: parseInt(contextPeso[4]),
        onBalance: false,
      },
    ];

    localStorage.setItem("formas", JSON.stringify(updatedFormas));
  }, [phase]);

  const getStatusPeriodically = () => {
    const intervalId = setInterval(() => {
      apiChallenge
        .get(`/getstatus`)
        .then((response) => {
          if (response.data.status) {
            setBegin(true);
            // setStatus("Finalizar");
          } else {
            setBegin(false);
            // setStatus("Começar");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, 3000);
    return intervalId;
  };

  useEffect(() => {
    const storedTempo = localStorage.getItem("tempo");
    if (storedTempo) {
      // Converter a string de tempo em segundos
      const [minutes, seconds] = storedTempo.split(":").map(Number);
      const totalTimeInSeconds = minutes * 60 + seconds;

      // Iniciar o timer com o tempo convertido
      setContextTimer(totalTimeInSeconds);
    }

    const intervalId = getStatusPeriodically();
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getValues();

    setTimerStarted(true);
    if (phase === "FASE TESTE") {
      const savedPesos = localStorage.getItem("newPesos");
      if (savedPesos) {
        const pesos = JSON.parse(savedPesos);
        setContextPeso(pesos);
      } else {
        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }

        const pesos = [100, 200, 500, 700, 1000];
        const newPesos = shuffleArray(pesos);

        setContextPeso(newPesos);
        localStorage.setItem("newPesos", JSON.stringify(newPesos));
      }
    } else if (phase === "DESAFIO") {
      const pesosUpdatedInDesafio = localStorage.getItem("pesosUpdatedInDesafio");

      if (!pesosUpdatedInDesafio) {
        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }

        const serverPesos = pesitos;
        const newPesos = shuffleArray(serverPesos);

        setContextPeso(newPesos);
        localStorage.setItem("newPesos", JSON.stringify(newPesos));
        localStorage.setItem("pesosUpdatedInDesafio", "true");
      } else {
        const savedPesos = localStorage.getItem("newPesos");
        if (savedPesos) {
          const pesos = JSON.parse(savedPesos);
          setContextPeso(pesos);
        }
      }
    }

  }, [phase]);

  async function getValues() {
    let serverPesos = [];
    await apiChallenge.get(`/getvalues`).then((response) => {
      serverPesos = response.data.values;
    }).catch((error) => {
      console.log("Error fetching values:")
      console.error(error)
    });

    let intPesos = []
    serverPesos.forEach(element => {
      intPesos.push(parseInt(element));
    });

    setPesos(intPesos);
    console.log(intPesos);
  }

  const [fig1, setFig1] = useState(1);
  const [fig2, setFig2] = useState(1);
  const [fig3, setFig3] = useState(1);
  const [fig4, setFig4] = useState(1);
  const [fig5, setFig5] = useState(1);

  async function playersToMongoDB() {
    var nome = localStorage.getItem("nome");
    var data = localStorage.getItem("data");
    var tempo = localStorage.getItem("tempo");

    const formas1 = localStorage.getItem("formas");
    const formas2 = JSON.parse(formas1);
    const palpites = [fig1, fig2, fig3, fig4, fig5];
    let envio = [fig1, fig2, fig3, fig4, fig5];

    let middleIndex = 0;
    let index500form = formas2.findIndex((form) => form.peso === 500);
    let index500 = palpites.findIndex((form) => form === 1);

    if (index500 !== -1 && index500 !== middleIndex) {
      let temp = palpites[middleIndex];
      palpites[middleIndex] = palpites[index500];
      palpites[index500] = temp;
    }

    if (index500form !== -1 && index500form !== middleIndex) {
      let temp = formas2[middleIndex];
      formas2[middleIndex] = formas2[index500form];
      formas2[index500form] = temp;
    }

    console.log(formas2)
    console.log(palpites)
    let count = 0;
    let acertos = 0;

    formas2.forEach((element) => {
      if (palpites[count] == element.peso) {
        acertos += 25;
        if (element.peso == 100) {
          envio[0] = palpites[count];
        } else if (element.peso == 200) {
          envio[1] = palpites[count];
        } else if (element.peso == 500) {
          envio[2] = 500;
        } else if (element.peso == 700) {
          envio[3] = palpites[count];
        } else if (element.peso == 1000) {
          envio[4] = palpites[count];
        }
      } else palpites[count] = 1;

      count += 1;
    });

    if(attempts && localStorage.getItem("fase") === "DESAFIO") {
      setAttempts(attempts + 1);
    }

    if(qtd && localStorage.getItem("fase") === "DESAFIO") {
      setQtd(qtd + 1);
    }


    const playerInfo = {
      nome,
      data,
      tempo,
      f1: parseInt(envio[0]),
      f2: parseInt(envio[1]),
      f3: 500,
      f4: parseInt(envio[3]),
      f5: parseInt(envio[4]),
      tentativas: attempts,
      qtd_formas: qtd,
      acertos,
    };

    try {
      //IP do senai
      // const res = await axios.post(
      //   "http://10.196.20.101:8080/api/postplayer",
      //   playerInfo
      //   );
      // await axios.post("http://localhost:8080/api/postplayer", playerInfo);
      // await axios.post(
      //   "/postplayer",
      //   playerInfo
      // );

      apiEquiblocks
        .post(`/postPlayer`, playerInfo)
        .then((response) => {
          if (!response.data.results) {
            console.log("Vazio");
          } else {
            console.log(response.data.results);
          }
        })
        .catch((error) => {
          console.log("Error fetching player data:");
          console.error(error);
        });
    } catch (error) {
      console.error("Error fetching game data:", error);
    }

    const existingPlayersJSON = localStorage.getItem("playerInfo");
    const existingPlayers = existingPlayersJSON
      ? JSON.parse(existingPlayersJSON)
      : [];

    const updatedPlayers = [...existingPlayers, playerInfo];

    localStorage.setItem("playerInfo", JSON.stringify(updatedPlayers));
    setTimerStarted(false);
    setFig1("");
    setFig2("");
    setFig3("");
    setFig4("");
    setFig5("");
  }

  function checkInputs() {
    const palpites = [fig1, fig2, fig3, fig4, fig5];
    let count = 0;
    palpites.forEach((palpite) => {
      if (palpite == 1) {
        count += 1;
      }
    });

    if (count > 1) return false;
    else return true;
  }

  const startReal = async () => {
    setPhaseClear(false);
    localStorage.setItem("phaseclear", JSON.stringify(phaseClear));
    if (status === "FINALIZAR") {
      if (window.confirm("Deseja Finalizar?")) {
        if (!checkInputs()) {
          alert("Não é possível finalizar a atividade com valores em branco.");
          return
        }
        playersToMongoDB();
        localStorage.clear();
        navigate("/finished");
      }
    }
    localStorage.removeItem("tempo");
    setTimerStarted(true);
    setStatus("FINALIZAR");
    setPhase("DESAFIO");
  };

  // useEffect(() => {
  //   const fase = localStorage.getItem("fase");
  //   if (fase === "FASE TESTE") {
  //     alert("Tempo finalizado! Redirecionando para o Desafio");
  //     startReal();
  //   } else if (contextTimer > tempoDesafio) {
  //     playersToMongoDB();
  //     navigate("/finished");
  //   }
  // }, [contextTimer]);

  useEffect(() => {
    if (prevPhaseRef.current !== phase && phase == "Desafio") {
      window.location.reload();
    }
    prevPhaseRef.current = phase;
  }, [phase]);

  return (
    <div className={styles.background}>
      {begin ? (
        <>
          <Row className={styles.row}>
            <Col className={styles.title} sm="12" lg="12">
              {phase}
            </Col>
            {/* <Col className={styles.btn}>
              <div className={styles.button} onClick={startReal}>
                {status}
              </div>
            </Col> */}
            <Timer startTimer={begin}></Timer>
          </Row>
          <div>
            <Row className={styles.row}>
              <Container className={styles.cont}>
                <Col className={styles.title} sm="12" lg="12">
                  <ContainerForm
                    clear={clear}
                    setClear={setClear}
                    startReal={startReal}
                    phaseC={setPhase}
                    oC1={(e) => { setFig1(e.target.value) }}
                    oC2={(e) => { setFig2(e.target.value) }}
                    oC3={(e) => { setFig3(e.target.value) }}
                    oC4={(e) => { setFig4(e.target.value) }}
                    oC5={(e) => { setFig5(e.target.value) }}
                  />
                </Col>
                {/* <Col className={styles.inputCol} sm="10" lg="2">
                </Col> */}
              </Container>
            </Row>
          </div>
        </>
      ) : (
        <h2 className={styles.textChallenge}> Aguarde o início do desafio </h2>
      )}
    </div>
  );
}
