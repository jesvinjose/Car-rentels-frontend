// import React, { useState } from "react";
// import "./ChatModal.css"; // Import the CSS file
// import axios from "axios"; // Import Axios

// const ChatModal = ({
//   isOpen,
//   onClose,
//   earlierMessages,
//   onSendMessage,
//   userId,
//   vendorId,
// }) => {
//   const [newMessage, setNewMessage] = useState("");

//   const sendMessage = async () => {
//     if (newMessage.trim() !== "") {
//       try {
//         // Make an Axios POST request to your backend to save the message
//         await axios.post("http://localhost:5000/user/messages", {
//           message: newMessage,
//           sender: userId, // Add userId as the sender
//           chatUsers: [userId, vendorId], // Include both userId and vendorId in chatUsers
//         });

//         // Call the onSendMessage function to display the message in the chat window
//         onSendMessage(newMessage);

//         // Clear the new message input field
//         setNewMessage("");
//       } catch (error) {
//         console.error("Error sending message:", error);
//         // Handle errors here (e.g., show an error message to the user)
//       }
//     }
//   };

//   return (

//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg w-1/2">
//         <h2>Chat</h2>

//         {/* Chat messages go here */}
//         <div className="chat-messages">
//           {earlierMessages.map((message, index) => (
//             <div className="message" key={index}>
//               <div className="sender">{message.sender}:</div>
//               <div className="text">{message.text}</div>
//             </div>
//           ))}
//         </div>

//         {/* Chat input field */}
//         <div className="chat-input">
//           <input
//             type="text"
//             placeholder="Type your message..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>

//         {/* Close button within the modal */}
//         <button
//           onClick={onClose}
//           className="w-full mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatModal;

// {/* <div className={`chat-modal ${isOpen ? "open" : "closed"}`}>
// <div className="chat-modal-content">
//   <button className="close-button" onClick={onClose}>
//     Close
//   </button>
//   <div className="chat-messages">
//     {earlierMessages.map((message, index) => (
//       <div className="message" key={index}>
//         <div className="sender">{message.sender}:</div>
//         <div className="text">{message.text}</div>
//       </div>
//     ))}
//   </div>
//   <div className="chat-input">
//     <input
//       type="text"
//       placeholder="Type your message..."
//       value={newMessage}
//       onChange={(e) => setNewMessage(e.target.value)}
//     />
//     <button onClick={sendMessage}>Send</button>
//   </div>
// </div>
// </div> */}

//ChatContainer.js

import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import ChatBoxReciever, { ChatBoxSender } from "./ChatBox";
import InputText from "./InputText";
import { useParams } from "react-router-dom";

function ChatContainer() {
  let socketio = socketIOClient("http://localhost:5000");
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user"));
  // const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
  const { bookingId, userId, vendorId } = useParams();
  console.log(bookingId, "-------bookingId");
  console.log(userId, "--------userId");
  console.log(vendorId, "----vendorId");
  useEffect(() => {
    // Emit "joinChat" event with the bookingId, userId, and vendorId
    socketio.emit("joinChat", bookingId, userId, vendorId);

    socketio.on("chat", (senderChats) => {
      setChats(senderChats);
    });
  });

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

export default ChatContainer;
