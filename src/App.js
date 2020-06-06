import React from 'react';
import './App.css';
import Chat from "./react-chat/Chat";
import ChatUser from "./react-chat/ChatUser";
import * as Rx from "rxjs"

function App() {
  const chatUser = new ChatUser("Andrei", null, true);
  const messagesSource = Rx.Observable.create(function (observer) {
    generateMessages(observer);
  });

  let count = 0;
  const otherUser = new ChatUser("Mihai");
  function generateMessages(observer) {
    const chatMessage = {message: `Some message ${count++}`, user: otherUser};
    setTimeout(() => {
      observer.next(chatMessage);
      generateMessages(observer);
    }, 5000);
  }

  return (
    <div className="App">
      <header className="App-header">
        {/*<Chat inputMessageLabel={"Mesaj:"} inputPlaceholder={"Scrie ceva..."} sendButtonText={"Trimite"} messagesSource={messagesSource} otherUserStyleClass={"bg-danger chatMessage-Left"} />*/}
        <Chat chatUser={chatUser} messagesSource={messagesSource} />
      </header>
    </div>
  );
}

export default App;
