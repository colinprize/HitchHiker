import React, { useEffect, useState } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate, useLocation } from 'react-router-dom';
import carImage from "../images/Car-benz.png";


function RideColumn(props) {
  const navigate = useNavigate();
  const { token } = useToken();

  const handleJoin = async (ride) => {
    try {
      const rideUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/hikes/${props.hikeId}/rides/${ride.ride_id}/riders`;
      const fetchOptions = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const postResponse = await fetch(rideUrl, fetchOptions);
      if (postResponse.ok) {
        navigate("/");
      };
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {props.rides.filter((ride) => ride.driver_id !== props.userId).map(ride => {
        return (
          < div key={ride.ride_id} >
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="relative">
                <img src={carImage} className='w-full h-48 object-cover rounded-t-lg' alt="Mercedes Benz cartoon" />
                <div className="absolute inset-0 bg-black opacity-40 hover:opacity-0 rounded-t-lg"></div>
              </div>
              <div className='p-5'>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{ride.meetup_location}</h5>
                <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{new Date(ride.meetup_time).toLocaleTimeString()}</p>
                <button className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:scale-95 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => { handleJoin(ride) }}>
                  Join Ride
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div >
  );
}

function RidesList() {

  const location = useLocation();
  const { token, fetchWithCookie } = useToken();
  const [ridesData, setRidesData] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (location.state !== null) {
      loadRides();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (location.state === null) {
    return null;
  }

  const loadRides = async () => {
    const hikeId = location.state.hikeData.hike_id;
    const url = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/hikes/${hikeId}/rides`;
    const tokenUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/token`;
    const fetchOptions = {
      credentials: "include",
      method: "get",
      headers: {
        headers: { Authorization: `Bearer ${token}` },
      },
    };
    try {
      const userResponse = await fetchWithCookie(tokenUrl);
      setUserId(userResponse.account.user_id);
      const response = await fetch(url, fetchOptions);
      if (response.ok) {
        const data = await response.json();
        setRidesData(data)
      };
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex items-center justify-center mx-auto max-w-screen-lg">
      <div className="bg-stone-100 shadow-md rounded px-20 pt-6 pb-8 m-4">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl text-center font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Rides for this hike</h2>
            <p className="my-4 text-m leading-8 text-gray-600">.</p>
            <RideColumn rides={ridesData} hikeId={location.state.hikeData.hike_id} userId={userId} />
          </div>
        </div>
      </div>
    </div >
  );
}


export default RidesList;
