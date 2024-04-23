import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

export default function Button({ label }) {
  const navigate = useNavigate();

  return (
    <button className={styles.button}>
      {label}
    </button>
  );
}
