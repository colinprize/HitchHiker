import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import MainPage from "./screen_view/MainPage.js";
import ErrorNotification from "./ErrorNotification";
import LandingPage from "./screen_view/LandingPage"
import CreateHikeForm from "./components/hikes/CreateHikeForm";
import ListHikes from "./screen_view/Hikes";
import CreateRideForm from "./CreateRideForm";
import UserFormExample from "./UserFormExample";
import image from "./images/FE0zrlrXsAcFgjl.jpg";
// import UserFormExample from "./UserFormExample";

import RidePopupStart from "./ridePopUp/startPageTest";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/main_page" element={<MainPage />} />
      <Route path="/createhike" element={<CreateHikeForm />} />
      <Route path="/listhikes" element={<ListHikes />} />
      <Route path="/create_ride" element={<CreateRideForm />} />
      <Route path="/popup_test" element={<RidePopupStart />} />
    </Routes>
  )
}
