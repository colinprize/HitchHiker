import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import MainPage from "./MainPage.js";
import ErrorNotification from "./ErrorNotification";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./Login";
import CreateRideForm from "./CreateRideForm";
import UserFormExample from "./UserFormExample";
import image from "./images/FE0zrlrXsAcFgjl.jpg"

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${image})`, }}>

        <Routes>
          {/* <Route path="/" element={<LoginForm />} /> */}
          <Route path="/" element={<CreateRideForm />} />
          {/* <Route path="/" element={<UserFormExample />} /> */}
          {/* <Nav /> */}
        </Routes>

      </div>
    </BrowserRouter >

    // <AuthProvider>
    //   <BrowserRouter>
    //     <Nav />
    //       <div className="container">
    //         <Routes>
    //         </Routes>
    //       </div>
    //   </BrowserRouter>
    // </AuthProvider>
  )
}
