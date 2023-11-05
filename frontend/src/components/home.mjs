import React, { useState, useEffect } from "react";
import "./Styles/home.css";
import { Link } from "react-router-dom";
import Header from "./header.mjs";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setEvents(data);
          console.log("Events data:", data.events);
        } else {
          console.error("Error fetching events:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <Header />
      <div className="d-none d-lg-block" id="homeBody"></div>
      <div className="container mt-5 p-5">
        <h2 className="homeBodyHeader">Welcome To ALU ALUMNI</h2>
        <div className="pbody p-5">
          <p className="p-4">
            <h4>Welcome to our Alumni Network!</h4>e are thrilled to have you
            here as part of our ever-growing community of accomplished and
            dedicated individuals. Our alumni network is more than just a
            collection of names; it's a testament to the collective achievements
            and aspirations of our graduates. Whether you're a recent graduate
            or a seasoned professional, our platform is designed to connect you
            with peers, share your experiences, and provide opportunities for
            networking and personal growth. Explore our vibrant community,
            discover inspiring success stories, and engage in insightful
            discussions. Join us in celebrating the journey of our alumni and
            the incredible impact they make in their respective fields.
            Together, we continue to foster the spirit of growth, excellence,
            and collaboration that defines our institution. Thank you for being
            a part of this incredible journey!
          </p>
        </div>
      </div>

      <div className="container">
        <h2 className="p-5">Upcoming Events</h2>

        {Array.isArray(events) ? (
          events.map((event) => (
            <div className="card event-card" key={event._id}>
              <div className="card-body">
                <h5 className="event-card-title">{event.title}</h5>
                <h6 className="event-card-subtitle">
                  Event Date: {formatDate(event.date)}{" "}
                </h6>
                <h6 className="event-card-subtitle">
                  Event Time: {event.timeFrom} - {event.timeTo}
                </h6>
                <h6 className="event-card-subtitle">
                  Event Category: {event.category}
                </h6>
                <Link to="/login" className="event-card-link">
                  Read More
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No upcoming events available.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
