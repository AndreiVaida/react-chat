import React, { useReducer, useRef } from "react";
import MessageList from "./MessageList";
import "./ChatStyle.css"
import "./ScrollbarStyle.css"
import ChatInput from "./ChatInput";
import ListAction from "./ListAction";
import * as Rx from "rxjs";

const Chat = (messagesSource,
              chatUser,
              emptyListMessage = undefined,
              chatUserStyleClass = undefined,
              otherUserStyleClass = undefined,
              sendButtonStyleClass = undefined) => {

  const [messages, updateMessages] = useReducer(arrayReducer, []);
  const scrollPoint = useRef(null)

  messagesSource.subscribe({
    next: ({listAction, data}) => updateMessages({listAction: listAction, data: data}),
    error: err => alert(`Something wrong occurred: ${err}`),
    complete: () => alert('Chat is done'),
  });

  messageActionsSource.subscribe({
    next: (listAction) => {
      if (listAction === ListAction.APPEND) {
        scrollToBottom();
      }
    }
  });

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollPoint.current.scrollIntoView({ behavior: "smooth" })
    }, 10);
  }

  return (
    <div className={"chatContainer scrollable scrollbar-info p-2"}>
      { MessageList(messages, emptyListMessage, chatUserStyleClass, otherUserStyleClass) }
      { ChatInput(updateMessages, chatUser, scrollPoint, sendButtonStyleClass)}
    </div>
  );
}

let messageActionsObserver;
const messageActionsSource = Rx.Observable.create(observer => {
  messageActionsObserver = observer;
});

const arrayReducer = (array, {listAction, data}) => {
  messageActionsObserver.next(listAction);

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