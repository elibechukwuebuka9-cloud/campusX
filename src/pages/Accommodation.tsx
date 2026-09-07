import { useState } from "react";
import { Link } from "react-router-dom";
import "./Accommodation.css";

export type Accommodation = {
  id: number;
  name: string;
  location: string;
  distance: string;
  type: string;
  price: number;
  image: string;
  description: string;
  features: string[];
  availability: "On Campus" | "Off Campus";
};

export const accommodations: Accommodation[] = [
  {
    id: 1,
    name: "Campus View Lodge",
    location: "Near Main Campus",
    distance: "0.5 km from campus",
    type: "Single Room",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
    description:
      "Affordable student accommodation located close to campus with a comfortable and secure environment.",
    features: ["Wi-Fi", "Water", "Security", "Power"],
    availability: "Off Campus",
  },

  {
    id: 2,
    name: "University Hostel",
    location: "Student Residential Area",
    distance: "0.2 km from campus",
    type: "Shared Room",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
    description:
      "Student-friendly shared accommodation with easy access to lecture halls and campus facilities.",
    features: ["Wi-Fi", "Water", "Security"],
    availability: "On Campus",
  },

  {
    id: 3,
    name: "Student Haven Apartments",
    location: "University Road",
    distance: "1.0 km from campus",
    type: "Self Contained",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    description:
      "Modern student apartment with privacy, comfort and convenient access to campus.",
    features: ["Wi-Fi", "Kitchen", "Water", "Security"],
    availability: "Off Campus",
  },

  {
    id: 4,
    name: "Campus Heights",
    location: "North Campus",
    distance: "0.3 km from campus",
    type: "Single Room",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1000&q=80",
    description:
      "Comfortable accommodation designed for students who want to stay close to campus.",
    features: ["Water", "Security", "Power", "Wi-Fi"],
    availability: "On Campus",
  },
];

function Accommodation() {
  const [search, setSearch] = useState("");
  const [roomType, setRoomType] = useState("All");
  const [locationType, setLocationType] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredAccommodations = accommodations.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(search.toLowerCase()) ||
      place.location.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      roomType === "All" || place.type === roomType;

    const matchesLocation =
      locationType === "All" ||
      place.availability === locationType;

    const matchesPrice =
      maxPrice === "" || place.price <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesType &&
      matchesLocation &&
      matchesPrice
    );
  });

  return (
    <div className="accommodation-page">
      <div className="accommodation-header">
        <h1>Student Accommodation</h1>

        <p>
          Find affordable and comfortable accommodation close to campus.
        </p>
      </div>

      {/* FILTERS */}
      <div className="accommodation-filters">
        <input
          type="text"
          placeholder="Search accommodation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        >
          <option value="All">All Room Types</option>
          <option value="Single Room">Single Room</option>
          <option value="Shared Room">Shared Room</option>
          <option value="Self Contained">Self Contained</option>
        </select>

        <select
          value={locationType}
          onChange={(e) => setLocationType(e.target.value)}
        >
          <option value="All">All Locations</option>
          <option value="On Campus">On Campus</option>
          <option value="Off Campus">Off Campus</option>
        </select>

        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* ACCOMMODATION GRID */}
      <div className="accommodation-grid">
        {filteredAccommodations.length === 0 ? (
          <div className="no-results">
            <h2>No accommodation found</h2>
            <p>Try changing your search or filters.</p>
          </div>
        ) : (
          filteredAccommodations.map((place) => (
            <div className="accommodation-card" key={place.id}>
              <div className="accommodation-image-wrapper">
                <img
                  src={place.image}
                  alt={place.name}
                  className="accommodation-image"
                />

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

              <div className="accommodation-content">
                <h2>{place.name}</h2>

                <p className="accommodation-location">
                  📍 {place.location}
                </p>

                <p className="accommodation-distance">
                  {place.distance}
                </p>

                <p className="accommodation-description">
                  {place.description}
                </p>

                <div className="feature-list">
                  {place.features.map((feature) => (
                    <span key={feature}>
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="accommodation-bottom">
                  <div className="price">
                    <strong>${place.price}</strong>
                    <span>/month</span>
                  </div>

                  <Link
                    to={`/accommodation/${place.id}`}
                    className="details-button"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Accommodation;