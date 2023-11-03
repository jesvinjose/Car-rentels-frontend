import React from 'react';
import Header from './Header';

const AboutPage = () => {
  return (
    <div className="about-page">
      <Header/>
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
        }}
      >
        <h1>About Us</h1>
      </div>
      <div className="about-content">
        <div className="vision-section">
          <h2>Our Vision</h2>
          <p>
            Our vision at car--rentals is simple yet powerful: to empower travelers to explore the world on their terms. We believe that everyone should have the freedom to travel, experience new places, and create lasting memories. Our commitment is to make this vision a reality by providing high-quality, reliable, and affordable car rental solutions.
          </p>
        </div>
        <div className="journey-section">
          <h2>Our Journey</h2>
          <p>
            Our journey began in 2020 with a small fleet of vehicles and a big dream. We saw the need for a car rental service that caters to both leisure and business travelers, offering convenience and flexibility. Over the years, we have worked tirelessly to grow and evolve, and we are proud of how far we've come.
          </p>
          <p>
            As a customer-focused company, we have constantly strived to improve our services and expand our reach. Here are some key milestones from our journey:
          </p>
          <ul>
            <li>
              <strong>Foundation:</strong> car--rentals was founded by a group of passionate individuals who shared a common goal: to simplify the process of renting a car and make it accessible to all.
            </li>
            <li>
              <strong>Initial Growth:</strong> We started with a handful of vehicles in one
              location:- Bangalore. Word of mouth, satisfied customers, and our dedication
              to service helped us grow steadily.
            </li>
            <li>
              <strong>Expanding Our Fleet:</strong> We expanded our fleet to include a diverse
              range of vehicles, from compact cars to spacious SUVs, to cater to
              different travel needs.
            </li>
            <li>
              <strong>Customer-Centric Approach:</strong> Our commitment to providing excellent
              customer service became the cornerstone of our success. We
              listened to our customers' feedback and continually improved our
              services based on their input.
            </li>
            <li>
              <strong>Online Presence:</strong> We launched our user-friendly website to make it
              even easier for travelers to book a car at their convenience. This
              marked a significant step toward modernizing the car rental
              industry.
            </li>
            <li>
              <strong>Partnerships:</strong> We forged partnerships with other businesses in the
              travel and hospitality industry, enabling us to offer exclusive
              deals and a seamless travel experience.
            </li>
            <li>
              <strong>Expansion:</strong> With the support of our valued customers, we expanded
              our services to cover a broader geographical area, ensuring that
              more people have access to our convenient car rentals.
            </li>
          </ul>
          <p>
            Our commitment to providing excellent customer service became the
            cornerstone of our success. We listened to our customers' feedback
            and continually improved our services based on their input.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

