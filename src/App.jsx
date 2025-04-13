import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { BrowserRouter as Router,Routes, Route, Link } from "react-router-dom";
import CreateTrip from "./components/CreateTrip";
import GenerateTrip from "./components/GenerateTrip";
import AuthForm from "./components/AuthForm";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/generate-trip" element={<GenerateTrip />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
