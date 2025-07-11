import { useState } from "react";
import useSocket from "../../hooks/useSocket";
import useUser from "../../hooks/useUser";
import { Link } from "react-router-dom";

export default function Room() {
  const [room, setRoom] = useState('');
  const socket = useSocket();
  const {user,setUser} = useUser()
  const joinRoom = async () => {
    if(room === 'global') return
    const roomName = room == '' ? 'global' : room
    setUser({...user,room:roomName})
    fetch('https://chat-app-backend-1-v7ey.onrender.com/api/user/me',{
        method:'PATCH',
        body:JSON.stringify({room}),
        headers:{
            'content-type':'application/json',
            'authorization':localStorage.getItem('token')
        }
    }).then(res=>res.json()).then(data=>console.log(data)).catch(err=>console.log(err))
    socket.emit("join-room",room);
  };
  return (
    <>
      <div>
        <input
          type="text"
          name="room"
          value={room}
          placeholder="Room..."
          onChange={e=>setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Join</button>
      </div>
      <Link to={'/chat'}>Chat</Link>
    </>
  );
}
