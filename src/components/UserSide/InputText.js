// import React, { useState } from "react";

// const styles = {
//   button: {
//     width: "20%", // Adjusted width
//     height: 50,
//     fontWeight: "bold",
//     borderRadius: 10,
//     fontSize: 18,
//     backgroundColor: "#34b7f1",
//     borderWidth: 0,
//     color: "#fff",
//   },

//   textarea: {
//     width: "60%",
//     height: 50,
//     borderRadius: 10,
//     borderWidth: 0,
//     padding: "10px", // Added units for better spacing
//     fontSize: 18,
//   },

//   textContainer: {
//     display: "flex",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//   },
// };

// function InputText({ addMessage,setMessage }) {

//   return (
//     <div style={styles.textContainer}>
//       <textarea
//         style={styles.textarea}
//         rows={6}
//         placeholder="Write Something..."
//         onChange={(e) => setMessage(e.target.value)}
//       ></textarea>
//       <button style={styles.button} onClick={addMessage}>
//         Enter
//       </button>
//     </div>
//   );
// }

// export default InputText;

//Chat-gpt

import React, { useState } from "react";

const styles = {
  button: {
    width: "20%",
    height: 50,
    fontWeight: "bold",
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: "#34b7f1",
    borderWidth: 0,
    color: "#fff",
  },

  textarea: {
    width: "70%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0,
    padding: "10px",
    fontSize: 18,
  },

  textContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
};

function InputText({ addMessage, setMessage, message }) {
  const handleMessageSend = () => {
    addMessage();
    setMessage(""); // Clear the message input field
  };

  return (
    <div style={styles.textContainer}>
      <textarea
        style={styles.textarea}
        rows={6}
        placeholder="Write Something..."
        value={message} // Bind the value of the textarea to the message state
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button style={styles.button} onClick={handleMessageSend}>
        Enter
      </button>
    </div>
  );
}

export default InputText;


// import React, { useState } from "react";
// import axiosInstance from "../../api/axiosInstance";

// const styles = {
//   button: {
//     width: "20%", // Adjusted width
//     height: 50,
//     fontWeight: "bold",
//     borderRadius: 10,
//     fontSize: 18,
//     backgroundColor: "#34b7f1",
//     borderWidth: 0,
//     color: "#fff",
//   },

//   textarea: {
//     width: "60%",
//     height: 50,
//     borderRadius: 10,
//     borderWidth: 0,
//     padding: "10px", // Added units for better spacing
//     fontSize: 18,
//   },

//   textContainer: {
//     display: "flex",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//   },
// };

// function InputText({ addMessage, bookingId, userId, vendorId, chats, setChats}) {
//   const [message, setMessage] = useState("");
//   const [text, setText] = useState("");
//   const currentUser = localStorage.getItem("user");


//   // function addAMessage() {
//   //   addMessage({
//   //     message,
//   //   });
//   //   sendMessageToServer();
//   //   setMessage("");
//   // }

//   function addAMessage() {
//     addMessage({
//       text,
//     });
//     sendMessageToServer();
//     setText("");
//   }

//   async function sendMessageToServer() {
//     try {
//       console.log(text, "-----in frontend");
//       const response = await axiosInstance.post("/user/senting-message", {
//         bookingId,
//         userId,
//         vendorId,
//         message: text,
//         sender: currentUser,
//       });
//       console.log(response,"-----------response");
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div style={styles.textContainer}>
//       <textarea
//         style={styles.textarea}
//         rows={6}
//         placeholder="Write Something..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       ></textarea>
//       <button style={styles.button} onClick={() => addAMessage()}>
//         Enter
//       </button>
//     </div>
//   );
// }

// export default InputText;
