import { useNavigate, NavLink } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState, useEffect } from 'react';
import { BsArchiveFill, BsFillArrowRightSquareFill } from 'react-icons/bs';
import { HomeIcon, Cog6ToothIcon, LockClosedIcon, LockOpenIcon, DocumentPlusIcon } from "@heroicons/react/20/solid";


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
                                <ul className="list-none mt-2">
                                    <li>
                                        <NavLink to="/listhikes">
                                            <img src={require('../images/navlogohitchhiker.png')} className="ml-3 rounded-lg sm:h-20" alt="Hitch Hiker Logo" />
                                            {/* <span className="px-4 self-center text-2xl font-semibold whitespace-nowrap text-white">Hitch Hiker</span> */}
                                        </NavLink>
                                    </li>
                                    <li>

                                        <NavLink to="/listhikes" className="block pt-10 pb-5 pr-4 pl-3 text-white text-center rounded hover:text-wheat">
                                            <HomeIcon className="h-6 w-20" />
                                            Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/userhikes" className="block py-5 pr-4 pl-3 text-white rounded bg-primary-700 text-center hover:text-wheat">
                                            <BsArchiveFill className="h-6 w-20"/>
                                            My Hikes
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/createhike" className="block py-5 pr-4 pl-3 text-white text-center rounded bg-primary-700 hover:text-wheat">
                                            <DocumentPlusIcon className="h-6 w-20" />
                                            Add Hike
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/update_user" className="block py-5 pr-4 pl-3 text-white text-center rounded bg-primary-700 hover:text-wheat">
                                            <Cog6ToothIcon className="h-6 w-20" />
                                            Settings
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button onClick={logoutButton} className="block py-5 pr-4 pl-3 underline text-white hover:text-wheat" type="button">
                                            <BsFillArrowRightSquareFill className="h-6 w-20" />
                                            Sign Out
                                        </button>
                                    </li>
                                    <li>
                                        <p className="fixed bottom-0 block py-5 pr-4 pl-3 text-white" type="button">
                                            <LockOpenIcon className="h-8 w-20" />
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) :
                        (
                            <div className="justify-between items-center">
                                <NavLink to="/" className="items-center">
                                    <img src={require('../images/navlogohitchhiker.png')} className="h-16 sm:h-20 rounded" alt="Hitch Hiker Logo" />
                                    {/* <span className="px-4 self-center text-xl font-semibold whitespace-nowrap text-white">Hitch Hiker</span> */}
                                </NavLink>
                                <div className="flex items-center lg:order-2">
                                    <ul className="list-none mt-5">
                                        <li>
                                            <NavLink to="/" className="block py-4 pr-4  text-white rounded bg-primary-700 hover:text-wheat">Back to Login</NavLink>
                                        </li>
                                        <li>
                                            <p className="fixed bottom-0 block py-5 pr-4 pl-3 text-white" type="button">
                                                <LockClosedIcon className="h-8 w-20" />
                                            </p>
                                        </li>
                                    </ul>
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
