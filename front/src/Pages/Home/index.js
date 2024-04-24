import React, { useState } from 'react';
import styles from "./styles.module.scss";
import logo from "../../Img/logo.png";
import Input from "../../Components/Input";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [nome, setNome] = useState(localStorage.getItem('nome') || ""); // Obtenha o valor do localStorage ou um valor padrão vazio se não houver nada
  const [data, setData] = useState(localStorage.getItem('data') || "");

  function play() {

    const d = new Date();

    var bool = false;

    if (nome == "" || data == "") {
      alert("Nome ou Data inválidos");
      bool = true;
    }

    if (parseInt(data.substr(0, 4)) < d.getFullYear() - 22) {
      alert("Ano inválido! Idade máxima: 22")
      bool = true;
    }

    if (parseInt(data.substr(0, 4)) > d.getFullYear() - 16) {
      alert("Ano inválido! Idade mínima: 16")
      bool = true;
    }

    if (bool == false) {
      localStorage.setItem('nome', nome);
      localStorage.setItem('data', data);
      navigate("/challenge");
    }
  }

  return (
    <div className={styles.home}>
      <img src={logo} className={styles.logo} alt="Logo" />
      <div>
        <Input
          type="text"
          placeholder="Digite seu Nome"
          label="Nome:"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="date"
          label="Data de Nascimento:"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
      <button label="JOGAR" onClick={play}>JOGAR</button>
    </div>
  );
}
