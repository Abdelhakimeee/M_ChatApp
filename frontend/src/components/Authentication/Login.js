import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import "./Login.scss"

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      alert('Please Fill all the Fields')
      setLoading(false);
      return;
    }
                 
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "api/user/login",
        { email, password },
        config
      );

      alert("Login Successful");
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate('/chats');
    } catch (error) {
      alert(`Error Occurred: ${error.response?.data?.message || error.message}`);
      setLoading(false);
    }

  }
  return (
    <div>
      <p>Login</p>
      <div >
        <label htmlFor="emailLogin">Email:</label>
        <input
          id="emailLogin" placeholder="Enter Your Email" type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <label htmlFor="passwordLogin">Password:</label>
        <input
          id="passwordLogin" placeholder="Enter Your Password" type="password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
        />

        <button
          onClick={submitHandler}
        >Login</button>
        
        <button
        >Get Guest User Credentials</button>

      </div>
      
      
   </div>
  );
};

export default Login;
