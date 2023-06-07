import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import Nav from './components/Nav';
import MainPage from "./screen_view/MainPage.js";
// // import ErrorNotification from "./ErrorNotification";
import LandingPage from "./screen_view/LandingPage"
import CreateUser from "./components/users/CreateUser";
import Footer from './components/footer';
import Header from './components/header.js';
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import UpdateUser from './components/users/UpdateUser';
import CreateHikeForm from "./components/hikes/CreateHikeForm";
import ListHikes from "./screen_view/Hikes";
import CreateRideForm from "./components/rides/CreateRideForm.js";
import ListUserHikes from './screen_view/UserHikes.js';
import "./footer.css";


export default function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');

  return (
    <>
      <BrowserRouter basename={basename}>
        <Header />
        <AuthProvider baseUrl={process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/main_page" element={<MainPage />} />
            <Route path="/create_user" element={<CreateUser />} />
            <Route path="/main_page/update_user" element={<UpdateUser />} />
            <Route path="/createhike" element={<CreateHikeForm />} />
            <Route path="/listhikes" element={<ListHikes />} />
            <Route path="/userhikes" element={<ListUserHikes />} />
            <Route path="/create_ride" element={<CreateRideForm />} />
          </Routes>
        </AuthProvider>
        <Footer />
      </BrowserRouter>
    </>
  )
}
