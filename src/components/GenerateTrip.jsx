import React, { useEffect, useState } from "react";

import {
  FaMapMarkerAlt,
  FaBookmark,
  FaEllipsisV,
  FaVolumeMute,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import hotel from "../assets/hotel.jpg";
import { getPlacesData } from "../api/api";
import RpCard from "./RpCard";
import { AIPrompt } from "./option";

import { useLocation } from "react-router-dom";
import { chatSession } from "../AiModel";
import { useDispatch, useSelector } from "react-redux";
import { saveFormData } from "../store/formSlice";
import { s } from "motion/react-client";
import { useCookies } from "react-cookie";

function GenerateTrip() {
  const [attractionsDetails, setAttractionsDetails] = useState(null);
  const data = useSelector((state) => state.form);
  const [cookies, setCookie] = useCookies(["user"]);
  // console.log(data);
  const dispatch = useDispatch();

  const location = useLocation();

  const [hotelDetails, setHotelDetails] = useState(null);
  const [restrauntDetails, setRestrauntDetails] = useState(null);
  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(false);

  const [tripDescription, setTripDescription] = useState({});

  const FetchDetails = async () => {
    setLoading(true);

    try {
      const sw = {
        lat: data.coordinates.lat - 0.1,
        lng: data.coordinates.lng - 0.1,
      };
      const ne = {
        lat: data.coordinates.lat + 0.1,
        lng: data.coordinates.lng + 0.1,
      };

      const tripdetails = await getResponse();

      const places = await getPlacesData("restaurants", sw, ne);
      const hotels = await getPlacesData("hotels​", sw, ne);
      const attractions = await getPlacesData("attractions", sw, ne);
      setTripDescription(tripdetails);
      setRestrauntDetails(places);
      setHotelDetails(hotels);
      setAttractionsDetails(attractions);
    } catch (error) {
      console.error("Error fetching trip details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getResponse = async () => {
    try {
      const FinalPrompt = AIPrompt.replace("{location}", data.destination)
        .replace("{days}", data.days)
        .replace("{peoples}", data.people)
        .replace("{budget}", data.budget);

      console.log(FinalPrompt);

      const result = await chatSession.sendMessage(FinalPrompt);
      console.log(result.candidates);

      const rawText = result.response.candidates[0].content.parts[0].text;

      // Remove the triple backticks and `json` tag
      const jsonString = rawText.replace(/```json|```/g, "").trim();

      try {
        const parsedData = JSON.parse(jsonString);
        return parsedData; // Access your data here
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } catch (error) {
      console.error("Error fetching trip details:", error);
    }
  };

  useEffect(() => {
    if (!cookies.user) {
      // If the user is not logged in, redirect to the login page
      alert("Please login to create a trip");
        window.location.href = "/login";

      }

      if (!data) {
        // If the user is logged in, and not fill the form  redirect to the create -trip  page
        alert("Please fill the form to create a trip");
        window.location.href = "/create-trip";
      }
    FetchDetails();
  }, []);

  return (
    <div>
      {" "}
      <div className="container p-0">
        {/* Top Navigation */}
        {/* <div className="d-flex justify-content-between align-items-center p-2 bg-light">
          <button className="btn btn-light btn-sm">
            <p className="me-2" /> Navigation
          </button>
          <div>
            <p className="btn btn-light btn-sm me-2">
              <p className="me-1">
                {" "}
                <p />
              </p>
              Share
            </p>
            <button className="btn btn-light btn-sm">
              <FaBookmark className="me-1" /> Save
            </button>
          </div>
        </div> */}

        {/* loader */}
        {loading && (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Main Content Section */}
        {!loading && (

        <div className="row m-0">
          {/* Left Content Section */}
          <div className="col-md-7 p-0">
            {/* Banner Image */}
            <div className="position-relative">
              <img
                src={hotel}
                alt="Dal Lake in Kashmir"
                className="img-fluid w-100"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="position-absolute top-0 start-0 m-2"></div>
            </div>

            {/* Content Section */}
            {tripDescription && (
              <div className="p-3">
                {/* Trip Title and Description */}
                <h1 className="fw-bold">{tripDescription.tripTitle}</h1>
                <p className="text-muted">{tripDescription.description}</p>
              </div>
            )}

            {/* Weather Information */}
            <div className="ps-3 d-flex justify-content-between align-items-center mb-3">
              {tripDescription && (
                <div className="d-flex align-items-center">
                  <FaMapMarkerAlt className="me-2" />
                  <p className="mb-0">{tripDescription.location}</p>
                </div>
              )}
              <div className="d-flex align-items-center">
                <p className="mb-0">Weather: {weather?.main?.temp}°C</p>
              </div>
              <div className="d-flex align-items-center">
                <p className="mb-0">Humidity: {weather?.main?.humidity}%</p>
              </div>
            </div>
          </div>

          {/* Right Map Section */}
          <div className="col-md-5 p-0">
            <div className="position-relative">
              {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1702967.2839069574!2d73.94535438454413!3d33.52457818397905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e1092499ffa89d%3A0x6567a6d4697e7f1!2sJammu%20and%20Kashmir!5e0!3m2!1sen!2sin!4v1743722685054!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}

              {/* Map Controls */}
              <div className="position-absolute top-0 end-0 m-2">
                <div className="d-flex flex-column">
                  <button className="btn btn-light btn-sm mb-2">+</button>
                  <button className="btn btn-light btn-sm">−</button>
                </div>
              </div>

              {/* Map Options */}
              <div className="position-absolute top-0 end-0 mt-5 me-2">
                <div className="d-flex flex-column">
                  <button className="btn btn-light btn-sm mb-2">
                    <p> Export</p>
                  </button>
                  <button className="btn btn-light btn-sm mb-2">
                    <p> Route</p>
                  </button>
                  <button className="btn btn-light btn-sm mb-2">↺</button>
                  <p className="btn btn-light btn-sm"></p>
                </div>
              </div>

              {/* Map Attribution */}
              <div className="m-2 bg-light p-1 small">
                {/* show google map in iframe and show marker */}
                <iframe
                  title="Google Map"
                  width="100%"
                  height="250"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/view?key=${
                    import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                  }&center=${data.coordinates.lat},${
                    data.coordinates.lng
                  }&zoom=14&maptype=roadmap`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
      {attractionsDetails && (
        <RpCard tripDetails={attractionsDetails} place={"attractions"} />
      )}
      {hotelDetails && <RpCard tripDetails={hotelDetails} place={"hotels"} />}
      {restrauntDetails && (
        <RpCard tripDetails={restrauntDetails} place={"restraunts"} />
      )}
    </div>
  );
}

export default GenerateTrip;
