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
            navigate("/main_page");
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
                        <button onClick={handleSubmit} style={{ "position": "relative", "zIndex": "1" }} className="bg-olivine hover:bg-beryl-green font-bold py-2 px-20 rounded" type="button">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateUser;
