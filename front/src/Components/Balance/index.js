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

import { useContext } from "react";
import { PesoContext } from "../../Context/pesoContext";

export default function Balance({ balance, balanca, handleDrop }) {
  const { contextPeso } = useContext(PesoContext);

  const pesos = contextPeso;
  const images = {
    [pesos[0]]: quadrado,
    [pesos[1]]: circulo,
    [pesos[2]]: triangulo,
    [pesos[3]]: pentagono,
    [pesos[4]]: estrela,
  };

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
    let allImages = Object.entries(figures).flatMap(([key, count]) => {
      const src = images[key];
      return [...Array(count)].map((_, index) => (
        <img key={`${key}-${index}`} className={styles.forms} src={src} alt={key} />
      ));
    });
    const groupSizes = [5, 4, 3, 2, 1];
    let index = 0;
    let groupedImages = [];
    groupSizes.forEach(size => {
      let group = allImages.slice(index, index + size);
      if (group.length > 0) {
        groupedImages.push(
          <div key={`group-${size}`} className={styles.group}>
            {group}
          </div>
        );
      }
      index += size;
    });
    return <div className={styles.figureContainer}>{groupedImages}</div>;
  };

  const determineBalanceImage = () => {
    let balanceImage;
    let hitboxStyles = {};

    if (balance.right.total > balance.left.total) {
      balanceImage = balancee;
      hitboxStyles = {
        hitbox1: { top: "0.77em", left: "0.39em" },
        hitbox2: { top: "1.69em", left: "4em" },
      };
    } else if (balance.right.total < balance.left.total) {
      balanceImage = balancee2;
      hitboxStyles = {
        hitbox1: { top: "1.7em", left: "0.28em" },
        hitbox2: { top: "0.75em", left: "4.09em" },
      };
    } else {
      balanceImage = balancee3;
      hitboxStyles = {
        hitbox1: { top: "1.26em", left: "0.39em" },
        hitbox2: { top: "1.26em", left: "4.02em" },
      };
    }

    return { balanceImage, hitboxStyles };
  };

  const { balanceImage, hitboxStyles } = determineBalanceImage();

  return (
    <div className={styles.contorno}>
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
        {/* <p>Lado A: {balance.left.total}</p> */}
        {/* <p>Lado B: {balance.right.total}</p> */}
      </div>
    </div>
  );
}
