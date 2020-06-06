import React from "react";
import MessageList from "./MessageList";
import ChatUser from "./ChatUser";
import "./ChatStyle.css"

class Chat extends React.Component {
  constructor(props) {
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
      <div className={"chatContainer"}>
        {/* Message List */}
        {MessageList(this.state.messages, this.props.emptyListMessage, this.props.chatUserStyleClass, this.props.otherUserStyleClass)}

        {/* Input and Send a Message */}
        <div className={"inputBarAndSendButtonContainer"}>
          <label className={"inputBarContainer"}>
            {this.props.inputMessageLabel}
            <input type="text" name="name"
                   value={this.state.inputMessage}
                   placeholder={this.props.inputPlaceholder}
                   onChange={e => this.setState({inputMessage: e.target.value})}
                   onKeyDown={this.handleKeyDown}
                   className={"inputBar"}
            />
          </label>
          <input type="submit" value={this.props.sendButtonText} onClick={this.onSend} className={"sendButton"}/>
        </div>
      </div>
    );
  }
}




export default Chat;