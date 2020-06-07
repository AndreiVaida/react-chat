import React, { useState } from 'react';
import './App.css';
import Chat from "./react-chat/Chat";
import ChatUser from "./react-chat/ChatUser";
import * as Rx from "rxjs"
import ListAction from "./react-chat/ListAction";

function App() {
  const chatUser = new ChatUser("Andrei", null, true);
  let dummyObserver;
  const dummyMessagesSource = Rx.Observable.create(observer => {
    dummyObserver = observer;
  });

  const [dummyMessage, setDummyMessage] = useState("");

  const sendDummyMessage = () => {
    const otherUser = new ChatUser("Mihai");
    const chatMessage = {message: dummyMessage, user: otherUser};

    if (dummyMessage.startsWith("-")) {
      // simulate data loading from server
      const dummyChatMessageList = [chatMessage, chatMessage, chatMessage];
      dummyObserver.next({listAction: ListAction.PREPEND, data: dummyChatMessageList});
    }
    else {
      // simulate received a message
      dummyObserver.next({listAction: ListAction.APPEND, data: chatMessage});
    }
  }

  const handleDummyKeyDown = (e) => {
    if (e.key === 'Enter' && dummyMessage.trim().length > 0) {
      sendDummyMessage();
      setDummyMessage("");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {/*<Chat inputMessageLabel={"Mesaj:"} inputPlaceholder={"Scrie ceva..."} sendButtonText={"Trimite"} messagesSource={dummyMessagesSource} otherUserStyleClass={"bg-danger chatMessage-Left"} />*/}
        {Chat(dummyMessagesSource, chatUser)}

        <div style={{position: "absolute", bottom: "20px", left: "20px", fontSize: "15px"}}>
          <input type={"text"} placeholder={"Write here a message to send to the chat"} style={{width: "300px"}}
                 value={dummyMessage}
                 onKeyDown={handleDummyKeyDown}
                 onChange={e => setDummyMessage(e.target.value)}/>
        </div>
      </header>
    </div>
  );
}

export default App;
