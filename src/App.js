import React from 'react';
import './App.css';
import Chat from "./react-chat/Chat";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        { Chat() }
      </header>
    </div>
  );
}

export default App;
