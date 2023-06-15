import { NavLink } from "react-router-dom";
import AboutUs from "../screen_view/AboutUs";
import { useState } from 'react';

export default function Footer() {
    return (
        <>
            <div>
                <footer className="mountain-footer flex bottom-0 ml-32 bg-white border-gray-200 shadow md:flex md:items-center md:justify-between md:p-2">
                    <span className="text-sm text-gray-500 sm:text-center ml-0 dark:text-gray-400">© 2023 HitchHiker™</span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <NavLink to="/aboutus" className="mr-4 hover:underline md:mr-6">About Us</NavLink>
                        </li>
                        <li>
                            <p className="mr-4 hover:underline md:mr-6">Privacy Policy</p>
                        </li>
                        <li>
                            <p className="mr-4 hover:underline md:mr-6">Licensing</p>
                        </li>
                        <li>
                            <p className="hover:underline">Contact</p>
                        </li>
                    </ul>
                </footer>
            </div>
        </>
    )
}
