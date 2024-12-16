import React from "react";



const LandBenefits = () => {
  const dimensions = [
    {
      title: "2,000km\u00b2",
      content: "Total WOD area",
    },
    {
      title: "100,000",
      content: "NFT lands",
    },
    {
      title: "15,625m\u00b2",
      content: "Parcel size",
    },
    {
      title: "5",
      content: "NFT land tiers",
    },
  ];
  const playToEarn = [
    {
      title: "Sell NFTs",
      content: "Create and sell in-game NFTs",
    },
    {
      title: "Trade",
      content: "Trade items, equipment, gear, and much more",
    },
    {
      title: "Stake",
      content: "Dedicated NFT staking pools",
    },
    {
      title: "Mine",
      content: "Earn in-game rewards",
    },
    {
      title: "Leaderboard",
      content: "Gain higher ranks to earn prizes",
    },
    {
      title: "Airdrop",
      content: "Randomly airdropped rewards",
    },
    {
      title: "Quests",
      content: "Complete quests to earn loot",
    },
    {
      title: " Achievements",
      content: "Complete achievements to earn rewards",
    },
    {
      title: "Battles",
      content: "Special event prizes",
    },
    {
      title: "Land NFT",
      content: "Get rewards by owning a land NFT",
    },
    {
      title: "Upgrade",
      content: "Upgrade your character to increase rewards",
    },
  ];

  const interactions = [
    {
      title: "Clan",
      content: "Join or create a clan",
    },
    {
      title: "Co-op",
      content: "Fight alongside teammates",
    },
    {
      title: "Multiplayer",
      content: "Interact and compete with players from all around the world",
    },
    {
      title: "Events",
      content: "Host and attend special in-game activities",
    },
    {
      title: "Chat",
      content: "Chat with your friends and other players",
    },
    {
      title: "Advertise",
      content: "Display products and services to an online community",
    },
    {
      title: "Vote",
      content: "Help shape the future of the metaverse",
    },
  ];

  const creativity = [
    {
      title: "Game NFTs",
      content: "Create your own game NFTs",
    },
    {
      title: "Develop",
      content: "Customize your land using a variety of elements",
    },
    {
      title: "Forge & Craft",
      content: "Create new items, equipment, armor, and much more",
    },
    {
      title: "Business integration",
      content: "Develop a business in a digital environment",
    },
  ];

  return (
    <div className="row justify-content-center align-items-center w-100 mx-0 px-3 px-lg-5 position-relative mb-5">
      <div className="d-flex flex-column align-items-center justify-content-center mb-5">
        <h6 className="land-tiers font-organetto d-flex flex-column flex-lg-row">
        Embrace the opportunities in{" "}
          <span
            className="land-tiers font-organetto"
            style={{ color: "#8c56ff" }}
          >
            World of dypians
          </span>
        </h6>
        <span className="tiers-desc">
        Possibilities are limited only by your imagination
        </span>
      </div>
      <div className="land-benefits-wrapper d-flex flex-column gap-5">
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center justify-content-center">
            <h6 className="new-benefits-header font-organetto mb-5" style={{ color: "#85fbc9" }}>
              Dimensions
            </h6>
          </div>
          <div className="new-benefits-grid">
            {dimensions.map((item, index) => (
              <div
                className="new-benefit-card d-flex flex-column align-items-center justify-content-center p-5"
                key={index}
              >
                <h6 className="new-benefit-title">{item.title}</h6>
                <span className="new-benefit-desc">{item.content}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center justify-content-center">
            <h6 className="new-benefits-header font-organetto mb-5" style={{ color: "#85fbc9" }}>
              Play-to-earn
            </h6>
          </div>
          <div className="new-benefits-grid">
            {playToEarn.map((item, index) => (
              <div
                className="new-benefit-card d-flex flex-column align-items-center justify-content-center p-5"
                key={index}
              >
                <h6 className="new-benefit-title">{item.title}</h6>
                <span className="new-benefit-desc">{item.content}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center justify-content-center">
            <h6 className="new-benefits-header font-organetto mb-5" style={{ color: "#85fbc9" }}>
              Interactions
            </h6>
          </div>
          <div className="new-benefits-grid">
            {interactions.map((item, index) => (
              <div
                className="new-benefit-card d-flex flex-column align-items-center justify-content-center p-5"
                key={index}
              >
                <h6 className="new-benefit-title">{item.title}</h6>
                <span className="new-benefit-desc">{item.content}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center justify-content-center">
            <h6 className="new-benefits-header font-organetto mb-5" style={{ color: "#85fbc9" }}>
              Creativity
            </h6>
          </div>
          <div className="new-benefits-grid">
            {creativity.map((item, index) => (
              <div
                className="new-benefit-card d-flex flex-column align-items-center justify-content-center p-5"
                key={index}
              >
                <h6 className="new-benefit-title">{item.title}</h6>
                <span className="new-benefit-desc">{item.content}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandBenefits;
