import React, { useEffect, useState } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";


function AddEmergencyContact(props) {
    const [fullName, setFullName] = useState('');
    const [relation, setRelation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [contactId, setContactId] = useState('');
    const { token, fetchWithCookie } = useToken();
    const [existingContact, setExistingContact] = useState(null)

    useEffect(() => {
        fetchEmergencyContact();
    }, []);

    const fetchEmergencyContact = async () => {
        const tokenUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/token`;
        const response1 = await fetchWithCookie(tokenUrl);
        const user_id = parseInt(response1.account.user_id)
        const url = `http://localhost:8000/users/${user_id}/contact/`;
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            full_name: fullName,
            relation: relation,
            phone_number: phoneNumber,
            email: email,
        };

        const url = contactId ? `http://localhost:8000/users/contact/${contactId}` : 'http://localhost:8000/users/contact';
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
            const newContact = await response.json();
            fetchEmergencyContact();
            props.setTrigger(false);
        }
    };

    return (props.trigger) ? (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                <div className="bg-pine-glade shadow-md rounded px-20 pt-6 pb-8 m-4">
                    <h1
                        className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
                    >{contactId ? 'Update your emergency contact' : 'Please fill out the following emergency contact information!'}</h1>
                    <div className="flex items-center justify-center">
                        <form className="bg-pine-glade shadow-md rounded px-24 pt-6 pb-8 m-10" onSubmit={handleSubmit} id="emergency-contact-form">
                            <div className="mt-2">
                                <input onChange={(e) => setFullName(e.target.value)} value={fullName} placeholder="Full Name" required type="text" name="fullName" id="fullName"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                            </div>
                            <div className="mt-2">
                                <input onChange={(e) => setRelation(e.target.value)} value={relation} placeholder="Relation" required type="text" name="relation" id="relation"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <label htmlFor="relation" className="block text-sm font-medium leading-6 text-gray-900">Relation to you</label>
                            </div>
                            <div className="mt-2">
                                <input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} placeholder="Phone Number" required type="tel" name="phoneNumber" id="phoneNumber"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                            </div>
                            <div className="mt-2">
                                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" required type="email" name="email" id="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
                            </div>
                            <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> {contactId ? 'Update' : 'Add'} Contact </button>
                        </form>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => props.setTrigger(false)}>Close</button>
                        </div>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    ) : "";
}

export default AddEmergencyContact
