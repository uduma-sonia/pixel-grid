import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home, GenerateText } from "./pages";

function App() {
  return (
    <BrowserRouter>
      {/* <Home /> */}

      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/generate-text"} element={<GenerateText />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
