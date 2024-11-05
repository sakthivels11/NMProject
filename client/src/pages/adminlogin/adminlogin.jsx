import React, { useState, useEffect } from "react";
import "./adminlogin.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // useEffect(()=>{
  //   if(localStorage.getItem("currentUser")!=="null"){
  //     navigate("/")
  //   }
  // })

  // if(false){
  //   console.log("Hello");
  //   useEffect(() => {navigate("/")})
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      console.log("MYRESPONSE:  \n",res)
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      if(JSON.parse(localStorage.getItem("currentUser")).isAdmin){
        navigate("/adminhome")
        window.location.reload()
      }
      else{
        navigate("/")
      }
    } catch (err) {
      console.log(err)
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <label htmlFor="">Admin Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Admin Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && error}
      </form>
    </div>
  );
}

export default AdminLogin;
