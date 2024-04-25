import ExcelGenerator from "../../Components/ExcelGenerator";

import { useNavigate } from "react-router-dom";

export default function Excel() {
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm("Deseja Sair?")) {
      localStorage.clear();
      navigate('/');
    }
  }
  return (
    <div>
      <button onClick={() => logOut()} style={{ marginLeft: '2em' }}>Sair</button>
      <ExcelGenerator />
    </div>
  );
}
