import { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';
import NavBar from './NavBar';

const ChatWindow = () => {
  const { roomId } = useParams();
  const { state } = useLocation();
  const roomName = state?.roomName || roomId;
  const { user } = useAuth();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

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
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('user_typing', ({ username }) => {
      setTyping(username);
      setTimeout(() => setTyping(''), 1000);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, navigate]);

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

  // ========== Inline styles ==========
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 70px)',   // adjust based on your navbar height
    width: '100vw',                 // full viewport width
    maxWidth: '100%',               // prevent overflow
    backgroundColor: '#0f172a',
    padding: '20px',
    boxSizing: 'border-box',
    margin: 0,                      // remove any default margin
    overflowX: 'hidden',            // prevent horizontal scroll
  },
  title: {
    color: 'white',
    fontSize: '1.8rem',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '2px solid #334155',
    display: 'block',
    width: '100%',
  },
  messagesArea: {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    boxSizing: 'border-box',
  },
  message: {
    maxWidth: '70%',
    padding: '8px 14px',
    borderRadius: '18px',
    wordWrap: 'break-word',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  ownMessage: {
    backgroundColor: '#3b82f6',
    color: 'white',
    alignSelf: 'flex-end',
    borderBottomRightRadius: '4px',
  },
  otherMessage: {
    backgroundColor: '#334155',
    color: '#f1f5f9',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: '4px',
  },
  messageStrong: {
    fontSize: '0.85rem',
    fontWeight: 600,
    opacity: 0.9,
  },
  messageSpan: {
    fontSize: '1rem',
    lineHeight: 1.4,
  },
  messageSmall: {
    fontSize: '0.7rem',
    opacity: 0.7,
    textAlign: 'right',
    marginTop: '4px',
  },
  typingIndicator: {
    fontStyle: 'italic',
    color: '#94a3b8',
    fontSize: '0.85rem',
    padding: '4px 12px',
    backgroundColor: '#1e293b',
    borderRadius: '20px',
    alignSelf: 'flex-start',
    marginTop: '8px',
  },
  form: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: '12px',
    borderRadius: '40px',
    width: '100%',
    boxSizing: 'border-box',
  },
  input: {
    flex: 1,
    background: '#334155',
    border: 'none',
    padding: '12px 18px',
    borderRadius: '32px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.2s',
  },
  button: {
    backgroundColor: '#3b82f6',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '32px',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
};

  // Helper to merge styles for message bubbles
  const getMessageStyle = (isOwn) => ({
    ...styles.message,
    ...(isOwn ? styles.ownMessage : styles.otherMessage),
  });

  return (
    <>
      <NavBar />
      <div style={styles.container}>
        <h2 style={styles.title}># {roomName}</h2>
        <div style={styles.messagesArea}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={getMessageStyle(msg.username === user?.username)}
            >
              <strong style={styles.messageStrong}>{msg.username}</strong>
              <span style={styles.messageSpan}>{msg.content}</span>
              <small style={styles.messageSmall}>
                {new Date(msg.created_at).toLocaleTimeString()}
              </small>
            </div>
          ))}
          {typing && <div style={styles.typingIndicator}>{typing} is typing...</div>}
        </div>
        <form onSubmit={sendMessage} style={styles.form}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyUp={handleTyping}
            placeholder="Type a message..."
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatWindow;