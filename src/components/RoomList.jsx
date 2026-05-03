// src/components/RoomList.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../api';
import NavBar from './NavBar';
import "../style/RoomList.css"

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();  // user is already from context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get('/rooms');
        setRooms(res.data);
      } catch (err) {
        console.error('Failed to load rooms', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const joinRoom = (roomId, roomName) => {
    navigate(`/chat/${roomId}`, { state: { roomName } });
  };

  if (loading) return <div className="loading">Loading rooms...</div>;

  return (
    <>
      <NavBar />
      <div className="room-list-container">
        <h2>Welcome, {user?.username}!</h2>
        <div className="rooms-grid">
          {rooms.map(room => (
            <div key={room.id} className="room-card">
              <span className="room-name"># {room.room_name}</span>
              <button onClick={() => joinRoom(room.id, room.room_name)}>
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RoomList;