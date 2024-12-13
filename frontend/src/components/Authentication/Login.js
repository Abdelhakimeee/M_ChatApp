import { useState } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import { ChatState } from "../../Context/ChatProvider";
import "./Login.scss"

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  
  return (
    <div>
      <p>Login</p>
      <div >
        <label htmlFor="emailLogin">Email:</label>
        <input
          id="emailLogin" placeholder="Enter Your Email" type="email"
          onChange={(e) => setEmail(e.target.value)}
          // value={email}
        />

        <label htmlFor="passwordLogin">Password:</label>
        <input
          id="passwordLogin" placeholder="Enter Your Password" type="password"
          onChange={(e)=> setPassword(e.target.value)}
        />

        <button
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456exaple");
          }}
      >
          Login</button>
        
        <button
        >Get Guest User Credentials</button>

      </div>
      
      
   </div>
  );
};

export default Login;
