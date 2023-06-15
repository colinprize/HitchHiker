import { NavLink } from "react-router-dom"

export default function Footer() {
    return (
        <>
            <div className="">
                <footer className="mountain-footer fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 HitchHiker™</span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <NavLink className="mr-4 hover:underline md:mr-6" to='/contact'>
                            About
                        </NavLink>
                        <li>
                            <p className="mr-4 hover:underline md:mr-6">Privacy Policy</p>
                        </li>
                        <li>
                            <p className="mr-4 hover:underline md:mr-6">Licensing</p>
                        </li>
                        <NavLink className="mr-4 hover:underline md:mr-6" to='/contact'>
                            Contact
                        </NavLink>
                    </ul>
                </footer>
            </div>
        </>
    )
}
