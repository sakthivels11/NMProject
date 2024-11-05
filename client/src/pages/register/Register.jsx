import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
// import path from path
import * as path from 'node:path';

function Register() {
  const navigate = useNavigate();
  const [profImg, setProfImg] = useState(null);
  const [resume, setResume] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    resume: "",
    country: "",
    isSeller: false,
    desc: "",
  });
  console.log(resume)
  console.log(profImg)
  console.log(user)
  

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value }; //here e.target.name returns the name of the field which called the handleChange function. 
    });
  };

  const handleSeller = (e) => {
    if(e.target.checked){
      document.getElementById("resume-label").hidden=false
      document.getElementById("resume-check").hidden=false
      console.log("Seller check");
    }
    else{
      document.getElementById("resume-label").hidden=true
      document.getElementById("resume-check").hidden=true
      console.log("Seller unchecked");
    }
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profImgurl = await upload(profImg);
    const resumeurl = await upload(resume);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: profImgurl,
        resume: resumeurl,
      });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input required name="profimg" type="file" onChange={
            // handleChange
            (e) => setProfImg(e.target.files[0]) 
          } />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="India"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 890"
            onChange={handleChange}
          />
          <label hidden id="resume-label" htmlFor="">Freelancer Resume</label>
          <input hidden id="resume-check" name="resume" type="file" onChange={
            // handleChange
            (e) => setResume(e.target.files[0]) 
          } />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
