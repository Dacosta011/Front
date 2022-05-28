import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Carro from "./routes/carro";
import Pais from "./routes/pais";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="carro" element={<Carro />} />
        <Route path="pais" element={<Pais />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
