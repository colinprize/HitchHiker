import useToken from "@galvanize-inc/jwtdown-for-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LogoutButton = () => {
    const { logout } = useToken();
    return (
        <div className="flex justify-center items-center">
            <button onClick={logout} style={{ "position": "relative", "zIndex": "10" }} className="bg-olivine hover:bg-beryl-green font-bold py-2 px-20 rounded" type="button">
                Log out
            </button>
        </div>
    )
}
export default LogoutButton;
