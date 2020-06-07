import React, { useReducer } from "react";
import MessageList from "./MessageList";
import "./ChatStyle.css"
import ChatInput from "./ChatInput";

const Chat = (messagesSource,
              chatUser,
              emptyListMessage = undefined,
              chatUserStyleClass = undefined,
              otherUserStyleClass = undefined) => {
  const [messages, updateMessages] = useReducer(arrayReducer, []);

  messagesSource.subscribe({
    next: chatMessage => updateMessages({action: "append", data: chatMessage}),
    error: err => alert(`Something wrong occurred: ${err}`),
    complete: () => alert('Chat is done'),
  });

  return (
    <div className={"chatContainer"}>
      { MessageList(messages, emptyListMessage, chatUserStyleClass, otherUserStyleClass) }
      { ChatInput(updateMessages, chatUser)}
    </div>
  );
}

const arrayReducer = (array, {action, data}) => {
  console.log(`chatMessage: ${JSON.stringify(data)}`);
  switch (action) {
    case "append":
      return [...array, data];
    case "prepend":
      return [data, ...array];
    default:
      console.error("Invalid action in arrayReducer");
      return array;
  }
}

export default Chat;