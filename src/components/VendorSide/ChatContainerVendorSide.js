//ChatContainer.js

import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import ChatBoxReciever, { ChatBoxSender } from "./ChatBoxVendorSide";
import InputText from "./InputText";
import { useParams } from "react-router-dom";

function ChatContainerVendorSide() {
  // let socketio = socketIOClient("http://localhost:5000");
  let socketio = socketIOClient("https://www.car-rentals.shop");
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("vendor"));
  // const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
  const {bookingId, userId,vendorId}=useParams();

  useEffect(() => {
    // Emit "joinChat" event with the bookingId, userId, and vendorId
    socketio.emit("joinChat", bookingId, userId, vendorId);
    
    socketio.on("chat", (senderChats) => {
      setChats(senderChats);
    });
  });

  console.log(bookingId,"-------bookingId");
  console.log(userId,'--------userId');
  console.log(vendorId,'----vendorId');

  function sendChatToSocket(chat) {
    socketio.emit("chat", chat);
  }

  function addMessage(chat) {
    const newChat = { ...chat, user };
    setChats([...chats, newChat]);
    sendChatToSocket([...chats, newChat]);
  }


  function ChatsList() {
    return chats.map((chat, index) => {
      if (chat.user === user)
        return (
          <ChatBoxSender
            key={index}
            message={chat.message}
            // avatar={chat.avatar}
            user={chat.user}
          />
        );
      return (
        <ChatBoxReciever
          key={index}
          message={chat.message}
          // avatar={chat.avatar}
          user={chat.user}
        />
      );
    });
  }

  return (
    <div>
      <div>
        <ChatsList />
        <InputText addMessage={addMessage} />
      </div>
    </div>
  );
}

export default ChatContainerVendorSide;
