import React from "react";
import "./Footer.scss";

function Footer() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if(currentUser!==null){
    if(currentUser.isAdmin){
      return(<></>)
    }
  }

  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>About</h2>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact Sales</span>
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Selling on Skillsprint</span>
            <span>Buying on Skillsprint</span>
          </div>
          <div className="item">
            <h2>Community</h2>
            <span>Customer Success Stories</span>
            <span>Forum</span>
            <span>Blog</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>Skillsprint.</h2>
            <span>© Skillsprint International Ltd. 2024</span>
          </div>
          
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/instagram.png" alt="" />
            </div>
            <div className="link">
              <img src="/img/language.png" alt="" />
              <span>English</span>
            </div>
            <img src="/img/accessibility.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
