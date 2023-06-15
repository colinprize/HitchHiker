import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";


function CreateUser() {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [uniName, setUniName] = useState("");
    const [uniYear, setUniYear] = useState("");
    const { token, register } = useToken();

    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            navigate("/listhikes");
        }
    }, [token]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {}
        data.full_name = fullName;
        data.username = username;
        data.password = password;
        data.email = email;
        data.university_name = uniName;
        data.university_year = uniYear;
        register(data, `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/signup`);
    }

    return (
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
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                            University Name
                        </label>
                        <input value={uniName} onChange={(e) => setUniName(e.target.value)} class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
                    </div>
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                            University Year
                        </label>
                        <input value={uniYear} onChange={(e) => setUniYear(e.target.value)} class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
                    </div>
                </div>
                <div className="flex justify-center items-center mt-10">
                    <button onClick={handleSubmit} style={{ "position": "relative", "zIndex": "1" }} className="bg-olivine text-white hover:scale-95 font-bold py-2 px-24 rounded-full" type="button">
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateUser;
