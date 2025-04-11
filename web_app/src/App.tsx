import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import MainPage from "./pages/MainPage/MainPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/app" element={<MainPage />} />
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
