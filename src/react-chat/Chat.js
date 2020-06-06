import React, { useReducer, useState } from "react";
import MessageList from "./MessageList";
import ChatMessage from "./ChatMessage";
import ChatUser from "./ChatUser";
import "./ChatStyle.css"

const Chat = (chatUser = new ChatUser(0, "Me"),
              sendButtonText = "Send") => {

  const [messages, updateMessages] = useReducer(arrayReducer, []);
  const [inputMessage, setInputMessage] = useState("");

  const onSend = () => {
    const chatMessage = {
      message: inputMessage,
      user: chatUser,
      dateTime: Date.now(),
    };

    updateMessages({action: "add", chatMessage});
    setInputMessage("");
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSend();
    }
  }

  return (
    <div>
      {/* Message List */}
      {
        MessageList(messages)
      }

      {/* Input and Send a Message */}
      <label>
        Message:
        <input type="text" name="name"
               value={inputMessage}
               onChange={e => setInputMessage(e.target.value)}
               onKeyDown={handleKeyDown}
        />
      </label>
      <input type="submit" value={sendButtonText} onClick={onSend}/>
    </div>
  );
}

const arrayReducer = (array, {action, chatMessage}) => {
  switch (action) {
    case "add":
      return [...array, chatMessage];
    case "prepend":
      return [chatMessage, ...array];
    default:
      console.error("Invalid action in arrayReducer");
      return array;
  }
}

export default Chat;