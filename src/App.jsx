import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login.jsx";
import { AuthProvider } from './context/AuthProvider';
import Register from './auth/Registe.jsx';
import ChatWindow from './components/ChatWindow.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>   {/* Only one <Routes> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/chatWindow" element={<ChatWindow/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App