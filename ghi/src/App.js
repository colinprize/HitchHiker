import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import MainPage from "./MainPage.js";
import ErrorNotification from "./ErrorNotification";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./Login";

export default function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<LoginForm />}/>
      {/* <Nav />
      <div className="container">
       
        
      </div> */}
      </Routes>
    </BrowserRouter>
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
