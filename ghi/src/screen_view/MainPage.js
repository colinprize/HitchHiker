import AddEmergencyContact from "../components/users/CreateEmergencyContact";
import ListHikes from "./Hikes";
import { useState } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";
import LogoutButton from '../components/users/Logout.js'

const HomePage = () => {
    const [contactPopup, setContactPopup] = useState(false);



    return (
        <>
            <div className="">
                <h1>
                    Home Page
                </h1>
                <LogoutButton />
                <br />
                <button onClick={() => setContactPopup(true)}>Add an emergency contact</button>
                <AddEmergencyContact trigger={contactPopup} setTrigger={setContactPopup}>
                </AddEmergencyContact>
                <br />
                <br />
                <br />
            </div>
        </>
    )
}

export default HomePage
