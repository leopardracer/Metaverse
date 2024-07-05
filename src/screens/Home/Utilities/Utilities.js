import React from "react";
import "./_utilities.scss";

const Utilities = () => {
  const utilities = [
    {
      title: "Live on Mainnet",
      image: "dyp.svg",
      desc: `
      <p class="utility-desc">
      Launched on December 29, 2022, World of Dypians it is currently live on Ethereum, BNB Chain, Conflux Network, and Base mainnets. By being on the mainnet, users can participate in activities and integrations in real-time and explore the benefits of blockchain technology.
      </p>`,
      class: "mainnet-card",
    },
    {
      title: "Stats",
      image: "idyp.svg",
      desc: `
      <p class="utility-desc">
      Beta demo game with 25,000 beta testers currently enjoying it.
More than 11,000 applicants are waiting for beta access.
5 new events are currently available for users to participate in.
Over $100,000 in distributed rewards, the equivalent of more than 260 BNB.
      </p>`,
      class: "stats-card",
    },
    {
      title: "All-In-One Platform",
      image: "caws.png",
      desc: `
      <p class="utility-desc">
      The World of Dypians ecosystem seamlessly integrates the Metaverse, DeFi, NFTs, and Business Development into one platform. We have integrated DeFi, businesses, and NFTs within the Metaverse, providing a unique user journey and experience for our users.     
      </p>`,
      class: "integrations-card",
    },
    {
      title: "Utilities",
      image: "genesis.png",
      desc: `
      <p class="utility-desc">
      The WOD token will serve as the primary utility within the World of Dypians metaverse. It will be used for in-game purchases, unlocking features and upgrades, and accessing other content. By integrating a decentralized utility token, the game enhances the player experience and drives the growth of the World of Dypians ecosystem.  
      </p>`,
      class: "coins-card",
    },
    // {
    //   title: "Premium Events",
    //   image: "genesis.png",
    //   desc: `
    //   <p class="utility-desc">
    //   A wide range of exclusive features and benefits to its users, and one way to gain access to these is by participating in live events. There are four events such as Golden Pass, Puzzle Madness, Dragon Ruins, and Critical Hit. Users can unlock new opportunities from custom integrations and activities on-chain, as well as earn rewards and recognition within the World of Dypians community.
    //   </p>`,
    //   class: "events-card",
    // },
    // {
    //   title: "Partners",
    //   image: "genesis.png",
    //   desc: `
    //   <p class="utility-desc">
    //   A wide range of exclusive features and benefits to its users, and one way to gain access to these is by participating in live events. There are four events such as Golden Pass, Puzzle Madness, Dragon Ruins, and Critical Hit. Users can unlock new opportunities from custom integrations and activities on-chain, as well as earn rewards and recognition within the World of Dypians community.
    //   </p>`,
    //   class: "partners-card",
    // },
  ];

  const partnerIcons = [
    {
      image: "chainlink.svg",
      title: "Chainlink",
    },
    {
      image: "coin98.svg",
      title: "Coin98",
    },
    {
      image: "gateio.svg",
      title: "Gate.io",
    },
    {
      image: "mexc.svg",
      title: "Mexc",
    },
    {
      image: "bnb.svg",
      title: "BNB Chain",
    },
    {
      image: "es2.svg",
      title: "Easy2Stake",
    },

    {
      image: "avalanche.svg",
      title: "Avalanche",
    },
    "",
    "coin98.svg",
    "mexc.svg",
    "bnb.svg",
    "es2.svg",
    "avalanche.svg",
  ];

  return (
    <div className="px-3 px-lg-5" id="utilities">
      <div className="w-100">
        <h2 className="font-organetto explorer-grid-title px-0 w-50">
          Features
        </h2>
      </div>
      <div className="utilities-grid">
        {utilities.map((item, index) => (
          <div
            key={index}
            className={`${item.class} utility-card flex-column d-flex align-items-center justify-content-center p-4`}
          >
            <div className="utility-first d-flex align-items-center justify-content-center gap-2 flex-column">
              {/* <img
                src={require(`./assets/${item.image}`)}
                style={{ width: "50px", height: "50px" }}
                alt=""
              /> */}
              <h6 className="utility-title">{item.title}</h6>
            </div>
            <div className="utility-desc-div">
              <div className="d-flex flex-column align-items-center gap-0 gap-lg-2">
                <h6 className="utility-title">{item.title}</h6>
                <div dangerouslySetInnerHTML={{ __html: item.desc }}></div>
              </div>
              {/* <p className="utility-desc">{item.desc}</p> */}
            </div>
          </div>
        ))}
        {/* <div
          className={`partners-card utility-card flex-column d-flex align-items-center justify-content-center p-4`}
        >
          <div className="utility-first d-flex align-items-center justify-content-center gap-2 flex-column">
    
            <h6 className="utility-title">Who builds in WoD?</h6>
          </div>
          <div className="utility-desc-div">
            <div className="d-flex flex-column align-items-center gap-0 gap-lg-2">
              <h6 className="utility-title">Who builds in WoD?</h6>
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex flex-column align-items-center gap-2">
                  <img
                    width={40}
                    height={40}
                    src={require(`./assets/chainlink.svg`).default}
                    alt=""
                  />
                  <span className="utility-desc">Chainlink</span>
                </div>
                <div className="d-flex flex-column align-items-center gap-2">
                  <img
                    width={40}
                    height={40}
                    src={require(`./assets/kucoin.svg`).default}
                    alt=""
                  />
                  <span className="utility-desc">KuCoin</span>
                </div>
                <div className="d-flex flex-column align-items-center gap-2">
                  <img
                    width={40}
                    height={40}
                    src={require(`./assets/coin98.svg`).default}
                    alt=""
                  />
                  <span className="utility-desc">Coin98</span>
                </div>
                <div className="d-flex flex-column align-items-center gap-2">
                  <img
                    width={40}
                    height={40}
                    src={require(`./assets/avalanche.svg`).default}
                    alt=""
                  />
                  <span className="utility-desc">Avalanche</span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-4 mt-3">
                <div className="d-flex flex-column align-items-center gap-2">
                  <img
                    width={40}
                    height={40}
                    src={require(`./assets/coingecko.svg`).default}
                    alt=""
                  />
                  <span className="utility-desc">CoinGecko</span>
                </div>
                <div className="d-flex flex-column align-items-center gap-2">
                  <img
                    width={40}
                    height={40}
                    src={require(`./assets/conflux.png`)}
                    alt=""
                  />
                  <span className="utility-desc">Conflux</span>
                </div>

                <div className="d-flex flex-column align-items-center gap-2">
                  <img
                    width={40}
                    height={40}
                    src={require(`./assets/gateio.svg`).default}
                    alt=""
                  />
                  <span className="utility-desc">Gate.io</span>
                </div>
                <div className="d-flex flex-column align-items-center gap-2">
                  <img
                    width={40}
                    height={40}
                    src={require(`./assets/mexc.svg`).default}
                    alt=""
                  />
                  <span className="utility-desc">Mexc</span>
                </div>
                <div className="d-flex flex-column align-items-center gap-2">
                  <img
                    width={40}
                    height={40}
                    src={require(`./assets/es2.svg`).default}
                    alt=""
                  />
                  <span className="utility-desc">Easy2Stake</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Utilities;
