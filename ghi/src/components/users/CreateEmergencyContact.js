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
                <div className="border px-4 py-2">
                    <h1>{contactId ? 'Update your emergency contact' : 'Please fill out the following emergency contact information!'}</h1>
                    <br />
                    <div>
                        <form onSubmit={handleSubmit} id="emergency-contact-form">
                            <div>
                                <input onChange={(e) => setFullName(e.target.value)} value={fullName} placeholder="Full Name" required type="text" name="fullName" id="fullName" />
                                <label htmlFor="fullName">Full Name</label>
                            </div>
                            <div>
                                <input onChange={(e) => setRelation(e.target.value)} value={relation} placeholder="Relation" required type="text" name="relation" id="relation" />
                                <label htmlFor="relation">Relation to you</label>
                            </div>
                            <div>
                                <input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} placeholder="Phone Number" required type="tel" name="phoneNumber" id="phoneNumber" />
                                <label htmlFor="phoneNumber">Phone Number</label>
                            </div>
                            <div>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" required type="email" name="email" id="email" />
                                <label htmlFor="email">Email Address</label>
                            </div>
                            <br />
                            <button className=''> {contactId ? 'Update' : 'Add'} Contact </button>
                        </form>
                        <div className='flex justify-end'>
                            <button className='top-0 right-0 px-3 py-2 rounded hover:scale-95 transition text-xl' onClick={() => props.setTrigger(false)}>Close</button>
                        </div>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    ) : "";
}

export default AddEmergencyContact
