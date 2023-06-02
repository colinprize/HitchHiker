import React from 'react';
import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";


function UpdateUser() {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [email, setEmail] = useState("");
    const [uniName, setUniName] = useState("");
    const [uniYear, setUniYear] = useState("");
    const { token, fetchWithCookie } = useToken();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {}
        data.full_name = fullName;
        data.username = username;
        data.password = password;
        data.picture_url = pictureUrl;
        data.email = email;
        data.university_name = uniName;
        data.university_year = uniYear;
        console.log(data)
        const tokenUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/token`;
        const response1 = await fetchWithCookie(tokenUrl);
        const user_id = parseInt(response1.account.user_id);

        const updateUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/users/${user_id}`;
        const fetchConfig = {
            credentials: "include",
            method: "put",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                headers: { Authorization: `Bearer ${token}` },
            }
        }
        const response = await fetch(updateUrl, fetchConfig)
        if (response.ok) {
            console.log(response)
            setFullName("");
            setUsername("");
            setPassword("");
            setPictureUrl("");
            setEmail("");
            setUniName("");
            setUniYear("");
        }
    }


    return (
        <>
            <div className="flex items-center justify-center mb-0">
                <form className="bg-wheat shadow-md rounded px-20 pt-6 pb-8 mb-4">
                    <div className="items-center mb-4">
                        <label className="block text-olivine text-md font-bold mb-2" htmlFor="fullName">
                            Full Name
                        </label>
                        <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type="text" placeholder="Tina Belcher" />
                    </div>
                    <div className="items-center mb-4">
                        <label className="block text-olivine text-md font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="TinaBelcher01" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-olivine text-md font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-6 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="*************" />

                    </div>
                    <div className="items-center mb-4">
                        <label className="block text-olivine text-md font-bold mb-2" htmlFor="pictureUrl">
                            Picture Url
                        </label>
                        <input value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="pictureUrl" type="text" placeholder="Picture Url" />
                    </div>
                    <div className="items-center mb-4">
                        <label className="block text-olivine text-md font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="TinaB@bobsburgers.com" />
                    </div>
                    <div className="items-center mb-4">
                        <label className="block text-olivine text-md font-bold mb-2" htmlFor="uniName">
                            University Name
                        </label>
                        <input value={uniName} onChange={(e) => setUniName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="uniName" type="text" placeholder="Ocean City University" />
                    </div>
                    <div className="items-center mb-4">
                        <label className="block text-olivine text-md font-bold mb-2" htmlFor="uniYear">
                            University Year
                        </label>
                        <input value={uniYear} onChange={(e) => setUniYear(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="uniYear" type="integer" placeholder="2023" />
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={handleSubmit} className="bg-olivine hover:bg-beryl-green font-bold py-2 px-20 rounded" type="button">
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
};

export default UpdateUser;
