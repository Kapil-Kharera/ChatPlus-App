import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {  useSelector } from "react-redux/es/hooks/useSelector";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const  user  = useSelector((state) => state.user);
  console.log(user);
  const { acessToken : token } = user;
  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route exact path="/" element={ token ? <Home /> : <Navigate to="/login" /> } />
          <Route path="/login" element={ !token ? <Login /> : <Navigate to="/" /> } />
          <Route path="/register" element={ !token ? <Register /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
