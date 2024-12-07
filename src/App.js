import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/LoginPage/Login';
import SignUp from "./components/SignUpPage/SignUp";
import Home from "./components/dashboard/home";

function App() {
  return (
    // basename="/upload-documents"
    <Router >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />

        </Routes>
    </Router>
  );
}

export default App;
