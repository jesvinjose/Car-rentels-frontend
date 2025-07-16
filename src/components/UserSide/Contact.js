import React, { useEffect } from "react";
import Header from "./Header";
import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const Contact = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [subject,setSubject]=useState("");
  const [message,setMessage]=useState("");


  useEffect(() => {
  

    // Ensure that the elements are present before accessing their properties
    const loading = document.querySelector(".loading");
    const errorMessage = document.querySelector(".error-message");
    const sentMessage = document.querySelector(".sent-message");

    if (loading && errorMessage && sentMessage) {
      loading.style.display = "none";
      errorMessage.style.display = "none";
      sentMessage.style.display = "none";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData={
      name:name,
      email:email,
      subject:subject,
      message:message
    }

    // Show the loading message
    document.querySelector(".loading").style.display = "block";

    try {
      const response = await axiosInstance.post("/user/submit-message", formData); // Pass formData directly

      if (response.status >= 200 && response.status < 300) {
        // If the response status is in the 200s (success), show the success message.
        document.querySelector(".sent-message").style.display = "block";
      } else {
        // If the response status is not in the 200s (error), show the error message.
        document.querySelector(".error-message").style.display = "block";
      }
    } catch (error) {
      // Handle any unexpected errors (e.g., network issues).
      document.querySelector(".error-message").style.display = "block";
    }
  };

  return (
    <div
      id="contact"
      className="paddsection"
      style={{ pt: "90px", pb: "90px" }}
    >
      <Header />
      <div
        className="about-header mt-3 justify-center flex "
        style={{
          backgroundColor: "#C2FF53", // Yellowish green
          width: "100%",
          minHeight: "10%", // Adjust the height as needed
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "50px",
        }}
      >
        <h1>Contact Us</h1>
      </div>
      <div className="container">
        <div className="contact-block1">
          <div className="row">
            <div className="col-lg-6">
              <div
                className="contact-contact"
                style={{
                  border: "1px solid black", // Add a cyan border
                  padding: "20px", // Add some padding for better appearance
                  marginBottom: "30px", // Adjust the margin as needed
                  borderRadius: "10px",
                }}
              >
                <h2 className="mb-30">GET IN TOUCH</h2>
                <ul className="contact-details">
                  <li>
                    <span>Church Road Street</span>
                  </li>
                  <li>
                    <span>Bangalore, India</span>
                  </li>
                  <li>
                    <span>+91 8547929022</span>
                  </li>
                  <li>
                    <span>car4rentalss@gmail.com</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <form
                action="forms/contact.php"
                method="post"
                role="form"
                className="php-email-form"
              >
                <div className="row gy-3">
                  <div className="col-lg-6">
                    <div className="form-group contact-block1">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        id="subject"
                        placeholder="Subject"
                        onChange={(e) => setSubject(e.target.value)}
                        value={subject}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        name="message"
                        placeholder="Message"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">
                      Your message has been sent. Thank you!
                    </div>
                  </div>
                  <div className="mt-5">
                    <button
                      onClick={handleSubmit}
                      className="btn btn-primary">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
