import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import trip from "../assets/trip.jpg";
import RpCard from "./RpCard";

import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

import { useDispatch } from "react-redux";
import { saveFormData } from "../store/formSlice";

export default function CreateTrip() {
  const [data, setData] = useState({
    destination: "",
    days: "",
    people: "",
    budget: "",
  });

  const [cookies, setCookie] = useCookies(['user']);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePlaceSelect = async (place) => {
    setData((prevData) => ({ ...prevData, destination: place.label }));

    const placeId = place.value.place_id;
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ placeId }, async (results, status) => {
      if (status === "OK" && results[0]) {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        setCoordinates({ lat, lng });

        console.log("Latitude:", lat);
        console.log("Longitude:", lng);
      } else {
        console.error("Geocode failed:", status);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.destination || !data.days || !data.people || !data.budget) {
      alert("Please fill all the fields");
      return;
    }
    e.preventDefault();
    setLoading(true);
    try {
      const formData = {
        destination: data.destination,
        days: data.days,
        people: data.people,
        budget: data.budget,
        coordinates: coordinates,
      };

     
      dispatch(saveFormData(formData));
      navigate("/generate-trip");
    } catch (error) {
      console.error("Error creating trip:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cookies.user) {
      alert("Please login to create a trip");
      navigate("/login");
    }
  }
  , []);

  return (
    <>
      <section className="create-trip">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h4>Tell us your travel preferences</h4>
              <h1>Plan Your Trip</h1>

              <p>
                Enter your preferences, and we will create a customized travel
                plan for you.
              </p>

              <div className="form-group">
                <label htmlFor="destination">Destination</label>
                <GooglePlacesAutocomplete
                  apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                  selectProps={{
                    value: data.destination,
                    onChange: handlePlaceSelect,
                    placeholder: "Please enter destination",
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="days">No. of Days</label>
                <input
                  type="number"
                  name="days"
                  className="form-control"
                  value={data.days}
                  onChange={handleChange}
                  placeholder="Enter number of days"
                />
              </div>
              <div className="form-group">
                <label htmlFor="people">Number of People</label>
                <input
                  type="number"
                  name="people"
                  className="form-control"
                  value={data.people}
                  onChange={handleChange}
                  placeholder="Enter number of people"
                />
              </div>
              <div className="form-group">
                <label htmlFor="budget">Budget</label>
                <input
                  type="number"
                  name="budget"
                  className="form-control"
                  value={data.budget}
                  onChange={handleChange}
                  placeholder="Enter budget"
                />
              </div>
              <div className="form-group">
                <button
                  className="btn btn-primary trip-btn"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Creating Trip..." : "Create Trip"}
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <img src={trip} alt="trip" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
