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
    const url = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/userhikes/`;
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      props.setHikeData(hike);
      props.setTrigger(true);
    }

  };
  let userHikeIds = [];
  if (props.userHikes.length > 0) {
    userHikeIds = props.userHikes.map((userHike) => userHike.hike_id);
  }

  return (
    <div className="justify-between">
      {props.list.map(hike => {
        return (
          <div key={hike.hike_id}>
            <div className="max-w-sm rounded-lg shadow bg-gray-800 border-gray-700 mt-5">
              <div className="relative">
                <img src={hike.image_url} className='w-full h-48 object-cover rounded-t-lg' alt="Hike" />
                <div className="absolute inset-0 rounded-t-lg"></div>
              </div>
              <div className='p-5'>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-white'>{hike.trail_name}</h5>
                <p className='mb-3 font-normal text-gray-400'>{new Date(hike.date_time).toLocaleDateString()} at {new Date(hike.date_time).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}</p>
                <HikeDetails hike_id={hike.hike_id} ></HikeDetails>
                {!userHikeIds.includes(hike.hike_id) ?
                  <button className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-olivine rounded-lg ml-2 hover:scale-95"
                    onClick={() => { joinhike(hike); }}>
                    Join Hike
                  </button>
                  :
                  <button className="inline-flex items-center text-wheat px-3 py-2 ml-6 fill-current rounded-lg">
                    Going!
                  </button>
                }
              </div>
            </div>
          </div>
        )
      })}
    </div >
  )
}

const ListHikes = () => {
  const [hikeColumns, setHikeColumns] = useState([[], [], [], []]);
  const [loading, setLoading] = useState(true);
  const { token, fetchWithCookie } = useToken();
  const [hikeSelected, setHikeSelected] = useState(false);
  const [hikeDataForRide, setHikeDataForRide] = useState("");

  const [userHikes, setUserHikes] = useState([]);

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/hikes`;
    const userHikesUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/users/{user_id}/hikes`;
    const config = {
      credentials: "include",
      method: "get",
      headers: {
         Authorization: `Bearer ${token}`
      },
    };

    try {
      await fetchWithCookie(`${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/token`);
      const response = await fetch(url, config);
      const userHikesResponse = await fetch(userHikesUrl, config);
      if (response.ok && userHikesResponse.ok) {
        const data = await response.json();
        // const allHikes = Object.values(data);
        // const hikes = allHikes.filter((hike) => hike.organizer_id !== userResponse.account.user_id);
        const hikes = Object.values(data);
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
        const userHikeData = await userHikesResponse.json();
        setUserHikes(userHikeData);
      }
      setLoading(false)
    } catch (e) {
      console.error(e)
      setLoading(false);
    }
  }
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <br />
      <div className={`${hikeSelected ? "hidden" : "mx-auto max-w-screen-lg"}`}>
        <h2 className='text-3xl font-bold text-center'>Upcoming Hikes</h2>
        <br />
        <br />
        <div className='grid grid-cols-4 gap-4'>
          {hikeColumns.map((hikeList, index) => {
            return (
              <HikesColumn key={index} list={hikeList} setTrigger={setHikeSelected} setHikeData={setHikeDataForRide} userHikes={userHikes} />
            );
          })}
        </div>
      </div>
      <RideDialogModal trigger={hikeSelected} setTrigger={setHikeSelected} hikeData={hikeDataForRide} resetHikeData={setHikeDataForRide} directFromJoin={true} />
    </>
  );
}

export default ListHikes