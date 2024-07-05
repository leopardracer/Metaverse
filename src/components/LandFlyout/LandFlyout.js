import React from "react";
import "./_landflyout.scss";
import planetgif from "./assets/planetgif.mp4";
import goto from "./assets/goto.svg";
import closeFly from "./assets/closeFly.svg";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import flyoutChest from './assets/flyoutChest.png'

const LandFlyout = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);

  return (
    <div className={`fly-position ${show && "fly-active"}`}>
      <div className="fly-outer-wrapper position-relative">
        <img src={closeFly} alt="close flyout" className="close-fly p-2" onClick={() => setShow(false)} />
        <NavLink to='/account' className="fly-inner-wrapper p-3 d-flex align-items-center flex-column gap-2" style={{cursor: 'pointer', textDecoration: 'none'}} onClick={() => setShow(false) }>
          <h6 className="fly-title font-organetto">Daily
          <span style={{color: '#09d7b7', marginLeft: '5px'}} className="font-organetto">Rewards</span>
          </h6>
          {/* <video
            preload="auto"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "100%", height: "100%" }}
          >
            <source 
            src={planetgif}
             />
          </video> */}
          <img src={flyoutChest} style={{width: "100%", height: "100%"}} className="flyout-chest" alt="" />
          <div className="d-flex align-items-center gap-2">
            <h6 className="fly-action mb-0">Open</h6>
            <img src={goto} alt="go to" />
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default LandFlyout;
