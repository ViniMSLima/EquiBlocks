import ExcelGenerator from "../../Components/ExcelGenerator";
import { useNavigate } from "react-router-dom";
import { apiChallenge } from '../../api/apiChallenge';
import { useEffect, useState } from "react";

export default function Excel() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  // Função para iniciar ou parar o desafio
  const Challenge = () => {
    // Lógica para iniciar ou parar o desafio
    if (!status && window.confirm("Tem certeza que deseja iniciar o desafio?")) {
      setStatus(true);
      apiChallenge.get(`/start`).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log("Error starting challenge");
        console.error(error);
      });
    } else if (status && window.confirm("Tem certeza que deseja interromper o desafio?")) {
      setStatus(false);
      apiChallenge.get(`/stop`).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log("Error stopping challenge");
        console.error(error);
      });
    }
  };

  // Função para obter o status a cada segundo
  const getStatusPeriodically = () => {
    const intervalId = setInterval(() => {
      apiChallenge.get(`/getstatus`).then((response) => {
        setStatus(response.data.status);
      }).catch((error) => {
        console.error(error);
      });
    }, 1000);
    return intervalId;
  };

  useEffect(() => {
    const intervalId = getStatusPeriodically();
    return () => clearInterval(intervalId);
  }, []);


  // Função para sair
  const logOut = () => {
    if (window.confirm("Deseja Sair?")) {
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <div>
      <button onClick={() => logOut()} style={{ marginLeft: '1em' }}>Sair</button>
      <button onClick={() => Challenge()} style={{ marginLeft: '1em' }}>{status ? "Finalizar" : "Iniciar"}</button>
      <ExcelGenerator />
    </div>
  );
}
