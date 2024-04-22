import styles from "./styles.module.scss";

export default function Input({ placeholder, label }) {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input type="text" className={styles.input} placeholder={placeholder} />
    </div>
  );
}
