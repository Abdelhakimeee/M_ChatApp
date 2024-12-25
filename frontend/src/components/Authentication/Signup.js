import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
  
import "./Signup.scss"

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();


  const submitHandler = async () => {
    setLoading(true);

    if (!name || !email || !password || !confirmpassword) {
      alert("Please Fill all the Feilds");
      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      alert("Passwords Do Not Match")
      setLoading(false);
      return;
    }
    console.log(name, email, password, pic);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      console.log(data);

      alert("Registration successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);

      // توجيه المستخدم إلى صفحة الدردشات
      navigate("/chats");

    } catch (error) {
      alert(`Error occurred: ${error.response?.data?.message || error.message}`);
      setLoading(false);
    }
  };



  const postDetails = (pics) => {
    // setPicLoading(true) ...   you can use multer + creat folder to save the pickturs in (public) the project.
    // You have the Code here.
    // https://github.com/piyush-eon/mern-chat-app/blob/master/frontend/src/components/Authentication/Signup.js.
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

        <label htmlFor="Confirmpassword">Confirmpassword:</label>
        <input 
          id="Confirmpassword"  placeholder="Enter Your Confirmpassword" required
          type="password" 
          onChange={(e)=> setConfirmpassword(e.target.value)}
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
          // className="dd.."
          onClick={submitHandler}
        >Sign Up</button>
       
      </div>

   </div>
  );
};

export default Signup;
    