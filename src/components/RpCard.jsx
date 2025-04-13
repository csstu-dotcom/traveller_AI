"use client"

import { useState } from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
// import "bootstrap/dist/css/bootstrap.min.css"
import { FaStar, FaMapMarkerAlt, FaPhone, FaGlobe, FaEnvelope, FaUtensils, FaClock } from "react-icons/fa"

const TripDetails = ({ tripDetails, place }) => {
  const [activeTab, setActiveTab] = useState("info")

  if (!tripDetails || tripDetails.length === 0) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info">No recommended places found.</div>
      </div>
    )
  }

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}:${mins.toString().padStart(2, "0")}`
  }

  const getOpeningHours = (hours) => {
    if (!hours || !hours.week_ranges) return "Hours not available"

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days.map((day, index) => {
      const dayRanges = hours.week_ranges[index]
      if (!dayRanges || dayRanges.length === 0) return `${day}: Closed`

      const timeRanges = dayRanges
        .map((range) => `${formatTime(range.open_time)} - ${formatTime(range.close_time)}`)
        .join(", ")

      return `${day}: ${timeRanges}`
    })
  }

  return (
    <section className="trip-details py-5">
      <div className="container">
        <h2 className="text-start mb-4 fw-bold">Recommended {place}</h2>
          {tripDetails.map((place, index) => (
            
            
            <div key={index} className="card-contiainer mb-4">
              <div className="card shadow h-100 row">
                <div className="col-md-6 card-header bg-white p-0">
                  <Carousel showThumbs={false} autoPlay infiniteLoop interval={5000} showStatus={false}>
                    {place.photo ? (
                      <div>
                        <img
                          src={place.photo.images.large.url || "/placeholder.svg"}
                          alt={place.name}
                          className="img-fluid rounded-top"
                          style={{ height: "300px", objectFit: "cover" }}
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          src="https://via.placeholder.com/800x300?text=No+Image+Available"
                          alt="No Image"
                          className="img-fluid rounded-top"
                          style={{ height: "300px", objectFit: "cover" }}
                        />
                      </div>
                    )}
                  </Carousel>
                </div>

                <div className="col-md-6 card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h3 className="card-title h4 mb-0">{place.name}</h3>
                    <span className="badge bg-primary rounded-pill px-3 py-2">{place.price_level || "Price N/A"}</span>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3">
                      <span className="badge bg-success rounded-pill px-3 py-2 d-flex align-items-center">
                        <FaStar className="me-1" /> {place.rating || "N/A"}
                      </span>
                    </div>
                    <span className="text-muted">({place.num_reviews || 0} reviews)</span>
                    {place.ranking && <span className="ms-3 text-success fw-bold small">{place.ranking}</span>}
                  </div>

                  <p className="card-text">{place.description || "No description available."}</p>

                  <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "info" ? "active" : ""}`}
                        onClick={() => setActiveTab("info")}
                      >
                        Info
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "map" ? "active" : ""}`}
                        onClick={() => setActiveTab("map")}
                      >
                        Map
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "hours" ? "active" : ""}`}
                        onClick={() => setActiveTab("hours")}
                      >
                        Hours
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div className={`tab-pane fade ${activeTab === "info" ? "show active" : ""}`}>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex">
                          <FaMapMarkerAlt className="me-2 mt-1 text-secondary" />
                          <div>{place.address || "Address not available"}</div>
                        </li>
                        {place.phone && (
                          <li className="list-group-item d-flex">
                            <FaPhone className="me-2 mt-1 text-secondary" />
                            <div>{place.phone}</div>
                          </li>
                        )}
                        {place.website && (
                          <li className="list-group-item d-flex">
                            <FaGlobe className="me-2 mt-1 text-secondary" />
                            <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-truncate">
                              {place.website}
                            </a>
                          </li>
                        )}
                        {place.email && (
                          <li className="list-group-item d-flex">
                            <FaEnvelope className="me-2 mt-1 text-secondary" />
                            <a href={`mailto:${place.email}`}>{place.email}</a>
                          </li>
                        )}
                        {place.cuisine && place.cuisine.length > 0 && (
                          <li className="list-group-item d-flex">
                            <FaUtensils className="me-2 mt-1 text-secondary" />
                            <div>{place.cuisine.map((c) => c.name).join(", ")}</div>
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className={`tab-pane fade ${activeTab === "map" ? "show active" : ""}`}>
                      {import.meta.env && import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
                        <iframe
                          title="Google Map"
                          width="100%"
                          height="250"
                          frameBorder="0"
                          style={{ border: 0 }}
                          src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(
                            place.address || `${place.name}, ${place.location_string}`,
                          )}`}
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <div className="p-3 bg-light text-center rounded">
                          <p className="mb-0">
                            <FaMapMarkerAlt className="me-2" />
                            Map view requires Google Maps API key
                          </p>
                          <p className="small text-muted mt-2 mb-0">
                            Location: {place.latitude}, {place.longitude}
                          </p>
                          {place.address && <p className="small mt-2 mb-0">{place.address}</p>}
                        </div>
                      )}
                    </div>

                    <div className={`tab-pane fade ${activeTab === "hours" ? "show active" : ""}`}>
                      {place.hours ? (
                        <ul className="list-group list-group-flush">
                          {getOpeningHours(place.hours).map((hourText, idx) => (
                            <li key={idx} className="list-group-item d-flex">
                              <FaClock className="me-2 mt-1 text-secondary" />
                              <div>{hourText}</div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted">Hours information not available</p>
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    {place.price && <span className="text-muted">Price: {place.price}</span>}
                   
                  </div>
                </div>

              </div>
           
        </div>
          ))}
      </div>
    </section>
  )
}

export default TripDetails

