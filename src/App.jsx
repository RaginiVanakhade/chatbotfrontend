import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login.jsx";
import { AuthProvider } from './context/AuthProvider';
import Register from './auth/Registe.jsx';
import RoomList from './components/RoomList';
import ProtectedRoute from '../src/ProtectedRoute.jsx';
import ChatWindow from './components/ChatWindow.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route
            path="/chatWindow"
            element={
              <ProtectedRoute>
                <RoomList />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/chat/:roomId" element={<ProtectedRoute><ChatWindow /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App