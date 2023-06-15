import React, { useEffect, useState } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";


function AddEmergencyContact(props) {
    const [fullName, setFullName] = useState('');
    const [relation, setRelation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [contactId, setContactId] = useState('');
    const { token, fetchWithCookie } = useToken();
    // const [existingContact, setExistingContact] = useState(null)

    const fetchEmergencyContact = async () => {
        const tokenUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/token`;
        const response1 = await fetchWithCookie(tokenUrl);
        const user_id = parseInt(response1.account.user_id)
        const url = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/users/${user_id}/contact`;
        const config = {
            credentials: "include",
            method: "get",
            headers: {
                headers: { Authorization: `Bearer ${token}` },
            },
        };

        const response = await fetch(url, config);
        if (response.ok) {
            const existingContact = await response.json();
            if (existingContact) {
                setFullName(existingContact.full_name || '');
                setRelation(existingContact.relation || '');
                setPhoneNumber(existingContact.phone_number || '');
                setEmail(existingContact.email || '');
                setContactId(existingContact.contact_id);
            }
        }
    }

    useEffect(() => {
        if (token) {
            fetchEmergencyContact();
        }
    }, [token]); // eslint-disable-line react-hooks/exhaustive-deps



    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            full_name: fullName,
            relation: relation,
            phone_number: phoneNumber,
            email: email,
        };

        const url = contactId ? `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/users/contact/${contactId}` : `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/users/contact`;
        const fetchConfig = {
            method: contactId ? 'put' : 'post',
            credentials: "include",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            // removed const newContact
            await response.json();
            fetchEmergencyContact();
            props.setTrigger(false);
        }
    };

    return (props.trigger) ? (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-lg flex justify-center items-center p-24">
                <div className="bg-white bg-opacity-80 shadow-md rounded-lg px-4 pt-2 pb-2 m-0">
                    <div className="mt-0 flex items-center justify-end gap-x-6">
                        <button className="rounded-md bg-red-700 px-3 text-sm font-semibold text-white shadow-md hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" onClick={() => props.setTrigger(false)}>X</button>
                    </div>
                    <div className="flex items-center justify-center">
                        <form className="bg-wheat shadow-md rounded px-20 pt-6 pb-8 m-10" onSubmit={handleSubmit} id="emergency-contact-form">
                            <h1
                                className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
                            >{contactId ? 'Update your emergency contact' : 'Please fill out the following emergency contact information!'}</h1>
                            <br />
                            <div className="mt-2">
                                <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                                <input onChange={(e) => setFullName(e.target.value)} value={fullName} placeholder="First Last" required type="text" name="fullName" id="fullName"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                            </div>
                            <div className="mt-2">
                                <label htmlFor="relation" className="block text-sm font-medium leading-6 text-gray-900">Relation to you</label>
                                <input onChange={(e) => setRelation(e.target.value)} value={relation} placeholder="Relation" required type="text" name="relation" id="relation"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                            </div>
                            <div className="mt-2">
                                <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                                <input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} placeholder="ex. 8051234768" required type="tel" name="phoneNumber" id="phoneNumber"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                            </div>
                            <div className="mt-2">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" required type="email" name="email" id="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                            </div>
                            <button className="rounded-md mt-3 bg-olivine px-3 py-2 text-sm font-semibold text-white shadow-md hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"> {contactId ? 'Update' : 'Add'} Contact </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    ) : "";
}

export default AddEmergencyContact
