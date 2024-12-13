import React from "react";
import PropTypes from "prop-types";
import TitleWithParagraph from "../General/TitleWithParagraph";
import "./_nftMintingHero.scss";

const NftMintingHero = ({ smallTitle, bigTitle }) => {
  return (
    <div className="container-fluid px-0 d-flex align-items-center justify-content-center pt-5">
      <div
        className="d-flex w-100 flex-column news-main-wrapper2 nft-minting-hero"
        style={{ gap: 0, height: 135 }}
      >
        {/* <div className="bg-image"></div> */}
        <div className="row w-100 px-3 px-lg-5 mx-0 news-container">
          <div className="text-wrapper newpaws">
            <TitleWithParagraph>
              <h1 className="text-white">
                <small>{smallTitle}</small>
                <br />
                {bigTitle}
              </h1>
            </TitleWithParagraph>
          </div>
        </div>
      </div>
    </div>
  );
};

NftMintingHero.propTypes = {
  smallTitle: PropTypes.string,
  bigTitle: PropTypes.string,
};

export default NftMintingHero;
