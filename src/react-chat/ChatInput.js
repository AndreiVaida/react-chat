import React, { useState } from "react";
import ChatUser from "./ChatUser";

const ChatInput = (updateMessages,
                   chatUser = new ChatUser("Me", null, true),
                   inputMessageLabel = "",
                   inputPlaceholder = "Write your message...",
                   sendButtonText = "Send") => {

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
    updateMessages({action: "append", data: chatMessage});
  }

  return(
    <div className={"inputBarAndSendButtonContainer"}>
      <label className={"inputBarContainer"}>
        {inputMessageLabel}
        <input type="text" name="name"
               value={inputMessage}
               placeholder={inputPlaceholder}
               onChange={e => setInputMessage(e.target.value)}
               onKeyDown={handleKeyDown}
               className={"inputBar"}
        />
      </label>
      <input type="submit" value={sendButtonText} onClick={onSend} className={"sendButton"}/>
    </div>
  );
}

export default ChatInput;