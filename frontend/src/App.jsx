import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Login, Register } from "./pages";
import { Header } from "./components";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
