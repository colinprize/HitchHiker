import React, { useEffect, useState } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";
import HikeDetails from '../components/hikes/HikeDetails';
import RideDialogModal from '../components/rides/rideDialogModal';


function HikesColumn(props) {
  const { token, fetchWithCookie } = useToken();
  const joinhike = async (hike) => {
    const hike_id = hike.hike_id;
    const tokenUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/token`;
    const response1 = await fetchWithCookie(tokenUrl);
    let user_id = parseInt(response1.account.user_id)
    const data = {}
    data.hike_id = hike_id
    data.user_id = user_id
    const url = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/userhikes`;
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    const response = await fetch(url, fetchConfig);
    // prop boolean state value and hike data setter called here so parent component can pass to RideDialogModal
    if (response.ok) {
      props.setHikeData(hike);
      props.setTrigger(true);
    }
  };

  return (
    <div className="flex flex-wrap justify-between">
      {props.list.map(hike => {
        return (
          <div key={hike.hike_id}>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="relative">
                <img src={hike.image_url} className='w-full h-48 object-cover rounded-t-lg' alt="Hike" />
                <div className="absolute inset-0 bg-black opacity-40 rounded-t-lg"></div>
              </div>
              <div className='p-5'>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{hike.trail_name}</h5>
                <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{new Date(hike.date_time).toLocaleDateString()} at {new Date(hike.date_time).toLocaleTimeString()}</p>
                <HikeDetails hike_id={hike.hike_id} ></HikeDetails>
                <button className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:scale-95 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  // HAD TO CHANGE ARG PASSED TO ONCLICK LISTENER TO HIKE SO ENTIRE OBJECT CAN BE PASSED TO SETHIKEDATA
                  onClick={() => { joinhike(hike); }}>
                  Join Hike
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const ListHikes = () => {
  const [hikeColumns, setHikeColumns] = useState([[], [], [], []]);
  const [loading, setLoading] = useState(true);
  const { token } = useToken();
  // Boolean state variable that calls CreateRide dialog when true
  const [hikeSelected, setHikeSelected] = useState(false);
  // Object state variable that is passed as prop to RideDialogModal
  const [hikeDataForRide, setHikeDataForRide] = useState("");
  const fetchData = async () => {
    const url = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/hikes`;
    const config = {
      credentials: "include",
      method: "get",
      headers: {
        headers: { Authorization: `Bearer ${token}` },
      },
    };

    try {
      const response = await fetch(url, config);
      if (response.ok) {
        const data = await response.json();
        const hikes = Object.values(data)
        const requests = [];
        for (let hike of hikes) {
          const detailUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/hikes/${hike.hike_id}`;
          requests.push(fetch(detailUrl, config));
        }
        const responses = await Promise.all(requests);
        const columns = [[], [], [], []];
        let i = 0
        for (const hikeResponse of responses) {
          if (hikeResponse.ok) {
            const details = await hikeResponse.json();
            columns[i].push(details);
            i = i + 1;
            if (i > 3) {
              i = 0;
            }
          } else {
            console.error(hikeResponse)
          }
        }
        setHikeColumns(columns)
      }
      setLoading(false)
    } catch (e) {
      console.error(e)
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <br />
      <div className="text-xl text-center">
        <div>
          <p>
            Take your education to new heights!
          </p>
        </div>

        <br />
      </div>
      <div className={`${hikeSelected ? "hidden" : "mx-auto max-w-screen-lg"}`}>
        <h2 className='text-3xl font-bold text-center'>Upcoming Hikes</h2>
        <br />
        <br />
        <div className='grid grid-cols-4 gap-4'>
          {hikeColumns.map((hikeList, index) => {
            return (
              // Adds two new props for onClick listener so ListHikes has state info needed for RideDialogModal
              <HikesColumn key={index} list={hikeList} setTrigger={setHikeSelected} setHikeData={setHikeDataForRide} />
            );
          })}
        </div>
      </div>
      <RideDialogModal trigger={hikeSelected} setTrigger={setHikeSelected} hikeData={hikeDataForRide} resetHikeData={setHikeDataForRide} directFromJoin={true} />
    </>
  );
}

export default ListHikes
