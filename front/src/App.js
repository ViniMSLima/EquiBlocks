import "./App.css";

import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Challenge from "./Pages/Challenge";
import Excel from "./Pages/ExcelTest";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/exceltest" element={<Excel />} />
      </Routes>
    </>
  );
}

export default App;
