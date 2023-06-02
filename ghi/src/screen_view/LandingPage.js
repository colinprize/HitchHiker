import React from 'react';
import LoginForm from "../components/users/Login.js";


export default function LandingPage() {
return (
        <>
            <div className="flex items-center justify-center mb-10 mt-10">
                <h1 className="flex text-center">Take your education to new heights!!</h1>
            </div>
            <LoginForm />
        </>
    )
};
