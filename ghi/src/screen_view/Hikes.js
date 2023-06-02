import React, { useEffect, useState } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";



function HikesColumn(props) {
    return (
        <div className="flex flex-wrap justify-between">
            {props.list.map(hike => {
                return (
                    <div key={hike.hike_id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4">
                        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="relative">
                                <img src={hike.image_url} className='w-full h-48 object-cover rounded-t-lg' alt="Hike" />
                                <div className="absolute inset-0 bg-black opacity-40 rounded-t-lg"></div>
                            </div>
                            <div className='p-5'>
                                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{hike.trail_name}</h5>
                                <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{hike.hike_description}</p>
                                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Join Hike
                                </a>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const ListHikes = (props) => {
    const [hikeColumns, setHikeColumns] = useState([[], [], []]);
    const [loading, setLoading] = useState(true);
    const { token } = useToken();
    const fetchData = async () => {
        const url = 'http://localhost:8000/hikes';
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
            setLoading(false)
        } catch (e) {
            console.error(e)
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log('hikeColumns:', hikeColumns);
    }, [hikeColumns]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="text-center">
                <h1>Hitch Hiker</h1>
                <div>
                    <p>
                        Take your education to new heights!
                    </p>
                </div>
                <br />
                <br />
            </div>
            <div className='mx-auto max-w-screen-lg'>
                <h2 className='text-center'>Upcoming Hikes</h2>
                <div>
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

export default ListHikes
