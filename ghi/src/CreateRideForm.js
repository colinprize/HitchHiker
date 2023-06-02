import React, { useEffect, useState } from "react";
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
  const { token } = useToken();
  const [hikeId, setHikeId] = useState("");
  const [maxRiders, setMaxRiders] = useState("");
  const [meetupTime, setMeetupTime] = useState("");
  const [meetupLocation, setMeetupLocation] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const resetStateVals = () => {
    setHikeId("");
    setMaxRiders("");
    setMeetupTime("");
    setMeetupLocation("");
    setCity("");
    setRegion("");
    setPostalCode("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let fetchOptions = {
      credentials: "include",
      method: "get",
      headers: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    };
    try {
      const hikeUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/hikes/${hikeId}`;
      const getResponse = await fetch(hikeUrl, fetchOptions);
      if (getResponse.ok) {
        const data = await getResponse.json();
        let [meetHours, meetMinutes] = meetupTime.split(":");
        meetHours = parseInt(meetHours);
        meetMinutes = parseInt(meetMinutes);
        let hikeData = data;
        let hikeDate = new Date(hikeData.date_time);
        hikeDate.setHours(meetHours);
        hikeDate.setMinutes(meetMinutes);
        const postData = {};
        postData.max_riders = maxRiders;
        postData.meetup_time = hikeDate;
        postData.meetup_location = meetupLocation;
        fetchOptions = {
          method: "post",
          body: JSON.stringify(postData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const ridesUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/hikes/${hikeId}/rides`;
        const postResponse = await fetch(ridesUrl, fetchOptions);
        if (postResponse.ok) {
          const newRide = await postResponse.json();
          resetStateVals();
        };
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-pine-glade shadow-md rounded px-20 pt-6 pb-8 m-4">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Ride Details</h2>
              <p className="mt-3 text-m leading-8 text-gray-600">Thanks for offering to drive other hikers.  Please enter the details of your ride here.</p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">

                {/* <TailwindInput
                  colSpan="sm:col-span-2"
                  htmlFor="userId"
                  labelValue="User ID"
                  inputValue={userId}
                  onChange={e => setUserId(e.target.value)}
                  type="number"
                  name="userId"
                  id="userId"
                  autoComplete="off"
                  placeholder="userId"
                /> */}

                <TailwindInput
                  colSpan="sm:col-span-2"
                  htmlFor="hikeId"
                  labelValue="Hike ID"
                  inputValue={hikeId}
                  onChange={e => setHikeId(e.target.value)}
                  type="number"
                  name="hikeId"
                  id="hikeId"
                  autoComplete="off"
                  placeholder="hikeId"
                />

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
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button onClick={resetStateVals} type="reset" className="text-sm font-semibold leading-6 text-gray-900">
              Reset
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  )

}

export default CreateRideForm;
