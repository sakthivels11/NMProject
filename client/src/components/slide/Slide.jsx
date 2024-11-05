import React from "react";
// import Slider from "infinite-react-carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slide.scss";

const Slide = ({...settings}) => {
  return (
    <div className="slider-main-container">
      <div className="slider-container">
          <Slider {...settings}>
            {/* {children} */}
          </Slider>
      </div>
    </div>
  );
};


export default Slide;