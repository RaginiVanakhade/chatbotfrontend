// src/components/ChatWindow.jsx
import { useEffect, useState, useRef } from 'react';
import { useParams,  } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';
import NavBar from './NavBar';

const ChatWindow = () => {
  const { roomId } = useParams();
  // const { state } = useLocation();
  // const roomName = state?.roomName || roomId;
  const { user } = useAuth();
  // const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect with JWT token
    const token = localStorage.getItem('token');
    const socket = io('http://localhost:5000', {
      query: { token },
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket connected');
      socket.emit('join_room', roomId);
    });

    socket.on('message_history', (history) => {
      setMessages(history);
    });

    socket.on('receive_message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    socket.on('user_typing', ({ username }) => {
      setTyping(username);
      setTimeout(() => setTyping(''), 1000);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    socketRef.current.emit('send_message', {
      roomId,
      message: newMessage,
    });
    setNewMessage('');
  };

  const handleTyping = () => {
    socketRef.current.emit('typing', { roomId });
  };

  return (
    <>
      <NavBar />
      <div className="chat-container">
        <div className="messages-area">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.username === user?.username ? 'own' : 'other'}`}>
              <strong>{msg.username}</strong>
              <span>{msg.content}</span>
              <small>{new Date(msg.created_at).toLocaleTimeString()}</small>
            </div>
          ))}
          {typing && <div className="typing-indicator">{typing} is typing...</div>}
        </div>
        <form onSubmit={sendMessage} className="message-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyUp={handleTyping}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default ChatWindow;
