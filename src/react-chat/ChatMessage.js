import React from "react";

const ChatMessage = (message, user, dateTime) => {
  return (
    <div>
      {user.image ? <img src={user.imag} alt={"no image"}/> : null}
      <label className={"userName mr-2"}> {user.name}: </label>
      <label>{message}</label>
    </div>
  )
}

export default ChatMessage;