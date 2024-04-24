import React from "react";
import styles from "./styles.module.scss";
import balancee from "../../Img/balanca3.png";
import quadrado from "../../Img/formas/square.png";

export default function Balance({ balance, balanca, handleDrop }) {
  const handleHitBoxClick = (hitBoxName) => {
    console.log(`Clique no ${hitBoxName} hitbox!`);
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

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        className={styles.hitbox1}
        onDragOver={handleDragOver}
        onDrop={handleDropOnLeft}
      >
        <img className={styles.forms} src={quadrado}/>
      </div>
      <div
        className={styles.hitbox2}
        onDragOver={handleDragOver}
        onDrop={handleDropOnRight}
      ></div>
      <img
        className={styles.balance}
        src={balancee}
        alt="Balance"
        style={{ zIndex: "1" }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>Lado A: {balance.left}</p>
        <p>Lado B: {balance.right}</p>
      </div>
    </div>
  );
}
