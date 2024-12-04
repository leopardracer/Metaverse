import React, { useEffect, useState, useRef } from "react";
import "./_myprofile.scss";
import domainIcon from "./assets/domainIcon.svg";
import errordomainIcon from "./assets/errordomainIcon.svg";
import chainsFlag from "./assets/chainsFlag2.svg";
import chainsIcon from "./assets/chainsIcon.svg";
import globalFlag from "./assets/globalFlag2.svg";
import globalIcon from "./assets/globalIcon2.png";
import landFlag from "./assets/landFlag2.svg";
import landIcon from "./assets/landIcon.svg";
import redArrow from "./assets/redArrow.svg";
import cyanArrow from "./assets/cyanArrow.svg";
import pinkArrow from "./assets/pinkArrow.svg";
import mageStarter from "../../screens/Account/src/Components/WalletBalance/assets/mageStarter.png";
import mageGoing from "../../screens/Account/src/Components/WalletBalance/assets/mageGoing.png";
import mageFinish from "../../screens/Account/src/Components/WalletBalance/assets/mageFinish.png";
import readyBorder from "../../screens/Account/src/Components/WalletBalance/newAssets/readyBorder2.svg";
import sync from "../../screens/Account/src/Components/ProfileCard/assets/sync.svg";
import goldenPassBadge from "./assets/goldenPassBadge.png";
import defeatedRed from "./assets/defeated-red.png";
import myRewardsMiner from "./assets/myRewardsMiner.png";
import Countdown from "react-countdown";
import RankSmallPopup from "../../screens/Account/src/Components/ProfileCard/RankSmallPopup";
import dragonRuins from "./assets/dailyProgress/dragonRuins.png";
import scorpionKing from "./assets/dailyProgress/scorpionKing.png";
import coldBite from "./assets/dailyProgress/coldBite.png";
import stoneEye from "./assets/dailyProgress/stoneEye.png";
import furyBeast from "./assets/dailyProgress/furyBeast.png";
import wingStorm from "./assets/dailyProgress/wingStorm.png";
import criticalHit from "./assets/dailyProgress/criticalHit.png";
import puzzleMadness from "./assets/dailyProgress/puzzleMadness.png";
import bnbMazeDay from "./assets/dailyProgress/bnbMazeDay.png";
import prime from "./assets/dailyProgress/prime.png";
import puzzleMadnessBanner from "./assets/dailyProgress/puzzleMadness.webp";

import coldBiteBanner from "./assets/dailyProgress/coldBiteBanner.webp";
import dragonRuinsBanner from "./assets/dailyProgress/dragonRuinsBanner.webp";
import furyBeastBanner from "./assets/dailyProgress/furyBeastBanner.webp";
import scorpionKingBanner from "./assets/dailyProgress/scorpionKingBanner.webp";
import stoneEyeBanner from "./assets/dailyProgress/stoneEyeBanner.webp";
import wingStormBanner from "./assets/dailyProgress/wingStormBanner.webp";
import bnbMazeBanner from "./assets/dailyProgress/bnbMazeBanner.webp";

import coldBiteArrow from "./assets/dailyProgress/arrows/coldBiteArrow.svg";
import dragonRuinsArrow from "./assets/dailyProgress/arrows/dragonRuinsArrow.svg";
import furyBeastArrow from "./assets/dailyProgress/arrows/furyBeastArrow.svg";
import mazeDayArrow from "./assets/dailyProgress/arrows/mazeDayArrow.svg";
import puzzleMadnessArrow from "./assets/dailyProgress/arrows/puzzleMadnessArrow.svg";
import scorpionKingArrow from "./assets/dailyProgress/arrows/scorpionKingArrow.svg";
import stoneEyeArrow from "./assets/dailyProgress/arrows/stoneEyeArrow.svg";
import wingStormArrow from "./assets/dailyProgress/arrows/wingStormArrow.svg";

import dailyBonusStd from "./assets/dailyProgress/dailyBonusStd.png";
import dailyBonusPrime from "./assets/dailyProgress/dailyBonusPrime.png";
import explorerHunt from "./assets/dailyProgress/explorerHunt.png";
import treasureHunt from "./assets/dailyProgress/treasureHunt.png";

import premiumDummy from "./assets/premiumDummy.png";
import dummyDragon from "./assets/dummyDragon.png";
import dummyCaws from "./assets/dummyCaws.png";
import doneTag from "./assets/doneTag.svg";
import emptyTag from "./assets/emptyTag.svg";
import portfolio from "./assets/portfolio.svg";
import starterProfile from "./assets/starterProfile.png";
import rookieProfile from "./assets/rookieProfile.png";
import underdogProfile from "./assets/underdogProfile.png";
import championProfile from "./assets/championProfile.png";
import unstoppableProfile from "./assets/unstoppableProfile.png";

import starterProfilePremium from "./assets/starterProfilePremium.png";
import rookieProfilePremium from "./assets/rookieProfilePremium.png";
import underdogProfilePremium from "./assets/underdogProfilePremium.png";
import championProfilePremium from "./assets/championProfilePremium.png";
import unstoppableProfilePremium from "./assets/unstoppableProfilePremium.png";
import errorChain from "./assets/errorchain.svg";
import Slider from "react-slick";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import premiumBadge from "../../screens/Account/src/Components/LeaderBoard/assets/premiumBadge.png";

const renderer = ({ days, hours, minutes }) => {
  return (
    <h6 className="timer-text2 mb-0">
      {days}d: {hours}h:{minutes}m (UTC)
    </h6>
  );
};

const renderer2 = ({ hours, minutes }) => {
  return (
    <h6 className="timer-text mb-0">
      {hours}h:{minutes}m (UTC)
    </h6>
  );
};

const renderer3 = ({ days, hours }) => {
  return (
    <span
      className="special-rewards-total-span"
      style={{
        color: "#F3BF09",
        width: "fit-content",
        whiteSpace: "nowrap",
      }}
    >
      Available: {days}d {hours}h
    </span>
  );
};
const renderer4 = ({ hours, minutes, seconds }) => {
  return (
    <span className="beast-siege-timer">
      {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}
    </span>
  );
};

const MyProfile = ({
  canBuy,
  email,
  isPremium,
  username,
  address,
  coinbase,
  totalScore,
  onGoldenpassClick,
  openChainsLeaderboard,
  openGlobalLeaderboard,
  openGenesisLeaderboard,
  openMyRewards,
  openDailyBonus,
  openPortfolio,
  openSpecialRewards,
  userRankName,
  isConnected,
  onConnectWallet,
  onOpenRankPopup,
  onDomainClick,
  domainName,
  liveRewards,
  specialRewards,
  syncStatus,
  onSyncClick,
  isgoldenPassActive,
  dragonRuinsCountdown,
  allClaimedChests,
  treasureRewardMoney,
  userDailyBundles,
  puzzleMadnessCountdown,
  userActiveEvents,
  userDataStar,
  primeStars,
  allClaimedChestsPremium,
  allClaimedChestsstd,
  userRank,
  userRankSkale,
  userBnbScore,
  userSkaleScore,
  userRankCore,
  userCoreScore,
  userRankViction,
  userVictionScore,
  rankData,
  userRankManta,
  userMantaScore,
  userRankBase,
  userBaseScore,
  userRankTaiko,
  userTaikoScore,
  onEventCardClick,
  userDataStarWeekly,
  onLinkWallet,
  beastSiegeStatus,
}) => {
  const totalClaimedChests = allClaimedChests;
  const [rankDropdown, setRankDropdown] = useState(false);

  const chestPercentage = (totalClaimedChests / 140) * 100;
  const utcDayIndex = new Date().getUTCDay();

  const dailyEvents = [
    {
      image: stoneEye, // Sunday
      title: "Stone Eye",
      bannerImg: stoneEyeBanner,
      titleColor: "#F1EDFF",
      contentColor: "#C8F0FF",
      class: "stoneEyeBannerItem",
      arrow: stoneEyeArrow,
      link: "/account/challenges/stone-eye",
      active: beastSiegeStatus.cyclops,
      infoTips: ["80,000 points", "Up to 600 stars."],
    },
    {
      image: dragonRuins, // Monday
      title: "Dragon Ruins",
      bannerImg: dragonRuinsBanner,
      titleColor: "#FFEACD",
      contentColor: "#D3D5D7",
      class: "dragonRuinsBannerItem",
      arrow: dragonRuinsArrow,
      link: "/account/challenges/dragon-ruins",
      active: beastSiegeStatus.dragon,
      infoTips: ["16,000 points", "Up to 200 stars."],
    },
    {
      image: coldBite, // Tuesday
      title: "Cold Bite",
      bannerImg: coldBiteBanner,
      titleColor: "#68AEFE",
      contentColor: "#FFFFFF",
      class: "coldBiteBannerItem",
      arrow: coldBiteArrow,
      link: "/account/challenges/cold-bite",
      active: beastSiegeStatus.bear,
      infoTips: ["30,000 points", "Up to 300 stars."],
    },
    {
      image: furyBeast, // Wednesday
      title: "Fury Beast",
      bannerImg: furyBeastBanner,
      titleColor: "#BEE3A8",
      contentColor: "#BAD6C9",
      class: "furyBeastBannerItem",
      arrow: furyBeastArrow,
      link: "/account/challenges/fury-beast",
      active: beastSiegeStatus.beast,
      infoTips: ["60,000 points", "Up to 400 stars."],
    },
    {
      image: wingStorm, // Thursday
      title: "Wing Storm",
      bannerImg: wingStormBanner,
      titleColor: "#D6F4FF",
      contentColor: "#7ACCFF",
      class: "wingStormBannerItem",
      arrow: wingStormArrow,
      link: "/account/challenges/wing-storm",
      active: beastSiegeStatus.eagle,
      infoTips: ["70,000 points", "Up to 500 stars."],
    },
    {
      image: bnbMazeDay, // Friday
      title: "BNB Maze Day",
      bannerImg: bnbMazeBanner,
      titleColor: "#DDF8D7",
      contentColor: "#FFFFFF",
      class: "mazeDayBannerItem",
      arrow: mazeDayArrow,
      link: "/account/challenges/maze-day",
      infoTips: ["200,000 points", "Up to 800 stars", "$10"],

      imageClass: "mazeDayEventBanner",
    },
    {
      image: scorpionKing, // Saturday
      title: "Scorpion King",
      bannerImg: scorpionKingBanner,
      titleColor: "#FFD695",
      contentColor: "#EAB257",
      class: "scorpionKingBannerItem",
      arrow: scorpionKingArrow,
      link: "/account/challenges/maze-day",
      active: beastSiegeStatus.scorpion,
      infoTips: ["120,000 points", "Up to 1000 stars."],
    },
  ];

  let now = new Date().getTime();
  const midnight = new Date(now).setUTCHours(24, 0, 0, 0);

  const [allEvents, setAllEvents] = useState(false);
  const [finished, setFinished] = useState(false);
  const [activeSlide, setActiveSlide] = useState();
  const [showFirstNext, setShowFirstNext] = useState();
  const sliderRef = useRef(null);
  const windowSize = useWindowSize();

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 1000,
    autoplay: false,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    // beforeChange: (current, next) => {
    //   setActiveSlide(next);
    //   setShowFirstNext(current);
    // },
    // afterChange: (current) => setActiveSlide(current),
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          fade: false,
          initialSlide: 0,
          autoplay: true,
          infinite: true,
        },
      },
    ],
  };

  useEffect(() => {
    if (canBuy && email) {
      setFinished(false);
    } else if (!canBuy && email) {
      setFinished(true);
    } else if (!email) {
      setFinished(false);
    }
  }, [totalClaimedChests, isPremium, canBuy, email]);

  return (
    <>
      <div className="custom-container mt-5">
        <div className="row mt-4 mt-lg-0">
          <div className="col-12 col-lg-4">
            <div className="profile-card-wrapper p-3 d-flex flex-column justify-content-between h-100">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="position-relative"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className="new-profile-img w-100"
                    src={
                      userRankName.name === "starter"
                        ? isPremium
                          ? starterProfilePremium
                          : starterProfile
                        : userRankName.name === "rookie"
                        ? isPremium
                          ? rookieProfilePremium
                          : rookieProfile
                        : userRankName.name === "underdog"
                        ? isPremium
                          ? underdogProfilePremium
                          : underdogProfile
                        : userRankName.name === "champion"
                        ? isPremium
                          ? championProfilePremium
                          : championProfile
                        : userRankName.name === "unstoppable"
                        ? isPremium
                          ? unstoppableProfilePremium
                          : unstoppableProfile
                        : starterProfile
                    }
                    alt=""
                  />
                  {/* <div className="score-text-wrapper d-flex flex-column align-items-center">
                  <h6 className="mb-0">{getFormattedNumber(totalScore, 0)}</h6>
                  <span>Score</span>
                </div> */}
                </div>
                <div className="d-flex flex-column gap-2 w-100">
                  <div className="d-flex align-items-center gap-1">
                    <div
                      className={`d-flex flex-column flex-lg-row align-items-lg-center ${
                        !email
                          ? "justify-content-between w-100"
                          : "justify-content-start"
                      }  gap-2`}
                    >
                      <h6 className="my-profile-username mb-0">
                        {email && username ? username : "GUEST"}
                      </h6>
                      {!email && coinbase && (
                        <NavLink
                          className="loginbtn-profile px-5 py-2"
                          to="/auth"
                        >
                          Log in
                        </NavLink>
                      )}
                    </div>

                    <span className="current-rank-text text-capitalize">
                      {email && username ? userRankName.name : ""}
                    </span>
                  </div>
                  <span className="my-profile-email mb-2">{email}</span>
                  <div className="d-flex flex-column flex-lg-row gap-2">
                    <div
                      className={` ${
                        isConnected &&
                        address &&
                        email &&
                        coinbase &&
                        syncStatus !== "" &&
                        address.toLowerCase() !== coinbase.toLowerCase()
                          ? "wallet-address-wrapper-error"
                          : "wallet-address-wrapper"
                      }  w-100 d-flex align-items-center justify-content-between gap-4 p-2`}
                    >
                      <div className="d-flex align-items-center w-100 justify-content-between">
                        <div className="d-flex flex-column">
                          <span className={`profile-wallet-span mb-2`}>
                            Wallet Address
                          </span>
                          <span
                            className={`${
                              isConnected &&
                              address &&
                              email &&
                              coinbase &&
                              syncStatus !== "" &&
                              address.toLowerCase() !== coinbase.toLowerCase()
                                ? "wallet-addr-error"
                                : "wallet-addr"
                            } `}
                          >
                            {email !== undefined && address
                              ? shortAddress(address)
                              : coinbase
                              ? shortAddress(coinbase)
                              : "--"}
                          </span>
                        </div>
                        {isConnected &&
                          address &&
                          email &&
                          coinbase &&
                          syncStatus !== "" &&
                          address.toLowerCase() !== coinbase.toLowerCase() && (
                            <img src={errorChain} alt="" />
                          )}
                        {!domainName &&
                          isConnected &&
                          address &&
                          email &&
                          coinbase &&
                          syncStatus !== "" &&
                          address.toLowerCase() === coinbase.toLowerCase() && (
                            <img
                              src={domainIcon}
                              width={30}
                              height={30}
                              alt=""
                              style={{ cursor: "pointer" }}
                              onClick={onDomainClick}
                            />
                          )}
                        {!domainName &&
                          isConnected &&
                          address &&
                          email &&
                          coinbase &&
                          syncStatus !== "" &&
                          address.toLowerCase() !== coinbase.toLowerCase() && (
                            <img
                              src={errordomainIcon}
                              width={30}
                              height={30}
                              alt=""
                              style={{ cursor: "pointer" }}
                              onClick={onDomainClick}
                            />
                          )}
                      </div>
                    </div>
                    {(isConnected &&
                      address &&
                      email &&
                      coinbase &&
                      syncStatus !== "" &&
                      address.toLowerCase() === coinbase.toLowerCase()) ||
                    (isConnected && !email && coinbase) ? (
                      <div
                        className="portfolio-wrapper d-flex w-100 align-items-center gap-2 p-2"
                        onClick={openPortfolio}
                      >
                        <img src={portfolio} width={25} height={25} alt="" />
                        <h6 className="mb-0">My Portfolio</h6>
                      </div>
                    ) : !isConnected ? (
                      <button
                        className="loginbtn-profile px-5 py-2"
                        onClick={onConnectWallet}
                      >
                        Connect
                      </button>
                    ) : email &&
                      username &&
                      coinbase &&
                      isConnected &&
                      address ? (
                      <button
                        className="d-flex align-items-center gap-1 syncbtn px-3 py-2"
                        onClick={onSyncClick}
                      >
                        <img
                          src={sync}
                          alt=""
                          className={syncStatus === "loading" && "syncicon"}
                        />{" "}
                        {syncStatus === "initial"
                          ? "Synchronize"
                          : syncStatus === "loading"
                          ? "Synchronising..."
                          : syncStatus === "success"
                          ? "Success"
                          : "Error"}
                      </button>
                    ) : email &&
                      username &&
                      coinbase &&
                      isConnected &&
                      !address ? (
                      <button
                        className="loginbtn-profile px-5 py-2"
                        onClick={onLinkWallet}
                      >
                        Link Wallet
                      </button>
                    ) : coinbase && email && !address && !username ? (
                      <NavLink
                        className="loginbtn-profile px-5 py-2 d-flex align-items-center"
                        to={"/player"}
                      >
                        Create player
                        {/* <img src={greenarrow} alt="" /> */}
                      </NavLink>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="sidebar-separator2 my-2"></div>
              <div className="d-flex align-items-center gap-2 justify-content-between flex-column flex-lg-row flex-md-row position-relative">
                <div
                  className="wallet-address-wrapper2 p-2 w-100"
                  onClick={() => {
                    setRankDropdown(true);
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    {/* <span className="user-data-item-left">My Progress</span> */}
                    <div className="d-flex flex-column">
                      <div className="d-flex">
                        <span className="user-data-item-right">
                          #
                          {userDataStar.position
                            ? userDataStar.position + 1
                            : "---"}
                        </span>
                      </div>
                      <span className="user-data-item-left">Global Rank</span>
                    </div>
                    <div className="d-flex flex-column">
                      <div className="d-flex">
                        <span className="user-data-item-right">
                          {getFormattedNumber(
                            userDataStar.statValue ?? "---",
                            0
                          )}
                        </span>
                      </div>
                      <span className="user-data-item-left">Stars</span>
                    </div>
                  </div>
                </div>
                {/* <div
                  className="wallet-address-wrapper2 p-2 w-100"
                  onClick={openGlobalLeaderboard}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex flex-column">
                      <span className="user-data-item-left">Stars</span>
                      <span className="user-data-item-left">Collected</span>
                    </div>
                    <div className="d-flex">
                      <span className="user-data-item-right">
                        {getFormattedNumber(userDataStar.statValue ?? "---", 0)}
                      </span>
                    </div>
                  </div>
                </div> */}
                <NavLink
                  to={"/account/challenges/great-collection"}
                  className="wallet-address-wrapper2 p-2 w-100"
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex flex-column">
                      <span className="user-data-item-left">Great</span>
                      <span className="user-data-item-left">Collection</span>
                    </div>
                    <div className="d-flex">
                      <span className="user-data-item-right">Upcoming</span>
                    </div>
                  </div>
                </NavLink>
                {rankDropdown === true && (
                  <RankSmallPopup
                    onClose={() => {
                      setRankDropdown(false);
                    }}
                    primeStars={primeStars}
                    userRank={userRank}
                    userRankSkale={userRankSkale}
                    userBnbScore={userBnbScore}
                    userSkaleScore={userSkaleScore}
                    userRankCore={userRankCore}
                    userCoreScore={userCoreScore}
                    userRankViction={userRankViction}
                    userVictionScore={userVictionScore}
                    rankData={rankData}
                    userDataStar={userDataStar}
                    userRankManta={userRankManta}
                    userMantaScore={userMantaScore}
                    userRankBase={userRankBase}
                    userBaseScore={userBaseScore}
                    userRankTaiko={userRankTaiko}
                    userTaikoScore={userTaikoScore}
                    userRankName={userRankName}
                    onRankPopupClick={() => {
                      onOpenRankPopup();
                      setRankDropdown(false);
                    }}
                    globalMonthly={
                      userDataStar.position ? userDataStar.position + 1 : "---"
                    }
                    globalWeekly={
                      userDataStarWeekly.position
                        ? userDataStarWeekly.position + 1
                        : "---"
                    }
                    isPremium={isPremium}
                  />
                )}
              </div>
              <div className="sidebar-separator2 my-2"></div>

              <div className="daily-progress-wrapper p-3 d-flex flex-column gap-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="progress-line"></div>
                  <span className="daily-progress-span mx-2">
                    Daily Progress
                  </span>
                  <div className="progress-line-2"></div>
                </div>
                <div className="daily-progress-grid">
                  {/* <div className="daily-progress-item position-relative">
                  <img
                    src={
                      isgoldenPassActive ? goldenPassActive : goldenPassInactive
                    }
                    alt=""
                  />
                  {isgoldenPassActive && (
                    <div className="daily-progress-value-golden">
                      <Countdown
                        date={isgoldenPassActive}
                        renderer={renderer3}
                      />
                    </div>
                  )}
                  {isgoldenPassActive && (
                    <img
                      src={doneTag}
                      alt=""
                      className="daily-progress-status"
                    />
                  )}
                </div>
                <div className="daily-progress-item position-relative">
                  <img
                    src={
                      userActiveEvents > 0
                        ? treasureHuntActive
                        : treasureHuntInactive
                    }
                    alt=""
                  />
                  <div className="daily-progress-value">
                    <span>{userActiveEvents}</span>
                  </div>
                  {userActiveEvents > 0 && (
                    <img
                      src={doneTag}
                      alt=""
                      className="daily-progress-status"
                    />
                  )}
                </div> */}
                  <NavLink
                    to={"/account/prime"}
                    className="daily-progress-item position-relative"
                  >
                    <img src={prime} alt="" />
                    <div className="daily-progress-value-golden">
                      <span>
                        {primeStars === true ? "+ 50 Stars" : "In Progress"}
                      </span>
                    </div>
                    <span className="bundle-title-bottom">Prime</span>

                    {/* <img
                    src={emptyTag}
                    alt=""
                    className="daily-progress-status"
                  /> */}
                  </NavLink>
                  <div
                    className="daily-progress-item position-relative"
                    onClick={openDailyBonus}
                  >
                    <img src={dailyBonusStd} alt="" />
                    <div className="daily-progress-value-golden">
                      <span>
                        {allClaimedChestsstd === 0
                          ? "Ready"
                          : allClaimedChestsstd < 70
                          ? allClaimedChestsstd + "/70"
                          : "Completed"}
                      </span>
                    </div>
                    <span className="bundle-title-bottom">Daily Bonus</span>

                    {/* <img
                    src={emptyTag}
                    alt=""
                    className="daily-progress-status"
                  /> */}
                  </div>
                  <div
                    className="daily-progress-item position-relative"
                    onClick={openDailyBonus}
                  >
                    <img src={dailyBonusPrime} alt="" />
                    <div className="daily-progress-value-golden">
                      <span>
                        {allClaimedChestsPremium === 0
                          ? "Ready"
                          : allClaimedChestsPremium < 70
                          ? allClaimedChestsPremium + "/70"
                          : "Completed"}
                      </span>
                    </div>
                    <span className="bundle-title-bottom">
                      Daily Bonus Prime
                    </span>

                    {/* <img
                    src={emptyTag}
                    alt=""
                    className="daily-progress-status"
                  /> */}
                  </div>
                  <NavLink
                    to={dailyEvents[utcDayIndex].link}
                    className="daily-progress-item position-relative"
                  >
                    <img src={dailyEvents[utcDayIndex].image} alt="" />
                    <div className="daily-progress-value-golden">
                      <span>
                        {/* {userDailyBundles?.dragonRuinsCount
                        ? userDailyBundles?.dragonRuinsCount === 0
                          ? "Ready"
                          : userDailyBundles?.dragonRuinsCount
                        : "Ready"} */}
                        {dailyEvents[utcDayIndex].active ? "1" : "Ready"}
                      </span>
                    </div>
                    {/* {userDailyBundles?.dragonRuinsCount > 0 && (
                    <img
                      src={doneTag}
                      alt=""
                      className="daily-progress-status"
                    />
                  )} */}
                    <span className="bundle-title-bottom">
                      {dailyEvents[utcDayIndex].title}
                    </span>
                  </NavLink>

                  <NavLink
                    to={"/account/challenges/critical-hit"}
                    className="daily-progress-item position-relative"
                  >
                    <img src={criticalHit} alt="" />
                    <div className="daily-progress-value-golden">
                      <span>Ready</span>
                    </div>
                    {/* <img
                    src={emptyTag}
                    alt=""
                    className="daily-progress-status"
                  /> */}
                    <span className="bundle-title-bottom">Critical Hit</span>
                  </NavLink>

                  <NavLink
                    to={"/account/challenges/treasure-hunt"}
                    className="daily-progress-item position-relative"
                  >
                    <img src={treasureHunt} alt="" />
                    <div className="daily-progress-value-golden">
                      <span>
                        {userActiveEvents === 5
                          ? "Completed"
                          : userActiveEvents === 0
                          ? "Ready"
                          : userActiveEvents + "/5"}
                      </span>
                    </div>
                    {/* <img
                    src={emptyTag}
                    alt=""
                    className="daily-progress-status"
                  /> */}
                    <span className="bundle-title-bottom">Treasure Hunt</span>
                  </NavLink>

                  <NavLink
                    to={"/account/challenges/explorer-hunt"}
                    className="daily-progress-item position-relative"
                  >
                    <img src={explorerHunt} alt="" />
                    <div className="daily-progress-value-golden">
                      <span>Ready</span>
                    </div>
                    {/* <img
                    src={emptyTag}
                    alt=""
                    className="daily-progress-status"
                  /> */}
                    <span className="bundle-title-bottom">Explorer Hunt</span>
                  </NavLink>

                  <NavLink
                    to={"/account/challenges/puzzle-madness"}
                    className="daily-progress-item position-relative"
                  >
                    <img src={puzzleMadness} alt="" />
                    <div className="daily-progress-value-golden">
                      <span>
                        {userDailyBundles?.puzzleMadnessCount
                          ? userDailyBundles?.puzzleMadnessCount === 0
                            ? "Ready"
                            : userDailyBundles?.puzzleMadnessCount
                          : "Ready"}
                        {/* Ready */}
                      </span>
                    </div>
                    {/* {userDailyBundles?.puzzleMadnessCount > 0 && (
                    <img
                      src={doneTag}
                      alt=""
                      className="daily-progress-status"
                    />
                  )} */}
                    <span className="bundle-title-bottom">Puzzle Madness</span>
                  </NavLink>

                  {/* <div className="daily-progress-item position-relative">
                  <img
                    src={
                      totalClaimedChests === 0
                        ? dailyBonusInactive
                        : dailyBonusActive
                    }
                    alt=""
                  />

                  <div className="daily-progress-value">
                    <span>{totalClaimedChests}</span>
                  </div>
                  {totalClaimedChests === 140 && (
                    <img
                      src={doneTag}
                      alt=""
                      className="daily-progress-status"
                    />
                  )}
                </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <div className="row ">
              <div className="col-12 col-lg-4">
                {/* <div className="new-special-rewards-wrapper d-flex flex-column gap-4 p-3">
                <h6 className="special-rewards-title">Special Rewards</h6>
                <div className="d-flex align-items-center gap-1">
                  <span className="special-rewards-span">Submit</span>
                  <img src={redArrow} alt="" />
                </div>
              </div> */}
                <div
                  className="daily-bonus-wrapper mt-4 mb-5 mt-lg-0 mb-lg-0"
                  onClick={openDailyBonus}
                >
                  <div className="red-div"></div>
                  <img
                    // src={finished ? mageFinish : mageGoing}
                    src={
                      chestPercentage >= 50 && chestPercentage < 100
                        ? mageGoing
                        : chestPercentage === 100
                        ? mageFinish
                        : mageStarter
                    }
                    className={`${"daily-rewards-img"}`}
                    alt=""
                  />
                  <div className="progress-bar-group d-flex flex-column align-items-start">
                    {!finished && (
                      <span className="progress-bar-title">Progress</span>
                    )}

                    <div className="yellow-progress-outer">
                      <span className="mb-0 chest-progress">
                        {/* {claimedPremiumChests}/10 */}
                        {parseInt(chestPercentage)}%
                      </span>
                      <div
                        className="yellow-progress-inner"
                        style={{ width: `${chestPercentage}%` }}
                        // style={{ width: `35%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="d-flex flex-column justify-content-between h-100 p-3">
                    <div
                      className="d-flex align-items-center justify-content-between position-relative gap-1"
                      style={{ width: "fit-content" }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <h6 className="leaderboards-title mb-0">Daily</h6>
                        <h6
                          className="leaderboards-title mb-0"
                          style={{ color: "#FF5EA0" }}
                        >
                          Bonus
                        </h6>
                      </div>
                    </div>

                    <div
                      className="d-flex flex-column align-items-center"
                      style={{ width: "fit-content" }}
                    >
                      <div
                        className="position-relative"
                        style={{
                          width: "96px",
                          height: "40px",
                          right: "0px",
                          bottom: "15px",
                        }}
                      >
                        <span className="ready-to-claim mb-0">
                          {finished ? "Reset Time" : "Ready to Claim"}
                        </span>
                        <img
                          src={readyBorder}
                          alt=""
                          className={`${
                            finished ? "ready-border-2" : "ready-border"
                          }`}
                        />
                      </div>
                      {finished && (
                        <span className="timer-text mb-0">
                          <Countdown date={midnight} renderer={renderer2} />
                        </span>
                      )}
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-8">
                <div className="game-leaderboards-wrapper position-relative h-100 d-flex align-items-end  align-items-lg-center justify-content-center justify-content-lg-between p-3">
                  <div className="d-flex flex-row flex-lg-column gap-2 gap-lg-0">
                    <h6 className="leaderboards-title">Game</h6>
                    <h6
                      className="leaderboards-title mb-0"
                      style={{ color: "#8C56FF" }}
                    >
                      Leaderboards
                    </h6>
                  </div>
                  <div className="d-flex align-items-center leaderboards-flag-wrapper gap-3">
                    <div
                      className="new-flag-wrapper global-flag"
                      onClick={openGlobalLeaderboard}
                    >
                      <img src={globalFlag} className="w-100" alt="" />
                      <div className="flag-content d-flex flex-column gap-2 align-items-center">
                        <span className="flag-title">Global</span>
                        <img src={globalIcon} height={50} width={50} alt="" />
                      </div>
                    </div>
                    <div
                      className="new-flag-wrapper chains-flag"
                      onClick={openChainsLeaderboard}
                    >
                      <img src={chainsFlag} className="w-100" alt="" />
                      <div className="flag-content d-flex flex-column gap-2 align-items-center">
                        <span className="flag-title">Chains</span>
                        <img src={chainsIcon} height={50} width={50} alt="" />
                      </div>
                    </div>
                    <div
                      className="new-flag-wrapper land-flag"
                      onClick={openGenesisLeaderboard}
                    >
                      <img src={landFlag} className="w-100" alt="" />
                      <div className="flag-content d-flex flex-column gap-2 align-items-center">
                        <span className="flag-title">Genesis</span>
                        <img src={landIcon} height={50} width={50} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6 mt-3">
                <div
                  className="my-rewards-wrapper-new position-relative d-flex flex-column justify-content-between gap-2 p-3"
                  onClick={openMyRewards}
                >
                  <img src={myRewardsMiner} className="miner-img" alt="" />
                  <div className="d-flex flex-column position-absolute extraRewardsGolden">
                    {/* <img
                      src={goldenPassBadge}
                      alt=""
                      style={{ width: 60, height: 60 }}
                    /> */}
                    {/* <h6
                      className="special-rewards-total-span"
                      style={{
                        color: "#F3BF09",
                        width: "fit-content",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {isgoldenPassActive ? (
                        <Countdown
                          date={isgoldenPassActive}
                          renderer={renderer3}
                        />
                      ) : (
                        "Extra Rewards"
                      )}
                    </h6> */}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <h6
                      className="special-rewards-title"
                      style={{ color: "#FFF", width: "fit-content" }}
                    >
                      My
                    </h6>
                    <h6
                      className="special-rewards-title"
                      style={{ color: "#35F3FF", width: "fit-content" }}
                    >
                      Rewards
                    </h6>
                  </div>

                  <div className="d-flex flex-column">
                    <h6
                      className="special-rewards-total mb-0"
                      style={{ color: isPremium ? "#F3BF09" : "#FFE8D2" }}
                    >
                      $
                      {getFormattedNumber(
                        liveRewards + Number(treasureRewardMoney)
                      )}
                    </h6>
                    <span
                      className="special-rewards-total-span"
                      style={{ color: "#FFE8D2" }}
                    >
                      Rewards
                    </span>
                  </div>
                  <img src={cyanArrow} width={20} height={20} alt="" />
                </div>
              </div>
              <div className="col-12 col-lg-6 mt-3">
                <div
                  className="new-special-rewards-wrapper d-flex flex-column justify-content-between gap-2 p-3"
                  onClick={openSpecialRewards}
                >
                  <h6 className="special-rewards-title">Special Rewards</h6>
                  <div className="d-flex flex-column">
                    <h6 className="special-rewards-total mb-0">
                      ${getFormattedNumber(specialRewards)}
                    </h6>
                    <span className="special-rewards-total-span">Rewards</span>
                  </div>
                  <img src={redArrow} width={20} height={20} alt="" />
                </div>
              </div>

              <div className="col-12 col-lg-6 mt-3">
                <NavLink to="/account/prime">
                  <div className="total-stars-premium-wrapper2 d-flex align-items-center gap-5 justify-content-between p-2">
                    <div className="d-flex w-100 align-items-center gap-2 justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={premiumBadge}
                          alt=""
                          style={{ width: 44, height: 44 }}
                        />
                        <div className="d-flex flex-column">
                          <span
                            className="user-blue-rank"
                            style={{ color: isPremium ? "#F3BF09" : "" }}
                          >
                            {!isPremium ? "Upgrade Status" : "Prime Enabled"}
                          </span>
                          <span className="user-rank-text">
                            {!isPremium ? "Prime" : ""}
                          </span>
                        </div>
                      </div>
                      {!isPremium ? (
                        <NavLink
                          className="activate-btn2 px-3 py-1"
                          to="/account/prime"
                          style={{
                            background: "#7E52D2",
                          }}
                        >
                          Get
                        </NavLink>
                      ) : (
                        <button
                          className="activate-btn2 px-3 py-1"
                          style={{ background: "transparent" }}
                          // onClick={onPremiumClick}
                        >
                          Lifetime
                        </button>
                      )}
                    </div>
                  </div>
                </NavLink>
              </div>

              <div className="col-12 col-lg-6 mt-3" onClick={onGoldenpassClick}>
                <div className="golden-pass-wrapper2 d-flex align-items-center gap-5 justify-content-between p-2">
                  <div className="d-flex align-items-center gap-2 justify-content-between w-100">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={goldenPassBadge}
                        alt=""
                        style={{ width: 44, height: 44 }}
                      />
                      <div className="d-flex flex-column">
                        <span className="user-blue-rank">Boost Rewards</span>
                        <span
                          className="user-rank-text"
                          style={{
                            color: !isgoldenPassActive ? "#F3BF09" : "#00D1B5",
                          }}
                        >
                          {!isgoldenPassActive ? `Golden Pass` : "Activated"}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      {!isgoldenPassActive ? (
                        <button
                          className="activate-btn px-3 py-1"
                          onClick={onGoldenpassClick}
                        >
                          Activate
                        </button>
                      ) : (
                        <Countdown
                          date={Number(isgoldenPassActive) * 1000}
                          renderer={renderer}
                          // onComplete={() => {
                          //   setcountdown();
                          //   setisActive(false);
                          // }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6 mt-3">
                <NavLink
                  to={dailyEvents[utcDayIndex].link}
                  onClick={onEventCardClick}
                >
                  <div
                    className={`${dailyEvents[utcDayIndex].class} profile-banner-class-thing position-relative p-3 d-flex`}
                  >
                    <div
                      className=" d-flex flex-column justify-content-between gap-2 "
                      style={{ zIndex: 1 }}
                    >
                      {/* <div className="d-flex flex-column gap-1" style={{zIndex: 1}}> */}
                      <span
                        className={`utcEventTitle`}
                        style={{ color: dailyEvents[utcDayIndex].titleColor }}
                      >
                        {dailyEvents[utcDayIndex].title}
                      </span>
                      {/* <span
                          className={`utcEventContent`}
                          style={{
                            color: dailyEvents[utcDayIndex].contentColor,
                          }}
                        >
                          Coming Soon
                        </span> */}
                      {dailyEvents[utcDayIndex].active ? (
                        //   <div className="d-flex flex-column gap-1">
                        //   <span className="beast-siege-ends-in">Available until:</span>
                        //   <Countdown renderer={renderer4} date={midnight} />
                        // </div>
                        <>
                          <div className="ready-circle-2-position d-none d-lg-flex flex-column gap-1 align-items-center justify-content-center">
                            <div className="ready-circle-2 d-flex flex-column gap-1">
                              <Countdown renderer={renderer4} date={midnight} />
                            </div>
                            <span className="new-time-remaining">
                              Time Remaining
                            </span>
                          </div>
                          <div className="d-flex d-lg-none">
                            <Countdown renderer={renderer4} date={midnight} />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="ready-circle d-none d-lg-flex">
                            <span className="beast-siege-timer">Ready</span>
                          </div>
                          <span className="beast-siege-timer d-flex d-lg-none">
                            Ready
                          </span>
                        </>
                      )}
                      <div
                        className={`d-flex flex-column gap-1 infotips-holder ${
                          dailyEvents[utcDayIndex].title === "BNB Maze Day" &&
                          "bnb-infotips-holder"
                        }`}
                      >
                        {dailyEvents[utcDayIndex].infoTips.map(
                          (item, index) => (
                            <div
                              key={index}
                              className="d-flex align-items-center gap-1"
                            >
                              <div className="yellow-dot"></div>
                              <span
                                className="beast-siege-timer"
                                style={{
                                  fontSize: "12px",
                                  fontWeight: 400,
                                  color: "#fff",
                                }}
                              >
                                {item}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                      {/* </div> */}
                      <img
                        src={dailyEvents[utcDayIndex].arrow}
                        alt=""
                        style={{ height: 20, width: 20 }}
                      />
                    </div>
                    {/* <img src={defeatedRed} className="defeated-red" alt="" /> */}
                    <img
                      src={dailyEvents[utcDayIndex].bannerImg}
                      alt=""
                      className={`eventbannerimg ${dailyEvents[utcDayIndex]?.imageClass}`}
                    />
                  </div>
                </NavLink>
              </div>
              <div className="col-12 col-lg-6 mt-3">
                <NavLink
                  className="new-stake-nft-wrapper position-relative d-flex align-items-center justify-content-between p-3"
                  to={"/account/challenges/puzzle-madness"}
                  onClick={onEventCardClick}
                >
                  <div className="d-flex flex-column justify-content-between h-100">
                    <div className="d-flex flex-column">
                      <h6 className="leaderboards-title">PUZZLE MADNESS</h6>
                      <span
                        className={`utcEventContent w-75`}
                        style={{ color: "#CCE8F5" }}
                      >
                        Test your puzzle solving skills and boost score
                      </span>
                    </div>
                    <img
                      src={puzzleMadnessArrow}
                      height={20}
                      width={20}
                      alt=""
                    />
                  </div>
                  <img src={puzzleMadnessBanner} className="eventbannerimg" />
                </NavLink>
              </div>
            </div>
          </div>
          {/* {allEvents &&
        <div className="col-12">
          <div className="all-treasure-wrapper p-3 d-flex align-items-center justify-content-between mt-3">
            <div className="d-flex align-items-center justify-content-between w-100">
              {dummyBetaPassData2.slice(0, 5).map((item, index) => (
                 <div className={` ${item.status === "Expired" ? "new-treasure-hunt-card-expired" : "new-treasure-hunt-card"} p-0 d-flex flex-column`} style={{width: "19%"}}>
                   <div className={`p-2 ${item.status === "Expired" ? "treasure-hunt-top-expired" : "treasure-hunt-top"} d-flex align-items-center justify-content-between`}>
                     <div className="d-flex align-items-center gap-2">
                       <img
                         src={item.logo}
                         width={20}
                         height={20}
                         alt=""
                       />
                       <div className="d-flex flex-column">
                         <span className="treasure-hunt-title">
                           {item.title}
                         </span>
                         <span className="treasure-hunt-rewards">
                           {item.rewards}
                         </span>
                       </div>
                     </div>
                     <div
                       className={`position-relative ${
                         item.eventStatus === "Live"
                           ? "events-page-status-tag-live"
                           : item.eventStatus === "Coming Soon"
                           ? "events-page-status-tag-upcoming"
                           : "events-page-status-tag-expired"
                       } px-2 d-flex align-items-center justify-content-center gap-0`}
                       style={{ top: 0 }}
                     >
                     {item.eventStatus === "Live" &&
                       <div
                       className="pulsatingDot"
                       style={{ width: 7, height: 7, marginRight: 5 }}
                     ></div>
                     }
                       <span>{item.eventStatus}</span>
                     </div>
                   </div>
                   <div className="treasure-hunt-bottom p-2">
                     <div className="treasure-hunt-info d-flex flex-column p-1 gap-1">
                       <div className="d-flex align-items-center justify-content-between">
                         <span className="treasure-hunt-info-span">
                           Type
                         </span>
                         <span
                           className="treasure-hunt-info-span"
                           style={{ color: "#18FFFF" }}
                         >
                           {item.eventType}
                         </span>
                       </div>
                       <div className="d-flex align-items-center justify-content-between">
                         <span className="treasure-hunt-info-span">
                           Total Earnings
                         </span>
                         <span
                           className="treasure-hunt-info-span"
                           style={{ color: "#18FFFF" }}
                         >
                           $253.67
                         </span>
                       </div>
                     </div>
                     <hr className="sidebar-separator my-2" />
                     <div className="d-flex align-items-center justify-content-between">
                       <Countdown renderer={renderer} date={item.eventDate} />
                       <img
                         src={greenArrow}
                         width={14}
                         height={14}
                         alt=""
                       />
                     </div>
                   </div>
                 </div>
              ))}
            </div>
          </div>
        </div>
        } */}
        </div>
      </div>
    </>
  );
};

export default MyProfile;
