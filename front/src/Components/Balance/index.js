import React from "react";
import styles from "./styles.module.scss";
import balance from "../../Img/balanca3.png";

export default function Balance() {
  const handleHitBoxClick = (hitBoxName) => {
    console.log(`Clique no ${hitBoxName} hitbox!`);
  };

  return (
    <>
      <div style={{ position: "relative", display: "inline-block" }}>
        <div
          style={{
            position: "absolute",
            width: "2em",
            height: "2em",
            top: "1.3em",
            left: "0.08em",
            backgroundColor: "blue",
          }}
          onClick={() => handleHitBoxClick("primeiro")}
        ></div>
        <div
          style={{
            position: "absolute",
            width: "2em",
            height: "2em",
            top: "1.3em",
            left: "3.72em",
            backgroundColor: "red",
          }}
          onClick={() => handleHitBoxClick("segundo")}
        ></div>
        <img className={styles.balance} src={balance} alt="Balance" />
      </div>
    </>
  );
}
