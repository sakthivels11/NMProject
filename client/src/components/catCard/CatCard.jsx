import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

function CatCard({ card }) {
  return (
      <Link to={`/gigs?cat=${card.name}`}>
      <div className="catCard">
        <img src={card.image} alt="" />
        {/* <span className="desc">{card.desc}</span> */}
        <span className="title">{card.name}</span>
      </div>
    </Link>
  );
}
export default CatCard;
