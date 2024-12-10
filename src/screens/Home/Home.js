import React, { useEffect } from "react";
import "./_home.scss";

import MarketPlace from "./GameMarketplace/Marketplace";
import VideoWrapper from "./VideoWrapper/VideoWrapper";
import ExplorerGrid from "./ExplorerGrid/ExplorerGrid";
// import CawsSociety from "./CawsSociety/CawsSociety";
// import CawsWorld from "./CawsSociety/CawsWorld";
// import Discord from "./Discord/Discord";
// import LandNft from "./LandNFT/LandNft";
// import Utilities from "./Utilities/Utilities";
// import MarketSection from "../Marketplace/MarketSection";
// import MintPopup from "../../components/TimepieceMint/MintPopup";
import OutsideClickHandler from "react-outside-click-handler";
import { useState } from "react";
// import avalanchePopup from "../../components/TimepieceMint/assets/avalanchePopup.png";
// import coin98Popup from "../../components/TimepieceMint/assets/coin98Popup.png";
// import basePopup from "../../components/TimepieceMint/assets/basePopup.png";
// import confluxPopup from "../../components/TimepieceMint/assets/confluxPopup.png";
// import entryCampaignBanner from "../../components/TimepieceMint/assets/entryCampaignBanner.png";
// import dailyGameDelightBanner from "../../components/TimepieceMint/assets/dailyGameDelightBanner.png";
// import dypiansDiscoveryQuest from "../../components/TimepieceMint/assets/dypiansDiscoveryQuest.webp";

// import dogePopup from "../../components/TimepieceMint/assets/dogePopup.png";
import mantaPopup from "../../components/TimepieceMint/assets/mantaPopup.png";
// import gatePopup from "../../components/TimepieceMint/assets/gatePopup.webp";
// import cmcPopup from "../../components/TimepieceMint/assets/cmcPopup.webp";

// import dypiusPopup from "../../components/TimepieceMint/assets/dypiuspremiumPopup.webp";
// import opbnbPopup from "../../components/TimepieceMint/assets/opbnbPopup.webp";

// import coingeckoPopup from "../../components/TimepieceMint/assets/coingeckoPopup.png";
// import treasureHuntPopup from "../../components/TimepieceMint/assets/treasureHuntPopup.png";
// import treasureHuntGate from "../../components/TimepieceMint/assets/treasureHuntGate.webp";
// import baseTreasureHuntPopup from "../../components/TimepieceMint/assets/baseTreasureHuntPopup.webp";
// import dogeTreasureHuntPopup from "../../components/TimepieceMint/assets/dogeTreasureHunt.webp";
// import skalePopup from "../../components/TimepieceMint/assets/skalePopup.webp";

// import cmcTreasureHuntPopup from "../../components/TimepieceMint/assets/cmcTreasureHunt.webp";
// import corePopupBg from "../../components/TimepieceMint/assets/corePopupBg.webp";
// import victionPopupBg from "../../components/TimepieceMint/assets/victionPopupBg.webp";
// import immutablePopup from "../../components/TimepieceMint/assets/immutablePopup.webp";
// import taikoPopup from "../../components/TimepieceMint/assets/taikoPopup.png";
// import taikoTreasureHunt from "../../components/TimepieceMint/assets/taikoTreasureHunt.png";
// import bnbcampaign from "../../components/TimepieceMint/assets/bnbcampaign.webp";
// import festivecampaign from "../../components/TimepieceMint/assets/festiveCampaign.webp";

// import multiversXPopupBg from "../../components/TimepieceMint/assets/multiversXPopupBg.webp";

// import confluxTreasureHunt from "../../components/TimepieceMint/assets/confluxTreasureHunt.png";
// import LiveEvents from "./LiveEvents/LiveEvents";
import WodBuilders from "./WodBuilders/WodBuilders";
import GameUpdates from "./GameUpdates/GameUpdates";
import WodPartners from "./WodBuilders/WodPartners";
import GameStats from "./GameStats/GameStats";
import Investors from "../Token/Investors/Investors";

const Home = ({
  handleRegister,
  handleDownload,
  monthlyPlayers,
  percent,
  allStarData,
  totalSupply,
  wodHolders,
totalVolumeNew
}) => {
  const mantaInfo = {
    title: "Manta",
    img: mantaPopup,
    state: "manta",
  };

  const [activePopup, setActivePopup] = useState(false);

  const html = document.querySelector("html");
  const hamburger = document.querySelector("#popup");

  useEffect(() => {
    setTimeout(() => {
      setActivePopup(true);
    }, 500);
  }, []);

  // useEffect(() => {
  //   if (activePopup) {
  //     html.classList.add("hidescroll");
  //   } else {
  //     html.classList.remove("hidescroll");
  //   }
  // }, [activePopup]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "World of Dypians";
    // randomPopup();
  }, []);

  return (
    <>
      <OutsideClickHandler
        id="popup"
        onOutsideClick={() => setActivePopup(false)}
      >
        {/* <MintPopup
          active={activePopup}
          data={basePopupInfo}
          onClose={() => setActivePopup(false)}
        /> */}
      </OutsideClickHandler>
      <div className="container-fluid px-0 d-flex align-items-center justify-content-center">
        <div className="d-flex flex-column home-main-wrapper">
          <VideoWrapper
            handleRegister={handleRegister}
            handleDownload={handleDownload}
            allStarData={allStarData}
            monthlyPlayers={monthlyPlayers}
            percent={percent}
          />
          {/* <LiveEvents /> */}
          {/* <WodPartners full={false} /> */}
          <GameStats totalSupply={totalSupply} monthlyPlayers={monthlyPlayers}/>
          <WodBuilders />
          {/* <Utilities /> */}
          {/* <MarketSection
            coinbase={coinbase}
            ethTokenData={ethTokenData}
            dyptokenDatabnb={dyptokenDatabnb}
            idyptokenDatabnb={idyptokenDatabnb}
          /> */}
          <ExplorerGrid totalSupply={totalSupply} monthlyPlayers={monthlyPlayers}
             wodHolders={wodHolders}
             totalVolumeNew={totalVolumeNew}
          />
          <Investors page={"home"} />
          {/* <GameUpdates /> */}
          {/* <LandNft /> */}
          {/* <CawsSociety
            content="The Cats and Watches Society (CAWS) NFT is a unique collection of
            utility NFTs developed by Dypius. Owners of these NFTs will be able
            to adventure with their CAT companion enhancing the player's
            abilities and increasing rewards."
          /> */}
          {/* <CawsWorld /> */}
          <MarketPlace />
          {/* <Discord /> */}
          {/* <Partners /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
