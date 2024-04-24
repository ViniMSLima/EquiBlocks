import "./App.css";

import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Excel from "./Pages/ExcelTest";
import Challenge from "./Pages/Challenge";
import Finalized from "./Pages/Finalized";
import ProtectedRoute from "./Pages/ProtectedRoute";
import ErrorPage from "./Pages/Error";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/challenge"
          element={
            <ProtectedRoute
              errorPage={<ErrorPage />}
              targetPage={<Challenge />}
            />
          }
        />
        <Route path="/finished" element={<Finalized />} />
        <Route path="/exceltest" element={<Excel />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
