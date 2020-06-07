import React, { useState } from "react";
import ChatUser from "./ChatUser";
import ListAction from "./ListAction";

const ChatInput = (updateMessages,
                   chatUser = new ChatUser("Me", null, true),
                   inputMessageLabel = "",
                   inputPlaceholder = "Write your message...",
                   sendButtonText = "Send",
                   sendButtonStyleClass = "btn-primary") => {

  const [inputMessage, setInputMessage] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSend();
    }
  }

  const onSend = () => {
    if (inputMessage.trim().length === 0) {
      return;
    }

    const chatMessage = {
      message: inputMessage,
      user: chatUser,
      dateTime: Date.now(),
    };
    addMessage(chatMessage);
    setInputMessage("");
  }

  const addMessage = (chatMessage) => {
    updateMessages({listAction: ListAction.APPEND, data: chatMessage});
  }

  return (
    <div className={"inputBarAndSendButtonContainer"}>
      {inputMessageLabel}
      <input type="text" name="name"
             value={inputMessage}
             placeholder={inputPlaceholder}
             onChange={e => setInputMessage(e.target.value)}
             onKeyDown={handleKeyDown}
             className={"inputBar"}
      />
      <input type="submit" value={sendButtonText} onClick={onSend} className={`sendButton ${sendButtonStyleClass}`}/>
    </div>
  );
}

export default ChatInput;