import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };


  const { isLoading, error, data } = useQuery({
    queryKey: ["gig_categories"],
    queryFn: () =>
      newRequest
        .get(
          `/gig_categories`
        )
        .then((res) => {
          return res.data;

        }),
  });


  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("currentUser")
      localStorage.clear();
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if(currentUser!==null){
    if(currentUser?.isAdmin){
      return(
        <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
        <div className="container">
          <div className="logo">
            <Link className="link" to="/adminhome">
              <span className="text">Skillsprint</span>
            </Link>
            <span className="dot">.</span>
          </div>
          <div className="links">
            {/* <Link className="link" to="/gigs">
              <span>Explore</span>
            </Link> */}
  
              <div className="user" onClick={() => setOpen(!open)}>
                <img src={currentUser?.img || "/img/noavatar.jpg"} alt="" />
                <span>{currentUser?.username}</span>
                {open && (
                  <div className="options">
                    <Link className="link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
                )}
              </div>
          </div>
        </div>
      </div>
  
  
      )
    }
  }




  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Skillsprint</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          {/* <span>Skillsprint Business</span> */}
          <Link className="link" to="/gigs">
            <span>Explore</span>
          </Link>
          {/* <span>English</span> */}
          {/* {!currentUser?.isSeller && <span>Become a Seller</span>} */}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser?.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller ? (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  ) : <></>}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>



                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">

          {/* There are two methods to place conditional and iterative statements in react
          1. using the whole isLoading : error 
          2. using ? in the react syntax*/}
            {/* {isLoading
              ? "loading"
              : error
              ? "Something went wrong!"
              : data.map((gig) => <Link className="link menuLink">{gig.cat}</Link>)} */}

            {data?.map((category) => <Link key={category._id} className="link menuLink" to={`/gigs?cat=${category.name}`}>{category.name}</Link>)}

            {/* <Link key={1} className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link key={2} className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link key={3} className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link key={4} className="link menuLink" to="/">
              AI Services
            </Link>
            <Link key={5} className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link key={6} className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link key={7} className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link key={8} className="link menuLink" to="/">
              Business
            </Link>
            <Link key={9} className="link menuLink" to="/">
              Lifestyle
            </Link> */}
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
