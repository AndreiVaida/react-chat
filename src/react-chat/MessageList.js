import React from "react";
import { ListGroup } from "react-bootstrap";
import ChatMessage from "./ChatMessage";
import ListGroupItem from "react-bootstrap/ListGroupItem";

/**
 * @param messages is a list of objects like this:
 *    {
 *      message: string,
 *      user: ChatUser,
 *      dateTime: Date (optional)
 *    }
 * @param emptyListMessage: string (optional)
 * @param chatUserStyleClass: string (optional)
 * @param otherUserStyleClass: string (optional)
 */
const MessageList = (messages,
                     emptyListMessage = "No messages",
                     chatUserStyleClass = "bg-info",
                     otherUserStyleClass = "bg-success") => {
  return (
    <ListGroup>
      {
        messages.length > 0 ?
          messages.map((chatMessage, index) =>
            <ListGroupItem className={chatMessage.user.isTheChatUser ? chatUserStyleClass : otherUserStyleClass } key={index}>
              {
                ChatMessage(chatMessage.message, chatMessage.user, chatMessage.dateTime)
              }
            </ListGroupItem>
          )
          :
          <label className={"text-muted"}> {emptyListMessage} </label>
      }
    </ListGroup>
  );
}

export default MessageList;