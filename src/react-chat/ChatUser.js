export default class ChatUser {
  constructor(name, image, isTheChatUser = false) {
    this.name = name;
    this.image = image;
    this.isTheChatUser = isTheChatUser;
  }
}