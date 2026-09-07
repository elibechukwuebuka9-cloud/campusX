import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { accommodations } from "./Accommodation";
import "./AccommodationDetails.css";

function AccommodationDetails() {
  const { id } = useParams();

  const place = accommodations.find(
    (item) => item.id === Number(id)
  );

  const [showContact, setShowContact] = useState(false);
  const [showRequest, setShowRequest] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);

  if (!place) {
    return (
      <div className="accommodation-details-page">
        <div className="details-not-found">
          <h1>Accommodation Not Found</h1>

          <p>
            The accommodation you are looking for does not exist.
          </p>

          <Link
            to="/accommodation"
            className="back-button"
          >
            Back to Accommodation
          </Link>
        </div>
      </div>
    );
  }

  const openContact = () => {
    setShowContact(true);
    setShowRequest(false);
    setSubmitted(false);
  };

  const openRequest = () => {
    setShowRequest(true);
    setShowContact(false);
    setSubmitted(false);
  };

  const closeForm = () => {
    setShowContact(false);
    setShowRequest(false);
    setSubmitted(false);
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/accommodation-requests",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            phone,
            accommodation: place.name,
            message,

            type: showContact
              ? "Contact Provider"
              : "Accommodation Request",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="accommodation-details-page">

      {/* BACK BUTTON */}
      <Link
        to="/accommodation"
        className="back-button"
      >
        ← Back to Accommodation
      </Link>

      {/* MAIN DETAILS */}
      <div className="details-container">

        {/* IMAGE */}
        <div className="details-image-section">
          <img
            src={place.image}
            alt={place.name}
            className="details-image"
          />
        </div>

        {/* INFORMATION */}
        <div className="details-info">

          <div className="details-badges">

            <span className="room-badge">
              {place.type}
            </span>

            <span
              className={
                place.availability === "On Campus"
                  ? "campus-badge on-campus"
                  : "campus-badge off-campus"
              }
            >
              {place.availability}
            </span>

          </div>

          <h1>{place.name}</h1>

          <p className="details-location">
            📍 {place.location}
          </p>

          <p className="details-distance">
            {place.distance}
          </p>

          <div className="details-price">
            <strong>${place.price}</strong>
            <span>/month</span>
          </div>

          <p className="details-description">
            {place.description}
          </p>

          {/* FEATURES */}
          <div className="details-features">

            <h2>Features</h2>

            <div className="feature-list">
              {place.features.map((feature) => (
                <span key={feature}>
                  ✓ {feature}
                </span>
              ))}
            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="details-actions">

            <button
              type="button"
              className="contact-button"
              onClick={openContact}
            >
              Contact Provider
            </button>

            <button
              type="button"
              className="request-button"
              onClick={openRequest}
            >
              Request Accommodation
            </button>

          </div>
        </div>
      </div>

      {/* CONTACT / REQUEST FORM */}
      {(showContact || showRequest) && (
        <div className="accommodation-form-container">

          <div className="accommodation-form-card">

            <button
              type="button"
              className="close-form"
              onClick={closeForm}
            >
              ×
            </button>

            <h2>
              {showContact
                ? "Contact Provider"
                : "Request Accommodation"}
            </h2>

            <p>
              {showContact
                ? `Send a message to the provider about ${place.name}.`
                : `Submit your request for ${place.name}.`}
            </p>

            {submitted ? (
              <div className="success-message">

                <h3>Request Submitted 🎉</h3>

                <p>
                  Your request has been sent successfully.
                  You will be notified when the provider responds.
                </p>

                <button
                  type="button"
                  onClick={closeForm}
                  className="request-button"
                >
                  Done
                </button>

              </div>
            ) : (
              <form onSubmit={handleSubmit}>

                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  required
                />

                <textarea
                  placeholder={
                    showContact
                      ? "Write your message..."
                      : "Add any additional information..."
                  }
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  rows={5}
                />

                <button
                  type="submit"
                  className="request-button"
                >
                  {showContact
                    ? "Send Message"
                    : "Submit Request"}
                </button>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default AccommodationDetails;