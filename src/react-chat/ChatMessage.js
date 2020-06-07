import React from "react";
import defaultImage from "./resources/baseline_account_circle_white_48dp.png"

const ChatMessage = (message, user, dateTime) => {
  return (
    <div>
      {<img src={user.imag ?? defaultImage} className={"mr-2 float-left"} />}
      <label className={"userName mr-2 float-left"}> {user.name}: </label>
      <label>{message}</label>
    </div>
  )
}

export default ChatMessage;