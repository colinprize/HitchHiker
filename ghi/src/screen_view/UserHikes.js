import React, { useEffect, useState } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";
import HikeDetails from '../components/hikes/HikeDetails';


function HikesColumn(props) {
    const { token, fetchWithCookie } = useToken();
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
        await fetch(url, config)
        props.trigger();
    }
    return (
        <div className="justify-between">
            {props.list.map(hike => {
                return (
                    <div key={hike.hike_id} >
                        <div className="max-w-sm rounded-lg shadow mt-3 bg-gray-800 border-gray-700">
                            <div className="relative">
                                <img src={hike.image_url} className='w-full h-48 object-cover rounded-t-lg' alt="Hike" />
                                <div className="absolute inset-0 rounded-t-lg"></div>
                            </div>
                            <div className='p-5'>
                                <h5 className='mb-2 text-2xl font-bold tracking-tight text-white'>{hike.trail_name}</h5>
                                <p className='mb-3 font-normal text-gray-400'>{new Date(hike.date_time).toLocaleDateString()} at {new Date(hike.date_time).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}</p>
                                <HikeDetails hike_id={hike.hike_id} ></HikeDetails>
                                <button className="inline-flex items-center px-3 py-2 text-md font-medium text-center text-white bg-olivine rounded-lg hover:scale-95 focus:ring-4 focus:outline-none ml-2"
                                    onClick={() => { leaveHike(hike.hike_id) }}>
                                    Leave Hike
                                </button>
                            </div>
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
        const url = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/users/${user_id}/hikes`;
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
            <div className='mx-auto max-w-screen-lg'>
                <br />
                <h2 className='text-3xl font-bold text-center'>Your Upcoming Hikes</h2>
                <br />
                <div className="text-center">
                    <br />
                </div>
                <div className='grid grid-cols-4 gap-4'>
                    {hikeColumns.map((hikeList, index) => {
                        return (
                            <HikesColumn trigger={fetchData} key={index} list={hikeList} />
                        );
                    })}
                </div>
            </div>
        </>

    );
}

export default ListUserHikes
