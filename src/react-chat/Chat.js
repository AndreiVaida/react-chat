import React, { useReducer } from "react";
import MessageList from "./MessageList";
import "./ChatStyle.css"
import "./ScrollbarStyle.css"
import ChatInput from "./ChatInput";
import ListAction from "./ListAction";

const Chat = (messagesSource,
              chatUser,
              emptyListMessage = undefined,
              chatUserStyleClass = undefined,
              otherUserStyleClass = undefined,
              sendButtonStyleClass = undefined) => {
  const [messages, updateMessages] = useReducer(arrayReducer, []);

  messagesSource.subscribe({
    next: ({listAction, data}) => {
      console.log(data);
      updateMessages({listAction: listAction, data: data})
    },
    error: err => alert(`Something wrong occurred: ${err}`),
    complete: () => alert('Chat is done'),
  });

  return (
    <div className={"chatContainer scrollable scrollbar-info p-2"}>
      { MessageList(messages, emptyListMessage, chatUserStyleClass, otherUserStyleClass) }
      { ChatInput(updateMessages, chatUser, sendButtonStyleClass)}
    </div>
  );
}

const arrayReducer = (array, {listAction, data}) => {
  switch (listAction) {

    case ListAction.APPEND:
      if (isIterable(data))
        return [...array, ...data]
      else
        return [...array, data];

    case ListAction.PREPEND:
      if (isIterable(data))
        return [...data, ...array]
      else
        return [data, ...array];

    default:
      console.error("Invalid action in arrayReducer");
      return array;
  }
}

const isIterable = (value) => {
  return Symbol.iterator in Object(value);
}

export default Chat;