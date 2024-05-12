import ExcelGenerator from "../../Components/ExcelGenerator";
import { useNavigate } from "react-router-dom";
import { apiChallenge } from "../../api/apiChallenge";
import { useEffect, useState } from "react";
import Header from "../../Components/Header";

export default function Excel() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [finished, setFinished] = useState(true);

  // Função para iniciar ou parar o desafio
  const Challenge = () => {
    // Lógica para iniciar ou parar o desafio
    if (
      !status &&
      window.confirm("Tem certeza que deseja iniciar o desafio?")
    ) {
      setStatus(true);
      apiChallenge
        .get(`/start`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("Error starting challenge");
          console.error(error);
        });
    } else if (
      status &&
      window.confirm("Tem certeza que deseja interromper o desafio?")
    ) {
      setStatus(false);
      apiChallenge
        .get(`/stop`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("Error stopping challenge");
          console.error(error);
        });
    }
  };

  const FinishChallenge = () => {
    if (window.confirm("Tem certeza que deseja finalizar o desafio?")) {
      setFinished(true);
      apiChallenge
        .get(`/finish`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("Error finishing challenge");
          console.error(error);
        });
    }
  };

  // Função para obter o status a cada segundo
  const getStatusPeriodically = () => {
    const intervalId = setInterval(() => {
      apiChallenge
        .get(`/getstatus`)
        .then((response) => {
          if (response.data.status) {
            setStatus(true);
            setFinished(response.data.finished)
          } else {
            setStatus(false);
            setFinished(response.data.finished)
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, 5000);
    return intervalId;
  };

  useEffect(() => {
    getStatusPeriodically();
  }, []);

  // Função para sair
  const logOut = () => {
    if (window.confirm("Deseja Sair?")) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <div style={{ backgroundColor: "white" }}>
        <button onClick={() => logOut()} style={{ marginLeft: "1em" }}>
          Sair
        </button>
        <a target="_blank" href="/clock">
          <button style={{ marginLeft: "1em" }}>
            Timer
          </button>
        </a>
        <button onClick={() => Challenge()} style={{ marginLeft: "1em" }}>
          {status ? "Interromper" : "Iniciar"}
        </button>
        {finished ? (null) : (
          <button onClick={() => FinishChallenge()} style={{ marginLeft: "1em" }}>
            Finalizar
          </button>
        )
        }
        <ExcelGenerator />
      </div>
    </>
  );
}
