import "./App.css";

import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Excel from "./Pages/ExcelTest";
import ErrorPage from "./Pages/Error";
import Finalized from "./Pages/Finalized";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Challenge from "./Pages/Challenge";

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
        <Route path="/finished" element={ <Finalized /> } />
        <Route path="/exceltest" element={<Excel />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
