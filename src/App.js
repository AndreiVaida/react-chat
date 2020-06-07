import React, { useState } from 'react';
import './App.css';
import Chat from "./react-chat/Chat";
import ChatUser from "./react-chat/ChatUser";
import * as Rx from "rxjs"
import ListAction from "./react-chat/ListAction";

function App() {
  // demo user
  const chatUser = new ChatUser("Andrei", null, true);

  // demo message generator
  let demoMessageObserver;
  const messagesSource = Rx.Observable.create(observer => {
    demoMessageObserver = observer;
  });

  // demo state for demo message input
  const [demoMessage, setDemoMessage] = useState("");

  const sendDemoMessage = (number) => {
    const otherUser = new ChatUser("Mihai");
    const chatMessage = {message: demoMessage, user: otherUser};

    if (demoMessage.startsWith("-")) {
      // simulate data loading from server
      const dummyChatMessageList = [chatMessage, chatMessage, chatMessage];
      demoMessageObserver.next({listAction: ListAction.PREPEND, data: dummyChatMessageList});
    } else if (Number.isInteger(number)) {
      // simulate data loading from server
      chatMessage.message = number;
      demoMessageObserver.next({listAction: ListAction.PREPEND, data: chatMessage});
    } else {
      // simulate received a message
      demoMessageObserver.next({listAction: ListAction.APPEND, data: chatMessage});
    }
  }

  // provide an observer if you want to be notified when the user scrolls up at the top of the chat (e.g. if you want to load older messages)
  let scrollObserver;
  const scrollObservable = Rx.Observable.create(observer => {
    scrollObserver = observer;
  });
  let throttling = false;
  scrollObservable.subscribe({
    next: (distanceToTop) => {
      if (distanceToTop === 0 && !throttling) {
        sendDemoMessage(distanceToTop);
        throttling = true;
      }
      if (distanceToTop > 0) {
        throttling = false;
      }
    }
  });

  const handleDemoKeyDown = (e) => {
    if (e.key === 'Enter' && demoMessage.trim().length > 0) {
      sendDemoMessage();
      setDemoMessage("");
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        {/* Using the chat is very simple: just add a line */}
        {Chat(messagesSource, chatUser, scrollObserver)}
        {/* Or you can customize like this: */}
        {/*{Chat (messagesSource,*/}
        {/*  chatUser,*/}
        {/*  scrollObserver,*/}
        {/*  "Nothing here :(",*/}
        {/*  "This is your chat",*/}
        {/*  "Write something nice :)",*/}
        {/*  "bg-danger chatMessage-Left",*/}
        {/*  "bg-warning chatMessage-Right",*/}
        {/*  "Send me!",*/}
        {/*  "btn-info")*/}
        {/*}*/}

        {/* Demo message input */}
        <div style={{position: "absolute", bottom: "20px", left: "20px", fontSize: "15px"}}>
          <input type={"text"} placeholder={"Simulates sending a message from the server"} style={{width: "300px"}}
                 value={demoMessage}
                 onKeyDown={handleDemoKeyDown}
                 onChange={e => setDemoMessage(e.target.value)}/>
        </div>
      </header>
    </div>
  );
}

export default App;
