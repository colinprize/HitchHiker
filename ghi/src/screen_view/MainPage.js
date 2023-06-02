import AddEmergencyContact from "../components/CreateEmergencyContact";
import ListHikes from "./Hikes";
import { useState } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";


const HomePage = () => {
    const [contactPopup, setContactPopup] = useState(false);



    return (
        <>
            <div className="">
                <h1>
                    Home Page
                </h1>
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
