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
    console.log(nome);
    console.log(data);
    localStorage.setItem('nome', nome); // Salva o valor de 'nome' no localStorage
    localStorage.setItem('data', data); // Salva o valor de 'data' no localStorage
    navigate("/challenge");
  }
  
  return (
    <div className={styles.home}>
      <img src={logo} className={styles.logo} alt="Logo" />
      <div>
        <Input
          type="text"
          placeholder="Digite seu Nome:"
          label="Nome:"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Digite sua Data de Nascimento:"
          label="Data de Nascimento:"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
      <button label="JOGAR" onClick={play}>JOGAR</button>
    </div>
  );
}
