import React, { useEffect, useState } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";
import HikeDetails from '../components/hikes/HikeDetails';
import { useNavigate } from 'react-router-dom';



function HikesColumn(props) {
    const { token, fetchWithCookie } = useToken();
    const navigate = useNavigate();
    const leaveHike = async (hike_id) => {
        const tokenUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/token`;
        const response1 = await fetchWithCookie(tokenUrl);
        const id = parseInt(response1.account.user_id)
        const url = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/userhikes/${id}/${hike_id}`
        const config = {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }
        const response = await fetch(url, config)
        console.log(response)
    }
    return (
        <div className="flex flex-wrap justify-between">
            {props.list.map(hike => {
                return (
                    <div key={hike.hike_id} >
                        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="relative">
                                <img src={hike.image_url} className='w-full h-48 object-cover rounded-t-lg' alt="Hike" />
                                <div className="absolute inset-0 bg-black opacity-40 rounded-t-lg"></div>
                            </div>
                            <div className='p-5'>
                                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{hike.trail_name}</h5>
                                <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{new Date(hike.date_time).toLocaleDateString()} at {new Date(hike.date_time).toLocaleTimeString()}</p>
                                <HikeDetails hike_id={hike.hike_id} ></HikeDetails>
                            </div>
                            <button className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:scale-95 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => { leaveHike(hike.hike_id); navigate('/main_page') }}>
                                Leave Hike
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const ListUserHikes = () => {
    const [hikeColumns, setHikeColumns] = useState([[], [], [], []]);
    const [loading, setLoading] = useState(true);
    const { token, fetchWithCookie } = useToken();
    const fetchData = async () => {
        const tokenUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/token`;
        const response1 = await fetchWithCookie(tokenUrl);
        const user_id = parseInt(response1.account.user_id)
        const url = `http://localhost:8000/users/${user_id}/hikes/`;
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
                if (data.message === 'User is not signed up for any hikes') {
                    setHikeColumns([])
                } else {
                    const requests = [];
                    for (let hike of data) {
                        const detailUrl = `http://localhost:8000/hikes/${hike.hike_id}`;
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
            <div className="text-center">
                <h1>Hitch Hiker</h1>
                <div>
                    <p>
                        These are the hikes you're signed up for!
                    </p>
                </div>
                <br />
                <br />
            </div>
            <div className='mx-auto max-w-screen-lg'>
                <h2 className='text-center'>Your Upcoming Hikes</h2>
                <br />
                <div className='grid grid-cols-4 gap-4'>
                    {hikeColumns.map((hikeList, index) => {
                        return (
                            <HikesColumn key={index} list={hikeList} />
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default ListUserHikes
