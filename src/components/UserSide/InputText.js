//Chat-gpt

import React from "react";

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
