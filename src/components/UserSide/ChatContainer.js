//ChatContainer.js

import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import ChatBoxReciever, { ChatBoxSender } from "./ChatBox";
import InputText from "./InputText";
import { useParams } from "react-router-dom";

function ChatContainer({ bookingId, userId, vendorId, closeChatModal }) {
  let socketio = socketIOClient("http://localhost:5000");
  // let socketio = socketIOClient("https://www.car-rentals.shop");
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user"));
  // const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
  // const { bookingId, userId, vendorId } = useParams();

  const [messageList, setMessageList] = useState([]);
  const currentUserId = localStorage.getItem("userId");
  const [messageTriger, setMessageTriger] = useState(new Date());

  useEffect(() => {
    socketio.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socketio.emit("listMessages", { bookingId });

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

    const chatListStyles = {
      maxHeight: "300px",
      overflowY: "auto",
    };

    const chatContainerRef = useRef(null);

    // Scroll to the bottom of the chat container when the component mounts or when new messages arrive
    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }, [messageList]);
    return (
      <div
        style={chatListStyles} ref={chatContainerRef}
      >
        {messageList?.map((chat, index) => {
          if (chat.sender === currentUserId) {
            return (
              <ChatBoxSender
                key={index}
                message={chat.text}
                // avatar={chat.avatar}
                user={chat.userName}
                timestamp={chat.timestamp}
              />
            );
          } else {
            return (
              <ChatBoxReciever
                key={index}
                message={chat.text}
                // avatar={chat.avatar}
                user={chat.userName}
                timestamp={chat.timestamp}
              />
            );
          }
        })}
      </div>
    );
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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md max-w-xl border-red-500">
        <button
          onClick={closeChatModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-600"
        >
          Close
        </button>
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

export default ChatContainer;
