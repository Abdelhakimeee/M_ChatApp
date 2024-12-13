import { useState } from "react";
// import axios from "axios";
// import { useHistory } from "react-router";
import "./Signup.scss"

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  // const [confirmpassword, setConfirmpassword] = useState();

  const postDetails = (pics) => {
    // setPicLoading(true) ...
  }
  
  const submitHandler = () => {
    
  }

  return (
    <div>
      <p>Sign Up</p>
      <div>
        <label htmlFor="first-name">Name:</label>
        <input 
          id="first-name" type="text" placeholder="Enter Your Name" required
          onChange={(e)=> setName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input 
          id="email" type="email" placeholder="Enter Your 'Email'" required
          onChange={(e)=> setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input 
          id="password"  placeholder="Enter Your password" required
          type="password" 
          onChange={(e)=> setPassword(e.target.value)}
        />

        <label htmlFor="pic">Picture:</label>
        <input 
          id="pic"  placeholder="Enter Your Picture" required
          type="file" 
          onChange={(e) => postDetails(e.target.files[0])}
          accept="image/*"
          p={1.5}
        />
        <button 
          className="dd.."
          onClick={submitHandler}
        >Sign Up</button>
       
      </div>

   </div>
  );
};

export default Signup;
    