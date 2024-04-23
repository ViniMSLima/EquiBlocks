import styles from "./styles.module.scss";

export default function Input({ placeholder, label, onChange, type }) {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        className={styles.input}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
