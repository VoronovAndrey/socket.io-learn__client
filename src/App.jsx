import React, { useEffect, useState } from 'react'
import InputContainer from './components/InputContainer';
import MessagesContainer from './components/MessagesContainer';
import './style/styles.css'

import { io } from 'socket.io-client'
const socket = io('http://192.168.1.33:3001')



function App() {
  const [messages, setMessages] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    socket.on("connect", () => {
      // console.log(socket.id);
      setUser(socket.id)
    });
    socket.on("disconnect", (reason) => {
      // ...
      console.log("disconnect", reason);
    });
    
    socket.on('recive_message', data => {
      console.log('recive_message useefect', data);
      setMessages(prev => [...prev, data])
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('recive_message')
    }
  }, []);
  return (
    <div className="layout">
      <div className="wrapper">
        <MessagesContainer 
          messages={messages}
          user={user}
        />
        <InputContainer
          socket={socket}
          user={user}
        />
      </div>
    </div>
  );
}

export default App;
