import ExcelGenerator from "../../Components/ExcelGenerator";

import { useNavigate } from "react-router-dom";

import { apiChallenge } from '../../api/apiChallenge';
import { useEffect, useState } from "react";


export default function Excel() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    getServerStatus();
  }, []);

  function getServerStatus() {
    apiChallenge.get(`/getstatus`).then((response) => {
      console.log(response.data.status)
      setStatus(response.data.status)
    }).catch((error) => {
      console.log("Error starting challenge")
      console.error(error)
    })
  }

  const logOut = () => {
    if (window.confirm("Deseja Sair?")) {
      localStorage.clear();
      navigate('/');
    }
  }

  const Challenge = () => {
    if (status == false) {
      if (window.confirm("Tem certeza que deseja iniciar o desafio?")) {
        setStatus(true)
        apiChallenge.get(`/start`).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log("Error starting challenge")
          console.error(error)
        })
      }
    }
    if (status) {
      if (window.confirm("Tem certeza que deseja interromper o desafio?")) {
        setStatus(false)
        apiChallenge.get(`/stop`).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log("Error starting challenge")
          console.error(error)
        })
      }
    }
  }

  return (
    <div>
      <button onClick={() => logOut()} style={{ marginLeft: '1em' }}>Sair</button>
      <button onClick={() => Challenge()} style={{ marginLeft: '1em' }}>{status ? "Finalizar" : "Iniciar"}</button>
      <ExcelGenerator />
    </div>
  );
}
