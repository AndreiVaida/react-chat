# React Customizable Chat
This is a very customizable _text message chat_ component. 
Just provide the current user & a source for incoming messages and you are good to go! 

The **`Chat`** has 2 components: the **`MessageList`** and the **`ChatInput`**, which can be used and customized separately.

- The current user's messages are placed by default on the right side and the others in the left.
- The message list, the input and the layout can be customizable as you wish through parameters and through CSS classes.
- The chat automatically scrolls to bottom when a message is added into the list.
- A message can be sent by booth pressing the **Send** button and by typing the **Enter** key.
- The chat notifies you through an observer when a message has been sent.
- The chat notifies you through an observer when the user scrolls up at the top of the chat. You can use this feature to load older messages from server.
- Messages can be added both in the beginning and at the end of the list.

## Components description:
`ChatUser`
-
Has a `name` _(string)_ and profile `image` _(image)_. 
The property `isTheChatUser` _(boolean)_ is used to position the user's messages in the left/right of the chat.
_You should have only 1 chat user._

`ChatMessage`
-
Has a `message` _(string)_, the `user` _(ChatUser)_ who wrote it, and a `dateTime`.

`MessageList`
-
Contains a list of **`messages`** _(ChatMessage[])_, an `emptyListMessage` _(string)_ which appears only when the list is empty, and the style classes for the two users: `chatUserStyleClass` and `otherUserStyleClass` _(string)_.

Only `messages` is a mandatory parameter, the others having default values.

_CSS class: `messageList`_

`ChatInput`
-
Mandatory parameters:
- `updateMessages`: Hooks Reducer for updating the message list. The reducer shall accept the following parameter: `{listAction: ListAction, data: ChatMessage}`. The `data` can also be a `ChatMessage[]`. 
- `chatUser`: the chat user. If not provided, it has a default value.
- `scrollPoint` (internal setting): used for referring the element to scroll when a chat message is added.

Optional parameters:
- `inputMessageLabel`: text to display on the left of the input
- `inputPlaceholder`, `sendButtonText`, `sendButtonStyleClass`

_CSS classes: `inputBarAndSendButtonContainer`, `inputBar`, `sendButton`_

`Chat`
-
Has all the parameters of `MessageList` and `ChatInput` and:
- `messagesSource`: RxJs Observable which provides objects like `{listAction: ListAction, data: ChatMessage}`. The `data` can also be a `ChatMessage[]`.
- `scrollObserver`: RxJs Observer which triggers when the chat is scrolled (almost) on the top _(distance <= 100 pixels)_. It sends the distance to the top.

Only `messagesSource`, `chatUser` and `scrollObserver` parameters are mandatory. 

_CSS class: `chatContainer`_

---

`ListAction` is used to **append** or **prepend** a message or messages in the chat list.

---

## Usage:
Default all parameters: 
```
{Chat(messagesSource, chatUser, scrollObserver)}
```
Example of custom parameters:
```
{Chat (messagesSource,
       chatUser,
       scrollObserver,
       "Nothing here :(",
       "This is your chat",
       "Write something nice :)",
       "bg-danger chatMessage-Left",
       "bg-warning chatMessage-Right",
       "Send me!",
       "btn-info")
     }
```

For more details, take a look at the source code (it has some docs and comments).