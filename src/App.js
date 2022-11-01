import { BrowserRouter, Routes, Route } from "react-router-dom";
import {GlobalProvider} from "./context/globalContext";
import Home from "./views/Home/Home";
import WeatherDetail from "./views/WeatherDetail/WeatherDetail";

const App = ()=>{
  return (
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/weather-detail" element={<WeatherDetail />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
  );
}

export default App;
