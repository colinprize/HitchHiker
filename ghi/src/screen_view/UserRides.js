import React, { useEffect, useState, useCallback } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";
import { NavLink } from 'react-router-dom';
import car from "../images/mystery-machine.jpg";


function UserRidesList() {

  const { token, fetchWithCookie } = useToken();
  const [ridesData, setRidesData] = useState([]);
  const [userId, setUserId] = useState("");

  const loadRides = useCallback(async () => {
    const url = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/userrides`;
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
  }, [fetchWithCookie, token]);

  useEffect(() => {
    loadRides();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps




  return (
    <div className="items-center justify-center mx-auto max-w-screen-xl">
      <div className="bg-stone-100 shadow-md rounded px-20 pt-6 pb-8">
        {ridesData.length > 0 ?
          <div className="pb-8 w-full m-10">
            <h2 className="text-2xl text-center font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight my-4">Rides You're Signed Up For</h2>
            <RideColumn rides={ridesData} userId={userId} trigger={loadRides} />
          </div>

          :
          <div className="space-y-12 pb-12">
            <h2 className="text-2xl text-center font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight my-4">You're Not Signed Up For Any Rides</h2>
            <h2 className="text-xl text-center font-normal leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight my-4">Click
              <NavLink to="/listhikes" className="font-semibold items-center text-olivine hover:scale-110 py-2 px-2" type="button">
                here
              </NavLink>
              to find some fun hikes that other users are going on!
            </h2>
          </div>
        }
      </div>
    </div>
  );
}

function RideColumn(props) {
  const { token } = useToken();
  const handleUnjoin = async (ride) => {
    try {
      const rideUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/hikes/${ride.hike_event}/rides/${ride.ride_id}/riders`;
      const fetchOptions = {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const postResponse = await fetch(rideUrl, fetchOptions);
      if (postResponse.ok) {
        props.trigger();
      };
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (ride) => {
    try {
      const rideUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/hikes/${ride.hike_event}/rides/${ride.ride_id}`;
      const fetchOptions = {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const postResponse = await fetch(rideUrl, fetchOptions);
      if (postResponse.ok) {
        props.trigger();
      };
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {props.rides.map(ride => {
        return (
          < div key={ride.ride_id} >
            <div className="max-w-sm bg-grey bg-gray-800 rounded-lg shadow border-gray-700">
              <div className="relative">
                <img src={ride.driver_img || car} className='w-full h-48 object-cover rounded-t-lg' alt="Mercedes Benz cartoon" />
                <div className="absolute inset-0 rounded-t-lg"></div>
              </div>
              <div className='p-5'>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-white'>{ride.meetup_location}</h5>
                <p className='mb-3 font-normal text-gray-400'>{new Date(ride.meetup_time).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}</p>
                {ride.driver_id !== props.userId ?
                  <button className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-olivine rounded-full hover:scale-95"
                    onClick={() => { handleUnjoin(ride) }}>
                    Unjoin Ride
                  </button>
                  :
                  <button className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-olivine rounded-full hover:scale-95"
                    onClick={() => { handleDelete(ride) }}>
                    Delete Ride
                  </button>
                }
              </div>
            </div>
          </div>
        );
      })}
    </div >
  );
}

export default UserRidesList;
