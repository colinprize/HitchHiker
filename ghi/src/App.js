import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import Nav from './components/Nav';
// import MainPage from "./screen_view/MainPage.js";
// // import ErrorNotification from "./ErrorNotification";
import LandingPage from "./screen_view/LandingPage"
import CreateUser from "./components/users/CreateUser";
import Footer from './components/footer';
import Header from './components/header.js';
import UpdateUser from './components/users/UpdateUser';
import CreateHikeForm from "./components/hikes/CreateHikeForm";
import ListHikes from "./screen_view/Hikes";
import CreateRideForm from "./components/rides/CreateRideForm.js";
import ListUserHikes from './screen_view/UserHikes.js';
import RidesList from './screen_view/Rides.js';
import AboutUs from './screen_view/AboutUs';
import UserRidesList from './screen_view/UserRides';
import "./footer.css";


export default function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');


  return (
    <>
      <BrowserRouter basename={basename}>
        <Header />
        <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create_user" element={<CreateUser />} />
          <Route path="/update_user" element={<UpdateUser />} />
          <Route path="/createhike" element={<CreateHikeForm />} />
          <Route path="/listhikes" element={<ListHikes />} />
          <Route path="/userhikes" element={<ListUserHikes />} />
          <Route path="/create_ride" element={<CreateRideForm />} />
          <Route path="/rides" element={<RidesList />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/userrides" element={<UserRidesList />} />
        </Routes>
        <Footer />
        </>
      </BrowserRouter>
    </>
  )
}
