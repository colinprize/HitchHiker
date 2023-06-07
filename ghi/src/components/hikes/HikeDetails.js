import React, { useState } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";


function HikeDetails(props) {
    const [details, setDetails] = useState(null);
    const { hike_id } = props;
    const { token } = useToken();
    // removed fetchwithCookie ^^^

    const fetchHikeDetails = async () => {
        const url = `http://localhost:8000/hikes/${hike_id}`;
        const config = {
            credentials: "include",
            method: "get",
            headers: {
                headers: { Authorization: `Bearer ${token}` },
            },
        };

        const response = await fetch(url, config);
        if (response.ok) {
            const hikeDetails = await response.json();
            setDetails(prevDetails => prevDetails === null ? hikeDetails : null)
        }
    }

    return (
        <>
            <button className='text-white text-lg hover:underline' onClick={fetchHikeDetails}>{details ? 'Hide Details' : 'Hike Details'}</button>
            {details && (
                <div>
                    <br />
                    <p className='text-white'>Details: {details.hike_description}</p>
                    <br />
                    <p className='text-white'>Maximum alloted hikers: {details.max_hikers}</p>
                </div>
            )}
        </>
    )
}

export default HikeDetails
