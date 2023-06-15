import React from 'react';
import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import AddEmergencyContact from './CreateEmergencyContact.js'
import { useNavigate } from "react-router-dom";
import AlertMessage from './alertUserUpdate.js';

function UpdateUser() {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [email, setEmail] = useState("");
    const [uniName, setUniName] = useState("");
    const [uniYear, setUniYear] = useState("");
    const { token, fetchWithCookie, logout } = useToken();
    const [contactPopup, setContactPopup] = useState(false);
    const [hover, setHover] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    const fetchUserData = async () => {
        const tokenUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/token`;
        const userToken = await fetchWithCookie(tokenUrl);
        const userName = userToken.account.username;
        const getUserUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/users/${userName}`
        const config = {
            credentials: "include",
            method: "get",
            headers: {
                headers: { Authorization: `Bearer ${token}` },
            },
        };

        const response = await fetch(getUserUrl, config);
        if (response.ok) {
            const currentUser = await response.json();
            if (currentUser) {
                setFullName(currentUser.full_name);
                setUsername(currentUser.username);
                setPictureUrl(currentUser.picture_url || '');
                setEmail(currentUser.email);
                setUniName(currentUser.university_name);
                setUniYear(currentUser.university_year);
            }
        }
    }


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
            navigate("/")
            logout();
        }
    }
    return (
        <>
            <div className="flex justify-center">
                <form className="mt-5 border px-14 py-14 rounded-lg bg-wheat">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Full Name
                            </label>
                            <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Username
                            </label>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Email
                            </label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="Someone_Cool@email.com" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Password
                            </label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                            <p className="text-red-600 text-xs italic">Please enter current password.</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                Picture Url
                            </label>
                            <input value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                University Name
                            </label>
                            <input value={uniName} onChange={(e) => setUniName(e.target.value)} class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                University Year
                            </label>
                            <input value={uniYear} onChange={(e) => setUniYear(e.target.value)} class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-0 mb-0 mt-8">
                        <div className="w-full md:w-1/2 mb-0 md:mb-0">
                            <button onClick={handleSubmit} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="bg-olivine text-white block uppercase tracking text-xs mb-0 hover:scale-95 font-bold py-2 px-14 mr-3 rounded-full" type="button">
                                Update Profile
                            </button>
                        </div>
                        {/* // Form cannot be a descendant of a form!!!!!!! */}
                        <div className="w-full md:w-1/2 mb-0 md:mb-0">
                            <button onClick={() => setContactPopup(true)} className="bg-olivine block uppercase tracking text-white text-xs mb-0 hover:scale-95 font-bold py-2 px-14 rounded-full" type="button" >Add/Update Emergency Contact</button>
                            <AddEmergencyContact trigger={contactPopup} setTrigger={setContactPopup}>
                            </AddEmergencyContact>
                        </div>
                        {/* {hover && (
                        <AlertMessage />
                    )} */}
                    </div>
                    {hover && (
                        <AlertMessage />
                    )}
                </form>
            </div>
        </>
    )
};

export default UpdateUser;