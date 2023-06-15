import { useNavigate, NavLink } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState, useEffect } from 'react';
import { BsFillArrowRightSquareFill, BsCarFrontFill } from 'react-icons/bs';
import { FaMountain } from 'react-icons/fa';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { MdAddBox, MdOutlineFormatListBulleted } from 'react-icons/md';
import { HomeIcon, Cog6ToothIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/react/20/solid";


const Header = () => {
    const navigate = useNavigate();
    const { logout, fetchWithCookie, token } = useToken();
    const [loggedIn, setLoggedIn] = useState(false)
    const [tokenInfo, setTokenInfo] = useState("");
    const logoutButton = () => {
        logout();
        navigate("/");
    };
    const isLoggedIn = async () => {
        const tokenUrl = `${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/token`;
        const response = await fetchWithCookie(tokenUrl);
        if (response !== null) {
            setLoggedIn(true);
            setTokenInfo(response);
        } else {
            setLoggedIn(false)
            navigate("/");
        }
    }
    console.log(tokenInfo)

    useEffect(() => {
        isLoggedIn();
    }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div>
                <nav className="border-gray-200 fixed h-full col-1 lg:px-2 py-5 bg-olivine items-center">
                    {loggedIn ? (
                        <div className="justify-items-center">
                            <div className="lg:order-2">
                                <ul className="list-none mt-0">
                                    <li>
                                        <NavLink to="/listhikes">
                                            <img src={require('../images/navlogohitchhiker.png')} className="ml-3 rounded-lg sm:h-20" alt="Hitch Hiker Logo" />
                                            {/* <span className="px-4 self-center text-2xl font-semibold whitespace-nowrap text-white">Hitch Hiker</span> */}
                                        </NavLink>
                                    </li>
                                    <li>

                                        <NavLink to="/listhikes" className="block pt-5 pb-3 pr-4 pl-3 text-white text-center rounded hover:text-wheat hover:transform hover:scale-105 transition-all duration-100">
                                            <HomeIcon className="h-6 w-20" />
                                            Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/userhikes" className="block py-3 pr-4 pl-3 text-white rounded bg-primary-700 text-center hover:text-wheat hover:transform hover:scale-105 transition-all duration-100">
                                            <FaMountain className="h-5 w-20" />
                                            My Hikes
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/createhike" className="block py-3 pr-4 pl-3 text-white text-center rounded bg-primary-700 hover:text-wheat hover:transform hover:scale-105 transition-all duration-100">
                                            <MdAddBox className="h-7 w-20" />
                                            Add Hike
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/rides" className="block py-3 pr-4 pl-3 text-white text-center rounded bg-primary-700 hover:text-wheat hover:transform hover:scale-105 transition-all duration-100">
                                            <MdOutlineFormatListBulleted className="h-7 w-20" />
                                            Ride List
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/rides" className="block py-3 pr-4 pl-3 text-white text-center rounded bg-primary-700 hover:text-wheat hover:transform hover:scale-105 transition-all duration-100">
                                            <BsCarFrontFill className="h-7 w-20" />
                                            My Rides
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/update_user" className="fixed bottom-24 block py-3 pr-4 pl-3 text-white text-center rounded bg-primary-700 hover:text-wheat hover:transform hover:scale-105 transition-all duration-100">
                                            <Cog6ToothIcon className="h-5 w-20" />
                                            Settings
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button onClick={logoutButton} className="fixed bottom-8 block py-3 pr-4 pl-3 mb-2 text-white hover:text-wheat hover:transform hover:scale-105 transition-all duration-100" type="button">
                                            <BsFillArrowRightSquareFill className="h-5 w-20" />
                                            Sign Out
                                        </button>
                                    </li>
                                    <li>
                                        <p className="fixed bottom-0 block py-5 pr-4 pl-3 text-blue-600" type="button">
                                            <LockOpenIcon className="h-5 w-20" />
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) :
                        (
                            <div className="justify-between items-center">
                                <div className="lg:order-2">
                                    {/* <div className="flex items-center lg:order-2"> */}
                                    <ul className="list-none mt-0">
                                        <li>
                                            <NavLink to="/">
                                                <img src={require('../images/navlogohitchhiker.png')} className="ml-3 rounded-lg sm:h-20" alt="Hitch Hiker Logo" />
                                                {/* <span className="px-4 self-center text-xl font-semibold whitespace-nowrap text-white">Hitch Hiker</span> */}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/" className="block pt-5 pb-3 pr-4 pl-3 text-white text-center rounded hover:text-wheat hover:transform hover:scale-105 transition-all duration-100">
                                                <RiArrowGoBackLine className="h-6 w-20" />
                                                Login
                                            </NavLink>
                                        </li>
                                        <li>
                                            <p className="fixed bottom-0 block py-5 pr-4 pl-3 text-red-600" type="button">
                                                <LockClosedIcon className="h-5 w-20" />
                                            </p>
                                        </li>
                                    </ul>
                                    {/* </div> */}
                                </div>
                            </div>
                        )
                    }
                </nav>

            </div>
        </>
    )
}
export default Header;
