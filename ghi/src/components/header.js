import LogoutButton from './users/Logout'

export default function Header() {
    return (
        <>
            <header>
                <nav className="border-gray-200 px-8 lg:px-6 py-4 bg-olivine">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <a href="http://localhost:3000/main_page" className="flex items-center">
                            <img src={require('../images/navlogohitchhiker.png')} className="mr-1 h-16 sm:h-20" alt="Hitch Hiker Logo" />
                            <span className="px-4 self-center text-xl font-semibold whitespace-nowrap dark:text-white">Hitch Hiker</span>
                        </a>
                        <div className="flex items-center lg:order-2">
                            <a href="http://localhost:3000/listhikes" className="block py-4 pr-4 pl-3 text-white rounded" >All Hikes</a>
                            <a href="http://localhost:3000/userhikes" className="block py-4 pr-4 pl-3 text-white rounded bg-primary-700 " >Your Hikes</a>
                            <a href="http://localhost:3000/main_page/update_user" className="text-white focus:ring-4  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 ">Update User Profile</a>
                            {/* <LogoutButton></LogoutButton> */}
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}
