import { useState } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";

function CreateHikeForm() {
    const [trail_name, setTrailName] = useState("");
    const [image_url, setURL] = useState("");
    const [date_time, setDateTime] = useState("");
    // const [organizer_id, setOrganizerID] = useState("")
    const [hike_description, setHikeDescription] = useState("");
    const [max_hikers, setMaxHikers] = useState("");
    const { token } = useToken();


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.trail_name = trail_name;
        data.image_url = image_url;
        data.date_time = date_time;
        // data.organizer_id = organizer_id;
        data.hike_description = hike_description;
        data.max_hikers = max_hikers;


        const url = 'http://localhost:8000/hikes';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        };

        const response = await fetch(url, fetchConfig);
        console.log(response)
        if (response.ok) {
            setTrailName("");
            setURL("");
            setDateTime("");
            // setOrganizerID("");
            setHikeDescription("");
            setMaxHikers("");
        }
    }



    return (
        <>
            <div className="flex items-center justify-center">
                <form className="bg-pine-glade shadow-md rounded px-20 pt-6 pb-8 m-4" onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Create your Hike</h2>
                            <p className="mt-3 text-m leading-8 text-gray-600">Thanks for making a hike.  Please enter the details of your hiking adventure!</p>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                                <div className="sm:col-span-2">
                                    <label htmlFor="trail_name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Trail Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            value={trail_name}
                                            onChange={e => setTrailName(e.target.value)}
                                            type="text"
                                            name="trail_name"
                                            id="trail_name"
                                            autoComplete="off"
                                            placeholder="What trail are we going on?"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="image_url" className="block text-sm font-medium leading-6 text-gray-900">
                                        Picture
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            value={image_url}
                                            onChange={e => setURL(e.target.value)}
                                            type="text"
                                            name="image_url"
                                            id="image_url"
                                            autoComplete="off"
                                            placeholder="Picture URL"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="date_time" className="block text-sm font-medium leading-6 text-gray-900">Date Time</label>
                                    <div className="mt-2">
                                        <input
                                            type="datetime"
                                            id="date_time"
                                            value={date_time}
                                            onChange={(e) => setDateTime(e.target.value)}
                                            autoComplete="off"
                                            placeholder=""
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                {/* <div className="sm:col-span-2">
                                    <label htmlFor="organizer_id" className="block text-sm font-medium leading-6 text-gray-900">Organizer ID</label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            id="organizer_id"
                                            value={organizer_id}
                                            onChange={(e) => setOrganizerID(e.target.value)}
                                            autoComplete="off"
                                            placeholder="#"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div> */}
                                <div className="sm:col-span-2">
                                    <label htmlFor="hike_description" className="block text-sm font-medium leading-6 text-gray-900">
                                        Hike Description
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            value={hike_description}
                                            onChange={e => setHikeDescription(e.target.value)}
                                            type="text"
                                            name="hike_description"
                                            id="hike_description"
                                            autoComplete="off"
                                            placeholder="Give us the Deets. How hard? How Far?"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="max_hikers" className="block text-sm font-medium leading-6 text-gray-900">
                                        Max Hikers
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            value={max_hikers}
                                            onChange={e => setMaxHikers(e.target.value)}
                                            id="max_hikers"
                                            name="max_hikers"
                                            type="number"
                                            autoComplete="off"
                                            min="1" max="10"
                                            placeholder="0"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="reset" className="text-sm font-semibold leading-6 text-gray-900">
                            Reset
                        </button>
                        <button type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );

}

export default CreateHikeForm;
