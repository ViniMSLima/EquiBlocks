import React from "react";
import styles from "./styles.module.scss";
import balancee from "../../Img/balanca3.png";
import quadrado from "../../Img/formas/square.png";
import circulo from "../../Img/formas/circle.png";
import triangulo from "../../Img/formas/triangulo.png";
import pentagono from "../../Img/formas/pentagono.png";
import estrela from "../../Img/formas/star.png";

const images = {
  100: quadrado,
  200: circulo,
  500: triangulo,
  700: pentagono,
  1000: estrela
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

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div className={styles.hitbox1} onDragOver={handleDragOver} onDrop={handleDropOnLeft}>
        {renderFigures(balance.left.figures)}
      </div>
      <div className={styles.hitbox2} onDragOver={handleDragOver} onDrop={handleDropOnRight}>
        {renderFigures(balance.right.figures)}
      </div>
      <img className={styles.balance} src={balancee} alt="Balance" style={{ zIndex: "1" }} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>Lado A: {balance.left.total}</p>
        <p>Lado B: {balance.right.total}</p>
      </div>
    </div>
  );
}
