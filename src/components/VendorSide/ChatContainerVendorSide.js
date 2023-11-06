//ChatContainer.js

import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import ChatBoxReciever, { ChatBoxSender } from "./ChatBoxVendorSide";
import InputText from "./InputText";
import { useParams } from "react-router-dom";

function ChatContainerVendorSide() {
  let socketio = socketIOClient("http://localhost:5000");
  // let socketio = socketIOClient("https://www.car-rentals.shop");
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("vendor"));
  // const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
  const { bookingId, userId, vendorId } = useParams();

  const [messageList, setMessageList] = useState([]);
  const currentUserId = localStorage.getItem("vendorId");
  const [messageTriger, setMessageTriger] = useState(new Date());

  useEffect(() => {
    socketio.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socketio.emit("listMessages", { bookingId, userId, vendorId });

    // Listen for the "messageList" event from the server
    socketio.on("messageList", (receivedMessages) => {
      // Update the state with the received messages
      setMessageList(receivedMessages?.messages);
    });
    return () => {
      // Disconnect the socket when the component unmounts
      socketio.disconnect();
    };
  }, [messageTriger]);

  console.log(messageList, "-----------receivedMessages");

  function ChatsList() {
    return messageList?.map((chat, index) => {
      if (chat.sender === currentUserId) {

        return (
          <ChatBoxSender
            key={index}
            message={chat.text}
            // avatar={chat.avatar}
            user={chat.userName}
          />
        );
      } else {
        return (
          <ChatBoxReciever
            key={index}
            message={chat.text}
            // avatar={chat.avatar}
            user={chat.userName}
          />
        );
      }
    });
  }

  const [message, setMessage] = useState("");

  async function sendMessageToServer() {
    try {
      socketio.emit("addMessage", {
        bookingId,
        userId,
        vendorId,
        message,
        currentUserId,
      });

      // Listen for the "messageList" event from the server
      socketio.on("messageAdded", () => {
        // Update the state with the received messages
        setMessageTriger(new Date());
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div>
        <ChatsList />
        <InputText
          addMessage={sendMessageToServer}
          setMessage={setMessage}
          message={message}
        />
      </div>
    </div>
  );
}

export default ChatContainerVendorSide;

//-------------------------------------------------------------------------------------------------//
