import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../style/NavBar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isChatPage = location.pathname.startsWith('/chat/');
  const roomName = isChatPage ? location.state?.roomName : null;

  return (
    <nav className="navbar">
      <div className="left">
        {isChatPage && (
          <button
            onClick={() => navigate('/chatWindow')}
            className="backButton"
          >
            ← Back to Rooms
          </button>
        )}
        <span className="logo">💬 ChatRoom</span>
      </div>

      <div className="right">
        {user && (
          <>
            <span className="username">👤 {user.username}</span>
            <button onClick={logout} className="logoutButton">
              Logout
            </button>
          </>
        )}
        {isChatPage && roomName && (
          <span className="roomBadge"># {roomName}</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;