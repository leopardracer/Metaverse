import React, { useRef } from "react";
import "./_earn.scss";
import Slider from "react-slick";

const Earn = () => {
  const sliderRef = useRef();

  const type = "defi";
  const settings = {
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };

  const bannerItems = [
    {
      title: "New ETH Staking Pool",
      desc: "Stake your assets to earn ETH rewards",
      buttonType: "popup",
      chain: "eth",
      bannerBgClass: "ethBgDesktop",
      buttonTitle: "Stake Now",
      buttonClass: "hero-stake-eth-btn",
      apr: "ethApr.svg",
    },
    {
      title: "New BNB Staking Pool",
      desc: "Stake your assets to earn BNB rewards",
      buttonType: "popup",
      chain: "bnb",
      bannerBgClass: "bscBgDesktop",
      buttonTitle: "Stake Now",
      buttonClass: "hero-stake-bnb-btn",
      apr: "bnbApr.svg",
    },
    {
      title: "New AVAX Staking Pool",
      desc: "Stake your assets to earn AVAX rewards",
      buttonType: "popup",
      chain: "avax",
      bannerBgClass: "avaxBgDesktop",
      buttonTitle: "Stake Now",
      buttonClass: "hero-stake-avax-btn",
      apr: "avaxApr.svg",
    },
    {
      title: "Become a Premium Subscriber!",
      desc: "Enjoy extra benefits by upgrading to premium.",
      buttonType: "link",
      chain: "",
      buttonClass: "hero-premium-btn",
      bannerBgClass: "premiumBgDesktop",
      buttonTitle: "Stake Now",
      apr: "",
    },
  ];

  const nftbannerItems = [
    {
      title: "New CAWS Staking Pool",
      desc: "Stake your assets to earn ETH rewards",
      buttonType: "details-nft",
      chain: "eth",
      buttonTitle: "Stake Now",
      buttonClass: "hero-stake-caws-btn",
      bannerBgClass: "cawsBgDesktop",
      apr: "cawsApr.svg",
    },
    {
      title: "Become a Premium Subscriber!",
      desc: "Enjoy extra benefits by upgrading to premium.",
      buttonType: "link",
      buttonUrl: "/plans",
      buttonTitle: "Get Premium",
      chain: "Get Premium",
      buttonClass: "hero-premium-btn",
      bannerBgClass: "premiumBgDesktop",
      apr: "",
    },
  ];

  return (
     <div className="container-fluid d-flex justify-content-center mt-5">
         <div className="custom-container mt-5">
          <Slider {...settings} ref={sliderRef}>
            {type === "defi" &&
              bannerItems.slice(0, bannerItems.length).map((item, index) => {
                return (
                  <div
                    className={`d-flex align-items-start align-items-lg-center p-4 justify-content-between position-relative ${item.bannerBgClass} `}
                    key={index}
                    // onClick={() => {
                    //   handleSliderClick(item);
                    // }}
                  >
                    <div className="d-flex align-items-center justify-content-between flex-row col-lg-6 ">
                      <div className="d-flex flex-column gap-2">
                        <h6 className="earn-other-hero-title">{item.title}</h6>
                        <h6 className="earn-other-hero-desc">{item.desc}</h6>

                        <button
                          className={item.buttonClass}
                          // onClick={() => {
                          //   handleSliderClick(item);
                          // }}
                        >
                          {item.buttonTitle}
                        </button>
                      </div>
                      {item.apr && item.apr !== "" && (
                        <img
                          src={require(`../../../assets/wodAssets/${item.apr}`)}
                          className="aprimage"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            {type === "nft" &&
              nftbannerItems
                .slice(0, nftbannerItems.length)
                .map((item, index) => {
                  return (
                    <div
                      className={`d-flex align-items-start align-items-lg-center p-4 justify-content-between position-relative ${item.bannerBgClass} `}
                      key={index}
                      // onClick={() => {
                      //   handleSliderClick(item);
                      // }}
                    >
                      <div className="d-flex align-items-center justify-content-between flex-row col-lg-6 ">
                        <div className="d-flex flex-column gap-2">
                          <h6 className="earn-other-hero-title">
                            {item.title}
                          </h6>
                          <h6 className="earn-other-hero-desc">{item.desc}</h6>
                          <button className={item.buttonClass}>
                            {item.buttonTitle}
                          </button>
                        </div>
                        {item.apr && item.apr !== "" && (
                          <img
                            src={require(`../../../assets/wodAssets/${item.apr}`)}
                            className="aprimage"
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
          </Slider>
          <div className="mt-5"></div>
        </div>
     </div>
  );
};

export default Earn;
