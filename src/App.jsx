import "./App.css";

import Navbar from "./components/header/Navbar";
import CalculatorPage from "./components/pages/CalculatorPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HistoryPage from "./components/pages/HistoryPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/codeinair-calculator/calculator" element={<CalculatorPage />} />
        <Route path="/codeinair-calculator/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
