// import LogoutButton from './users/Logout'
import { NavLink } from 'react-router-dom';
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState, useEffect } from 'react';



export default function Header() {
    const { fetchWithCookie } = useToken();
    const [loggedIn, setLoggedIn] = useState(false)
    const isLoggedIn = async () => {
        const tokenUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/token`;
        const response = await fetchWithCookie(tokenUrl);
        if (response !== null) {
            setLoggedIn(true)
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <header>
                <nav className="border-gray-200 px-8 lg:px-6 py-4 bg-olivine">
                    {loggedIn ? (
                        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                            <NavLink to="/main_page" className="flex items-center">
                                <img src={require('../images/navlogohitchhiker.png')} className="mr-1 h-16 sm:h-20" alt="Hitch Hiker Logo" />
                                <span className="px-4 self-center text-xl font-semibold whitespace-nowrap dark:text-white">Hitch Hiker</span>
                            </NavLink>
                            <div className="flex items-center lg:order-2">
                                <NavLink to="/listhikes" className="block py-4 pr-4 pl-3 text-white rounded" >All Hikes</NavLink>
                                <NavLink to="/userhikes" className="block py-4 pr-4 pl-3 text-white rounded bg-primary-700 " >Your Hikes</NavLink>
                                <NavLink to="/createhike" className="block py-4 pr-4 pl-3 text-white rounded bg-primary-700 " >Create a Hike</NavLink>
                                <NavLink to="/main_page/update_user" className="text-white focus:ring-4  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 ">Update User Profile</NavLink>
                                {/* <LogoutButton></LogoutButton> */}
                            </div>
                        </div>
                    ) :
                        (
                            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                                <NavLink to="/main_page" className="flex items-center">
                                    <img src={require('../images/navlogohitchhiker.png')} className="mr-1 h-16 sm:h-20" alt="Hitch Hiker Logo" />
                                    <span className="px-4 self-center text-xl font-semibold whitespace-nowrap dark:text-white">Hitch Hiker</span>
                                </NavLink>
                                <div className="flex items-center lg:order-2">
                                    <NavLink to="/" className="text-white focus:ring-4  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 ">Log In/Sign Up</NavLink>
                                </div>
                            </div>
                        )
                    }
                </nav>
            </header>
        </>
    )
}
