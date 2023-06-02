import useToken from "@galvanize-inc/jwtdown-for-react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateUserButton from './CreateUserButton'

const LoginForm = () => {
  const { token, login } = useToken();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/main_page")
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password)
  }
  return (
    <>
      <div className="flex items-center justify-center mb-0">
        <form  className="bg-wheat shadow-md rounded px-20 pt-6 pb-8 mb-4">
          <h1 className=" text-olivine text-center text-4xl mb-2">Hitch Hiker</h1>
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
          <div className="flex justify-center items-center">
            <button onClick={handleSubmit} className="bg-olivine hover:bg-beryl-green font-bold py-2 px-20 rounded" type="button">
              Log in
            </button>
            <a className="inline-block align-baseline font-bold hover:text-olivine px-5" href="#">
            Reset Password
            </a>
          </div>
        </form>
      </div>
      <CreateUserButton />
    </>
  );
};

export default LoginForm;