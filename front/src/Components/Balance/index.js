import styles from "./styles.module.scss";
import balance from "../../Img/balanca3.png";

export default function Balance() {
  const handleHitBoxClick = () => {
    console.log("Clique no hitbox!");
  };

  return (
    <>
      <div
        style={{
          width: "2em",
          height: "2em",
          position: "relative",
          top: "1.5em",
          left: "3em",
          backgroundColor: "blue",
        }}
        onClick={handleHitBoxClick}
      >
        <img className={styles.balance} src={balance} alt="Balance" />
      </div>
    </>
  );
}
