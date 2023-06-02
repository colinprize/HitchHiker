import React from 'react';

function CreateUserButton(){
    return (
        <>
        <div className="flex justify-center">
            <div className="flex justify-center items-center">
                <p className="mr-3">Don't have an account?</p>
                <a href="/create_user" className=" items-center text-olivine hover:text-beryl-green font-bold py-2 px-4" type="button">
                Create an Account
                </a>
            </div>
        </div>  
        </>
    )
}

export default CreateUserButton;