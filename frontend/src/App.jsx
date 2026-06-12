import { BrowserRouter, Route, Routes } from "react-router-dom";

import IndiaMapPage from "./pages/IndiaMapPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<IndiaMapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
