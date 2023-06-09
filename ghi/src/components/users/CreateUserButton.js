import React from 'react';
import { NavLink } from 'react-router-dom';

function CreateUserButton(){
    return (
        <>
        <div className="flex justify-center">
            <div className="flex justify-center items-center">
                <p className="mr-3">Don't have an account?</p>
                <NavLink to="/create_user" style={{ "position": "relative", "zIndex": "1" }} className=" items-center text-olivine hover:scale-105 font-bold py-2 px-4" type="button">
                Create an Account
                </NavLink>
            </div>
        </div>  
        </>
    )
}

export default CreateUserButton;