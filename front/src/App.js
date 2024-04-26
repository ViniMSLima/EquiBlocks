import "./App.css";

import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Excel from "./Pages/ExcelTest";
import ErrorPage from "./Pages/Error";
import Finalized from "./Pages/Finalized";
import Challenge from "./Pages/Challenge";
import ProtectedRoute from "./Pages/ProtectedRoute";

import Header from "./Components/Header";
import { TimerProvider } from "./Context/timerContext";
import { PesoProvider } from "./Context/pesoContext";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <>
      <Header />
      <TimerProvider>
        <PesoProvider>
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
            <Route
              path="/results"
              element={
                <ProtectedRoute
                  errorPage={<ErrorPage />}
                  targetPage={<Excel />}
                />
              }
            />
            <Route path="/finished" element={<Finalized />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </PesoProvider>
      </TimerProvider>
    </>
  );
}

export default App;
