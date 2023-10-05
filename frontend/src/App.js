import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {  useSelector } from "react-redux/es/hooks/useSelector";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const  user  = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
