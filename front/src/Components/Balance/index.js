import React from "react";
import Container from "react-bootstrap/Container";
import styles from "./styles.module.scss";
import balancee from "../../Img/balanca1.png";
import balancee2 from "../../Img/balanca2.png";
import balancee3 from "../../Img/balanca3.png";
import quadrado from "../../Img/formas/square.png";
import circulo from "../../Img/formas/circle.png";
import triangulo from "../../Img/formas/triangulo.png";
import pentagono from "../../Img/formas/pentagono.png";
import estrela from "../../Img/formas/star.png";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";

const images = {
  100: quadrado,
  200: circulo,
  500: triangulo,
  700: pentagono,
  1000: estrela,
};

export default function Balance({ balance, balanca, handleDrop }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropOnLeft = (e) => {
    e.preventDefault();
    const forma = e.dataTransfer.getData("forma");
    handleDrop(forma, balanca, "left");
  };

  const handleDropOnRight = (e) => {
    e.preventDefault();
    const forma = e.dataTransfer.getData("forma");
    handleDrop(forma, balanca, "right");
  };

  const renderFigures = (figures) => {
    return Object.entries(figures).map(([key, count]) => {
      const src = images[key];
      return [...Array(count)].map((_, index) => (
        <img key={index} className={styles.forms} src={src} />
      ));
    });
  };

  const determineBalanceImage = () => {
    let balanceImage;
    let hitboxStyles = {};

    if (balance.right.total > balance.left.total) {
      balanceImage = balancee;
      hitboxStyles = {
        hitbox1: { top: "0.8em", left: "0.09em" },
        hitbox2: { top: "1.69em", left: "3.70em" },
      };
    } else if (balance.right.total < balance.left.total) {
      balanceImage = balancee2;
      hitboxStyles = {
        hitbox1: { top: "1.7em", left: "-0.01em" },
        hitbox2: { top: "0.75em", left: "3.80em" },
      };
    } else {
      balanceImage = balancee3;
      hitboxStyles = {
        hitbox1: { top: "1.3em", left: "0.08em" },
        hitbox2: { top: "1.3em", left: "3.72em" },
      };
    }

    return { balanceImage, hitboxStyles };
  };

  const { balanceImage, hitboxStyles } = determineBalanceImage();

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <Container
        className={styles.hitbox1}
        style={hitboxStyles.hitbox1}
        onDragOver={handleDragOver}
        onDrop={handleDropOnLeft}
      >
        {renderFigures(balance.left.figures)}
      </Container>
      <div
        className={styles.hitbox2}
        style={hitboxStyles.hitbox2}
        onDragOver={handleDragOver}
        onDrop={handleDropOnRight}
      >
        {renderFigures(balance.right.figures)}
      </div>
      <img
        className={styles.balance}
        src={balanceImage}
        alt="Balance"
        style={{ zIndex: "1" }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>Lado A: {balance.left.total}</p>
        <p>Lado B: {balance.right.total}</p>
      </div>
    </div>
  );
}
