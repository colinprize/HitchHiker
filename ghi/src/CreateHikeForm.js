import { useState } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";

function CreateHikeForm() {
    const [trail_name, setTrailName] = useState("");
    const [image_url, setURL] = useState("");
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [hike_description, setHikeDescription] = useState("");
    const [max_hikers, setMaxHikers] = useState("");
    const { token } = useToken();


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.trail_name = trail_name;
        data.image_url = image_url;
        data.date_time = `${date} ${time}`;
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
            setDate("");
            setTime("");
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
                            <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Add a new Hike</h2>
                            <p className="mt-3 text-m leading-8 text-gray-600">Thanks for posting a hike.  Please enter the details of your hiking adventure!</p>
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
                                <div class="col-span-full">
                                    <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Hike Photo</label>
                                    <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div class="text-center">
                                            <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                                            </svg>
                                            <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file" class="sr-only"
                                                        value={image_url}
                                                        onChange={e => setURL(e.target.value)} />
                                                </label>
                                                <p class="pl-1">or drag and drop</p>
                                            </div>
                                            <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Date</label>
                                    <div className="mt-2">
                                        <input
                                            type="date"
                                            id="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            autoComplete="off"
                                            placeholder=""
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="time" className="block text-sm font-medium leading-6 text-gray-900">Time</label>
                                    <div className="mt-2">
                                        <input
                                            type="time"
                                            id="time"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            autoComplete="off"
                                            placeholder=""
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
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
                                            placeholder="Give us the deets"
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
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );

}

export default CreateHikeForm;
