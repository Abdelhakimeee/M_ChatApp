import React from 'react';
import { useEffect, useState, } from "react";
// import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import "./HomePage.scss";

function Homepage() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className='cotainer'>
      <h1>Talk-A-Tive</h1>
      <div>
        <button onClick={()=> setShowLogin(true)}>Login</button>
        <button onClick={()=> setShowLogin(false)}>Sign Up</button>
      </div>

      {showLogin ? <Login /> : <Signup />}
      

      {/* <Login />
      <Signup /> */}
       

    </div>
  );
}

export default Homepage;