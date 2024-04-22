import styles from "./styles.module.scss";
import logo from "../../Img/logo.png";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

export default function Home() {
  return (
    <div className={styles.home}>
      <img src={logo} className={styles.logo}></img>
      <div>
        <Input
          placeholder="Digite seu Nome:"
          label="Nome:"
        />
        <Input
          placeholder="Digite sua Data de Nascimento:"
          label="Data de Nascimento:"
        />
      </div>
      <Button label="JOGAR" />
    </div>
  );
}
