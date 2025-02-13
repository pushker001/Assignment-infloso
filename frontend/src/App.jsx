import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./component/Protectedroute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Home Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
