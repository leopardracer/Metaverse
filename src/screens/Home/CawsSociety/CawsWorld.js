import React from "react";
import "./_cawssociety.scss";

import { NavLink } from "react-router-dom";

const CawsWorld = () => {
  return (
    <div className="row flex-column-reverse flex-lg-row px-3 px-lg-5 mt-5 caws-world-wrapper py-5 gap-4 gap-lg-0">
      <div className="col-12 col-lg-6">
        <div className="d-flex flex-column gap-3">
          <h2 className="font-organetto caws-hero-title w-75">
            Introducing the CAWS Timepiece NFT collection
          </h2>
          <p className="caws-hero-content">
            The CAWS Timepiece NFT collection is the second official NFT
            collection created and produced by Dypius. Holders of the original
            CAWS NFT will be able to mint a Timepiece NFT for FREE for each
            original CAWS NFT held. In Addition, the Timepiece NFTs will provide
            users additional utility and perks in the World of Dypians Metaverse
            platform.
          </p>
          <div className="linear-border" style={{ width: "fit-content" }}>
            <NavLink to="/caws-timepiece" className="btn filled-btn px-5">
              View more
            </NavLink>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
        <img src={"https://cdn.worldofdypians.com/wod/cawsSecondBanner.png"} alt="caws banner" className="caws-banner" />
      </div>
    </div>
  );
};

export default CawsWorld;
