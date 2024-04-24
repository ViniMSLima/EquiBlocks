import React from "react";
import styles from "./styles.module.scss";
import balancee from "../../Img/balanca3.png";

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
        style={{
          position: "absolute",
          width: "2em",
          height: "2em",
          top: "1.3em",
          left: "0.08em",
          backgroundColor: "blue",
          zIndex: "2"
        }}
        onDragOver={handleDragOver}
        onDrop={handleDropOnLeft}
      ></div>
      <div
        style={{
          position: "absolute",
          width: "2em",
          height: "2em",
          top: "1.3em",
          left: "3.72em",
          backgroundColor: "red",
          zIndex: "2"
        }}
        onDragOver={handleDragOver}
        onDrop={handleDropOnRight}
      ></div>
      <img className={styles.balance} src={balancee} alt="Balance" style={{ zIndex: "1" }} />
      <div style={{ display: "flex", flexDirection: 'column' }}>
        <p>Lado A: {balance.left}</p>
        <p>Lado B: {balance.right}</p>
      </div>
    </div>
  );
}
