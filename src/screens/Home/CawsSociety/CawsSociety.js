import React from "react";



import { NavLink } from "react-router-dom";
import "./_cawssociety.scss";

const CawsSociety = ({content}) => {
  return (
    <div className="row px-3 px-lg-5 mt-5 gap-4 gap-lg-0">
      <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-start">
        <img src={"https://cdn.worldofdypians.com/wod/cawsFirstBanner.png"} alt="caws banner" className="caws-banner" />
      </div>
      <div className="col-12 col-lg-6">
        <div className="d-flex flex-column gap-3">
          <h2 className="font-organetto caws-hero-title">
            The world of the CAWS society
          </h2>
          <p className="caws-hero-content">
           {content}
          </p>
          <div className="linear-border" style={{ width: "fit-content" }}>
            <NavLink className="btn filled-btn px-5" to="/caws">
              View more
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CawsSociety;
