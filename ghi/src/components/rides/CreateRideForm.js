import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import useToken from "@galvanize-inc/jwtdown-for-react";

function TailwindInput(props) {

  return (
    <div className={props.colSpan}>
      <label htmlFor={props.htmlFor} className="block text-sm font-medium leading-6 text-gray-900">
        {props.labelValue}
      </label>
      <div className="mt-2">
        <input
          required
          value={props.inputValue}
          onChange={props.onChange}
          type={props.type}
          name={props.name}
          id={props.id}
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          min={props.min}
          max={props.max}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

  );
}

function CreateRideForm() {

  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useToken();
  const [maxRiders, setMaxRiders] = useState("");
  const [meetupTime, setMeetupTime] = useState("");
  const [meetupLocation, setMeetupLocation] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const resetStateVals = () => {
    setMaxRiders("");
    setMeetupTime("");
    setMeetupLocation("");
    setCity("");
    setRegion("");
    setPostalCode("");
  }

  if (location.state === null) {
    return null;
  }

  const onCancelClick = () => {
    resetStateVals();
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {};
      postData.max_riders = maxRiders;
      postData.meetup_time = location.state.hikeData.date_time.slice(0, 11) + meetupTime;
      postData.meetup_location = `${meetupLocation} ${city}, ${region}  ${postalCode}`;
      const fetchOptions = {
        method: "post",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const ridesUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/hikes/${location.state.hikeData.hike_id}/rides`;
      const postResponse = await fetch(ridesUrl, fetchOptions);
      if (postResponse.ok) {
        resetStateVals();
        navigate("/");
      };
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-pine-glade shadow-md rounded px-20 pt-6 pb-8 m-4">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Ride Details</h2>
              <p className="my-4 text-m leading-8 text-gray-600">Thanks for offering to drive other hikers.  Please enter the details of your ride here.</p>
              <div className="grid grid-cols-1 border-y border-gray-900/10 py-4 sm:grid-cols-4">
                <div className="col-span-2">
                  <h3 className="mt-3 text-lg font-medium leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">Hike</h3>
                </div>
                <div className="col-span-2">
                  <p className="mt-3 text-lg italic leading-7 font-normal text-gray-800">{location.state.hikeData.trail_name}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="mt-3 text-lg font-medium leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">Date</h3>
                </div>
                <div className="col-span-2">
                  <p className="mt-3 text-lg italic leading-7 font-normal text-gray-800">{new Date(location.state.hikeData.date_time).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</p>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">

                <TailwindInput
                  colSpan="sm:col-span-2"
                  htmlFor="maxRiders"
                  labelValue="Number of hikers you are willing to drive"
                  inputValue={maxRiders}
                  onChange={e => setMaxRiders(e.target.value)}
                  type="number"
                  name="maxRiders"
                  id="maxRiders"
                  autoComplete="off"
                  placeholder="0"
                  min="1" max="10"
                />

                <TailwindInput
                  colSpan="col-span-2"
                  htmlFor="meetupTime"
                  labelValue="Meetup Time"
                  inputValue={meetupTime}
                  onChange={e => setMeetupTime(e.target.value)}
                  type="time"
                  name="meetupTime"
                  id="meetupTime"
                  autoComplete="off"
                />

                <TailwindInput
                  colSpan="col-span-full"
                  htmlFor="meetupLocation"
                  labelValue="Meetup Location"
                  inputValue={meetupLocation}
                  onChange={e => setMeetupLocation(e.target.value)}
                  type="text"
                  name="meetupLocation"
                  id="meetupLocation"
                  autoComplete="street-address"
                  placeholder="Street address of where all hikers carpooling with you should meet"
                />

                <TailwindInput
                  colSpan="sm:col-span-2"
                  htmlFor="city"
                  labelValue="City"
                  inputValue={city}
                  onChange={e => setCity(e.target.value)}
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  placeholder="City"
                />

                <TailwindInput
                  colSpan="sm:col-span-1"
                  htmlFor="region"
                  labelValue="State / Province"
                  inputValue={region}
                  onChange={e => setRegion(e.target.value)}
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  placeholder="State"
                />

                <TailwindInput
                  colSpan="sm:col-span-1"
                  htmlFor="postalCode"
                  labelValue="ZIP / Postal code"
                  inputValue={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  autoComplete="postal-code"
                  placeholder="ZIP"
                />

              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-x-6 grid grid-cols-1 py-4 sm:grid-cols-4">
            <button onClick={onCancelClick} type="reset" className="col-end-1 col-span-1 text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button onClick={resetStateVals} type="reset" className="col-start-3 col-span-1 text-sm font-semibold leading-6 text-gray-900">
              Reset
            </button>
            <button
              type="submit"
              className="col-start-4 col-span-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">

          </div>
        </form >
      </div >
    </>
  )

}

export default CreateRideForm;
