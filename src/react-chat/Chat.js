import React from "react";
import MessageList from "./MessageList";
import ChatUser from "./ChatUser";
import "./ChatStyle.css"

class Chat extends React.Component {
  constructor(props,
              chatUser = new ChatUser(0, "Me"),
              messagesSource,
              inputMessageLabel = "",
              inputPlaceholder = "Write a message...",
              sendButtonText = "Send") {
    super(props);

    this.state = {
      messages: [],
      inputMessage: "",
    };

    props.messagesSource.subscribe({
      next: chatMessage => this.addMessage(chatMessage),
      error: err => alert(`Something wrong occurred: ${err}`),
      complete: () => alert('Chat is done'),
    });
  }

  onSend = () => {
    if (this.state.inputMessage.trim().length === 0) {
      return;
    }

    const chatMessage = {
      message: this.state.inputMessage,
      user: this.props.chatUser ?? new ChatUser("Me", null, true),
      dateTime: Date.now(),
    };
    this.addMessage(chatMessage);
    this.setState({inputMessage: ""});
  }

  addMessage = (chatMessage) => {
    this.setState({messages: [...this.state.messages, chatMessage]});
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onSend();
    }
  }

  render() {
    return (
      <div>
        {/* Message List */}
        {MessageList(this.state.messages)}

        {/* Input and Send a Message */}
        <label>
          {this.props.inputMessageLabel}
          <input type="text" name="name"
                 value={this.state.inputMessage}
                 placeholder={this.props.inputPlaceholder}
                 onChange={e => this.setState({inputMessage: e.target.value})}
                 onKeyDown={this.handleKeyDown}
          />
        </label>
        <input type="submit" value={this.props.sendButtonText} onClick={this.onSend}/>
      </div>
    );
  }
}




export default Chat;