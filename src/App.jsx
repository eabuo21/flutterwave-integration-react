import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../src/Pages/Home";
import { ToastContainer } from "react-toastify";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="app">
        <Routes>
         <Route path="/" element={<Home/>}/>
        </Routes>
        <ToastContainer/>
      </div>
    </>
  );
};

export default App;
