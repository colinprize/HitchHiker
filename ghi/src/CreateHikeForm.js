import { useState } from 'react';

function CreateHikeForm() {
    const [trail_name, setTrailName] = useState("");
    const [image_url, setURL] = useState("");
    const [date_time, setDateTime] = useState("");
    const [organizer_id, setOrganizerID] = useState("")
    const [hike_description, setHikeDescription] = useState("");
    const [max_hikers, setMaxHikers] = useState("");


    const handleTrailChange = (event) => {
        const value = event.target.value;
        setTrailName(value);
    }

    const handleUrlChange = (event) => {
        const value = event.target.value;
        setURL(value);
    }

    const DateTimeChange = (event) => {
        const value = event.target.value;
        setDateTime(value);
    }

    const HikeDescriptionChange = (event) => {
        const value = event.target.value;
        setHikeDescription(value);
    }

    const setMaxHikersChange = (event) => {
        const value = event.target.value;
        setMaxHikers(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.trail_name = trail_name;
        data.image_url = image_url;
        data.date_time = date_time;
        data.organizer_id = organizer_id;
        data.hike_description = hike_description;
        data.max_hikers = max_hikers;


        const url = 'http://localhost:8000/hikes';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, fetchConfig);
        console.log(response)
        if (response.ok) {
            setTrailName("");
            setURL("");
            setDateTime("");
            setOrganizerID("");
            setHikeDescription("");
            setMaxHikers("");
        }
    }



    return (
        <div>
            <h1>Simple Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="trail_name">Trail Name</label>
                    <input
                        type="text"
                        id="trail_name"
                        value={trail_name}
                        onChange={handleTrailChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image_url">Image URL</label>
                    <input
                        type="text"
                        id="image_url"
                        value={image_url}
                        onChange={handleUrlChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date_time">DATE and Time</label>
                    <input
                        type="datetime"
                        id="date_time"
                        value={date_time}
                        onChange={DateTimeChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="organizer_id">Organizer ID</label>
                    <input
                        type="text"
                        id="organizer_id"
                        value={organizer_id}
                        onChange={(e) => setOrganizerID(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="hike_description">Hike Description</label>
                    <input
                        type="text"
                        id="hike_description"
                        value={hike_description}
                        onChange={HikeDescriptionChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="max_hikers">Max Hikers</label>
                    <input
                        type="text"
                        id="max_hikers"
                        value={max_hikers}
                        onChange={setMaxHikersChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );

}

export default CreateHikeForm;
