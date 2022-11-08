import React from 'react'
import InputContainer from './components/InputContainer';
import MessagesContainer from './components/MessagesContainer';
import './style/styles.css'

function App() {
  return (
    <div className="layout">
      <div className="wrapper">
          <MessagesContainer />
          <InputContainer />
      </div>
    </div>
  );
}

export default App;
