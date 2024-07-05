import React, { useState, useEffect } from "react";
import MobileNav from "../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import useWindowSize from "../../../hooks/useWindowSize";
import "../_marketplace.scss";
import topEth from "../assets/topEth.svg";
import topDyp from "../assets/dypIcon.svg";
import { useLocation } from "react-router-dom";
import getListedNFTS from "../../../actions/Marketplace";
import checkActive from "../assets/checked.svg";
import checkPassive from "../assets/empty.svg";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { shortAddress } from "../../Caws/functions/shortAddress";
import Toast from "../../../components/Toast/Toast";
import axios from "axios";
import getFormattedNumber from "../../Caws/functions/get-formatted-number";
import eye from "../assets/eye.svg";
import heart from "../assets/heart.svg";
import ethIcon from "../assets/ethIcon.svg";
import bnbLogo from "../assets/bnbIcon.svg";
import confluxLogo from "../assets/confluxLogo.svg";
import baseLogo from "../assets/baseLogo.svg";
import avaxLogo from "../assets/avaxLogo.svg";
import skaleLogo from "../assets/skaleIcon.svg";
import coreLogo from "../assets/coreLogo.svg";
import victionLogo from "../assets/victionLogo.svg";
import multiversLogo from "../assets/multiversLogo.svg";



import { GET_PLAYER } from "../../Account/src/Containers/Dashboard/Dashboard.schema";
import { useQuery } from "@apollo/client";
import { useAuth } from "../../Account/src/Utils.js/Auth/AuthDetails";
import favActive from "./assets/favActive.svg";
import favInactive from "./assets/favInactive.svg";
import cart from "./assets/cart.svg";
import link from "./assets/link.svg";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import whiteTag from "./assets/whiteTag.svg";
import MakeOffer from "./MakeOffer";
import inboxStar from "./assets/inboxStar.svg";
import dollarCircle from "./assets/dollarCircle.svg";
import stars from "./assets/stars.svg";
import singleStar from "./assets/star.svg";
import expand from "./assets/expand.svg";
import chart from "./assets/chart.svg";
import users from "./assets/users.svg";
import dropdownIcon from "./assets/dropdownIcon.svg";

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#fff",
    fontFamily: "Poppins",
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
    fontFamily: "Poppins",
    zIndex: "2",
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Poppins",
  },
  "& .MuiSelect-select": {
    color: "#fff",
    fontFamily: "Poppins",
    zIndex: "1",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#AAA5EB",
    fontFamily: "Poppins",
    color: "#fff",
    background: "#272450",
    borderRadius: "8px",
  },
  "& .MuiOutlinedInput-input": {
    zIndex: "1",
    color: "#fff",
    fontFamily: "Poppins",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Poppins",
      background: "#272450",
      borderRadius: "8px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Poppins",
      color: "#fff",
      background: "#272450",
      borderRadius: "8px",
    },
  },
});

const SingleNft = ({
  coinbase,
  showWalletConnect,
  chainId,
  isConnected,
  handleSwitchChain,
  nftCount,
  handleRefreshListing,
  favorites,
  dyptokenData_old,
}) => {
  const windowSize = useWindowSize();
  const location = useLocation();
  const { BigNumber } = window;

  const [nft, setNft] = useState(
    location.state?.nft ? location.state?.nft : []
  );

  const [type, setType] = useState(
    location.state?.type ? location.state?.type : false
  );

  const [IsApprove, setIsApprove] = useState(false);
  const [buttonText, setbuttonText] = useState("Approve");
  const [IsListed, setIsListed] = useState(false);
  const [offerData, setofferData] = useState([]);

  const [buttonLoading, setbuttonLoading] = useState(false);
  const [buyloading, setbuyLoading] = useState(false); //buy
  const [sellLoading, setsellLoading] = useState(false); //sell
  const [updateLoading, setupdateLoading] = useState(false); //update
  const [cancelLoading, setcancelLoading] = useState(false); //cancel

  const [buyStatus, setbuyStatus] = useState(""); //buy
  const [sellStatus, setsellStatus] = useState(""); //sell
  const [updateStatus, setupdateStatus] = useState("update"); //update
  const [cancelStatus, setcancelStatus] = useState("cancel"); //cancel

  const [purchaseStatus, setPurchaseStatus] = useState("");
  const [purchaseColor, setPurchaseColor] = useState("#00FECF");
  const [priceType, setPriceType] = useState(0);
  const [nftPrice, setNftPrice] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");

  const [metaData, setmetaData] = useState([]);
  const [saleHistory, setsaleHistory] = useState([]);

  const [isOwner, setisOwner] = useState(
    location.state?.isOwner ? location.state?.isOwner : false
  );
  const [dyptokenData, setDypTokenData] = useState(0);
  const [ethtokenData, setEthTokenData] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [favCount, setfavCount] = useState(0);
  const { email, logout } = useAuth();

  const [isFavorite, setIsFavorite] = useState(false);
  const [owner, setowner] = useState("");
  const [loadingNft, setloadingNft] = useState(false);
  const [showMakeOffer, setshowMakeOffer] = useState(false);
  const [offerStatus, setOfferStatus] = useState("initial");
  const [offerdeleteStatus, setOfferdeleteStatus] = useState("initial");
  const [offerupdateStatus, setOfferupdateStatus] = useState("initial");
  const [offeracceptStatus, setOfferacceptStatus] = useState("initial");
  const [lowestPriceNftListed, setlowestPriceNftListed] = useState([]);
  const [lowestPriceNftListedDYP, setlowestPriceNftListedDYP] = useState([]);
  const [myOffers, setmyOffers] = useState([]);

  const { nftId, nftAddress } = useParams();

  const {
    data,
    refetch: refetchPlayer,
    loading: loadingPlayer,
  } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });

  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };

  const getListedNtsAsc = async () => {
    const dypNfts = await getListedNFTS(0, "", "payment_priceType", "DYP", "");

    let dypNftsAsc = dypNfts.sort((a, b) => {
      return a.price - b.price;
    });

    const ethNfts = await getListedNFTS(0, "", "payment_priceType", "ETH", "");

    let ethNftsAsc = ethNfts.sort((a, b) => {
      return a.price - b.price;
    });
    setlowestPriceNftListed(ethNftsAsc[0].price);

    setlowestPriceNftListedDYP(dypNftsAsc[0].price);
  };

  const getOffer = async () => {
    let finalArray = [];
    if (
      type !== "conflux" &&
      type !== "doge" &&
      type !== "cmc" &&
      type !== "coingecko" &&
      type !== "gate" &&
      type !== "base" &&
      type !== "skale" &&
      type !== "core" &&
      type !== "viction"&&
      type !== "multivers" &&
      type !== "bnb"
    ) {
      const token_address = "0x39b46b212bdf15b42b166779b9d1787a68b9d0c3";
      const token_address_old = "0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17";

      const contract1 = new window.infuraWeb3.eth.Contract(
        window.ERC20_ABI,
        token_address
      );

      const contract1_old = new window.infuraWeb3.eth.Contract(
        window.ERC20_ABI,
        token_address_old
      );
      const contract2 = new window.infuraWeb3.eth.Contract(
        window.TOKEN_ABI,
        window.config.weth2_address
      );

      const result = await window.getAllOffers(nftAddress, nftId).catch((e) => {
        console.error(e);
      });

      if (result && coinbase) {
        const my_offers = result.filter((object) => {
          return object.offer.buyer.toLowerCase() === coinbase.toLowerCase();
        });
        setmyOffers(my_offers[0] ? my_offers[0].offer : []);
      }

      await Promise.all(
        result.map(async (item) => {
          if (item.offer.payment.priceType === "1") {
            if (item.offer.payment.tokenAddress === token_address_old) {
              const balance = await contract1_old.methods
                .balanceOf(item.offer.buyer)
                .call()
                .then((data) => {
                  return window.infuraWeb3.utils.fromWei(data, "ether");
                });

              const allowance = await contract1_old.methods
                .allowance(
                  item.offer.buyer,
                  window.config.nft_marketplace_address
                )
                .call()
                .then((data) => {
                  return window.infuraWeb3.utils.fromWei(data, "ether");
                });

              const priceFormatted = item.offer.price / 1e18;
              // console.log(balance >= priceFormatted && allowance >= priceFormatted)
              return finalArray.push({
                offer: item.offer,
                index: item.index,
                isAllowed:
                  balance >= priceFormatted && allowance >= priceFormatted,
              });
            } else if (item.offer.payment.tokenAddress === token_address) {
              const balance = await contract1.methods
                .balanceOf(item.offer.buyer)
                .call()
                .then((data) => {
                  return window.infuraWeb3.utils.fromWei(data, "ether");
                });

              const allowance = await contract1.methods
                .allowance(
                  item.offer.buyer,
                  window.config.nft_marketplace_address
                )
                .call()
                .then((data) => {
                  return window.infuraWeb3.utils.fromWei(data, "ether");
                });

              const priceFormatted = item.offer.price / 1e18;
              // console.log(balance >= priceFormatted && allowance >= priceFormatted)
              return finalArray.push({
                offer: item.offer,
                index: item.index,
                isAllowed:
                  balance >= priceFormatted && allowance >= priceFormatted,
              });
            }
          } else if (item.offer.payment.priceType === "0") {
            const balance = await contract2.methods
              .balanceOf(item.offer.buyer)
              .call()
              .then((data) => {
                return window.infuraWeb3.utils.fromWei(data, "ether");
              });

            const allowance = await contract2.methods
              .allowance(
                item.offer.buyer,
                window.config.nft_marketplace_address
              )
              .call()
              .then((data) => {
                return window.infuraWeb3.utils.fromWei(data, "ether");
              });

            const priceFormatted = item.offer.price / 1e18;
            return finalArray.push({
              offer: item.offer,
              index: item.index,
              isAllowed:
                balance >= priceFormatted && allowance >= priceFormatted,
            });
          }
        })
      );
      finalArray.reverse();
      setofferData(finalArray);
    }
  };

  const getPriceDYP = async () => {
    const dypprice = await axios
      .get(
        "https://api.geckoterminal.com/api/v2/networks/eth/pools/0x7c81087310a228470db28c1068f0663d6bf88679"
      )
      .then((res) => {
        return res.data.data.attributes.base_token_price_usd;
      })
      .catch((e) => {
        console.log(e);
      });

    setDypTokenData(dypprice);
  };

  const getTokenData = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_eth_v2")
      .then((data) => {
        const propertyETH = data.data.the_graph_eth_v2.usd_per_eth;

        setEthTokenData(propertyETH);
      });
  };

  const getNftOwner = async (type, Id) => {
    if (type === "timepiece") {
      const nft_contract = new window.infuraWeb3.eth.Contract(
        window.TIMEPIECE_ABI,
        window.config.nft_timepiece_address
      );
      const nftowner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      setowner(nftowner);
    } else if (type === "land") {
      const nft_contract = new window.infuraWeb3.eth.Contract(
        window.WOD_ABI,
        window.config.nft_land_address
      );
      const nftowner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      setowner(nftowner);
    } else if (type === "caws") {
      const nft_contract = new window.infuraWeb3.eth.Contract(
        window.CAWS_ABI,
        window.config.nft_caws_address
      );
      const nftowner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      setowner(nftowner);
    } else if (type === "cawsbnb") {
      const nft_contract = new window.bscWeb3.eth.Contract(
        window.CAWS_CCIP_ABI,
        window.config.nft_caws_bnb_address
      );

      const owner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      setowner(owner);
    } else if (type === "cawsavax") {
      const nft_contract = new window.avaxWeb3.eth.Contract(
        window.CAWS_CCIP_ABI,
        window.config.nft_caws_avax_address
      );

      const owner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      setowner(owner);
    } else if (type === "cawsbase") {
      const nft_contract = new window.baseWeb3.eth.Contract(
        window.CAWS_CCIP_ABI,
        window.config.nft_caws_base_address
      );

      const owner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      setowner(owner);
    } else if (type === "landbnb") {
      const nft_contract = new window.bscWeb3.eth.Contract(
        window.LAND_CCIP_ABI,
        window.config.nft_land_bnb_address
      );

      const owner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      setowner(owner);
    } else if (type === "landavax") {
      const nft_contract = new window.avaxWeb3.eth.Contract(
        window.LAND_CCIP_ABI,
        window.config.nft_caws_land_address
      );

      const owner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      setowner(owner);
    } else if (type === "landbase") {
      const nft_contract = new window.baseWeb3.eth.Contract(
        window.LAND_CCIP_ABI,
        window.config.nft_land_base_address
      );

      const owner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      setowner(owner);
    } else if (type === "coingecko") {
      const nft_contract = new window.bscWeb3.eth.Contract(
        window.COINGECKO_NFT_ABI,
        window.config.nft_coingecko_address
      );

      const owner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      setowner(owner);
    } else if (type === "gate") {
      const nft_contract = new window.bscWeb3.eth.Contract(
        window.GATE_NFT_ABI,
        window.config.nft_gate_address
      );

      const owner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      setowner(owner);
    } else if (type === "conflux") {
      const nft_contract = new window.confluxWeb3.eth.Contract(
        window.CONFLUX_NFT_ABI,
        window.config.nft_conflux_address
      );
      const owner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      console.log(owner);

      setowner(owner);
    } else if (type === "doge") {
      const nft_contract = new window.bscWeb3.eth.Contract(
        window.DOGE_NFT_ABI,
        window.config.nft_doge_address
      );
      const owner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      console.log(owner);

      setowner(owner);
    }  else if (type === "bnb") {
      const nft_contract = new window.bscWeb3.eth.Contract(
        window.BNB_NFT_ABI,
        window.config.nft_bnb_address
      );
      const owner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      console.log(owner);

      setowner(owner);
    } else if (type === "skale") {
      const nft_contract = new window.skaleWeb3.eth.Contract(
        window.SKALE_NFT_ABI,
        window.config.nft_skale_address
      );
      const owner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      console.log(owner);

      setowner(owner);
    } else if (type === "cmc") {
      const nft_contract = new window.bscWeb3.eth.Contract(
        window.CMC_NFT_ABI,
        window.config.nft_cmc_address
      );
      const owner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      setowner(owner);
    } else if (type === "core") {
      const nft_contract = new window.coreWeb3.eth.Contract(
        window.CORE_NFT_ABI,
        window.config.nft_core_address
      );
      const owner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      setowner(owner);
    }  else if (type === "viction") {
      const nft_contract = new window.victionWeb3.eth.Contract(
        window.VICTION_NFT_ABI,
        window.config.nft_viction_address
      );
      const owner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      setowner(owner);
    }   else if (type === "multivers") {
      const nft_contract = new window.bscWeb3.eth.Contract(
        window.MULTIVERS_NFT_ABI,
        window.config.nft_multivers_address
      );
      const owner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      setowner(owner);
    } else if (type === "base") {
      const nft_contract = new window.baseWeb3.eth.Contract(
        window.BASE_NFT_ABI,
        window.config.nft_base_address
      );
      const owner = await nft_contract.methods
        .ownerOf(Id)
        .call()
        .catch((e) => {
          console.log(e);
        });

      console.log(owner);

      setowner(owner);
    }
  };

  const getOldNftOwner = async (type, Id) => {
    if (type === "timepiece") {
      const nftowner = await window.caws_timepiece.ownerOf(Id).catch((e) => {
        console.log(e);
      });

      localStorage.setItem("oldOwner", nftowner);
    } else if (type === "land") {
      const nftowner = await window.landnft.ownerOf(Id).catch((e) => {
        console.log(e);
      });
      localStorage.setItem("oldOwner", nftowner);
    } else if (type === "caws") {
      const nftowner = await window.nft.ownerOf(Id).catch((e) => {
        console.log(e);
      });

      localStorage.setItem("oldOwner", nftowner);
    }
  };

  const getMetaData = async (addr, tokenid) => {
    if (
      addr === window.config.nft_caws_address ||
      addr === window.config.nft_caws_bnb_address ||
      addr === window.config.nft_caws_avax_address ||
      addr === window.config.nft_caws_base_address
    ) {
      const result = await window.getNft(tokenid);
      setmetaData(result);
    } else if (
      addr === window.config.nft_land_address ||
      addr === window.config.nft_land_bnb_address ||
      addr === window.config.nft_land_avax_address ||
      addr === window.config.nft_land_base_address
    ) {
      const result = await window.getLandNft(tokenid);
      setmetaData(result);
    } else if (addr === window.config.nft_timepiece_address) {
      const result = await window.getTimepieceNft(tokenid);
      setmetaData(result);
    }
  };

  const isApprovedBuy = async (tokenType, amount) => {
    const result = await window.isApprovedBuy(tokenType, amount).catch((e) => {
      console.error(e);
    });

    return result;
  };

  // console.log(window)
  async function isApprovedNFT(nft, type, coinbase) {
    const result = await window
      .isApprovedNFT(nft, type, coinbase)
      .catch((e) => {
        console.error(e);
      });
    return result;
  }

  const handleRefreshList = async (type, tokenId) => {
    if (type === "timepiece") {
      let nft_address = window.config.nft_timepiece_address;
      const listedNFT = await getListedNFTS(
        0,
        "",
        "nftAddress_tokenId",
        tokenId,
        nft_address
      );

      if (listedNFT && listedNFT.length > 0) {
        setNft(...listedNFT);
      }
    } else if (type === "land") {
      let nft_address = window.config.nft_land_address;
      const listedNFT = await getListedNFTS(
        0,
        "",
        "nftAddress_tokenId",
        tokenId,
        nft_address
      );

      if (listedNFT && listedNFT.length > 0) {
        setNft(...listedNFT);
      }
    } else {
      let nft_address = window.config.nft_caws_address;
      const listedNFT = await getListedNFTS(
        0,
        "",
        "nftAddress_tokenId",
        tokenId,
        nft_address
      );

      if (listedNFT && listedNFT.length > 0) {
        setNft(...listedNFT);
      }
    }
  };

  const getRelativeTime = (nftTimestamp) => {
    const date = new Date();
    const timestamp = date.getTime();

    const seconds = Math.floor(timestamp / 1000);
    const oldTimestamp = nftTimestamp;
    const difference = seconds - oldTimestamp;
    let output = ``;

    if (difference < 60) {
      // Less than a minute has passed:
      output = `${difference} seconds ago`;
    } else if (difference < 3600) {
      // Less than an hour has passed:
      output = `${Math.floor((difference / 60).toFixed())} minutes ago`;
    } else if (difference < 86400) {
      // Less than a day has passed:
      output = `${Math.floor((difference / 3600).toFixed())} hours ago`;
    } else if (difference < 2620800) {
      // Less than a month has passed:
      output = `${Math.floor((difference / 86400).toFixed())} days ago`;
    } else if (difference < 31449600) {
      // Less than a year has passed:
      output = `${Math.floor((difference / 2620800).toFixed())} months ago`;
    } else {
      // More than a year has passed:
      output = `${Math.floor((difference / 31449600).toFixed())} years ago`;
    }
    return output;
  };

  const getLatestBoughtNFT = async () => {
    let boughtItems = [];
    let finalboughtItems = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/worldofdypians-marketplace/version/latest";

    const itemBoughtQuery = `
        {
            itemBoughts(first: 1, orderBy: blockTimestamp, orderDirection: desc) {
            nftAddress
            tokenId
            payment_priceType
            price
            buyer
            blockNumber
            blockTimestamp
        }
        }
        `;

    await axios
      .post(URL, { query: itemBoughtQuery })
      .then(async (result) => {
        boughtItems = await result.data.data.itemBoughts;
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log("boughtItems", boughtItems);

    boughtItems &&
      boughtItems.map((nft) => {
        if (nft.nftAddress === window.config.nft_caws_address) {
          nft.type = "caws";
          nft.chain = 1;
          finalboughtItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_land_address) {
          nft.type = "land";
          nft.chain = 1;
          finalboughtItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_timepiece_address) {
          nft.type = "timepiece";
          nft.chain = 1;
          finalboughtItems.push(nft);
        }
      });

    console.log("...finalboughtItems", finalboughtItems);
    setNft(...finalboughtItems);
    setIsListed(false);
    if (finalboughtItems[0].buyer.toLowerCase() !== coinbase.toLowerCase()) {
      setisOwner(false);
    }
  };

  const handleSell = async (tokenId, nftPrice, priceType, type) => {
    const isApproved = await isApprovedNFT(
      nftId,
      nftAddress === window.config.nft_caws_address
        ? "caws"
        : nftAddress === window.config.nft_timepiece_address
        ? "timepiece"
        : "land",
      coinbase
    );
    const newPrice = new BigNumber(nftPrice * 1e18).toFixed();
    console.log(newPrice, isApproved);
    const tokenType =
      priceType === 1 ? "dypv1" : priceType === 2 ? "dypv2" : "eth";
    const pricetype2 = priceType === 1 || priceType === 2 ? 1 : 0;
    if (isApproved) {
      console.log("selling");
      setsellLoading(true);
      setsellStatus("sell");
      setPurchaseStatus("Listing NFT in progress...");
      setPurchaseColor("#00FECF");

      await window
        .listNFT(nftId, newPrice, pricetype2, type, tokenType)
        .then((result) => {
          setsellLoading(false);
          setsellStatus("success");
          setPurchaseStatus("NFT successfully listed!");
          setPurchaseColor("#00FECF");
          setShowToast(true);
          handleRefreshList(
            nftAddress === window.config.nft_caws_address
              ? "caws"
              : nftAddress === window.config.nft_timepiece_address
              ? "timepiece"
              : "land",
            nftId
          );
          setIsListed(true);
          handleRefreshListing();
          setTimeout(() => {
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
            setsellStatus("sell");
          }, 3000);
        })
        .catch((e) => {
          setsellLoading(false);
          setsellStatus("failed");
          setPurchaseStatus(e?.message);
          setPurchaseColor("#FF6232");
          setTimeout(() => {
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
            setsellStatus("sell");
          }, 3000);
          console.error(e);
        });
    } else {
      console.log("approve selling");

      setsellLoading(true);
      setsellStatus("approve");
      setPurchaseStatus("Approving NFT for listing in progress..");
      setPurchaseColor("#00FECF");

      await window
        .approveNFT(type)
        .then((result) => {
          setTimeout(() => {
            setsellStatus("sell");
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
          }, 3000);

          setsellLoading(false);
          setsellStatus("success");
          setPurchaseStatus("Successfully approved! You can list your nft");
          setPurchaseColor("#00FECF");
        })
        .catch((e) => {
          setTimeout(() => {
            setsellStatus("approve");
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
          }, 3000);

          setsellLoading(false);
          setsellStatus("failed");
          setPurchaseStatus(e?.message);
          setPurchaseColor("#FF6232");
          console.log(e);
        });
    }
  };

  const getLatest20BoughtNFTS = async (nftAddress, tokenId) => {
    let boughtItems = [];
    let finalboughtItems = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/worldofdypians-marketplace/version/latest";

    const itemBoughtQuery = `
        {
            itemBoughts(first: 20, orderBy: blockTimestamp, orderDirection: desc, where: { nftAddress_in: ["${nftAddress}"], tokenId: "${tokenId}"  }) {
            nftAddress
            tokenId
            payment_priceType
            price
            buyer
            blockNumber
            blockTimestamp
            transactionHash
        }
        }
        `;

    await axios
      .post(URL, { query: itemBoughtQuery })
      .then(async (result) => {
        boughtItems = await result.data.data.itemBoughts;
      })
      .catch((error) => {
        console.log(error);
      });

    boughtItems &&
      boughtItems.map((nft) => {
        if (nft.nftAddress === window.config.nft_caws_address) {
          nft.type = "caws";
          nft.chain = 1;
          finalboughtItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_land_address) {
          nft.type = "land";
          nft.chain = 1;
          finalboughtItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_timepiece_address) {
          nft.type = "timepiece";
          nft.chain = 1;
          finalboughtItems.push(nft);
        }
      });

    setsaleHistory(finalboughtItems);
    return finalboughtItems;
  };

  async function addNFTToUserFavorites(userId, tokenId, nftAddress) {
    try {
      const response = await fetch(
        `https://api.worldofdypians.com/user-favorites/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tokenId, nftAddress }),
        }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error("Error adding NFT to user favorites");
      }
      const data = await response.json();
      getFavoritesCount(nftId, nftAddress);
      setIsFavorite(true);
      handleRefreshListing();
      return data.favorites;
    } catch (error) {
      console.log(error);

      console.error("Error adding NFT to user favorites:", error);
      throw error;
    }
  }

  async function deleteNFTFromUserFavorites(userId, tokenId, nftAddress) {
    fetch(
      `https://api.worldofdypians.com/user-favorites/${userId}/${tokenId}/${nftAddress}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok || response.status === 204 || response.status === 404) {
          // NFT removed successfully or was not found (404)
          console.log("NFT removed from favorites");
          getFavoritesCount(nftId, nftAddress);
          setIsFavorite(false);
          handleRefreshListing();
        } else {
          // Handle other status codes as errors
          console.error(
            "Failed to remove NFT from favorites. Status:",
            response.status
          );
        }
      })
      .catch((error) => {
        // Handle network or fetch error
        console.error("Error removing NFT from favorites:", error);
      });
  }

  const handleFavorite = async (nft) => {
    if (isConnected) {
      if (isFavorite === true) {
        await deleteNFTFromUserFavorites(coinbase, parseInt(nftId), nftAddress);
      }
      if (!isFavorite) {
        await addNFTToUserFavorites(coinbase, parseInt(nftId), nftAddress);
      }
    } else showWalletConnect();
  };

  async function handleBuy(nft) {
    const tokenType =
      nft.payment_tokenAddress === window.config.dyp_token_address
        ? "dypv1"
        : nft.payment_tokenAddress === window.config.token_dypius_new_address
        ? "dypv2"
        : "eth";

    const isApproved = await isApprovedBuy(tokenType, nft.price);

    if (isApproved || nft.payment_priceType === 0) {
      console.log("buying", nft.price);
      setPurchaseColor("#00FECF");

      setbuyLoading(true);
      setbuyStatus("buy");
      setPurchaseStatus("Buying NFT in progress..");
      await window
        .buyNFT(
          nft.price,
          nftAddress,
          nftId,
          nft.payment_priceType,
          nft.payment_tokenAddress
        )
        .then((result) => {
          console.log("buyNFT", result);
          setbuyLoading(false);
          setbuyStatus("success");
          setPurchaseStatus("Successfully purchased!");
          setShowToast(true);
          setToastTitle("Successfully purchased!");
          setPurchaseColor("#00FECF");
          // setIsListed(false)

          setTimeout(() => {
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
            setbuyStatus("");
            handleRefreshList(
              nftAddress === window.config.nft_caws_address
                ? "caws"
                : nftAddress === window.config.nft_timepiece_address
                ? "timepiece"
                : "land",
              nftId
            );
            handleRefreshListing();
            getLatestBoughtNFT();
          }, 3000);
        })
        .catch((e) => {
          setbuyStatus("failed");
          setbuyLoading(false);
          setPurchaseStatus(e?.message);
          setPurchaseColor("#FF6232");
          setTimeout(() => {
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
            setbuyStatus("");
          }, 3000);
          console.error(e);
        });
    } else {
      console.log("approve buying");

      setbuyStatus("approve");
      setbuyLoading(true);
      setPurchaseStatus("Approving in progress...");
      setPurchaseColor("#00FECF");
      await window
        .approveBuy(tokenType, nft.price)
        .then(() => {
          setTimeout(() => {
            setbuyStatus("buy");
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
          }, 3000);
          setbuyStatus("success");
          setbuyLoading(false);
          setPurchaseStatus("Successfully approved");
          setPurchaseColor("#00FECF");
        })
        .catch((e) => {
          console.error(e);
          setbuyStatus("failed");
          setTimeout(() => {
            setbuyStatus("approve");
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
          }, 3000);
          setbuyLoading(false);
          setPurchaseStatus(e?.message);
          setPurchaseColor("#FF6232");
        });
    }
  }

  const cancelNFT = (nftAddress, tokenId, type, tokenType) => {
    setcancelLoading(true);
    setcancelStatus("cancel");
    setPurchaseColor("#00FECF");
    setPurchaseStatus("Unlisting your nft...");
    console.log("cancelling");

    return window
      .cancelListNFT(nftAddress, tokenId, type, tokenType)
      .then((result) => {
        setTimeout(() => {
          setcancelStatus("");
          setPurchaseColor("#00FECF");
          setPurchaseStatus("");
        }, 3000);
        // handleRefreshList(type, tokenId);
        handleRefreshListing();
        setcancelLoading(false);
        setcancelStatus("success");
        setPurchaseColor("#00FECF");
        setPurchaseStatus("Nft successfully unlisted");
      })
      .catch((e) => {
        setTimeout(() => {
          setcancelStatus("");
          setPurchaseColor("");
          setPurchaseStatus("");
        }, 3000);

        setcancelLoading(false);
        setcancelStatus("failed");
        setPurchaseColor("#FF6232");
        setPurchaseStatus(e?.message);
      });
  };

  async function updateListing(nft, price, priceType, type, tokenType) {
    const newPrice = new BigNumber(price * 1e18).toFixed();

    setPurchaseColor("#00FECF");
    setPurchaseStatus("Price is being updated...");
    setupdateLoading(true);
    setupdateStatus("update");
    console.log("updating", nft, newPrice, priceType, type);

    return await window
      .updateListingNFT(nft, newPrice, priceType, type, tokenType)
      .then((result) => {
        setTimeout(() => {
          setPurchaseColor("#00FECF");
          setPurchaseStatus("");
          setupdateStatus("");
        }, 3000);
        setShowToast(true);
        setToastTitle("Successfully updated!");
        handleRefreshList(
          nftAddress === window.config.nft_caws_address
            ? "caws"
            : nftAddress === window.config.nft_timepiece_address
            ? "timepiece"
            : "land",
          nftId
        );
        handleRefreshListing();
        setPurchaseColor("#00FECF");
        setPurchaseStatus("Price updated successfully.");
        setupdateLoading(false);
        setupdateStatus("success");
      })
      .catch((e) => {
        setTimeout(() => {
          setPurchaseColor("#00FECF");
          setPurchaseStatus("");
          setupdateStatus("");
        }, 3000);

        setPurchaseColor("#FF6232");
        setPurchaseStatus(e?.message);
        setupdateLoading(false);
        setupdateStatus("failed");
      });
  }

  async function isListedNFT(tokenId, addr) {
    const listedNFTS = await getListedNFTS(
      0,
      "",
      "nftAddress_tokenId",
      tokenId,
      addr
    );

    return listedNFTS.length > 0;
  }

  async function checkisListedNFT(tokenId, nftAddr) {
    setloadingNft(true);
    const listedNFTS = await getListedNFTS(
      0,
      "",
      "nftAddress_tokenId",
      tokenId,
      nftAddr
    );
    if (listedNFTS.length > 0) {
      if (listedNFTS[0].seller.toLowerCase() !== owner.toLowerCase()) {
        setIsListed(false);
      } else if (listedNFTS[0].seller.toLowerCase() === owner.toLowerCase()) {
        setIsListed(true);
      }
      setNft(...listedNFTS);
      setloadingNft(false);
    } else {
      setNft([]);
      setloadingNft(false);
      setIsListed(false);
    }
  }
  //to get the favorites count
  async function getFavoritesCount(tokenId, nftAddress) {
    try {
      const data = await axios.get(
        `https://api.worldofdypians.com/nft-favorite/${tokenId}/${nftAddress}`
      );

      // if (!response.ok) {
      //   throw new Error("Error fetching NFT favorites");
      // }
      if (data.data && data.data.favoritesCount) {
        setfavCount(data.data.favoritesCount);
      }

      return data.data.favoritesCount;
    } catch (error) {
      console.error("Error fetching NFT favorites:", error);
      throw error;
    }
  }

  //to get the viewcount
  async function getViewCount(tokenId, nftAddress) {
    try {
      const response = await fetch(
        `https://api.worldofdypians.com/nft-view/${tokenId}/${nftAddress}`
      );
      const data = await response.json();
      setViewCount(data.count);

      console.log(`View count  ${data.count}`);
    } catch (error) {
      console.error("Error retrieving view count:", error);
    }
  }

  const handlepricechange = (newprice) => {
    if (Number(newprice) > 100 && priceType === 0) {
      setNftPrice(100);
    } else if (Number(newprice) <= 100 && priceType === 0) {
      setNftPrice(newprice);
    } else if (Number(newprice) > 100000 && priceType === 1) {
      setNftPrice(100000);
    } else if (Number(newprice) <= 100000 && priceType === 1) {
      setNftPrice(newprice);
    }
  };

  const handlepricechange2 = (newprice) => {
    //isdyp nft.payment_priceType === 1
    if (Number(newprice) > 100 && nft.payment_priceType === 0) {
      setNftPrice(100);
    } else if (Number(newprice) <= 100 && nft.payment_priceType === 0) {
      setNftPrice(newprice);
    } else if (Number(newprice) > 100000 && nft.payment_priceType === 1) {
      setNftPrice(100000);
    } else if (Number(newprice) <= 100000 && nft.payment_priceType === 1) {
      setNftPrice(newprice);
    }
  };

  const handleMakeOffer = async (price, pricetype, tokenType) => {
    setOfferStatus("loading");
    const newPrice = new BigNumber(price * 1e18).toFixed();
    await window
      .makeOffer(nftAddress, nftId, newPrice, pricetype, tokenType)
      .then(() => {
        handleRefreshListing();
        setOfferStatus("success");
        setTimeout(() => {
          setOfferStatus("initial");
        }, 3000);
      })
      .catch((e) => {
        console.error(e);
        setOfferStatus("fail");
        setTimeout(() => {
          setOfferStatus("initial");
        }, 3000);
      });
  };

  const handleDeleteOffer = async (offerIndex) => {
    setOfferdeleteStatus("loadingdelete");

    console.log(nftAddress, nftId, offerIndex);
    await window
      .cancelOffer(nftAddress, nftId, offerIndex)
      .then(() => {
        handleRefreshListing();
        setOfferdeleteStatus("successdelete");
        setTimeout(() => {
          setOfferdeleteStatus("initial");
        }, 3000);
      })
      .catch((e) => {
        console.error(e);
        setOfferdeleteStatus("faildelete");

        setTimeout(() => {
          setOfferdeleteStatus("initial");
        }, 3000);
      });
  };

  const handleUpdateOffer = async (price, pricetype, offerIndex, tokenType) => {
    setOfferupdateStatus("loadingupdate");
    const newPrice = new BigNumber(price * 1e18).toFixed();

    await window
      .updateOffer(
        nftAddress,
        nftId,
        offerIndex,
        newPrice,
        pricetype,
        tokenType
      )
      .then(() => {
        handleRefreshListing();
        setOfferupdateStatus("successupdate");
        setTimeout(() => {
          setOfferupdateStatus("initial");
        }, 3000);
      })
      .catch((e) => {
        console.error(e);
        setOfferupdateStatus("failupdate");

        setTimeout(() => {
          setOfferupdateStatus("initial");
        }, 3000);
      });
  };

  const handleAcceptOffer = async (offerIndex) => {
    setOfferacceptStatus("loading");

    console.log(nftAddress, nftId, offerIndex);
    await window
      .acceptOffer(nftAddress, nftId, offerIndex)
      .then(() => {
        setOfferacceptStatus("success");
        setTimeout(() => {
          setOfferacceptStatus("initial");
          handleRefreshListing();
          getLatest20BoughtNFTS(nftAddress, nftId);
          getLatestBoughtNFT();
        }, 3000);
      })
      .catch((e) => {
        console.error(e);
        setOfferacceptStatus("fail");
        setTimeout(() => {
          setOfferacceptStatus("initial");
        }, 3000);
      });
  };

  useEffect(() => {
    // if (isOwner === false) {
    if (coinbase) {
      if (isConnected === true && nft.payment_priceType === 1 && IsListed) {
        isApprovedBuy(
          nft.payment_tokenAddress === window.config.dyp_token_address
            ? "dypv1"
            : nft.payment_tokenAddress ===
              window.config.token_dypius_new_address
            ? "dypv2"
            : "eth",
          nft.price
        ).then((isApproved) => {
          console.log(isApproved);
          if (isApproved === true) {
            setbuyStatus("buy");
          } else if (isApproved === false) {
            setbuyStatus("approve");
          }
          setIsApprove(isApproved);
        });
      } else if (!IsListed) {
        // console.log(nft);
        isApprovedNFT(
          nftId,
          nftAddress === window.config.nft_caws_address
            ? "caws"
            : nftAddress === window.config.nft_timepiece_address
            ? "timepiece"
            : "land",
          coinbase
        ).then((isApproved) => {
          console.log("isApproved", isApproved);
          if (isApproved === true) {
            setsellStatus("sell");
          } else if (isApproved === false) {
            setsellStatus("approve");
          }
        });
      } else {
        setbuyStatus("buy");
      }
    }
    // }
  }, [isConnected, IsListed, isOwner, coinbase, nftCount]);

  useEffect(() => {
    if (isConnected === true && nft && nft.payment_priceType === 1) {
      isApprovedBuy(nft.payment_tokenAddress, nft.price).then((isApproved) => {
        // console.log(isApproved);
        setIsApprove(isApproved);
      });
    }

    if ((coinbase === undefined || !nft.price) && !owner) {
      setisOwner(false);
    } else if (coinbase) {
      if (nft.seller) {
        if (nft.seller && nft.seller.toLowerCase() === coinbase.toLowerCase()) {
          setisOwner(true);
        } else if (
          nft.seller &&
          nft.seller.toLowerCase() !== coinbase.toLowerCase()
        ) {
          setisOwner(false);
        }
      } else if (
        nft.buyer &&
        coinbase &&
        nft.buyer.toLowerCase() === coinbase.toLowerCase()
      ) {
        setisOwner(true);
      } else if (
        nft.buyer &&
        coinbase &&
        nft.buyer.toLowerCase() !== coinbase.toLowerCase()
      ) {
        setisOwner(false);
      } else if (owner.toLowerCase() === coinbase.toLowerCase()) {
        setisOwner(true);
      } else if (owner.toLowerCase() !== coinbase.toLowerCase()) {
        setisOwner(false);
      }
    }
  }, [isConnected, isOwner, IsListed, coinbase, nft, owner, nftCount]);

  useEffect(() => {
    getNftOwner(
      nftAddress.toLowerCase() === window.config.nft_timepiece_address.toLowerCase()
        ? "timepiece"
        : nftAddress.toLowerCase() === window.config.nft_land_address.toLowerCase()
        ? "land"
        : nftAddress.toLowerCase() === window.config.nft_coingecko_address.toLowerCase()
        ? "coingecko"
        : nftAddress.toLowerCase() === window.config.nft_gate_address.toLowerCase()
        ? "gate"
        : nftAddress.toLowerCase() === window.config.nft_conflux_address.toLowerCase()
        ? "conflux"
        : nftAddress.toLowerCase() === window.config.nft_doge_address.toLowerCase()
        ? "doge"
        : nftAddress.toLowerCase() === window.config.nft_bnb_address.toLowerCase()
        ? "bnb"
        : nftAddress.toLowerCase() === window.config.nft_skale_address.toLowerCase()
        ? "skale"
        : nftAddress.toLowerCase() === window.config.nft_cmc_address.toLowerCase()
        ? "cmc"
        : nftAddress.toLowerCase() === window.config.nft_core_address.toLowerCase()
        ? "core"
        : nftAddress.toLowerCase() === window.config.nft_viction_address.toLowerCase()
        ? "viction"
         : nftAddress.toLowerCase() === window.config.nft_multivers_address.toLowerCase()
        ? "multivers"
        : nftAddress.toLowerCase() === window.config.nft_base_address.toLowerCase()
        ? "base"
        : nftAddress.toLowerCase() === window.config.nft_caws_bnb_address.toLowerCase()
        ? "cawsbnb"
        : nftAddress.toLowerCase() === window.config.nft_caws_avax_address.toLowerCase()
        ? "cawsavax"
        : nftAddress.toLowerCase() === window.config.nft_caws_base_address.toLowerCase()
        ? "cawsbase"
        : nftAddress.toLowerCase() === window.config.nft_land_bnb_address.toLowerCase()
        ? "landbnb"
        : nftAddress.toLowerCase() === window.config.nft_land_avax_address.toLowerCase()
        ? "landavax"
        : nftAddress.toLowerCase() === window.config.nft_land_base_address.toLowerCase()
        ? "landbase"
        : "caws",
      nftId
    );
  }, [nftId, nftAddress, nftCount]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getTokenData();
    getPriceDYP();
    getFavoritesCount(nftId, nftAddress);
    getLatest20BoughtNFTS(nftAddress, nftId);

    getListedNtsAsc();

  }, []);

  useEffect(() => {
    getViewCount(nftId, nftAddress);
  }, [nftId, nftAddress]);

  useEffect(() => {
    if (nftAddress.toLowerCase() === window.config.nft_caws_address.toLowerCase()) {
      setType("caws");
    } else if (nftAddress.toLowerCase() === window.config.nft_timepiece_address.toLowerCase()) {
      setType("timepiece");
    } else if (nftAddress.toLowerCase() === window.config.nft_land_address.toLowerCase()) {
      setType("land");
    } else if (nftAddress.toLowerCase() === window.config.nft_coingecko_address.toLowerCase()) {
      setType("coingecko");
    } else if (nftAddress.toLowerCase() === window.config.nft_conflux_address.toLowerCase()) {
      setType("conflux");
    } else if (nftAddress.toLowerCase() === window.config.nft_doge_address.toLowerCase()) {
      setType("doge");
    } else if (nftAddress.toLowerCase() === window.config.nft_bnb_address.toLowerCase()) {
      setType("bnb");
    } else if (nftAddress.toLowerCase() === window.config.nft_skale_address.toLowerCase()) {
      setType("skale");
    } else if (nftAddress.toLowerCase() === window.config.nft_cmc_address.toLowerCase()) {
      setType("cmc");
    } else if (nftAddress.toLowerCase() === window.config.nft_core_address.toLowerCase()) {
      setType("core");
    } else if (nftAddress.toLowerCase() === window.config.nft_viction_address.toLowerCase()) {
      setType("viction");
    }  else if (nftAddress.toLowerCase() === window.config.nft_multivers_address.toLowerCase()) {
      setType("multivers");
    } else if (nftAddress.toLowerCase() === window.config.nft_base_address.toLowerCase()) {
      setType("base");
    } else if (nftAddress.toLowerCase() === window.config.nft_gate_address.toLowerCase()) {
      setType("gate");
    } else if (nftAddress.toLowerCase() === window.config.nft_caws_bnb_address.toLowerCase()) {
      setType("cawsbnb");
    } else if (nftAddress.toLowerCase() === window.config.nft_caws_avax_address.toLowerCase()) {
      setType("cawsavax");
    } else if (nftAddress.toLowerCase() === window.config.nft_caws_base_address.toLowerCase()) {
      setType("cawsbase");
    } else if (nftAddress.toLowerCase() === window.config.nft_land_bnb_address.toLowerCase()) {
      setType("landbnb");
    } else if (nftAddress.toLowerCase() === window.config.nft_land_avax_address.toLowerCase()) {
      setType("landavax");
    } else if (nftAddress.toLowerCase() === window.config.nft_land_base_address.toLowerCase()) {
      setType("landbase");
    }

    getMetaData(nftAddress, nftId);
  }, [nftId, nftAddress, nft, nftCount]);

  useEffect(() => {
    checkisListedNFT(nftId, nftAddress);
    handleRefreshList(
      nftAddress === window.config.nft_caws_address
        ? "caws"
        : nftAddress === window.config.nft_timepiece_address
        ? "timepiece"
        : "land",
      nftId
    );
  }, [nftCount, owner]);

  useEffect(() => {
    getOffer();
  }, [coinbase, nftCount]);

  useEffect(() => {
    if (favorites && favorites.length > 0) {
      const favobj = favorites.find(
        (obj) => obj.nftAddress === nftAddress && obj.tokenId === nftId
      );

      if (favobj !== undefined) {
        setIsFavorite(true);
      } else setIsFavorite(false);
    }
  }, [nft, favorites]);

  useEffect(() => {
    if (
      purchaseStatus === "" &&
      data?.getPlayer?.wallet &&
      coinbase &&
      email &&
      coinbase.toLowerCase() !==
        data?.getPlayer?.wallet?.publicAddress?.toLowerCase()
    ) {
      setPurchaseColor("#FF6232");
    }
  }, [purchaseStatus, data]);

  return (
    <div
      className="container-fluid d-flex justify-content-end p-0"
      style={{ minHeight: "72vh" }}
    >
      {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

      <div className="container-nft pe-xxl-5 pe-lg-5 position-relative">
        <Toast showToast={showToast} title={toastTitle} />
        <div className="container-lg mx-0">
          <div className="main-wrapper py-4 w-100 mt-5 mt-xxl-0 mt-lg-0">
            {type === "land" ||
            type === "landbnb" ||
            type === "landavax" ||
            type === "landbase" ? (
              <>
                <h6 className="market-banner-title d-flex align-items-xxl-center align-items-lg-center gap-2 px-3">
                  World of Dypians{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF" }}
                  >
                    Land
                  </h6>
                </h6>
              </>
            ) : type === "caws" ||
              type === "cawsbnb" ||
              type === "cawsavax" ||
              type === "cawsbase" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Cats and Watches Society{" "}
                </h6>
              </>
            ) : type === "coingecko" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  CoinGecko{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "gate" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Gate{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "base" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  BASE{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "conflux" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Conflux{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "doge" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Dogecoin{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            )  : type === "bnb" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  BNB CHAIN{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "skale" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  SKALE{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "cmc" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  CoinMarketCap{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "core" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  CORE{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "viction" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Viction{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            )  : type === "multivers" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  MultiversX{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : (
              <>
                <h6 className="market-banner-title d-flex align-items-xxl-center align-items-lg-center gap-2 px-3">
                  CAWS{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF" }}
                  >
                    Timepiece
                  </h6>
                </h6>
              </>
            )}
            <div className="d-flex flex-column gap-4 flex-xxl-row flex-lg-row align-items-center justify-content-around mt-5 px-3">
              <div className="d-flex flex-column align-items-center gap-2 col-6 col-lg-3 position-relative">
                <div className="position-relative package-blur">
                  <div className="first-box-blur first-bigbox-blur d-none d-lg-flex  align-items-end justify-content-center"></div>
                  <div className="second-box-blur d-none d-lg-flex second-bigbox-blur"></div>
                  {/* todo */}
                  <img
                    className="blur-img blur-img-big"
                    src={
                      nftAddress.toLowerCase() === window.config.nft_caws_address.toLowerCase() ||
                      nftAddress.toLowerCase() === window.config.nft_caws_bnb_address.toLowerCase() ||
                      nftAddress.toLowerCase() === window.config.nft_caws_avax_address.toLowerCase() ||
                      nftAddress.toLowerCase() === window.config.nft_caws_base_address.toLowerCase()
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/caws_400x400/${nftId}.png`
                        : nftAddress.toLowerCase() === window.config.nft_land_address.toLowerCase() ||
                          nftAddress.toLowerCase() === window.config.nft_land_bnb_address.toLowerCase() ||
                          nftAddress.toLowerCase() === window.config.nft_land_avax_address.toLowerCase() ||
                          nftAddress.toLowerCase() === window.config.nft_land_base_address.toLowerCase()
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/genesis_400x400/${nftId}.png`
                        : nftAddress.toLowerCase() === window.config.nft_coingecko_address.toLowerCase()
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/400x400_cg_pass.png`
                        : nftAddress.toLowerCase() === window.config.nft_gate_address.toLowerCase()
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/Gate400.png`
                        : nftAddress.toLowerCase() === window.config.nft_conflux_address.toLowerCase()
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/Conflux+nft+400px.png`
                        : nftAddress.toLowerCase() === window.config.nft_doge_address.toLowerCase()
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/doge+nft+400x400.png`
                        : nftAddress.toLowerCase() === window.config.nft_cmc_address.toLowerCase()
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/CMC+Beta+Pass+NFT+400x400px.png`
                        : nftAddress.toLowerCase() === window.config.nft_core_address.toLowerCase()
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/CORE+400.png`
                        : nftAddress.toLowerCase() === window.config.nft_viction_address.toLowerCase()
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/Viction+400.png`
                        : nftAddress.toLowerCase() === window.config.nft_multivers_address.toLowerCase()
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/MultiversX+NFT+400.png`
                        : nftAddress.toLowerCase() === window.config.nft_base_address.toLowerCase()
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/base+400px.png`
                        : nftAddress.toLowerCase() === window.config.nft_skale_address.toLowerCase()
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/SKALE+Beta+Pass+400x400.png`
                        : nftAddress.toLowerCase() === window.config.nft_bnb_address.toLowerCase()
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/bnb+nft+400.png`
                        : `https://dypmeta.s3.us-east-2.amazonaws.com/timepiece_400x400/${nftId}.png`
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="d-flex flex-column gap-2 col-12 col-lg-7">
                <div
                  className="d-flex align-items-center gap-2"
                  style={{
                    color: purchaseColor,
                  }}
                >
                  <span className="seller-addr d-flex gap-1 align-items-center">
                    <img
                      src={
                        type === "coingecko" ||
                        type === "gate" ||
                        type === "doge" ||
                        type === "cmc" ||type === "bnb" ||
                        type === "cawsbnb" ||
                        type === "landbnb"
                          ? bnbLogo
                          : type === "conflux"
                          ? confluxLogo
                          : type === "base" ||
                            type === "cawsbase" ||
                            type === "landbase"
                          ? baseLogo
                          : type === "cawsavax" || type === "landavax"
                          ? avaxLogo
                          : type === "skale"
                          ? skaleLogo
                          : type === "core"
                          ? coreLogo
                          : type === "viction"
                          ? victionLogo
                          : type === "multivers"
                          ? multiversLogo
                          : ethIcon
                      }
                      alt=""
                      style={{ width: 20, height: 20 }}
                    />{" "}
                    {type === "coingecko" ||
                    type === "gate" ||
                    type === "doge" ||type === "bnb" ||
                    type === "cawsbnb" ||
                    type === "cmc" ||
                    type === "landbnb"
                      ? "BNB Chain"
                      : type === "conflux"
                      ? "Conflux"
                      : type === "base" ||
                        type === "landbase" ||
                        type === "cawsbase"
                      ? "BASE Network"
                      : type === "cawsavax" || type === "landavax"
                      ? "Avalanche"
                      : type === "skale"
                      ? "SKALE"
                      : type === "viction"
                      ? "Viction"
                      : type === "multivers"
                      ? "MultiversX"
                      : type === "core"
                      ? "CORE"
                      : "Ethereum"}
                  </span>
                  <span className="seller-addr d-flex gap-1 align-items-center">
                    <img src={eye} alt="" /> {viewCount} views
                  </span>
                  <span className="seller-addr d-flex gap-1 align-items-center">
                    <img src={heart} alt="" /> {favCount} favorites
                  </span>
                </div>
                <div className="d-flex align-items-center flex-column nft-outer-wrapper p-3 p-lg-4 gap-2 my-4 single-item-info">
                  <div className="position-relative d-flex flex-column gap-3 px-3 col-12">
                    <h3 className="nft-title d-flex align-items-center justify-content-between">
                      {type === "caws" ||
                      type === "cawsavax" ||
                      type === "cawsbase" ||
                      type === "cawsbnb"
                        ? "CAWS"
                        : type === "land" ||
                          type === "landavax" ||
                          type === "landbnb" ||
                          type === "landbase"
                        ? "Genesis Land"
                        : type === "coingecko"
                        ? "CoinGecko Beta Pass"
                        : type === "gate"
                        ? "Gate Beta Pass"
                        : type === "conflux"
                        ? "Conflux Beta Pass"
                        : type === "doge"
                        ? "Dogecoin Beta Pass"
                        : type === "bnb"
                        ? "BNB Chain Beta Pass"
                        : type === "skale"
                        ? "SKALE Beta Pass"
                        : type === "cmc"
                        ? "CoinMarketCap Beta Pass"
                        : type === "core"
                        ? "CORE Beta Pass"
                        : type === "viction"
                        ? "Viction Beta Pass"
                        : type === "multivers"
                        ? "MultiversX Beta Pass"
                        : type === "base"
                        ? "Base Beta Pass"
                        : "CAWS Timepiece"}{" "}
                      #{nftId}
                      <img
                        src={isFavorite ? favActive : favInactive}
                        onClick={() => {
                          handleFavorite(nft);
                        }}
                        alt=""
                        style={{ cursor: "pointer" }}
                      />
                    </h3>
                    {isOwner &&
                      IsListed &&
                      nft.price &&
                      loadingNft === false && (
                        <div className="d-flex gap-2 align-items-center">
                          <span className="currentprice-txt">
                            Current price
                          </span>
                          {/* <StyledTextField
                        error={nftPrice === "" ? true : false}
                        size="small"
                        id="price"
                        name="price"
                        value={nftPrice}
                        type="number"
                        required
                        onChange={(e) => {
                          setNftPrice(e.target.value);
                        }}
                        sx={{ width: "120px" }}
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          max: 10,
                        }}
                      /> */}
                          <div className="d-flex gap-2 align-items-center">
                            <img
                              src={
                                nft?.payment_priceType === 0 ? topEth : topDyp
                              }
                              alt=""
                              height={20}
                              width={20}
                            />
                            <span
                              className="nft-price-eth"
                              style={{ fontSize: 15, lineHeight: "20px" }}
                            >
                              {getFormattedNumber(
                                nft?.price / 1e18,
                                nft?.payment_priceType === 0 ? 3 : 0
                              )}{" "}
                              {nft?.payment_priceType === 0
                                ? "ETH"
                                : nft?.payment_tokenAddress ===
                                  window.config.dyp_token_address
                                ? "DYPv1"
                                : "DYPv2"}
                            </span>
                            <span className="nft-price-usd">
                              $
                              {getFormattedNumber(
                                nft?.payment_priceType === 0
                                  ? ethtokenData * (nft?.price / 1e18)
                                  : nft?.payment_tokenAddress ===
                                    window.config.dyp_token_address
                                  ? dyptokenData_old * (nft?.price / 1e18)
                                  : dyptokenData * (nft?.price / 1e18),
                                2
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                    {!isOwner &&
                      IsListed &&
                      nft.price &&
                      loadingNft === false && (
                        <div className="price-wrapper p-3">
                          <div className="d-flex w-100 justify-content-between flex-column flex-xxl-row flex-lg-row gap-2 align-items-center">
                            <span className="currentprice-txt">
                              Current price
                            </span>
                            <div className="d-flex gap-2 align-items-center">
                              <img
                                src={
                                  nft?.payment_priceType === 0 ? topEth : topDyp
                                }
                                alt=""
                                height={30}
                                width={30}
                              />
                              <span className="nft-price-eth">
                                {getFormattedNumber(
                                  nft?.price / 1e18,
                                  nft?.payment_priceType === 0 ? 3 : 0
                                )}{" "}
                                {nft?.payment_priceType === 0
                                  ? "ETH"
                                  : nft?.payment_tokenAddress ===
                                    window.config.dyp_token_address
                                  ? "DYPv1"
                                  : "DYPv2"}
                              </span>
                              <span className="nft-price-usd">
                                $
                                {getFormattedNumber(
                                  nft?.payment_priceType === 0
                                    ? ethtokenData * (nft?.price / 1e18)
                                    : nft?.payment_tokenAddress ===
                                      window.config.dyp_token_address
                                    ? dyptokenData_old * (nft?.price / 1e18)
                                    : dyptokenData * (nft?.price / 1e18),
                                  2
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    {loadingNft === true && (
                      <div className="price-wrapper p-3">
                        <div className="d-flex w-100 justify-content-between flex-column flex-xxl-row flex-lg-row gap-2 align-items-center">
                          <HashLoader
                            color={"#554fd8"}
                            loading={loadingNft}
                            cssOverride={override}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        </div>
                      </div>
                    )}

                    {!isOwner &&
                      !IsListed &&
                      (!nft.price || nft.price) &&
                      type !== "cawsbnb" &&
                      type !== "cawsavax" &&
                      type !== "cawsbase" &&
                      type !== "landavax" &&
                      type !== "landbnb" &&
                      type !== "landbase" &&
                      type !== "coingecko" &&
                      type !== "gate" &&
                      type !== "conflux" &&
                      type !== "base" &&
                      type !== "doge" &&
                      type !== "bnb" &&
                      type !== "cmc" &&
                      type !== "core" &&
                      type !== "viction" &&
                      type !== "multivers" &&
                      type !== "skale"  &&
                      loadingNft === false && (
                        <div className="price-wrapper p-3">
                          <div className="d-flex w-100 justify-content-between flex-column flex-xxl-row flex-lg-row gap-2 align-items-center">
                            <span className="currentprice-txt">
                              This NFT is not listed
                            </span>
                            {/* <div className="d-flex gap-2 align-items-center">
                          <img
                            src={nft.payment_priceType === 0 ? topEth : topDyp}
                            alt=""
                            height={30}
                            width={30}
                          />
                          <span className="nft-price-eth">
                            {getFormattedNumber(nft.price / 1e18, 0)}{" "}
                            {nft.payment_priceType === 0 ? "ETH" : "DYP"}{" "}
                          </span>
                          <span className="nft-price-usd">
                            $
                            {getFormattedNumber(
                              nft.payment_priceType === 0
                                ? ethtokenData * (nft.price / 1e18)
                                : dyptokenData * (nft.price / 1e18),
                              2
                            )}
                          </span>
                        </div> */}
                          </div>
                        </div>
                      )}
                    {isOwner && IsListed && loadingNft === false && (
                      <div className="d-flex flex-column flex-xxl-row flex-lg-row align-items-center gap-2 justify-content-between">
                        <div className="price-wrapper p-3 col-xxl-6 col-lg-6">
                          <div className="d-flex w-100 justify-content-between flex-column gap-2">
                            <span
                              className="currentprice-txt"
                              style={{ alignSelf: "baseline" }}
                            >
                              Listing price
                            </span>
                            <div className="d-flex gap-2 align-items-center">
                              <input
                                required
                                className="single-nft-input"
                                type="number"
                                id="price"
                                name="price"
                                pattern="^[0-9]*[.,]?[0-9]*$"
                                min={0}
                                value={nftPrice}
                                onChange={(e) => {
                                  handlepricechange2(e.target.value);
                                }}
                              />
                              <div className="d-flex flex-column gap-1">
                                <span className="nft-price-eth gap-3 d-flex">
                                  {nft.payment_priceType === 0
                                    ? "ETH"
                                    : nft.payment_tokenAddress ===
                                      window.config.token_dypius_new_address
                                    ? "DYPv2"
                                    : "DYPv1"}{" "}
                                </span>
                                <span className="nft-price-usd">
                                  $
                                  {getFormattedNumber(
                                    nft?.payment_priceType === 0
                                      ? ethtokenData * (nft?.price / 1e18)
                                      : nft?.payment_tokenAddress ===
                                        window.config.dyp_token_address
                                      ? dyptokenData_old * (nft?.price / 1e18)
                                      : dyptokenData * (nft?.price / 1e18),
                                    2
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="price-wrapper p-3 col-xxl-5 col-lg-5">
                          <div className="d-flex w-100 justify-content-between flex-column gap-2">
                            <span className="currentprice-txt">
                              Choose currency
                            </span>
                            <div className="d-flex flex-row justify-content-around w-100 gap-2">
                              <div
                                className={`d-flex gap-2 align-items-center position-relative ${
                                  priceType === 0 && nft.payment_priceType === 0
                                    ? "currencyWrapper"
                                    : "currencyWrapper-inactive"
                                } ${
                                  nft.payment_priceType === 1 &&
                                  "currency-wrapper-disabled"
                                }`}
                                onClick={() => {
                                  setPriceType(0);
                                }}
                              >
                                <img
                                  src={
                                    priceType === 0 &&
                                    nft.payment_priceType === 0
                                      ? checkActive
                                      : checkPassive
                                  }
                                  alt=""
                                  className={"position-absolute checkicons"}
                                />
                                <span className="nft-price-eth">
                                  <img
                                    src={topEth}
                                    alt=""
                                    height={20}
                                    width={20}
                                  />
                                  ETH
                                </span>
                              </div>

                              <div
                                className={`d-flex gap-2 align-items-center position-relative ${
                                  nft.payment_priceType === 1
                                    ? "currencyWrapper"
                                    : "currencyWrapper-inactive"
                                } ${
                                  nft.payment_priceType === 0 &&
                                  "currency-wrapper-disabled"
                                }`}
                                onClick={() => {
                                  setPriceType(1);
                                }}
                              >
                                <img
                                  src={
                                    nft.payment_priceType === 1
                                      ? checkActive
                                      : checkPassive
                                  }
                                  alt=""
                                  className={"position-absolute checkicons"}
                                />
                                <span className="nft-price-eth">
                                  <img
                                    src={topDyp}
                                    alt=""
                                    height={20}
                                    width={20}
                                  />
                                  {nft.payment_tokenAddress ===
                                  window.config.token_dypius_new_address
                                    ? "DYPv2"
                                    : "DYPv1"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {isOwner &&
                      !IsListed &&
                      loadingNft === false &&
                      type !== "coingecko" &&
                      type !== "gate" &&
                      type !== "conflux" &&
                      type !== "base" &&
                      type !== "doge" &&
                      type !== "bnb" &&
                      type !== "cmc" &&
                      type !== "core" &&
                      type !== "viction" &&
                      type !== "multivers"&&
                      type !== "cawsbnb" &&
                      type !== "cawsavax" &&
                      type !== "cawsbase" &&
                      type !== "landavax" &&
                      type !== "landbnb" &&
                      type !== "landbase" &&
                      type !== "skale" && (
                        <div className="d-flex flex-column flex-xxl-row flex-lg-row align-items-center gap-2 justify-content-between">
                          <div className="price-wrapper p-3 col-xxl-6 col-lg-6">
                            <div className="d-flex w-100 justify-content-between flex-column ">
                              <span
                                className="currentprice-txt"
                                style={{ alignSelf: "baseline" }}
                              >
                                Listing price
                              </span>
                              <div className="d-flex gap-2 align-items-center">
                                <input
                                  required
                                  className="single-nft-input"
                                  type="number"
                                  id="price"
                                  name="price"
                                  pattern="^[0-9]*[.,]?[0-9]*$"
                                  min={0}
                                  value={nftPrice}
                                  onChange={(e) => {
                                    handlepricechange(e.target.value);
                                  }}
                                />
                                <div className="d-flex flex-column flex-xxl-row align-items-start align-items-lg-center gap-1 gap-xxl-3">
                                  <span className="nft-price-eth gap-3 d-flex">
                                    {priceType === 0 ? "ETH" : "DYP"}{" "}
                                  </span>
                                  <span className="nft-price-usd">
                                    $
                                    {getFormattedNumber(
                                      priceType === 0
                                        ? ethtokenData * nftPrice
                                        : priceType === 2
                                        ? dyptokenData * nftPrice
                                        : dyptokenData_old * nftPrice,
                                      2
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="price-wrapper p-3 col-xxl-5 col-lg-5">
                            <div className="d-flex w-100 justify-content-between flex-column gap-2">
                              <span className="currentprice-txt">
                                Choose currency
                              </span>
                              <div className="d-flex flex-row justify-content-start w-100 gap-2">
                                <div className="dropdown filters-dropdown2">
                                  <button
                                    className="btn btn-secondary currencyWrapper nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <div className="d-flex align-items-center gap-2">
                                      {/* <img src={filterIcon} alt="" /> */}
                                      <h6 className="filter-nav-title mb-0">
                                        <img
                                          src={checkActive}
                                          alt=""
                                          style={{ top: "7px" }}
                                          className={
                                            "position-absolute checkicons"
                                          }
                                        />
                                        <span className="nft-price-eth2">
                                          <img
                                            src={
                                              priceType === 0 ? topEth : topDyp
                                            }
                                            alt=""
                                            height={20}
                                            width={20}
                                          />
                                          {priceType === 0
                                            ? "ETH"
                                            : priceType === 1
                                            ? "DYPv1"
                                            : "DYPv2"}
                                        </span>
                                      </h6>
                                    </div>
                                    <img src={dropdownIcon} alt="" />
                                  </button>
                                  <ul className="dropdown-menu nft-dropdown-menu  p-2 w-100">
                                    <li
                                      className="nft-dropdown-item"
                                      onClick={() => {
                                        setPriceType(0);
                                      }}
                                    >
                                      <span>ETH</span>
                                    </li>
                                    <li
                                      className="nft-dropdown-item"
                                      onClick={() => {
                                        setPriceType(1);
                                      }}
                                    >
                                      <span>DYPv1</span>
                                    </li>
                                    <li
                                      className="nft-dropdown-item"
                                      onClick={() => {
                                        setPriceType(2);
                                      }}
                                    >
                                      <span>DYPv2</span>
                                    </li>
                                  </ul>
                                </div>

                                {/* <div
                                  className={`d-flex gap-2 align-items-center position-relative ${
                                    priceType === 0
                                      ? "currencyWrapper"
                                      : "currencyWrapper-inactive"
                                  } `}
                                  onClick={() => {
                                    setPriceType(0);
                                  }}
                                >
                                  <img
                                    src={
                                      priceType === 0
                                        ? checkActive
                                        : checkPassive
                                    }
                                    alt=""
                                    className={"position-absolute checkicons"}
                                  />
                                  <span className="nft-price-eth">
                                    <img
                                      src={topEth}
                                      alt=""
                                      height={20}
                                      width={20}
                                    />
                                    ETH
                                  </span>
                                </div>

                                <div
                                  className={`d-flex gap-2 align-items-center position-relative ${
                                    priceType === 1
                                      ? "currencyWrapper"
                                      : "currencyWrapper-inactive"
                                  } `}
                                  onClick={() => {
                                    setPriceType(1);
                                  }}
                                >
                                  <img
                                    src={
                                      priceType === 0
                                        ? checkPassive
                                        : priceType === 1
                                        ? checkActive
                                        : checkPassive
                                    }
                                    alt=""
                                    className={"position-absolute checkicons"}
                                  />
                                  <span className="nft-price-eth">
                                    <img
                                      src={topDyp}
                                      alt=""
                                      height={20}
                                      width={20}
                                    />
                                    DYP
                                  </span>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    {!IsListed &&
                      !loadingNft &&
                      (type === "coingecko" ||
                        type === "gate" ||
                        type === "conflux" ||
                        type === "base" ||
                        type === "doge" ||
                        type === "bnb" ||
                        type === "skale" ||
                        type === "cmc" ||
                        type === "core" ||
                        type === "viction" ||
                        type === "multivers" ||
                        type === "cawsbnb" ||
                        type === "cawsavax" ||
                        type === "cawsbase" ||
                        type === "landavax" ||
                        type === "landbnb" ||
                        type === "landbase") && (
                        <div className="price-wrapper p-3">
                          <div className="d-flex w-100 justify-content-between flex-column flex-xxl-row flex-lg-row gap-2 align-items-center">
                            <span className="currentprice-txt">
                              This NFT is not available for listing.
                            </span>
                          </div>
                        </div>
                      )}
                    <div className="d-flex flex-column flex-xxl-row flex-lg-row flex-md-row justify-content-between gap-2 align-items-center">
                      <div className="d-flex justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                        <span className="owner-txt">Owner:</span>
                        {
                          <a
                            href={
                              type === "coingecko" ||
                              type === "gate" ||
                              type === "cmc" ||
                              type === "doge" ||
                              type === "bnb" ||
                              type === "cawsbnb" ||
                              type === "landbnb"||
                              type === "multivers"
                                ? `https://bscscan.com/address/${owner}`
                                : type === "conflux"
                                ? `https://evm.confluxscan.net/address/${owner}`
                                : type === "base" ||
                                  type === "cawsbase" ||
                                  type === "landbase"
                                ? `https://basescan.org/address/${owner}`
                                : type === "cawsavax" || type === "landavax"
                                ? `https://snowtrace.io/address/${owner}`
                                : type === "skale"
                                ? `https://lanky-ill-funny-testnet.explorer.testnet.skalenodes.com/address/${owner}`
                                : type === 'viction'
                                ? `https://www.vicscan.xyz/address/${owner}`
                                : type === 'core'
                                ? `https://scan.coredao.org/address/${owner}`
                                : `https://etherscan.io/address/${owner}`
                            }
                            target="_blank"
                            style={{ textDecoration: "none" }}
                            className="seller-addr"
                            rel="noreferrer"
                          >
                            {shortAddress(owner)}
                          </a>
                        }
                      </div>
                      {!isOwner && IsListed && coinbase && isConnected && (
                        <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center">
                          <button
                            disabled={
                              buyloading === true || buyStatus === "failed"
                                ? true
                                : false
                            }
                            className={`btn  buyNftbtn px-4 d-flex justify-content-center ${
                              buyStatus === "success"
                                ? "successbtn"
                                : buyStatus === "failed" ||
                                  (chainId !== 5 && chainId !== 1)
                                ? "errorbtn"
                                : null
                            } d-flex justify-content-center align-items-center gap-2`}
                            onClick={() => {
                              chainId !== 1 && chainId !== 5
                                ? handleSwitchChain()
                                : handleBuy(nft);
                            }}
                          >
                            {buyloading && (chainId === 1 || chainId === 5) ? (
                              <div
                                className="spinner-border spinner-border-sm text-light"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            ) : !buyloading &&
                              chainId !== 1 &&
                              chainId !== 5 ? (
                              "Switch Network"
                            ) : buyStatus === "buy" ? (
                              "Buy"
                            ) : buyStatus === "approve" || buyStatus === "" ? (
                              "Approve buy"
                            ) : buyStatus === "success" ? (
                              "Success"
                            ) : (
                              "Failed"
                            )}
                          </button>
                          {chainId === 1 && (
                            <button
                              className="btn mint-now-btn gap-2"
                              onClick={() => {
                                setshowMakeOffer(true);
                              }}
                            >
                              <img src={whiteTag} alt="" />{" "}
                              {myOffers.length > 0
                                ? "View your offer"
                                : "Make offer"}
                            </button>
                          )}
                        </div>
                      )}
                      {isOwner && IsListed && coinbase && isConnected && (
                        <div className="d-flex gap-2 col-lg-5 col-xxl-5 align-items-center">
                          <button
                            disabled={
                              updateLoading === true ||
                              updateStatus === "failed"
                                ? true
                                : false
                            }
                            className={`btn buyNftbtn col-lg-6 col-xxl-6 d-flex justify-content-center ${
                              updateStatus === "success"
                                ? "successbtn"
                                : updateStatus === "failed" ||
                                  (chainId !== 5 && chainId !== 1)
                                ? "errorbtn"
                                : null
                            } d-flex justify-content-center align-items-center gap-2`}
                            onClick={() => {
                              chainId !== 1 && chainId !== 5
                                ? handleSwitchChain()
                                : updateListing(
                                    nft.tokenId,
                                    nftPrice,
                                    nft.payment_priceType,
                                    type,
                                    nft.payment_tokenAddress ===
                                      window.config.token_dypius_new_address
                                      ? "dypv2"
                                      : nft.payment_tokenAddress ===
                                        window.config.dyp_token_address
                                      ? "dypv1"
                                      : "eth"
                                  );
                            }}
                          >
                            {updateLoading &&
                            (chainId === 1 || chainId === 5) ? (
                              <div
                                className="spinner-border spinner-border-sm text-light"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            ) : !updateLoading &&
                              chainId !== 1 &&
                              chainId !== 5 ? (
                              "Switch Network"
                            ) : updateStatus === "update" ||
                              updateStatus === "" ? (
                              "Update"
                            ) : updateStatus === "success" ? (
                              "Success"
                            ) : (
                              "Failed"
                            )}
                          </button>

                          <button
                            // disabled={
                            //   cancelLoading === true || cancelStatus === "failed"
                            //     ? true
                            //     : false
                            // }
                            className={`unlistbtn col-lg-6 col-xxl-6 d-flex justify-content-center d-flex justify-content-center align-items-center gap-2`}
                            onClick={() => {
                              chainId !== 1 && chainId !== 5
                                ? handleSwitchChain()
                                : cancelNFT(
                                    nft.nftAddress,
                                    nft.tokenId,
                                    nft.payment_priceType,
                                    nft.payment_tokenAddress ===
                                      window.config.token_dypius_new_address
                                      ? "dypv2"
                                      : nft.payment_tokenAddress ===
                                        window.config.dyp_token_address
                                      ? "dypv1"
                                      : "eth"
                                  );
                            }}
                          >
                            {cancelLoading &&
                            (chainId === 1 || chainId === 5) ? (
                              <div
                                className="spinner-border spinner-border-sm text-light"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            ) : !cancelLoading &&
                              chainId !== 1 &&
                              chainId !== 5 ? (
                              "Switch Network"
                            ) : cancelStatus === "cancel" ||
                              cancelStatus === "" ? (
                              "Unlist"
                            ) : cancelStatus === "success" ? (
                              "Success"
                            ) : (
                              "Failed"
                            )}
                          </button>
                        </div>
                      )}

                      {isOwner &&
                        !IsListed &&
                        coinbase &&
                        isConnected &&
                        type !== "coingecko" &&
                        type !== "gate" &&
                        type !== "conflux" &&
                        type !== "base" &&
                        type !== "cmc" &&
                        type !== "viction" &&
                        type !== "multivers" &&
                        type !== "core" &&
                        type !== "doge" &&
                        type !== "bnb" &&
                        type !== "skale" &&
                        type !== "cawsbnb" &&
                        type !== "cawsavax" &&
                        type !== "cawsbase" &&
                        type !== "landavax" &&
                        type !== "landbnb" &&
                        type !== "landbase" && (
                          <button
                            disabled={
                              sellLoading === true || sellStatus === "failed"
                                ? true
                                : false
                            }
                            className={`btn  buyNftbtn col-lg-3 col-xxl-3 d-flex justify-content-center ${
                              sellStatus === "success"
                                ? "successbtn"
                                : sellStatus === "failed" ||
                                  (chainId !== 5 && chainId !== 1)
                                ? "errorbtn"
                                : null
                            } d-flex justify-content-center align-items-center gap-2`}
                            onClick={() => {
                              chainId !== 1 && chainId !== 5
                                ? handleSwitchChain()
                                : handleSell(
                                    nft.tokenId,
                                    nftPrice,
                                    priceType,
                                    type
                                  );
                            }}
                          >
                            {sellLoading && (chainId === 1 || chainId === 5) ? (
                              <div
                                className="spinner-border spinner-border-sm text-light"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            ) : !sellLoading &&
                              chainId !== 1 &&
                              chainId !== 5 ? (
                              "Switch Network"
                            ) : sellStatus === "sell" ? (
                              "List NFT"
                            ) : sellStatus === "success" ? (
                              "Success"
                            ) : sellStatus === "approve" ||
                              sellStatus === "" ? (
                              "Approve list"
                            ) : (
                              "Failed"
                            )}
                          </button>
                        )}

                      {!isOwner &&
                        !IsListed &&
                        coinbase &&
                        isConnected &&
                        chainId === 1 &&
                        type !== "coingecko" &&
                        type !== "gate" &&
                        type !== "conflux" &&
                        type !== "base" &&
                        type !== "doge" &&
                        type !== "bnb" &&
                        type !== "skale" &&
                        type !== "cmc" &&
                        type !== "core" &&
                        type !== "viction"  &&
                        type !== "multivers"&&
                        type !== "cawsbnb" &&
                        type !== "cawsavax" &&
                        type !== "cawsbase" &&
                        type !== "landavax" &&
                        type !== "landbnb" &&
                        type !== "landbase" && (
                          <button
                            className="btn mint-now-btn gap-2"
                            onClick={() => {
                              setshowMakeOffer(true);
                            }}
                          >
                            <img src={whiteTag} alt="" />{" "}
                            {myOffers.length > 0
                              ? "View your offer"
                              : "Make offer"}
                          </button>
                        )}

                      {!isConnected &&
                        type !== "coingecko" &&
                        type !== "gate" &&
                        type !== "conflux" &&
                        type !== "base" &&
                        type !== "doge" &&
                        type !== "bnb" &&
                        type !== "skale" &&
                        type !== "cmc" &&
                        type !== "core" &&
                        type !== "viction" && 
                        type !== "multivers" &&
                        type !== "cawsbnb" &&
                        type !== "cawsavax" &&
                        type !== "cawsbase" &&
                        type !== "landavax" &&
                        type !== "landbnb" &&
                        type !== "landbase" && (
                          <button
                            className={`btn  buyNftbtn d-flex justify-content-center align-items-center gap-2`}
                            onClick={() => {
                              showWalletConnect();
                            }}
                          >
                            Connect Wallet
                          </button>
                        )}
                    </div>
                  </div>
                </div>
                <span
                  className="statusText"
                  style={{
                    color: purchaseColor,
                  }}
                >
                  {purchaseStatus === "" &&
                  data?.getPlayer?.wallet &&
                  email &&
                  coinbase &&
                  coinbase.toLowerCase() !==
                    data?.getPlayer?.wallet?.publicAddress?.toLowerCase()
                    ? "By interacting with the NFTs I understand that I am not using the wallet associated to my game profile"
                    : purchaseStatus}
                </span>
              </div>
            </div>
          </div>
          {type !== "coingecko" &&
            type !== "gate" &&
            type !== "conflux" &&
            type !== "base" &&
            type !== "doge" &&
            type !== "bnb" &&
            type !== "skale" &&
            type !== "cmc" &&  type !== "core" &&
            type !== "viction"  &&
            type !== "multivers"&& (
              <div className="px-2">
                <div className="d-flex align-items-center flex-column nft-outer-wrapper p-4 gap-2 my-4 single-item-info">
                  <div className="position-relative d-flex flex-column gap-3 px-3 col-12">
                    <h3 className="traits-text">Traits</h3>
                    {type === "caws" ||
                    type === "cawsavax" ||
                    type === "cawsbase" ||
                    type === "cawsbnb" ? (
                      <>
                        <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                          <div className="d-flex flex-row flex-xxl-column flex-lg-column gap-2 align-items-center justify-content-between w-100">
                            <span className="traittitle">Background</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[0]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Tail</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[1]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Ears</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[2]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Body</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[3]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Clothes</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[4]?.value}
                            </span>
                          </div>
                        </div>
                        <div className="trait-separator"></div>
                        <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Eyes</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[6]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Mouth</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[7]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Hat</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[8]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Eyewear</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[9]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Watch</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[5]?.value}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : type === "timepiece" ? (
                      <>
                        <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                          <div className="d-flex flex-row flex-xxl-column flex-lg-column gap-2 align-items-center justify-content-between w-100">
                            <span className="traittitle">Background</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[0]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Tail</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[1]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Ears</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[2]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Body</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[3]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Clothes</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[4]?.value}
                            </span>
                          </div>
                        </div>
                        <div className="trait-separator"></div>
                        <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Eyes</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[5]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Mouth</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[6]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Hat</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[7]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Eyewear</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[8]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Watch</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[9]?.value}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Tier</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[0]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Size</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[1]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Building</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[3]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Workbench</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[4]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">NPC - Attire</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[8]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Gemstone</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[9]?.value}
                            </span>
                          </div>
                        </div>
                        <div className="trait-separator"></div>
                        <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Artifacts</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[5]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">NPC</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[6]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">NPC - AI Powered</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[7]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Plot</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[10]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">
                              Multi Functional Building
                            </span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[2]?.value}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

          {(type === "coingecko" ||
            type === "gate" ||
            type === "conflux" ||
            type === "base" ||
            type === "doge" ||
            type === "bnb" ||
            type === "skale" ||
            type === "cmc"||
            type === "core"||
            type === "viction"||
            type === "multivers") && (
            <div className="px-2">
              <div className="d-flex align-items-center flex-column nft-outer-wrapper p-4 gap-2 my-4 single-item-info">
                <div className="position-relative d-flex flex-column gap-3 px-3 col-12">
                  <h3 className="traits-text">Benefits</h3>

                  <>
                    <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                      <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                        <span className="traittitle d-flex align-items-center gap-2">
                          {" "}
                          <img src={inboxStar} alt="" /> Exclusive Access
                        </span>
                      </div>
                      <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                        <span className="traittitle d-flex align-items-center gap-2">
                          {" "}
                          <img src={stars} alt="" />
                          Daily Rewards
                        </span>
                      </div>
                      <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                        <span className="traittitle d-flex align-items-center gap-2">
                          <img src={dollarCircle} alt="" />
                          Earn{" "}
                          {type === "conflux"
                            ? "CFX"
                            : type === "base"
                            ? "ETH"
                            : type === "skale"
                            ? "SKL"
                            : type === "core"
                            ? "CORE"
                            : type === "viction"
                            ? "VIC"
                            : type === "multivers"
                            ? "EGLD"
                            : "BNB"}{" "}
                          rewards
                        </span>
                      </div>
                      <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                        <span className="traittitle d-flex align-items-center gap-2">
                          <img src={chart} alt="" />
                          Global Points
                        </span>
                      </div>
                    </div>
                    <div className="trait-separator"></div>
                    <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                      <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                        <span className="traittitle d-flex align-items-center gap-2">
                          {" "}
                          <img src={users} alt="" />
                          Community Engagement
                        </span>
                      </div>
                      <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                        <span className="traittitle d-flex align-items-center gap-2">
                          {" "}
                          <img src={singleStar} alt="" /> Enhanced Interactions
                        </span>
                      </div>
                      <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                        <span className="traittitle d-flex align-items-center gap-2">
                          {" "}
                          <img src={expand} alt="" />
                          Expanded Functionality
                        </span>
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </div>
          )}

          {offerData && offerData.length > 0 && (
            <div className="px-2 mt-5">
              <div className="d-flex flex-column gap-3">
                <span className="nftactivity">NFT Offers Activity </span>
                <div className="tablesalewrapper">
                  <table className="pastsaleTable p-2">
                    <tbody>
                      <th className="saleHeader">Price</th>
                      <th className="saleHeader">USD Price</th>
                      <th className="saleHeader">Floor Difference</th>
                      <th className="saleHeader">From</th>
                      {isOwner && <th className="saleHeader">Action</th>}

                      {offerData.map((item, index) => {
                        return (
                          <tr className="saleRow" key={index}>
                            <td className="saledata">
                              {getFormattedNumber(item.offer[0] / 1e18, 2)}{" "}
                              {item.offer.payment.priceType === "0"
                                ? "ETH"
                                : "DYP"}
                            </td>
                            <td className="saleprice">
                              $
                              {getFormattedNumber(
                                item.offer.payment.priceType === "0"
                                  ? ethtokenData * (item.offer[0] / 1e18)
                                  : dyptokenData * (item.offer[0] / 1e18),
                                item.offer.payment.priceType === "0" ? 3 : 0
                              )}
                            </td>
                            <td className="greendata">
                              {item.offer.payment.priceType === "0"
                                ? lowestPriceNftListed / 1e18 >
                                  item.offer[0] / 1e18
                                  ? (lowestPriceNftListed / 1e18 -
                                      item.offer[0] / 1e18) /
                                    100
                                  : (item.offer[0] / 1e18 -
                                      lowestPriceNftListed / 1e18) /
                                    100
                                : lowestPriceNftListedDYP / 1e18 >
                                  item.offer[0] / 1e18
                                ? (lowestPriceNftListedDYP / 1e18 -
                                    item.offer[0] / 1e18) /
                                  100
                                : (item.offer[0] / 1e18 -
                                    lowestPriceNftListedDYP / 1e18) /
                                  100}
                              %
                            </td>
                            <td className="greendata">
                              <a
                                href={`https://etherscan.io/address/${item.offer.buyer}`}
                                target="_blank"
                                style={{ textDecoration: "none" }}
                                className="greendata p-0"
                                rel="noreferrer"
                              >
                                {shortAddress(item.offer.buyer)}{" "}
                                <img src={link} alt="" />
                              </a>
                            </td>
                            {isOwner && (
                              <td className="greendata">
                                <button
                                  className={` ${
                                    offeracceptStatus === "fail"
                                      ? "errorbtn"
                                      : "acceptbtn"
                                  }  btn`}
                                  disabled={!item.isAllowed}
                                  onClick={() => {
                                    handleAcceptOffer(item.index);
                                  }}
                                >
                                  {offeracceptStatus === "initial" ? (
                                    "Accept"
                                  ) : offeracceptStatus === "loading" ? (
                                    <>
                                      Accepting{" "}
                                      <div
                                        className="spinner-border mx-1"
                                        role="status"
                                        style={{ width: 16, height: 16 }}
                                      ></div>
                                    </>
                                  ) : offeracceptStatus === "success" ? (
                                    "Success"
                                  ) : (
                                    "Failed"
                                  )}
                                </button>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {saleHistory && saleHistory.length > 0 && (
            <div className="px-2 mt-5">
              <div className="d-flex flex-column gap-3">
                <span className="nftactivity">NFT Sale Activity </span>
                <div className="tablesalewrapper">
                  <table className="pastsaleTable p-2">
                    <tbody>
                      <th className="saleHeader">Event</th>
                      <th className="saleHeader">Price</th>
                      <th className="saleHeader">Owner</th>
                      <th className="saleHeader">Transaction</th>
                      <th className="saleHeader">Date</th>

                      {saleHistory.map((item, index) => {
                        return (
                          <tr className="saleRow" key={index}>
                            <td className="saledata">
                              <img src={cart} alt="" /> Sale
                            </td>
                            <td className="saleprice">
                              {getFormattedNumber(
                                item.price / 1e18,
                                item.payment_priceType === 1 ? 0 : 2
                              )}{" "}
                              {item.payment_priceType === 1 ? "DYP" : "ETH"}
                            </td>
                            <td className="greendata">
                              <a
                                href={`https://etherscan.io/address/${item.buyer}`}
                                target="_blank"
                                style={{ textDecoration: "none" }}
                                className="greendata p-0"
                                rel="noreferrer"
                              >
                                {shortAddress(item.buyer)}{" "}
                                <img src={link} alt="" />
                              </a>
                            </td>
                            <td className="greendata">
                              <a
                                href={`https://etherscan.io/tx/${item.transactionHash}`}
                                target="_blank"
                                style={{ textDecoration: "none" }}
                                className="greendata p-0"
                                rel="noreferrer"
                              >
                                {shortAddress(item.transactionHash)}{" "}
                                <img src={link} alt="" />
                              </a>
                            </td>
                            <td className="greendata">
                              {getRelativeTime(item.blockTimestamp)}{" "}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showMakeOffer === true && (
        <MakeOffer
          open={showMakeOffer}
          onclose={() => {
            setshowMakeOffer(false);
          }}
          isCaws={type === "caws"}
          isTimepiece={type === "timepiece"}
          isWod={type === "land"}
          nft={nft}
          nftAddr={nftAddress}
          nftId={nftId}
          ethTokenData={ethtokenData}
          dypTokenData={dyptokenData}
          dyptokenData_old={dyptokenData_old}
          handleMakeOffer={handleMakeOffer}
          handleDeleteOffer={handleDeleteOffer}
          handleUpdateOffer={handleUpdateOffer}
          status={offerStatus}
          deletestatus={offerdeleteStatus}
          updatestatus={offerupdateStatus}
          coinbase={coinbase}
          nftCount={nftCount}
        />
      )}
    </div>
  );
};

export default SingleNft;
