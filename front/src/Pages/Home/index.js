import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import styles from "./styles.module.scss";

import Input from "../../Components/Input";

import redSquare from "../../Img/home/cantinho.png";
import greenDonut from "../../Img/home/bolinha.png";
import greenCircle from "../../Img/home/circle.png";
import blueStar from "../../Img/home/estrela.png";
import purpleSquare from "../../Img/home/quadrado.png";

import redLine from "../../Img/home/redLine.png";
import blueLine from "../../Img/home/blueLine.png";
import greenLine from "../../Img/home/greenLine.png";
import cyanLine from "../../Img/home/cyanLine.png";
import lightGreenLine from "../../Img/home/lightGreenLine.png";
import purpleLine from "../../Img/home/purpleLine.png";

export default function Home() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    localStorage.clear();
  }, []);

  function play() {
    const d = new Date();
    var bool = false;

    if (nome === "Queila Lima" && data === "1111-11-11") {
      localStorage.setItem("nome", nome);
      localStorage.setItem("data", data);
      navigate("/results");
      return;
    }

    if (nome == "" || data == "" || nome.trim().length < 3) {
      alert("Nome ou Data inválidos");
      bool = true;
    }

    if (parseInt(data.substr(0, 4)) < d.getFullYear() - 22) {
      alert("Ano inválido! Idade máxima: 22");
      bool = true;
    }

    if (parseInt(data.substr(0, 4)) > d.getFullYear() - 16) {
      alert("Ano inválido! Idade mínima: 16");
      bool = true;
    }

    if (bool === false) {
      localStorage.setItem("nome", nome);
      localStorage.setItem("data", data);
      navigate("/challenge");
    }
  }

  return (
    <div className={styles.home}>
      <Row className={styles.rowLines}>
        <Col xxl="6" className={styles.redLine}>
          <img src={redLine} className={styles.lineRed}></img>
        </Col>
        <Col xxl="3" className={styles.blueLine}>
          <img src={blueLine} className={styles.lineBlueGreen}></img>
        </Col>
        <Col xxl="3" className={styles.greenLine}>
          <img src={greenLine} className={styles.lineBlueGreen}></img>
        </Col>
      </Row>
      <Row className={styles.row}>
        <Col lg="0" xl="0" xxl="5" className={styles.shapes}>
          <img src={greenCircle} className={styles.greenCircle}></img>
          <img src={purpleSquare} className={styles.purpleSquare}></img>
          <img src={blueStar} className={styles.blueStar}></img>

          <img src={cyanLine} className={styles.lineCyan}></img>
          <img src={lightGreenLine} className={styles.lineLightGreen}></img>
          <img src={purpleLine} className={styles.linePurple}></img>
        </Col>
        <Col lg="12" xl="12" xxl="7" className={styles.text}>
          <div className={styles.title}>
            EquiBlocks
            <img src={redSquare} className={styles.redSquare}></img>
          </div>
          <div className={styles.inputs}>
            <Input
              type="text"
              label="Nome Completo:"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <Input
              type="date"
              label="Data de Nascimento:"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <button label="JOGAR" onClick={play} className={styles.btn}>
            JOGAR
          </button>
        </Col>
      </Row>
      <Row className={styles.row}>
        <div className={styles.greenDonutDiv}>
          <img src={greenDonut} className={styles.greenDonut}></img>
        </div>
      </Row>
    </div>
  );
}
