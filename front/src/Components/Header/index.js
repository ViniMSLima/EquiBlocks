import {
  Links,
  Row,
  Supergraphic,
  Void,
} from "./styles";
import styles from "./supergraphic.module.css";
import { Outlet } from "react-router-dom";

export default function Header() {
  return (
    <>
      <Supergraphic className={styles.supergraphic} />
      <Row>
        <div className={styles.logo} />
        <Void />
        <Links>
          <Void />
          <Void />
        </Links>
      </Row>
      <Outlet />
    </>
  );
}
