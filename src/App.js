import Home from "./screens/Home/Home";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./fonts/Organetto.ttf";
import { Amplify } from "aws-amplify";
import { ApolloProvider } from "@apollo/client";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./screens/Account/src/aws-exports";
import "./screens/Account/src/App.css";
import { checkout, passport, config } from "@imtbl/sdk";
import AuthProvider, {
  useAuth,
} from "./screens/Account/src/Utils.js/Auth/AuthDetails.js";
import {
  Auth,
  ForgotPassword,
  ResetPassword,
} from "./screens/Account/src/Containers";
import PlayerCreation from "./screens/Account/src/Containers/PlayerCreation/PlayerCreation.js";
import client from "./screens/Account/src/apolloConfig.js";
import Dashboard from "./screens/Account/src/Containers/Dashboard/Dashboard.js";
import LandingScreen from "./screens/Account/src/Containers/LandingScreen/LandingScreen.js";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MarketplaceFooter from "./components/Footer/MarketplaceFooter";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import Caws from "./screens/Caws/Caws";
import NftMinting from "./screens/Caws/NftMinting/NftMinting";
import News from "./screens/News/News";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import CheckWhitelistModal from "./components/CheckWhitelistModal/CheckWhitelistModal";
import PrivacyPolicy from "./screens/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./screens/TermsConditions/TermsConditions";
import Explorer from "./screens/Explorer/Explorer";
import Land from "./screens/Land/Land";
import Roadmap from "./screens/Roadmap/Roadmap";
import ScrollTop from "./components/ScrollTop";
import JoinBeta from "./screens/JoinBeta/JoinBeta";
import JoinBetaModal from "./components/JoinBetaModal/JoinBetaModal";
import PartnerForm from "./screens/PartnerForm/PartnerForm";
import WalletModal from "./components/WalletModal/WalletModal";
import TimePiece from "./screens/Timepiece/Timepiece";
import axios from "axios";
import Unsubscribe from "./screens/Unsubscribe/Unsubscribe";
import Marketplace from "./screens/Marketplace/Marketplace";
import getListedNFTS from "./actions/Marketplace";

import CawsNFT from "./screens/Marketplace/MarketNFTs/CawsNFT";
import WoDNFT from "./screens/Marketplace/MarketNFTs/WoDNFT";
import TimepieceNFT from "./screens/Marketplace/MarketNFTs/TimepieceNFT";
import MarketStake from "./screens/Marketplace/MarketStake";
import MarketEvents from "./screens/Marketplace/MarketEvents";
import SingleNft from "./screens/Marketplace/MarketNFTs/SingleNft";
import { useLocation, useNavigate } from "react-router-dom";
import MarketMint from "./screens/Marketplace/MarketMint";
import CheckAuthUserModal from "./components/CheckWhitelistModal/CheckAuthUserModal";
import Notifications from "./screens/Marketplace/Notifications/Notifications";
import BetaPassNFT from "./screens/Marketplace/MarketNFTs/BetaPassNFT";
import { useEagerlyConnect } from "web3-connector";
import SIDRegister from "@web3-name-sdk/register";
import { createWeb3Name } from "@web3-name-sdk/core";
import { ethers, providers } from "ethers";
import {
  useWeb3React,
  disconnect,
  connectWallet,
  ConnectionType,
} from "web3-connector";
import DomainModal from "./components/DomainModal/DomainModal.js";
import Web3 from "web3";
import ChestFlyout from "./components/LandFlyout/ChestFlyout";
import NFTBridge from "./screens/NFTBridge/NftBridge.js";
import AuthBNB from "./screens/Account/src/Containers/Auth/AuthBNB.js";
import Community from "./screens/Community/Community.js";
import OurTeam from "./screens/OurTeam/OurTeam.js";
import { useQuery } from "@apollo/client";
import { GET_PLAYER } from "./screens/Account/src/Containers/Dashboard/Dashboard.schema.js";
import ResetPasswordTest from "./screens/ResetPassword/ResetPassword.js";
import Redirect from "./screens/Home/Redirect";
import WalletModal2 from "./components/WalletModal/WalletModal2";

const PUBLISHABLE_KEY = "pk_imapik-BnvsuBkVmRGTztAch9VH"; // Replace with your Publishable Key from the Immutable Hub
const CLIENT_ID = "FgRdX0vu86mtKw02PuPpIbRUWDN3NpoE"; // Replace with your passport client ID

const baseConfig = {
  environment: config.Environment.PRODUCTION,
  publishableKey: PUBLISHABLE_KEY,
};

const passportInstance = new passport.Passport({
  baseConfig: {
    environment: config.Environment.PRODUCTION,
    publishableKey: PUBLISHABLE_KEY,
  },
  clientId: CLIENT_ID,
  redirectUri: "https://www.worldofdypians.com/redirect",
  logoutRedirectUri: "https://www.worldofdypians.com/logout",
  audience: "platform_api",
  scope: "openid offline_access email transact",
});

const checkoutSDK = new checkout.Checkout({
  baseConfig,
  passport: passportInstance,
});

function App() {
  const CHAINLIST = {
    1: {
      chainId: 1,
      chainName: "Ethereum",
      rpcUrls: ["https://mainnet.infura.io/v3/"],
      nativeCurrency: {
        symbol: "eth",
        decimals: 18,
      },
      blockExplorerUrls: ["https://etherscan.io"],
    },
    56: {
      chainId: 56,
      chainName: "BSC",
      rpcUrls: ["https://bsc-dataseed.binance.org/"],
      nativeCurrency: {
        symbol: "bnb",
        decimals: 18,
      },
      blockExplorerUrls: ["https://bscscan.com"],
    },
    1030: {
      chainId: 1030,
      chainName: "CFX",
      rpcUrls: ["https://evm.confluxrpc.com"],
      nativeCurrency: {
        symbol: "cfx",
        decimals: 18,
      },
      blockExplorerUrls: ["https://evm.confluxscan.net"],
    },
    204: {
      chainId: 204,
      chainName: "opBNB",
      rpcUrls: ["https://opbnb.publicnode.com"],
      nativeCurrency: {
        symbol: "bnb",
        decimals: 18,
      },

      blockExplorerUrls: ["https://mainnet.opbnbscan.com"],
    },
    1482601649: {
      chainId: 1482601649,
      chainName: "SKALE Nebula Hub",
      nativeCurrency: {
        symbol: "sFUEL",
        decimals: 18,
      },

      rpcUrls: ["https://mainnet.skalenodes.com/v1/green-giddy-denebola"],
      blockExplorerUrls: [
        "https://green-giddy-denebola.explorer.mainnet.skalenodes.com",
      ],
    },
    1116: {
      chainId: 1116,
      chainName: "CORE",
      rpcUrls: ["https://rpc.coredao.org/"],
      nativeCurrency: {
        symbol: "CORE",
        decimals: 18,
      },
      blockExplorerUrls: ["https://scan.coredao.org"],
    },
    88: {
      chainId: 88,
      chainName: "Viction",
      rpcUrls: ["https://rpc.viction.xyz"],
      nativeCurrency: {
        symbol: "VIC",
        decimals: 18,
      },
      blockExplorerUrls: ["https:/vicscan.xyz"],
    },
    713715: {
      chainId: 713715,
      chainName: "Sei EVM Devnet",
      rpcUrls: ["https://evm-rpc-arctic-1.sei-apis.com"],
      nativeCurrency: {
        symbol: "SEI",
        decimals: 18,
      },
      blockExplorerUrls: ["https://seistream.app/"],
    },
    13371: {
      chainId: 13371,
      chainName: "Immutable zkEVM",
      rpcUrls: ["https://rpc.immutable.com"],
      nativeCurrency: {
        symbol: "IMX",
        decimals: 18,
      },
      blockExplorerUrls: ["https://explorer.immutable.com"],
    },
    169: {
      chainId: 169,
      chainName: "Manta Pacific Mainnet",
      rpcUrls: ["https://pacific-rpc.manta.network/http"],
      nativeCurrency: {
        symbol: "ETH",
        decimals: 18,
      },
      blockExplorerUrls: ["https://pacific-explorer.manta.network/"],
    },
  };

  const {
    data,
    refetch: refetchPlayer,
    loading: loadingPlayer,
  } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });

  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showWalletModalDownload, setShowWalletModalDownload] = useState(false);
  const [showWalletModalRegister, setShowWalletModalRegister] = useState(false);
  const [showWalletModalRegister2, setShowWalletModalRegister2] =
    useState(false);

  const [betaModal, setBetaModal] = useState(false);
  const [donwloadSelected, setdownloadSelected] = useState(false);

  const [isConnected, setIsConnected] = useState(false);
  const [coinbase, setCoinbase] = useState();
  const [chainId, setChainId] = useState();
  const [currencyAmount, setCurrencyAmount] = useState(0);
  const [showForms, setShowForms] = useState(false);
  const [showForms2, setShowForms2] = useState(false);
  const [myNFTs, setMyNFTs] = useState([]);
  const [count2, setCount2] = useState(0);
  const [myCAWNFTs, setMyCAWNFTs] = useState([]);
  const [cawsToUse, setcawsToUse] = useState([]);
  const [avatar, setAvatar] = useState();
  const [mystakes, setMystakes] = useState([]);
  const [myCawsWodStakesAll, setMyCawsWodStakes] = useState([]);
  const [listedNFTS, setListedNFTS] = useState([]);
  const [listedNFTS2, setListedNFTS2] = useState([]);
  const [recentListedNFTS2, setrecentListedNFTS2] = useState([]);
  const [count33, setCount33] = useState(0);
  const [count44, setCount44] = useState(0);
  const [count55, setCount55] = useState(0);

  const [myCAWstakes, setCAWMystakes] = useState([]);
  const [myNFTsCreated, setMyNFTsCreated] = useState([]);
  const [myConfluxNFTsCreated, setmyConfluxNFTsCreated] = useState([]);
  const [myBnbNFTsCreated, setMyBnbNFTsCreated] = useState([]);
  const [totalBnbNft, setTotalBnbNft] = useState(0);
  const [myBnbNfts, setMyBnbNfts] = useState([]);
  const [bnbMintAllowed, setBnbMintAllowed] = useState(1);
  const [immutableMintAllowed, setImmutableMintAllowed] = useState(1);

  const [mybaseNFTsCreated, setmybaseNFTsCreated] = useState([]);
  const [myskaleNFTsCreated, setmyskaleNFTsCreated] = useState([]);
  const [mycoreNFTsCreated, setmycoreNFTsCreated] = useState([]);
  const [myvictionNFTsCreated, setmyVictionNFTsCreated] = useState([]);
  const [myopbnbNFTsCreated, setmyopbnbNFTsCreated] = useState([]);
  const [myimmutableNftsCreated, setmyImmutableNFTsCreated] = useState([]);
  const [myMantaNFTsCreated, setMyMantaNFTsCreated] = useState([])
  const [myCAWSNFTsCreated, setMyCAWSNFTsCreated] = useState([]);
  const [myCAWSNFTsTotalStaked, setMyCAWSNFTsTotalStaked] = useState([]);
  const [walletModal, setwalletModal] = useState(false);
  const [walletId, setwalletId] = useState("connect");

  const [mintloading, setmintloading] = useState("initial");
  const [mintStatus, setmintStatus] = useState("");
  const [textColor, settextColor] = useState("#fff");
  const [finalCaws, setFinalCaws] = useState([]);
  const [limit, setLimit] = useState(0);
  const [allCawsForTimepieceMint, setAllCawsForTimepieceMint] = useState([]);
  const [timepieceMetadata, settimepieceMetadata] = useState([]);
  const [username, setUsername] = useState("");
  const [totalTimepieceCreated, setTotalTimepieceCreated] = useState(0);
  const [totalCoingeckoNft, setTotalCoingeckoNft] = useState(0);
  const [totalGateNft, setTotalGateNft] = useState(0);
  const [totalBaseNft, settotalBaseNft] = useState(0);
  const [totalSkaleNft, settotalSkaleNft] = useState(0);
  const [totalCoreNft, settotalCoreNft] = useState(0);
  const [totalVictionNft, settotalVictionNft] = useState(0);
  const [totalopbnbNft, settotalopbnbNft] = useState(0);
  const [totalMantaNft, setTotalMantaNft] = useState(0)
  const [totalDogeNft, settotalDogeNft] = useState(0);
  const [totalCmcNft, settotalCmcNft] = useState(0);

  const [totalConfluxNft, setTotalConfluxNft] = useState(0);
  const [totalseiNft, setTotalseiNft] = useState(0);
  const [totalImmutableNft, setTotalImmutableNft] = useState(0);
  const [totalMultiversNft, setTotalMultiversNft] = useState(0);
  const [userWallet, setuserWallet] = useState("");

  const [baseMintAllowed, setbaseMintAllowed] = useState(1);
  const [skaleMintAllowed, setSkaleMintAllowed] = useState(1);

  const [confluxMintAllowed, setconfluxMintAllowed] = useState(1);
  const [victionMintAllowed, setvictionMintAllowed] = useState(1);
  const [opbnbMintAllowed, setopbnbMintAllowed] = useState(1);
  const [mantaMintAllowed, setMantaMintAllowed] = useState(1)
  const [coreMintAllowed, setcoreMintAllowed] = useState(1);

  const [fireAppcontent, setFireAppContent] = useState(false);
  const [activeUser, setactiveUser] = useState(false);
  const [listedNFTSCount, setListedNFTSCount] = useState(0);
  const [latest20RecentListedNFTS, setLatest20RecentListedNFTS] = useState([]);
  const [dyptokenDatabnb, setDypTokenDatabnb] = useState([]);
  const [dyptokenDatabnb_old, setDypTokenDatabnb_old] = useState([]);
  const [socials, setSocials] = useState([]);

  const [idyptokenDatabnb, setIDypTokenDatabnb] = useState([]);

  const [totalBoughtNFTSCount, setTotalBoughtNFTSCount] = useState(0);
  const [totalBoughtNFTSinETH, setTotalBoughtNFTSinETH] = useState(0);
  const [totalBoughtNFTSinDYP, setTotalBoughtNFTSinDYP] = useState(0);
  const [availTime, setavailTime] = useState();

  const [MyNFTSTimepiece, setMyNFTSTimepiece] = useState([]);
  const [MyNFTSLand, setMyNFTSLand] = useState([]);
  const [MyNFTSCaws, setMyNFTSCaws] = useState([]);

  const [MyNFTSCaws2, setMyNFTSCaws2] = useState([]);
  const [myLandNFTs, setMyLandNFTs] = useState([]);

  const [MyNFTSCawsBnb, setMyNFTSCawsBnb] = useState([]);
  const [myLandNFTsBnb, setMyLandNFTsBnb] = useState([]);

  const [MyNFTSCawsAvax, setMyNFTSCawsAvax] = useState([]);
  const [myLandNFTsAvax, setMyLandNFTsAvax] = useState([]);

  const [MyNFTSCawsBase, setMyNFTSCawsBase] = useState([]);
  const [myLandNFTsBase, setMyLandNFTsBase] = useState([]);

  const [MyNFTSCoingecko, setMyNFTSCoingecko] = useState([]);
  const [myGateNfts, setMyGateNfts] = useState([]);
  const [myConfluxNfts, setMyConfluxNfts] = useState([]);
  const [myBaseNFTs, setmyBaseNFTs] = useState([]);
  const [myskaleNFTs, setmySkaleNFTs] = useState([]);
  const [myseiNfts, setMyseiNfts] = useState([]);
  const [myCoreNfts, setMyCoreNfts] = useState([]);
  const [myVictionNfts, setMyVictionNfts] = useState([]);
  const [myOpbnbNfts, setmyOpbnbNfts] = useState([]);
  const [myMantaNfts, setMyMantaNfts] = useState([])
  const [myMultiversNfts, setMyMultiversNfts] = useState([]);
  const [myImmutableNfts, setMyImmutableNfts] = useState([]);

  const [myDogeNFTs, setmyDogeNFTs] = useState([]);
  const [myCmcNFTs, setmyCmcNFTs] = useState([]);
  const [isBnb, setisBnb] = useState(false);
  const [isBnbSuccess, setisBnbSuccess] = useState(false);
  const [logoutCount, setLogoutCount] = useState(0);

  const [latest20BoughtNFTS, setLatest20BoughtNFTS] = useState([]);
  const [
    top20BoughtByPriceAndPriceTypeETHNFTS,
    settop20BoughtByPriceAndPriceTypeETHNFTS,
  ] = useState([]);

  const [
    top20BoughtByPriceAndPriceTypeDYPNFTS,
    settop20BoughtByPriceAndPriceTypeDYPNFTS,
  ] = useState([]);

  const [nftCount, setNftCount] = useState(1);
  const [count, setCount] = useState(1);

  const [dypTokenData, setDypTokenData] = useState(0);
  const [dypTokenData_old, setDypTokenData_old] = useState();
  const [ethTokenData, setEthTokenData] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [cawsBought, setCawsBought] = useState([]);
  const [timepieceBought, setTimepieceBought] = useState([]);
  const [landBought, setLandBought] = useState([]);
  const [myNftsOffer, setmyNftsOffer] = useState([]);
  const [success, setSuccess] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [domainPopup, setDomainPopup] = useState(false);
  const [availableDomain, setAvailableDomain] = useState("initial");
  const [domainPrice, setDomainPrice] = useState(0);
  const [bnbUSDPrice, setBnbUSDPrice] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [successDomain, setSuccessDomain] = useState(false);
  const [dogePrice, setDogePrice] = useState(0);

  const [domainName, setDomainName] = useState(null);
  const [loadingDomain, setLoadingDomain] = useState(false);
  const [domainMetaData, setDomainMetaData] = useState(null);
  const [totalTx, setTotalTx] = useState(0);
  const [totalvolume, setTotalVolume] = useState(0);
  const [bscAmount, setBscAmount] = useState(0);
  const [skaleAmount, setSkaleAmount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const { BigNumber } = window;
  const { connector, account, accounts, isActive, isActivating, provider } =
    useWeb3React();

  useEagerlyConnect();

  const starPrizes = [200, 100, 60, 30, 20, 20, 20, 20, 20, 20];
  const starPrizesGolden = [400, 200, 140, 70, 30, 30, 30, 30, 30, 30];
  const placeholderplayerData = [
    {
      position: "0",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "1",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "2",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "3",
      displayName: "...",
      reward: "---",
      statValue: "---",
      premium: false,
    },

    {
      position: "4",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "5",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "6",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "7",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "8",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: "9",
      displayName: "...",
      reward: "---",
      premium: false,
      statValue: "---",
    },
  ];

  const [allStarData, setAllStarData] = useState({});
  const [starRecords, setStarRecords] = useState([]);
  const [activePlayerStar, setActivePlayerStar] = useState([]);
  const [userDataStar, setUserDataStar] = useState({});
  const [prevDataStar, setPrevDataStar] = useState([]);
  const [prevVersionStar, setPrevVersionStar] = useState(0);
  const [dataAmountStar, setDataAmountStar] = useState([]);

  const userId = data?.getPlayer?.playerId;

  const backendApi =
    "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod";

  const fillRecordsStar = (itemData) => {
    if (itemData.length === 0) {
      setStarRecords(placeholderplayerData);
    } else if (itemData.length <= 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setStarRecords(finalData);
    }
  };
  const fetchPreviousWinnersStar = async () => {
    if (prevVersionStar != 0) {
      const data = {
        StatisticName: "GlobalStarMonthlyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: prevVersionStar - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      );
      setPrevDataStar(result.data.data.leaderboard);
    }

    // setdailyplayerData(result.data.data.leaderboard);
  };
  const fetchRecordsStar = async () => {
    const data = {
      StatisticName: "GlobalStarMonthlyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data);
    setPrevVersionStar(parseInt(result.data.data.version));
    setStarRecords(result.data.data.leaderboard);
    fillRecordsStar(result.data.data.leaderboard);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    if (testArray.length > 0) {
      setActivePlayerStar(true);
    } else if (testArray.length === 0) {
      setActivePlayerStar(false);
      fetchDailyRecordsAroundPlayerStar(result.data.data.leaderboard);
    }
  };
  const fetchDailyRecordsAroundPlayerStar = async (itemData) => {
    const data = {
      StatisticName: "GlobalStarMonthlyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );
      if (testArray.length > 0) {
        const userPosition = testArray[0].position;

        setDataAmountStar(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? Number(starPrizes[9])
              : Number(starPrizes[userPosition])
            : 0
        );
      }
      if (itemData.length > 0) {
        var testArray2 = Object.values(itemData).filter(
          (item) => item.displayName === username
        );

        if (testArray.length > 0 && testArray2.length > 0) {
          setActivePlayerStar(true);
          setUserDataStar([]);
        } else if (testArray.length > 0 && testArray2.length === 0) {
          setActivePlayerStar(false);
          setUserDataStar(...testArray);
        }
      } else if (testArray.length > 0) {
        setActivePlayerStar(false);
        setUserDataStar(...testArray);
      }
    }
  };

  useEffect(() => {
    fetchRecordsStar();
  }, [username, userId]);

  useEffect(() => {
    fetchPreviousWinnersStar();
  }, [prevVersionStar]);

  useEffect(() => {
    setAllStarData({
      rewards: starPrizes,
      premium_rewards: starPrizesGolden,
      activeData: starRecords,
      previousData: prevDataStar,
      player_data: userDataStar,
      is_active: activePlayerStar, //change when apis are ready
    });
  }, [starRecords, prevDataStar, userDataStar, activePlayerStar]);

  const html = document.querySelector("html");

  useEffect(() => {
    if (domainPopup === true) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [domainPopup]);

  const web3Name = createWeb3Name();

  const searchDomain = async (domain) => {
    if (window.ethereum) {
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const register = new SIDRegister({ signer, chainId: 56 });
      const available = await register.getAvailable(domain);
      const price = await register.getRentPrice(domain, 1);
      const newPrice = new BigNumber(price._hex / 1e18).toFixed();
      setDomainPrice(newPrice);
      if (domain == "") {
        setAvailableDomain("initial");
      } else {
        setAvailableDomain(available);
      }
      console.log(available, domain.length);
    }
  };

  const registerDomain = async (label, years) => {
    setLoadingDomain(true);
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const register = new SIDRegister({ signer, chainId: 56 });
    await register
      .register(label, address, years, {
        setPrimaryName: true,
        referrer: "dyp.bnb",
      })
      .then(() => {
        setSuccessMessage("You have successfully registered your .bnb domain");
        setSuccessDomain(true);
        setTimeout(() => {
          setSuccessMessage("");
          setSuccessDomain(false);
        }, 5000);
        setLoadingDomain(false);
      })
      .catch((e) => {
        setLoadingDomain(false);
        setSuccessDomain(false);
        setSuccessMessage(`Something went wrong: ${e?.data?.message}`);
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
        console.log(e);
      });
  };

  const getTokenData = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_eth_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_eth_v2.token_data
        );

        setDypTokenData_old(propertyDyp[0][1].token_price_usd);

        const propertyETH = data.data.the_graph_eth_v2.usd_per_eth;

        setEthTokenData(propertyETH);
      });
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
    setDypTokenDatabnb(dypprice);
  };

  const fetchDogeCoinPrice = async () => {
    await axios
      .get(
        "https://pro-api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev"
      )
      .then((obj) => {
        if (obj.data["dogecoin"] && obj.data["dogecoin"] !== NaN) {
          setDogePrice(obj.data["dogecoin"].usd);
        }
      });
  };

  const getTokenDatabnb = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_bsc_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_bsc_v2.token_data
        );

        setDypTokenDatabnb_old(propertyDyp[0][1].token_price_usd);

        setBnbUSDPrice(data.data.the_graph_bsc_v2.usd_per_eth);
        const propertyIDyp = Object.entries(
          data.data.the_graph_bsc_v2.token_data
        );
        setIDypTokenDatabnb(propertyIDyp[1][1].token_price_usd);
      });
  };

  const handleSwitchChain = async () => {
    const { ethereum } = window;
    const ETHPARAMS = {
      chainId: "0x1", // A 0x-prefixed hexadecimal string
      chainName: "Ethereum Mainnet",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH", // 2-6 characters long
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.infura.io/v3/"],
      blockExplorerUrls: ["https://etherscan.io"],
    };

    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      console.log(switchError, "switch");
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [ETHPARAMS],
          });
        } catch (addError) {
          console.log(addError);
        }
      }
      // handle other "switch" errors
    }
  };

  const fetchAvatar = async (userAddr) => {
    const response = axios
      .get(`https://api-image.dyp.finance/api/v1/avatar/${userAddr}`)
      .then((data) => {
        if (data.data.avatar) {
          setAvatar(data.data.avatar);
        } else {
          setAvatar(null);
        }
      })
      .catch(console.error);

    return response;
  };

  const checkConnection = async () => {
    await window.getCoinbase().then((data) => {
      setCoinbase(data);
      axios
        .get(`https://api-image.dyp.finance/api/v1/username/${data}`)
        .then((res) => {
          if (res.data?.username) {
            setUsername(res.data?.username);
          } else {
            setUsername("");
          }
        });
    });
  };

  const checkConnection2 = async () => {
    const logout = localStorage.getItem("logout");
    if (logout !== "true") {
      if (window.gatewallet) {
        setCoinbase(account);
        setIsConnected(isActive);
        fetchAvatar(account);
      } else {
        await window.getCoinbase().then((data) => {
          if (data) {
            fetchAvatar(data);
            setCoinbase(data);
            setIsConnected(true);
          } else {
            setCoinbase();
            setIsConnected(false);
          }
        });
      }
    } else {
      setIsConnected(false);
      setCoinbase();
    }
  };

  const handleRegister = () => {
    setShowWalletModal(true);
  };

  const handleBetaRegister = () => {
    setBetaModal(true);
  };

  const handleDownload = () => {
    setdownloadSelected(true);
    setShowWalletModalDownload(true);
  };

  const handleSignUp = () => {
    if (activeUser === true) {
      setFireAppContent(true);
    } else {
      setShowWalletModalRegister(true);
    }
  };

  const handleConnection = async () => {
    try {
      localStorage.setItem("logout", "false");
      await window.connectWallet().then((data) => {
        setIsConnected(true);
      });
      await window.getCoinbase().then((data) => {
        console.log(data);
        setCoinbase(data);
      });
      setShowForms(true);
      setSuccess(true);
      // connectWallet(ConnectionType.WALLET_CONNECT_NOTQR);
    } catch (e) {
      setShowWalletModal(false);
      setSuccess(true);

      window.alertify.error(String(e) || "Cannot connect wallet!");
      console.log(e);
      return;
    }

    return isConnected;
  };

  const checkNetworkId = async () => {
    if (window.ethereum && !window.gatewallet) {
      window.ethereum
        .request({ method: "net_version" })
        .then((data) => {
          setChainId(parseInt(data));
        })
        .catch(console.error);
    } else if (window.ethereum && window.gatewallet) {
      await provider
        ?.detectNetwork()
        .then((data) => {
          setChainId(data.chainId);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setChainId(1);
    }
  };

  const handleConnectWallet = async () => {
    try {
      if (!window.gatewallet) {
        if (window.ethereum) {
          localStorage.setItem("logout", "false");
          await window.connectWallet().then((data) => {
            setIsConnected(data);
          });

          await window.getCoinbase().then((data) => {
            setCoinbase(data);
          });
          if (isBnb === true) {
            setisBnbSuccess(true);
          }
          setwalletModal(false);
          setShowForms2(true);
          setSuccess(true);
          checkConnection();
        } else
          window.alertify.error("No web3 detected. Please install Metamask!");
      } else {
        await connectWallet(ConnectionType.INJECTED);
        setCoinbase(account);
        setIsConnected(isActive);
        setwalletModal(false);
        setShowForms2(true);
        setSuccess(true);
        setChainId(parseInt(window.gatewallet.chainId));
      }

      //
      // window.gatewallet.enable()
      // setCoinbase(account);
      //
      //
      // setIsConnected(isActive);
    } catch (e) {
      window.alertify.error(String(e) || "Cannot connect wallet!");
      console.log(e);
      return;
    }
    return isConnected;
  };

  const handleConnectPassport = async () => {
    const widgets = await checkoutSDK.widgets({
      config: { theme: checkout.WidgetTheme.DARK },
    });
    const connect = widgets.create(checkout.WidgetType.CONNECT);

    if (!connect) return;

    connect.mount("connect");

    connect.addListener(checkout.ConnectEventType.SUCCESS, async (data) => {
      const passportProvider = passportInstance.connectEvm();
      const accounts = await passportProvider.request({
        method: "eth_requestAccounts",
      });
      handleConnectWallet();
    });
    connect.addListener(checkout.ConnectEventType.FAILURE, (data) => {
      console.log("failure", data);
    });
    connect.addListener(checkout.ConnectEventType.CLOSE_WIDGET, () => {
      connect.unmount();
      setwalletModal(false);
      // setTimeout(() => {
      //   setwalletId("connect_simple");
      //   handleConnectWalletPassport();
      // }, 1000);
    });

    //   await passportInstance.login().then(async()=>{
    //     if(accounts && accounts.length > 0) {
    //       handleConnection();
    //       console.log(window)
    //     }
    // })

    // const provider = new ethers.providers.Web3Provider(passportProvider);
    // console.log('provider',provider)
    // const accounts = await provider.request({ method: "eth_requestAccounts" });
  };

  const handleConnectWalletPassport = async () => {
    setwalletModal(true);
    console.log("in");
    const checkoutSDK_simple = new checkout.Checkout();

    const widgets_simple = await checkoutSDK_simple.widgets({
      config: { theme: checkout.WidgetTheme.DARK },
    });

    const connect_simple = widgets_simple.create(checkout.WidgetType.CONNECT, {
      config: { theme: checkout.WidgetTheme.DARK },
    });

    if (!connect_simple) return;

    connect_simple.mount("connect_simple");

    connect_simple.addListener(checkout.ConnectEventType.SUCCESS, (data) => {
      console.log("success_simple", data);
      handleConnectWallet();
    });
    connect_simple.addListener(checkout.ConnectEventType.FAILURE, (data) => {
      console.log("failure_simple", data);
    });
    connect_simple.addListener(checkout.ConnectEventType.CLOSE_WIDGET, () => {
      connect_simple.unmount();
    });
  };

  const myNft = async () => {
    if (coinbase !== null && coinbase !== undefined) {
      const infura_web3 = window.infuraWeb3;
      let nfts_contract = new infura_web3.eth.Contract(
        window.LANDMINTING_ABI,
        window.config.landnft_address
      );

      let getBalanceOf = await nfts_contract.methods.balanceOf(coinbase).call();

      let nftList = [];

      for (let i = 0; i < getBalanceOf; i++)
        nftList.push(
          await nfts_contract.methods.tokenOfOwnerByIndex(coinbase, i).call()
        );

      let nfts = nftList.map((nft) => window.getLandNft(nft));

      nfts = await Promise.all(nfts);
      nfts.reverse();
      setMyNFTs(nfts);
    }
  };

  const myLandNft = async () => {
    let myNft = await window.myNftLandListContract(coinbase);

    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getLandNft(nft));
      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyLandNFTs(nfts);
    } else setMyLandNFTs([]);
  };

  const myNft2 = async () => {
    let myNft = await window.myNftListContract(coinbase);
    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getNft(nft));

      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyNFTSCaws2(nfts);
    } else setMyNFTSCaws2([]);
  };

  const myLandNftBNB = async () => {
    let myNft = await window.myNftLandListContractCCIP(
      coinbase,
      window.config.nft_land_bnb_address
    );

    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getLandNft(nft));
      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyLandNFTsBnb(nfts);
    } else setMyLandNFTsBnb([]);
  };

  const myNftBNB = async () => {
    let myNft = await window.myNftListContractCCIP(
      coinbase,
      window.config.nft_caws_bnb_address
    );
    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getNft(nft));

      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyNFTSCawsBnb(nfts);
    } else setMyNFTSCawsBnb([]);
  };

  const myLandNftAVAX = async () => {
    let myNft = await window.myNftLandListContractCCIP(
      coinbase,
      window.config.nft_land_avax_address
    );

    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getLandNft(nft));
      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyLandNFTsAvax(nfts);
    } else setMyLandNFTsAvax([]);
  };

  const myNft2Avax = async () => {
    let myNft = await window.myNftListContractCCIP(
      coinbase,
      window.config.nft_caws_avax_address
    );
    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getNft(nft));

      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyNFTSCawsAvax(nfts);
    } else setMyNFTSCawsAvax([]);
  };

  const myLandNftsBase = async () => {
    let myNft = await window.myNftLandListContractCCIPBase(
      coinbase,
      window.config.nft_land_base_address
    );

    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getLandNft(nft));
      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyLandNFTsBase(nfts);
    } else setMyLandNFTsBase([]);
  };

  const myNftsBase = async () => {
    let myNft = await window.myNftListContractCCIPBase(
      coinbase,
      window.config.nft_caws_base_address
    );
    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getNft(nft));

      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyNFTSCawsBase(nfts);
    } else setMyNFTSCawsBase([]);
  };

  const getMyNFTS = async (coinbase, type) => {
    return await window.getMyNFTs(coinbase, type);
  };

  const fetchImmutableNfts = async () => {
    if (isConnected && coinbase) {
      const result = await axios
        .get(`https://api.worldofdypians.com/api/mint/immutable/${coinbase}`)
        .catch((e) => {
          console.error(e);
        });

      if (result && result.status === 200) {
        const NFTS = result.data.data.tokenIDMinted;
        setTotalImmutableNft(NFTS.length);
        setMyImmutableNfts(NFTS);
        setImmutableMintAllowed(NFTS.length > 0 ? 0 : 1);
        setmyImmutableNFTsCreated(NFTS);
      }
    }
  };

  const fetchAllMyNfts = async () => {
    if (coinbase) {
      getMyNFTS(coinbase, "caws").then((NFTS) => setMyNFTSCaws(NFTS));

      getMyNFTS(coinbase, "timepiece").then((NFTS) => setMyNFTSTimepiece(NFTS));

      getMyNFTS(coinbase, "land").then((NFTS) => setMyNFTSLand(NFTS));
      getMyNFTS(coinbase, "coingecko").then((NFTS) => {
        setMyNFTSCoingecko(NFTS);
        setTotalCoingeckoNft(NFTS.length);
      });
      getMyNFTS(coinbase, "gate").then((NFTS) => {
        setTotalGateNft(NFTS.length);
        setMyGateNfts(NFTS);
      });

      getMyNFTS(coinbase, "doge").then((NFTS) => {
        settotalDogeNft(NFTS.length);
        setmyDogeNFTs(NFTS);
      });

      getMyNFTS(coinbase, "cmc").then((NFTS) => {
        if (NFTS) {
          settotalCmcNft(NFTS.length);
          setmyCmcNFTs(NFTS);
        }
      });

      getMyNFTS(coinbase, "conflux").then((NFTS) => {
        setTotalConfluxNft(NFTS.length);
        setMyConfluxNfts(NFTS);
        setconfluxMintAllowed(NFTS.length > 0 ? 0 : 1);
        setmyConfluxNFTsCreated(NFTS);
      });

      getMyNFTS(coinbase, "bnb").then((NFTS) => {
        setTotalBnbNft(NFTS.length);
        setMyBnbNfts(NFTS);
        setBnbMintAllowed(NFTS.length > 0 ? 0 : 1);
        setMyBnbNFTsCreated(NFTS);
      });

      getMyNFTS(coinbase, "immutable").then((NFTS) => {
        setTotalImmutableNft(NFTS);
        setMyImmutableNfts(NFTS);
        setImmutableMintAllowed(NFTS > 0 ? 0 : 1);
        setmyImmutableNFTsCreated(NFTS);
      });

      getMyNFTS(coinbase, "base").then((NFTS) => {
        settotalBaseNft(NFTS.length);
        setmyBaseNFTs(NFTS);
        setbaseMintAllowed(NFTS.length > 0 ? 0 : 1);
        setmybaseNFTsCreated(NFTS);
      });

      getMyNFTS(coinbase, "skale").then((NFTS) => {
        settotalSkaleNft(NFTS.length);
        setmySkaleNFTs(NFTS);
        setSkaleMintAllowed(NFTS.length > 0 ? 0 : 1);
        setmyskaleNFTsCreated(NFTS);
      });

      getMyNFTS(coinbase, "core").then((NFTS) => {
        settotalCoreNft(NFTS.length);
        setMyCoreNfts(NFTS);
        setcoreMintAllowed(NFTS.length > 0 ? 0 : 1);
        setmycoreNFTsCreated(NFTS);
      });

      getMyNFTS(coinbase, "viction").then((NFTS) => {
        settotalVictionNft(NFTS.length);
        setMyVictionNfts(NFTS);
        setvictionMintAllowed(NFTS.length > 0 ? 0 : 1);
        setmyVictionNFTsCreated(NFTS);
      });

      getMyNFTS(coinbase, "opbnb").then((NFTS) => {
        settotalopbnbNft(NFTS.length);
        setmyOpbnbNfts(NFTS);
        setopbnbMintAllowed(NFTS.length > 0 ? 0 : 1);
        setmyopbnbNFTsCreated(NFTS);
      });
      getMyNFTS(coinbase, "manta").then((NFTS) => {
        setTotalMantaNft(NFTS.length);
        setMyMantaNfts(NFTS);
        setMantaMintAllowed(NFTS.length > 0 ? 0 : 1);
        setMyMantaNFTsCreated(NFTS);
      });

      //setmyBaseNFTs
    } else {
      setMyNFTSCaws([]);
      setMyNFTSTimepiece([]);
      setMyNFTSLand([]);
      setMyNFTSCoingecko([]);
      setTotalCoingeckoNft(0);
      setTotalGateNft(0);
      setMyGateNfts([]);
      setTotalConfluxNft(0);
      setMyConfluxNfts([]);
      setMyVictionNfts([]);
      settotalVictionNft(0);
      setmyOpbnbNfts([]);
      settotalopbnbNft(0);
      setMyCoreNfts([]);
      settotalCoreNft(0);
      setMyMantaNfts([]);
      setTotalMantaNft(0);
    }
  };

  const fetchSocialData = async () => {
    const result = await axios
      .get("https://api.worldofdypians.com/api/socialUsers")
      .catch((e) => {
        console.error(e);
      });

    if (result && result.status === 200) {
      const socialsData = result.data;
      setSocials(socialsData);
    }
  };

  const myCAWNft = async () => {
    if (coinbase !== null && coinbase !== undefined) {
      const infura_web3 = window.infuraWeb3;
      let nfts_contract = new infura_web3.eth.Contract(
        window.NFT_ABI,
        window.config.nft_address
      );

      let getBalanceOf = await nfts_contract.methods.balanceOf(coinbase).call();

      let nftList = [];

      for (let i = 0; i < getBalanceOf; i++)
        nftList.push(
          await nfts_contract.methods.tokenOfOwnerByIndex(coinbase, i).call()
        );

      let nfts = nftList.map((nft) => window.getNft(nft));

      nfts = await Promise.all(nfts);
      nfts.reverse();
      setMyCAWNFTs(nfts);
    }
  };

  const getStakesIdsCawsWod = async () => {
    const address = coinbase;
    let stakenft_cawsWod = [];
    const allCawsStakes = await window.wod_caws
      .depositsOf(address)
      .then((result) => {
        if (result.length > 0) {
          for (let i = 0; i < result.length; i++)
            stakenft_cawsWod.push(parseInt(result[i]));
          return stakenft_cawsWod;
        }
      });

    return allCawsStakes;
  };

  const getmyCawsWodStakes = async () => {
    let myStakes = await getStakesIdsCawsWod();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getNft(stake));

      stakes = await Promise.all(stakes);
      stakes.reverse();
      setMyCawsWodStakes(stakes);
    } else setMyCawsWodStakes([]);
  };

  const getStakesIds = async () => {
    const address = coinbase;
    if (address !== null && address !== undefined) {
      const infura_web3 = window.infuraWeb3;
      let staking_contract = new infura_web3.eth.Contract(
        window.NFTSTAKING_ABI,
        window.config.nftstaking_address
      );
      let stakenft = [];
      let myStakes = await staking_contract.methods
        .depositsOf(address)
        .call()
        .then((result) => {
          for (let i = 0; i < result.length; i++)
            stakenft.push(parseInt(result[i]));
          return stakenft;
        });

      return myStakes;
    }
  };

  const getLandStakesIds = async () => {
    const address = coinbase;
    if (address !== null && coinbase !== undefined) {
      const infura_web3 = window.infuraWeb3;
      let staking_contract = new infura_web3.eth.Contract(
        window.LANDSTAKING_ABI,
        window.config.landnftstake_address
      );
      let stakenft = [];
      let myStakes = await staking_contract.methods
        .depositsOf(address)
        .call()
        .then((result) => {
          for (let i = 0; i < result.length; i++)
            stakenft.push(parseInt(result[i]));
          return stakenft;
        });

      return myStakes;
    }
  };

  const myCAWStakes = async () => {
    let myStakes = await getStakesIds();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getNft(stake));
      stakes = await Promise.all(stakes);
      setMyCAWSNFTsTotalStaked(stakes);
      stakes.reverse();
      setCAWMystakes(stakes);
    }
  };

  const myLandStakes = async () => {
    let myStakes = await getLandStakesIds();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getLandNft(stake));
      stakes = await Promise.all(stakes);
      stakes.reverse();
      setMystakes(stakes);
    }
  };

  const checkCawsToUse = async () => {
    const testArray = [];
    const cawsArray = [...myCAWNFTs, ...myCAWstakes, ...myCawsWodStakesAll];
    const nft_contract = await window.getContractCawsTimepieceNFT(
      "CAWS_TIMEPIECE"
    );

    if (cawsArray.length > 0) {
      for (let i = 0; i < cawsArray.length; i++) {
        const cawsId = parseInt(
          cawsArray[i].name.slice(6, cawsArray[i].name.length)
        );

        const result = await nft_contract.methods.cawsUsed(cawsId).call();

        if (result === false) {
          testArray.push(cawsId);
        }
      }

      setcawsToUse(testArray);
      setAllCawsForTimepieceMint(testArray);
    } else if (cawsArray.length === 0) {
      setcawsToUse([]);
      setAllCawsForTimepieceMint([]);
    }
  };

  const calculateCaws = (data) => {
    if (data.numberOfTokens === cawsToUse.length) {
      setLimit(data.numberOfTokens);
      setFinalCaws(cawsToUse);
    } else if (
      data.numberOfTokens >= cawsToUse.length &&
      cawsToUse.length > 0
    ) {
      setLimit(cawsToUse.length);
      setFinalCaws(cawsToUse);
    } else if (cawsToUse.length === 0) {
      setLimit(0);
      setFinalCaws([]);
    } else if (data.numberOfTokens <= cawsToUse.length) {
      setLimit(data.numberOfTokens);
      setFinalCaws(cawsToUse.slice(0, data.numberOfTokens));
    }
  };

  const getTimepieceNftMinted = async () => {
    const result = await window.caws_timepiece.calculateTimepieceBalance(
      coinbase
    );
    setTotalTimepieceCreated(result);
    let metadataArray = [];
    if (result && result > 0) {
      for (let index = 0; index < result; index++) {
        const tokenId =
          +(await window.caws_timepiece.getCawsTimepieceTokenByIndex(
            coinbase,
            index
          ));

        metadataArray.push({
          name: `CAWS Timepiece #${tokenId}`,
          image: `https://timepiece.worldofdypians.com/thumbs150/${tokenId}.png`,
        });
      }
      settimepieceMetadata(metadataArray);
    } else {
      settimepieceMetadata(metadataArray);
      setTotalTimepieceCreated(0);
    }
  };

  const handleTimepieceMint = async (data) => {
    if (isConnected) {
      try {
        //Check Whitelist
        let whitelist = 1;

        if (parseInt(whitelist) === 1) {
          setmintloading("mint");
          setmintStatus("Minting in progress...");
          settextColor("rgb(123, 216, 176)");
          // console.log(data,finalCaws, totalCawsDiscount);
          let tokenId = await window.caws_timepiece
            .claimTimepiece(finalCaws)
            .then(() => {
              setmintStatus("Success! Your Nft was minted successfully!");
              setmintloading("success");
              settextColor("rgb(123, 216, 176)");
              setTimeout(() => {
                setmintStatus("");
                setmintloading("initial");
              }, 5000);
              checkCawsToUse();
            })
            .catch((e) => {
              console.error(e);
              setmintloading("error");
              settextColor("#d87b7b");

              if (typeof e == "object" && e.message) {
                setmintStatus(e.message);
              } else {
                setmintStatus(
                  "Oops, something went wrong! Refresh the page and try again!"
                );
              }
              setTimeout(() => {
                setmintloading("initial");
                setmintStatus("");
              }, 5000);
            });

          if (tokenId) {
            let getNftData = await window.getNft(tokenId);
            setMyNFTsCreated(getNftData);
          }
        } else {
          // setShowWhitelistLoadingModal(true);
        }
      } catch (e) {
        setmintloading("error");

        if (typeof e == "object" && e.message) {
          setmintStatus(e.message);
        } else {
          setmintStatus(
            "Oops, something went wrong! Refresh the page and try again!"
          );
        }
        window.alertify.error(
          typeof e == "object" && e.message
            ? e.message
            : typeof e == "string"
            ? String(e)
            : "Oops, something went wrong! Refresh the page and try again!"
        );
        setTimeout(() => {
          setmintloading("initial");
          setmintStatus("");
        }, 5000);
      }
    } else {
      try {
        handleConnectWallet();
      } catch (e) {
        window.alertify.error("No web3 detected! Please Install MetaMask!");
      }
    }
  };

  const handleConfluxNftMint = async () => {
    if (isConnected && coinbase) {
      try {
        //Check Whitelist
        let whitelist = 1;

        if (parseInt(whitelist) === 1) {
          setmintloading("mint");
          setmintStatus("Minting in progress...");
          settextColor("rgb(123, 216, 176)");
          // console.log(data,finalCaws, totalCawsDiscount);
          let tokenId = await window.conflux_nft
            .mintConfluxNFT()
            .then(() => {
              setmintStatus("Success! Your Nft was minted successfully!");
              setmintloading("success");
              settextColor("rgb(123, 216, 176)");
              setTimeout(() => {
                setmintStatus("");
                setmintloading("initial");
              }, 5000);
              getMyNFTS(coinbase, "conflux").then((NFTS) => {
                setmyConfluxNFTsCreated(NFTS);
                setTotalConfluxNft(NFTS.length);
                setconfluxMintAllowed(0);
              });
            })
            .catch((e) => {
              console.error(e);
              setmintloading("error");
              settextColor("#d87b7b");

              if (typeof e == "object" && e.message) {
                setmintStatus(e.message);
              } else {
                setmintStatus(
                  "Oops, something went wrong! Refresh the page and try again!"
                );
              }
              setTimeout(() => {
                setmintloading("initial");
                setmintStatus("");
              }, 5000);
            });
        } else {
          // setShowWhitelistLoadingModal(true);
        }
      } catch (e) {
        setmintloading("error");

        if (typeof e == "object" && e.message) {
          setmintStatus(e.message);
        } else {
          setmintStatus(
            "Oops, something went wrong! Refresh the page and try again!"
          );
        }
        window.alertify.error(
          typeof e == "object" && e.message
            ? e.message
            : typeof e == "string"
            ? String(e)
            : "Oops, something went wrong! Refresh the page and try again!"
        );
        setTimeout(() => {
          setmintloading("initial");
          setmintStatus("");
        }, 5000);
      }
    }
  };

  const handleBaseNftMint = async () => {
    if (isConnected && coinbase) {
      try {
        //Check Whitelist
        let whitelist = 1;

        if (parseInt(whitelist) === 1) {
          setmintloading("mint");
          setmintStatus("Minting in progress...");
          settextColor("rgb(123, 216, 176)");
          // console.log(data,finalCaws, totalCawsDiscount);
          let tokenId = await window.skale_nft
            .mintSkaleNFT()
            .then(() => {
              setmintStatus("Success! Your Nft was minted successfully!");
              setmintloading("success");
              settextColor("rgb(123, 216, 176)");
              setTimeout(() => {
                setmintStatus("");
                setmintloading("initial");
              }, 5000);
              getMyNFTS(coinbase, "skale").then((NFTS) => {
                setmyskaleNFTsCreated(NFTS);
                settotalSkaleNft(NFTS.length);
                setSkaleMintAllowed(0);
              });
            })
            .catch((e) => {
              console.error(e);
              setmintloading("error");
              settextColor("#d87b7b");

              if (typeof e == "object" && e.message) {
                setmintStatus(e.message);
              } else {
                setmintStatus(
                  "Oops, something went wrong! Refresh the page and try again!"
                );
              }
              setTimeout(() => {
                setmintloading("initial");
                setmintStatus("");
              }, 5000);
            });
        } else {
          // setShowWhitelistLoadingModal(true);
        }
      } catch (e) {
        setmintloading("error");

        if (typeof e == "object" && e.message) {
          setmintStatus(e.message);
        } else {
          setmintStatus(
            "Oops, something went wrong! Refresh the page and try again!"
          );
        }
        window.alertify.error(
          typeof e == "object" && e.message
            ? e.message
            : typeof e == "string"
            ? String(e)
            : "Oops, something went wrong! Refresh the page and try again!"
        );
        setTimeout(() => {
          setmintloading("initial");
          setmintStatus("");
        }, 5000);
      }
    }
  };

  useEffect(() => {
    if (
      data &&
      data.getPlayer &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress &&
      isConnected &&
      coinbase &&
      coinbase.toLowerCase() ===
        data.getPlayer.wallet.publicAddress.toLowerCase()
    ) {
      refreshSubscription(data.getPlayer.wallet.publicAddress);
    } else if (
      data &&
      data.getPlayer &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress &&
      isConnected &&
      coinbase &&
      coinbase.toLowerCase() !==
        data.getPlayer.wallet.publicAddress.toLowerCase()
    ) {
      refreshSubscription(data.getPlayer.wallet.publicAddress);
    } else if (coinbase && isConnected && !data) {
      refreshSubscription(coinbase);
    } else if (
      data &&
      data.getPlayer &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress &&
      !isConnected
    ) {
      refreshSubscription(data.getPlayer.wallet.publicAddress);
    }
  }, [data, coinbase, isConnected, count55]);

  const handleCoreNftMint = async () => {
    if (isConnected && coinbase) {
      try {
        //Check Whitelist
        let whitelist = 1;

        if (parseInt(whitelist) === 1) {
          setmintloading("mint");
          setmintStatus("Minting in progress...");
          settextColor("rgb(123, 216, 176)");
          // console.log(data,finalCaws, totalCawsDiscount);
          let tokenId = await window.core_nft
            .mintCoreNFT()
            .then(() => {
              setmintStatus("Success! Your Nft was minted successfully!");
              setmintloading("success");
              settextColor("rgb(123, 216, 176)");
              setTimeout(() => {
                setmintStatus("");
                setmintloading("initial");
              }, 5000);
              getMyNFTS(coinbase, "core").then((NFTS) => {
                setmycoreNFTsCreated(NFTS);
                settotalCoreNft(NFTS.length);
                setcoreMintAllowed(0);
              });
            })
            .catch((e) => {
              console.error(e);
              setmintloading("error");
              settextColor("#d87b7b");

              if (typeof e == "object" && e.message) {
                setmintStatus(e.message);
              } else {
                setmintStatus(
                  "Oops, something went wrong! Refresh the page and try again!"
                );
              }
              setTimeout(() => {
                setmintloading("initial");
                setmintStatus("");
              }, 5000);
            });
        } else {
          // setShowWhitelistLoadingModal(true);
        }
      } catch (e) {
        setmintloading("error");

        if (typeof e == "object" && e.message) {
          setmintStatus(e.message);
        } else {
          setmintStatus(
            "Oops, something went wrong! Refresh the page and try again!"
          );
        }
        window.alertify.error(
          typeof e == "object" && e.message
            ? e.message
            : typeof e == "string"
            ? String(e)
            : "Oops, something went wrong! Refresh the page and try again!"
        );
        setTimeout(() => {
          setmintloading("initial");
          setmintStatus("");
        }, 5000);
      }
    }
  };

  const handleSecondTask = async (wallet) => {
    const result2 = await axios
      .get(`https://api.worldofdypians.com/api/olympiad/task2/${wallet}`)
      .catch((err) => {
        console.error(err);
      });

    if (result2 && result2.status === 200) {
      console.log(result2);
    }
  };

  const handleBnbNftMint = async () => {
    if (isConnected && coinbase) {
      try {
        //Check Whitelist
        let whitelist = 1;

        if (parseInt(whitelist) === 1) {
          setmintloading("mint");
          setmintStatus("Minting in progress...");
          settextColor("rgb(123, 216, 176)");
          // console.log(data,finalCaws, totalCawsDiscount);
          let tokenId = await window.bnb_nft
            .mintBNBNFT()
            .then(() => {
              setmintStatus("Success! Your Nft was minted successfully!");
              setmintloading("success");
              settextColor("rgb(123, 216, 176)");
              setTimeout(() => {
                setmintStatus("");
                setmintloading("initial");
              }, 5000);
              getMyNFTS(coinbase, "bnb").then((NFTS) => {
                setMyBnbNFTsCreated(NFTS);
                setTotalBnbNft(NFTS.length);
                setBnbMintAllowed(0);
              });
            })
            .catch((e) => {
              console.error(e);
              setmintloading("error");
              settextColor("#d87b7b");

              if (typeof e == "object" && e.message) {
                setmintStatus(e.message);
              } else {
                setmintStatus(
                  "Oops, something went wrong! Refresh the page and try again!"
                );
              }
              setTimeout(() => {
                setmintloading("initial");
                setmintStatus("");
              }, 5000);
            });
        } else {
          // setShowWhitelistLoadingModal(true);
        }
      } catch (e) {
        setmintloading("error");

        if (typeof e == "object" && e.message) {
          setmintStatus(e.message);
        } else {
          setmintStatus(
            "Oops, something went wrong! Refresh the page and try again!"
          );
        }
        window.alertify.error(
          typeof e == "object" && e.message
            ? e.message
            : typeof e == "string"
            ? String(e)
            : "Oops, something went wrong! Refresh the page and try again!"
        );
        setTimeout(() => {
          setmintloading("initial");
          setmintStatus("");
        }, 5000);
      }
    }
  };

  const handleOpbnbNftMint = async () => {
    if (isConnected && coinbase) {
      try {
        //Check Whitelist
        let whitelist = 1;

        if (parseInt(whitelist) === 1) {
          setmintloading("mint");
          setmintStatus("Minting in progress...");
          settextColor("rgb(123, 216, 176)");
          // console.log(data,finalCaws, totalCawsDiscount);
          let tokenId = await window.opbnb_nft
            .mintOPBNBNFT()
            .then(() => {
              setTimeout(() => {
                handleSecondTask(coinbase);
              }, 5000);
              setmintStatus("Success! Your Nft was minted successfully!");
              setmintloading("success");
              settextColor("rgb(123, 216, 176)");
              setTimeout(() => {
                setmintStatus("");
                setmintloading("initial");
              }, 5000);
              getMyNFTS(coinbase, "opbnb").then((NFTS) => {
                settotalopbnbNft(NFTS.length);
                setmyOpbnbNfts(NFTS);
                setopbnbMintAllowed(0);
                setmyopbnbNFTsCreated(NFTS);
              });
            })
            .catch((e) => {
              console.error(e);
              setmintloading("error");
              settextColor("#d87b7b");

              if (typeof e == "object" && e.message) {
                setmintStatus(e.message);
              } else {
                setmintStatus(
                  "Oops, something went wrong! Refresh the page and try again!"
                );
              }
              setTimeout(() => {
                setmintloading("initial");
                setmintStatus("");
              }, 5000);
            });
        } else {
          // setShowWhitelistLoadingModal(true);
        }
      } catch (e) {
        setmintloading("error");

        if (typeof e == "object" && e.message) {
          setmintStatus(e.message);
        } else {
          setmintStatus(
            "Oops, something went wrong! Refresh the page and try again!"
          );
        }
        window.alertify.error(
          typeof e == "object" && e.message
            ? e.message
            : typeof e == "string"
            ? String(e)
            : "Oops, something went wrong! Refresh the page and try again!"
        );
        setTimeout(() => {
          setmintloading("initial");
          setmintStatus("");
        }, 5000);
      }
    }
  };
  const handleMantaNftMint = async () => {
    if (isConnected && coinbase) {
      try {
        //Check Whitelist
        let whitelist = 1;

        if (parseInt(whitelist) === 1) {
          setmintloading("mint");
          setmintStatus("Minting in progress...");
          settextColor("rgb(123, 216, 176)");
          // console.log(data,finalCaws, totalCawsDiscount);
          let tokenId = await window.manta_nft
            .mintMantaNFT()
            .then(() => {
              setmintStatus("Success! Your Nft was minted successfully!");
              setmintloading("success");
              settextColor("rgb(123, 216, 176)");
              setTimeout(() => {
                setmintStatus("");
                setmintloading("initial");
              }, 5000);
              getMyNFTS(coinbase, "manta").then((NFTS) => {
                setTotalMantaNft(NFTS.length);
                setMyMantaNfts(NFTS);
                setMantaMintAllowed(NFTS.length > 0 ? 0 : 1);
                setMyMantaNFTsCreated(NFTS);
              });
            })
            .catch((e) => {
              console.error(e);
              setmintloading("error");
              settextColor("#d87b7b");

              if (typeof e == "object" && e.message) {
                setmintStatus(e.message);
              } else {
                setmintStatus(
                  "Oops, something went wrong! Refresh the page and try again!"
                );
              }
              setTimeout(() => {
                setmintloading("initial");
                setmintStatus("");
              }, 5000);
            });
        } else {
          // setShowWhitelistLoadingModal(true);
        }
      } catch (e) {
        setmintloading("error");

        if (typeof e == "object" && e.message) {
          setmintStatus(e.message);
        } else {
          setmintStatus(
            "Oops, something went wrong! Refresh the page and try again!"
          );
        }
        window.alertify.error(
          typeof e == "object" && e.message
            ? e.message
            : typeof e == "string"
            ? String(e)
            : "Oops, something went wrong! Refresh the page and try again!"
        );
        setTimeout(() => {
          setmintloading("initial");
          setmintStatus("");
        }, 5000);
      }
    }
  };

  const handleVictionNftMint = async () => {
    if (isConnected && coinbase) {
      try {
        //Check Whitelist
        let whitelist = 1;

        if (parseInt(whitelist) === 1) {
          setmintloading("mint");
          setmintStatus("Minting in progress...");
          settextColor("rgb(123, 216, 176)");
          // console.log(data,finalCaws, totalCawsDiscount);
          let tokenId = await window.viction_nft
            .mintVictionNFT()
            .then(() => {
              setmintStatus("Success! Your Nft was minted successfully!");
              setmintloading("success");
              settextColor("rgb(123, 216, 176)");
              setTimeout(() => {
                setmintStatus("");
                setmintloading("initial");
              }, 5000);
              getMyNFTS(coinbase, "viction").then((NFTS) => {
                setmyVictionNFTsCreated(NFTS);
                settotalVictionNft(NFTS.length);
                setvictionMintAllowed(0);
                setMyVictionNfts(NFTS);
              });
            })
            .catch((e) => {
              console.error(e);
              setmintloading("error");
              settextColor("#d87b7b");

              if (typeof e == "object" && e.message) {
                setmintStatus(e.message);
              } else {
                setmintStatus(
                  "Oops, something went wrong! Refresh the page and try again!"
                );
              }
              setTimeout(() => {
                setmintloading("initial");
                setmintStatus("");
              }, 5000);
            });
        } else {
          // setShowWhitelistLoadingModal(true);
        }
      } catch (e) {
        setmintloading("error");

        if (typeof e == "object" && e.message) {
          setmintStatus(e.message);
        } else {
          setmintStatus(
            "Oops, something went wrong! Refresh the page and try again!"
          );
        }
        window.alertify.error(
          typeof e == "object" && e.message
            ? e.message
            : typeof e == "string"
            ? String(e)
            : "Oops, something went wrong! Refresh the page and try again!"
        );
        setTimeout(() => {
          setmintloading("initial");
          setmintStatus("");
        }, 5000);
      }
    }
  };

  const handleImmutableNftMint = async () => {
    if (isConnected && coinbase) {
      try {
        //Check Whitelist
        let whitelist = 1;

        if (parseInt(whitelist) === 1) {
          setmintloading("mint");
          setmintStatus("Minting in progress...");
          settextColor("rgb(123, 216, 176)");

          const result = await axios
            .get(
              `https://api.worldofdypians.com/api/mint/immutable/${coinbase}`
            )
            .catch((e) => {
              console.error(e);
              setmintloading("error");
              settextColor("#d87b7b");
              setmintStatus(e);

              setTimeout(() => {
                setmintloading("initial");
                setmintStatus("");
              }, 5000);
            });

          if (result && result.status === 200) {
            console.log(result.data.data.tokenIDMinted);
            setmintStatus("Success! Your Nft was minted successfully!");
            setmintloading("success");
            settextColor("rgb(123, 216, 176)");
            setTimeout(() => {
              setmintStatus("");
              setmintloading("initial");
            }, 5000);

            setmyImmutableNFTsCreated(result.data.data.tokenIDMinted);
            setTotalImmutableNft(1);
            setImmutableMintAllowed(0);
            setMyImmutableNfts(result.data.data.tokenIDMinted);
          }
          // console.log(data,finalCaws, totalCawsDiscount);
          // let tokenId = await window.immutable_nft
          //   .mintImmutableNFT()
          //   .then(() => {
          //     setmintStatus("Success! Your Nft was minted successfully!");
          //     setmintloading("success");
          //     settextColor("rgb(123, 216, 176)");
          //     setTimeout(() => {
          //       setmintStatus("");
          //       setmintloading("initial");
          //     }, 5000);
          //     getMyNFTS(coinbase, "immutable").then((NFTS) => {
          //       setmyImmutableNFTsCreated(NFTS);
          //       setTotalImmutableNft(NFTS.length);
          //       setImmutableMintAllowed(0);
          //       setMyImmutableNfts(NFTS);
          //     });
          //   })
          //   .catch((e) => {
          //     console.error(e);
          //     setmintloading("error");
          //     settextColor("#d87b7b");

          //     if (typeof e == "object" && e.message) {
          //       setmintStatus(e.message);
          //     } else {
          //       setmintStatus(
          //         "Oops, something went wrong! Refresh the page and try again!"
          //       );
          //     }
          //     setTimeout(() => {
          //       setmintloading("initial");
          //       setmintStatus("");
          //     }, 5000);
          //   });
        } else {
          // setShowWhitelistLoadingModal(true);
        }
      } catch (e) {
        setmintloading("error");

        if (typeof e == "object" && e.message) {
          setmintStatus(e.message);
        } else {
          setmintStatus(
            "Oops, something went wrong! Refresh the page and try again!"
          );
        }
        window.alertify.error(
          typeof e == "object" && e.message
            ? e.message
            : typeof e == "string"
            ? String(e)
            : "Oops, something went wrong! Refresh the page and try again!"
        );
        setTimeout(() => {
          setmintloading("initial");
          setmintStatus("");
        }, 5000);
      }
    }
  };

  const getBoughtNFTS = async () => {
    let boughtItems = [];
    let finalboughtItems = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/worldofdypians-marketplace/version/latest";

    const itemBoughtQuery = `
        {
            itemBoughts {
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

    // console.log("finalboughtItems", finalboughtItems);

    return finalboughtItems;
  };

  const getLatest20BoughtNFTS = async () => {
    let boughtItems = [];
    let finalboughtItems = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/worldofdypians-marketplace/version/latest";

    const itemBoughtQuery = `
        {
            itemBoughts(first: 20, orderBy: blockTimestamp, orderDirection: desc) {
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
    setLatest20BoughtNFTS(finalboughtItems);
  };

  const handleRefreshList = () => {
    setNftCount(nftCount + 1);
  };
  const getTop20BoughtByPriceAndPriceTypeNFTS = async (type) => {
    let boughtItems = [];
    let finalboughtItems = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/worldofdypians-marketplace/version/latest";

    const itemBoughtQuery = `
      {
          itemBoughts(first: 20, orderBy: price, orderDirection: desc, where: {payment_priceType: ${type}}) {
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
    // console.log("boughtItems2", finalboughtItems);

    return finalboughtItems;
  };

  const getListedNfts2 = async () => {
    getListedNFTS(0)
      .then((data) => {
        setListedNFTS2(data);
        setCount33(count33 + 1);
      })
      .catch((e) => {
        console.log(e);
      });

    getListedNFTS(0, "", "recentListedNFTS")
      .then((data) => {
        setrecentListedNFTS2(data);
        setCount44(count44 + 1);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getOtherNfts = async () => {
    let finalboughtItems1 = [];
    let finalboughtItems2 = [];

    if (listedNFTS2 && listedNFTS2.length > 0) {
      await Promise.all(
        listedNFTS2.map(async (nft) => {
          if (nft.nftAddress === window.config.nft_caws_address) {
            const nft_contract = new window.infuraWeb3.eth.Contract(
              window.CAWS_ABI,
              window.config.nft_caws_address
            );
            const nftowner = await nft_contract.methods
              .ownerOf(nft.tokenId)
              .call()
              .catch((e) => {
                console.log(e);
              });
            if (
              nftowner &&
              nftowner.toLowerCase() === nft.seller.toLowerCase()
            ) {
              nft.type = "caws";
              nft.chain = 1;
              finalboughtItems1.push(nft);
            }
          } else if (nft.nftAddress === window.config.nft_land_address) {
            const nft_contract = new window.infuraWeb3.eth.Contract(
              window.WOD_ABI,
              window.config.nft_land_address
            );
            const nftowner = await nft_contract.methods
              .ownerOf(nft.tokenId)
              .call()
              .catch((e) => {
                console.log(e);
              });
            if (
              nftowner &&
              nftowner.toLowerCase() === nft.seller.toLowerCase()
            ) {
              nft.type = "land";
              nft.chain = 1;
              finalboughtItems1.push(nft);
            }
          } else if (
            nft.nftAddress.toLowerCase() ===
            window.config.nft_timepiece_address.toLowerCase()
          ) {
            const nft_contract = new window.infuraWeb3.eth.Contract(
              window.TIMEPIECE_ABI,
              window.config.nft_timepiece_address
            );
            const nftowner = await nft_contract.methods
              .ownerOf(nft.tokenId)
              .call()
              .catch((e) => {
                console.log(e);
                return "";
              });

            if (
              nftowner &&
              nftowner.toLowerCase() === nft.seller.toLowerCase()
            ) {
              nft.type = "timepiece";
              nft.chain = 1;
              finalboughtItems1.push(nft);
            }
          }
        })
      );

      setListedNFTS(finalboughtItems1);
      setListedNFTSCount(finalboughtItems1.length);
    }

    if (recentListedNFTS2 && recentListedNFTS2.length > 0) {
      await Promise.all(
        recentListedNFTS2.map(async (nft) => {
          if (nft.nftAddress === window.config.nft_caws_address) {
            const nft_contract = new window.infuraWeb3.eth.Contract(
              window.CAWS_ABI,
              window.config.nft_caws_address
            );
            const nftowner = await nft_contract.methods
              .ownerOf(nft.tokenId)
              .call()
              .catch((e) => {
                console.log(e);
              });
            if (
              nftowner &&
              nftowner.toLowerCase() === nft.seller.toLowerCase()
            ) {
              nft.type = "caws";
              nft.chain = 1;
              finalboughtItems2.push(nft);
            }
          } else if (nft.nftAddress === window.config.nft_land_address) {
            const nft_contract = new window.infuraWeb3.eth.Contract(
              window.WOD_ABI,
              window.config.nft_land_address
            );

            const nftowner = await nft_contract.methods
              .ownerOf(nft.tokenId)
              .call()
              .catch((e) => {
                console.log(e);
              });
            if (
              nftowner &&
              nftowner.toLowerCase() === nft.seller.toLowerCase()
            ) {
              nft.type = "land";
              nft.chain = 1;
              finalboughtItems2.push(nft);
            }
          } else if (nft.nftAddress === window.config.nft_timepiece_address) {
            const nft_contract = new window.infuraWeb3.eth.Contract(
              window.TIMEPIECE_ABI,
              window.config.nft_timepiece_address
            );
            const nftowner = await nft_contract.methods
              .ownerOf(nft.tokenId)
              .call()
              .catch((e) => {
                console.log(e);
              });

            if (
              nftowner &&
              nftowner.toLowerCase() === nft.seller.toLowerCase()
            ) {
              nft.type = "timepiece";
              nft.chain = 1;
              finalboughtItems2.push(nft);
            }
          }
        })
      );

      setLatest20RecentListedNFTS(finalboughtItems2);
    }
  };

  Amplify.configure(awsExports);

  function UnAuthenticatedContent() {
    setFireAppContent(false);

    return (
      <React.Fragment>
        <Navigate to="/account" />
      </React.Fragment>
    );
  }

  const AppContent = () => {
    const { isLoading, isAuthenticated, playerId } = useAuth();

    useEffect(() => {
      if (!isLoading || !isAuthenticated || !playerId) {
        setFireAppContent(false);
      }
    }, [isLoading, isAuthenticated, playerId]);

    if (isLoading) {
      return <LandingScreen />;
    }

    if (isAuthenticated) {
      if (!playerId) {
        return (
          <React.Fragment>
            <Navigate to="/player" />
          </React.Fragment>
        );
      }

      return (
        <React.Fragment>
          <Navigate to="/account" />
        </React.Fragment>
      );
    }

    return <UnAuthenticatedContent />;
  };

  const { ethereum } = window;

  ethereum?.on("chainChanged", handleRefreshList);
  ethereum?.on("accountsChanged", handleRefreshList);
  ethereum?.on("accountsChanged", checkConnection2);
  // ethereum?.on("accountsChanged", fetchAllMyNfts);

  useEffect(() => {
    if (ethereum && !window.gatewallet) {
      ethereum.on("chainChanged", checkNetworkId);
    }
    if (window.gatewallet) {
      window.gatewallet.on("changed", checkNetworkId);
    }
  }, [ethereum, nftCount]);

  const logout = localStorage.getItem("logout");

  useEffect(() => {
    if (
      !window.coin98 &&
      window.ethereum &&
      window.ethereum.isConnected() === true &&
      !window.gatewallet
    ) {
      if (
        logout === "false" ||
        window.coinbase_address === "0x0000000000000000000000000000000000000000"
      ) {
        checkConnection2();
      } else {
        setIsConnected(false);
        setCoinbase();
        localStorage.setItem("logout", "true");
      }
    } else if (
      logout === "false" ||
      window.coinbase_address ===
        "0x0000000000000000000000000000000000000000" ||
      window.coin98
    ) {
      checkConnection2();
    } else if (window.gatewallet && isActive) {
      setIsConnected(isActive);
      if (account) {
        fetchAvatar(account);
        setCoinbase(account);
      }
    } else {
      setIsConnected(false);
      setCoinbase();
      localStorage.setItem("logout", "true");
    }
    checkNetworkId();
  }, [coinbase, chainId, isActive, account]);

  useEffect(() => {
    checkNetworkId();
  }, [isConnected, coinbase, chainId]);

  useEffect(() => {
    if (isConnected === true && coinbase && chainId === 1) {
      myCAWStakes();
      myLandStakes();
      getmyCawsWodStakes();
      myNft2();
      myLandNft();
    }
    if (isConnected === true && coinbase) {
      myNft();
      myCAWNft();
    }
    fetchAllMyNfts();
  }, [isConnected, chainId, currencyAmount, coinbase]);

  useEffect(() => {
    if (isConnected === true && coinbase && chainId === 1) {
      myNft2();
      myLandNft();
    } else if (isConnected === true && coinbase && chainId === 56) {
      myNftBNB();
      myLandNftBNB();
    } else if (isConnected === true && coinbase && chainId === 43114) {
      myNft2Avax();
      myLandNftAVAX();
    } else if (isConnected === true && coinbase && chainId === 8453) {
      myNftsBase();
      myLandNftsBase();
    }
  }, [isConnected, chainId, coinbase, count]);

  // useEffect(() => {
  //   if (
  //     MyNFTSCaws.length > 0 ||
  //     MyNFTSTimepiece.length > 0 ||
  //     MyNFTSLand.length > 0
  //   ) {
  //     getmyCollectedNfts();
  //   }
  // }, [MyNFTSCaws?.length, MyNFTSTimepiece?.length, MyNFTSLand?.length]);

  useEffect(() => {
    if (isConnected === true && coinbase && chainId === 1) {
      checkCawsToUse();
      getTimepieceNftMinted();
    }
  }, [
    myCAWNFTs.length,
    myCAWstakes.length,
    myCawsWodStakesAll.length,
    allCawsForTimepieceMint.length,
    isConnected,
    chainId,
    coinbase,
  ]);

  const handleShowWalletModal = () => {
    setwalletModal(true);
  };

  const getallNfts = async () => {
    getBoughtNFTS().then((NFTS) => {
      setTotalBoughtNFTSCount(NFTS.length);

      let totalBoughtNFTSinETH = 0;

      let totalBoughtNFTSinDYP = 0;

      for (let i = 0; i < NFTS.length; i++) {
        if (NFTS[i].payment_priceType === 0) {
          totalBoughtNFTSinETH += parseFloat(NFTS[i].price);
        } else {
          totalBoughtNFTSinETH += parseFloat(NFTS[i].price);
        }
      }

      setTotalBoughtNFTSinETH(totalBoughtNFTSinETH);

      setTotalBoughtNFTSinDYP(totalBoughtNFTSinDYP);
    });
  };

  async function fetchUserFavorites(userId) {
    if (userId !== undefined && userId !== null) {
      try {
        const response = await fetch(
          `https://api.worldofdypians.com/user-favorites/${userId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching user favorites");
        }
        const data = await response.json();
        // console.log(data.favorites);

        setFavorites(data.favorites);
        return data.favorites;
      } catch (error) {
        console.error("Error fetching user favorites:", error);
        throw error;
      }
    }
  }

  const getCawsSold = async () => {
    const allSold = latest20BoughtNFTS;

    if (allSold && allSold.length > 0) {
      let cawsFilter = allSold.filter(
        (item) => item.nftAddress === window.config.nft_caws_address
      );
      let uniqueCaws = cawsFilter.filter(
        (v, i, a) => a.findIndex((v2) => v2.tokenId === v.tokenId) === i
      );

      let wodFilter = allSold.filter(
        (item) => item.nftAddress === window.config.nft_land_address
      );
      let uniqueWod = wodFilter.filter(
        (v, i, a) => a.findIndex((v2) => v2.tokenId === v.tokenId) === i
      );

      let timepieceFilter = allSold.filter(
        (item) => item.nftAddress === window.config.nft_timepiece_address
      );

      let uniqueTimepiece = timepieceFilter.filter(
        (v, i, a) => a.findIndex((v2) => v2.tokenId === v.tokenId) === i
      );

      setCawsBought(uniqueCaws);
      setLandBought(uniqueWod);
      setTimepieceBought(uniqueTimepiece);
    }
  };

  const refreshSubscription = async (addr) => {
    const daily_bonus_contract = new window.opBnbWeb3.eth.Contract(
      window.DAILY_BONUS_ABI,
      window.config.daily_bonus_address
    );

    const daily_bonus_contract_bnb = new window.bscWeb3.eth.Contract(
      window.DAILY_BONUS_BNB_ABI,
      window.config.daily_bonus_bnb_address
    );

    const daily_bonus_contract_skale = new window.skaleWeb3.eth.Contract(
      window.DAILY_BONUS_SKALE_ABI,
      window.config.daily_bonus_skale_address
    );

    const daily_bonus_contract_core = new window.coreWeb3.eth.Contract(
      window.DAILY_BONUS_CORE_ABI,
      window.config.daily_bonus_core_address
    );

    const daily_bonus_contract_viction = new window.victionWeb3.eth.Contract(
      window.DAILY_BONUS_VICTION_ABI,
      window.config.daily_bonus_viction_address
    );

    const daily_bonus_contract_manta = new window.mantaWeb3.eth.Contract(
      window.DAILY_BONUS_MANTA_ABI,
      window.config.daily_bonus_manta_address
    );

    if (addr) {
      const isPremium_bnb = await daily_bonus_contract_bnb.methods
        .isPremiumUser(addr)
        .call()
        .catch((e) => {
          console.error(e);
          return false;
        });
      if (isPremium_bnb === true) {
        setIsPremium(true);
      } else {
        const isPremium_opbnb = await daily_bonus_contract.methods
          .isPremiumUser(addr)
          .call()
          .catch((e) => {
            console.error(e);
            return false;
          });
        if (isPremium_opbnb === true) {
          setIsPremium(true);
        } else {
          const isPremium_core = await daily_bonus_contract_core.methods
            .isPremiumUser(addr)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });
          if (isPremium_core === true) {
            setIsPremium(true);
          } else {
            const isPremium_viction = await daily_bonus_contract_viction.methods
              .isPremiumUser(addr)
              .call()
              .catch((e) => {
                console.error(e);
                return false;
              });
            if (isPremium_viction === true) {
              setIsPremium(true);
            } else {
              const isPremium_skale = await daily_bonus_contract_skale.methods
                .isPremiumUser(addr)
                .call()
                .catch((e) => {
                  console.error(e);
                  return false;
                });
              if (isPremium_skale === true) {
                setIsPremium(true);
              } else {
                const isPremium_manta = await daily_bonus_contract_manta.methods
                .isPremiumUser(addr)
                .call()
                .catch((e) => {
                  console.error(e);
                  return false;
                });
              if (isPremium_manta === true) {
                setIsPremium(true);
              } else {
               setIsPremium(false);
              }
            
              }
            }
          }
        }
      }
    } else {
      setIsPremium(false);
    }
  };

  // const refreshSubscription = async (addr) => {
  //   let subscribedPlatformTokenAmountETH;
  //   let subscribedPlatformTokenAmountCfx;
  //   let subscribedPlatformTokenAmountBNB;
  //   let subscribedPlatformTokenAmountBNB2;
  //   let subscribedPlatformTokenAmountBNB1;

  //   let subscribedPlatformTokenAmountAvax;
  //   let subscribedPlatformTokenAmountBase;
  //   let subscribedPlatformTokenAmountSkale;
  //   let subscribedPlatformTokenAmountCore;
  //   let subscribedPlatformTokenAmountViction;
  //   let subscribedPlatformTokenAmountSei;

  //   const web3eth = window.infuraWeb3;
  //   const web3cfx = window.confluxWeb3;
  //   const web3base = window.baseWeb3;
  //   const web3bnb = window.bscWeb3;
  //   const web3avax = window.avaxWeb3;
  //   const web3skale = window.skaleWeb3;
  //   const web3core = window.coreWeb3;
  //   const web3viction = window.victionWeb3;
  //   const web3sei = window.seiWeb3;

  //   const CfxABI = window.SUBSCRIPTION_CFX_ABI;
  //   const BaseABI = window.SUBSCRIPTION_BASE_ABI;
  //   const EthABI = window.SUBSCRIPTION_NEWETH_ABI;
  //   const AvaxABI = window.SUBSCRIPTION_NEWAVAX_ABI;
  //   const BnbABI = window.SUBSCRIPTION_NEWBNB_ABI;
  //   const Bnb2ABI = window.SUBSCRIPTION_NEWBNB2_ABI;

  //   const SkaleABI = window.SUBSCRIPTION_SKALE_ABI;
  //   const CoreABI = window.SUBSCRIPTION_CORE_ABI;
  //   const VicitonABI = window.SUBSCRIPTION_VICTION_ABI;
  //   const SeiABI = window.SUBSCRIPTION_SKALE_ABI;

  //   const ethsubscribeAddress = window.config.subscription_neweth_address;
  //   const cfxsubscribeAddress = window.config.subscription_cfx_address;
  //   const basesubscribeAddress = window.config.subscription_base_address;
  //   const bnbsubscribeAddress = window.config.subscription_newbnb_address;
  //   const bnbsubscribeAddress2 = window.config.subscription_newbnb2_address;
  //   const bnbsubscribeAddress1 = window.config.subscription_newbnb1_address;

  //   const avaxsubscribeAddress = window.config.subscription_newavax_address;
  //   const skalesubscribeAddress = window.config.subscription_skale_address;
  //   const coresubscribeAddress = window.config.subscription_core_address;
  //   const victionsubscribeAddress = window.config.subscription_viction_address;
  //   const seisubscribeAddress = window.config.subscription_sei_address;

  //   const ethcontract = new web3eth.eth.Contract(EthABI, ethsubscribeAddress);
  //   const cfxcontract = new web3cfx.eth.Contract(CfxABI, cfxsubscribeAddress);
  //   const skalecontract = new web3skale.eth.Contract(
  //     SkaleABI,
  //     skalesubscribeAddress
  //   );

  //   const basecontract = new web3base.eth.Contract(
  //     BaseABI,
  //     basesubscribeAddress
  //   );

  //   const bnbcontract = new web3bnb.eth.Contract(BnbABI, bnbsubscribeAddress);
  //   const bnbcontract2 = new web3bnb.eth.Contract(
  //     Bnb2ABI,
  //     bnbsubscribeAddress2
  //   );

  //   const bnbcontract1 = new web3bnb.eth.Contract(BnbABI, bnbsubscribeAddress1);

  //   const avaxcontract = new web3avax.eth.Contract(
  //     AvaxABI,
  //     avaxsubscribeAddress
  //   );

  //   const corecontract = new web3core.eth.Contract(
  //     CoreABI,
  //     coresubscribeAddress
  //   );

  //   const victioncontract = new web3viction.eth.Contract(
  //     VicitonABI,
  //     victionsubscribeAddress
  //   );

  //   const seicontract = new web3sei.eth.Contract(SeiABI, seisubscribeAddress);

  //   if (addr) {
  //     const result = window.checkPremium(addr);

  //     subscribedPlatformTokenAmountETH = await ethcontract.methods
  //       .subscriptionPlatformTokenAmount(addr)
  //       .call()
  //       .catch((e) => {
  //         console.log(e);
  //         return 0;
  //       });

  //     subscribedPlatformTokenAmountCfx = await cfxcontract.methods
  //       .subscriptionPlatformTokenAmount(addr)
  //       .call()
  //       .catch((e) => {
  //         console.log(e);
  //         return 0;
  //       });

  //     subscribedPlatformTokenAmountBase = await basecontract.methods
  //       .subscriptionPlatformTokenAmount(addr)
  //       .call()
  //       .catch((e) => {
  //         console.log(e);
  //         return 0;
  //       });

  //     subscribedPlatformTokenAmountBNB = await bnbcontract.methods
  //       .subscriptionPlatformTokenAmount(addr)
  //       .call()
  //       .catch((e) => {
  //         console.log(e);
  //         return 0;
  //       });

  //     subscribedPlatformTokenAmountBNB2 = await bnbcontract2.methods
  //       .subscriptionPlatformTokenAmount(addr)
  //       .call()
  //       .catch((e) => {
  //         console.log(e);
  //         return 0;
  //       });

  //     subscribedPlatformTokenAmountBNB1 = await bnbcontract1.methods
  //       .subscriptionPlatformTokenAmount(addr)
  //       .call()
  //       .catch((e) => {
  //         console.log(e);
  //         return 0;
  //       });

  //     subscribedPlatformTokenAmountAvax = await avaxcontract.methods
  //       .subscriptionPlatformTokenAmount(addr)
  //       .call()
  //       .catch((e) => {
  //         console.log(e);
  //         return 0;
  //       });

  //     subscribedPlatformTokenAmountSkale = await skalecontract.methods
  //       .subscriptionPlatformTokenAmount(addr)
  //       .call()
  //       .catch((e) => {
  //         console.log(e);
  //         return 0;
  //       });

  //     subscribedPlatformTokenAmountCore = await corecontract.methods
  //       .subscriptionPlatformTokenAmount(addr)
  //       .call()
  //       .catch((e) => {
  //         console.log(e);
  //         return 0;
  //       });

  //     subscribedPlatformTokenAmountViction = await victioncontract.methods
  //       .subscriptionPlatformTokenAmount(addr)
  //       .call()
  //       .catch((e) => {
  //         console.log(e);
  //         return 0;
  //       });

  //     // subscribedPlatformTokenAmountSei = await seicontract.methods
  //     //   .subscriptionPlatformTokenAmount(addr)
  //     //   .call()
  //     //   .catch((e) => {
  //     //     console.log(e);
  //     //     return 0;
  //     //   });

  //     if (
  //       subscribedPlatformTokenAmountCfx == "0" &&
  //       subscribedPlatformTokenAmountETH == "0" &&
  //       subscribedPlatformTokenAmountBase == "0" &&
  //       subscribedPlatformTokenAmountBNB == "0" &&
  //       subscribedPlatformTokenAmountBNB2 == "0" &&
  //       subscribedPlatformTokenAmountAvax == "0" &&
  //       subscribedPlatformTokenAmountSkale == "0" &&
  //       subscribedPlatformTokenAmountCore == "0" &&
  //       subscribedPlatformTokenAmountViction == "0" &&
  //       subscribedPlatformTokenAmountBNB1 == "0" &&
  //       result === false
  //     ) {
  //       setIsPremium(false);
  //     }
  //     if (
  //       subscribedPlatformTokenAmountCfx != "0" ||
  //       subscribedPlatformTokenAmountETH != "0" ||
  //       subscribedPlatformTokenAmountBase != "0" ||
  //       subscribedPlatformTokenAmountBNB != "0" ||
  //       subscribedPlatformTokenAmountBNB2 != "0" ||
  //       subscribedPlatformTokenAmountAvax != "0" ||
  //       subscribedPlatformTokenAmountSkale != "0" ||
  //       subscribedPlatformTokenAmountCore != "0" ||
  //       subscribedPlatformTokenAmountViction != "0" ||
  //       subscribedPlatformTokenAmountBNB1 != "0" ||
  //       result === true
  //     ) {
  //       setIsPremium(true);
  //     }
  //   }
  // };
  // const getmyCollectedNfts = async () => {
  //   let recievedOffers = [];

  //   if (MyNFTSTimepiece && MyNFTSTimepiece.length > 0) {
  //     await Promise.all(
  //       MyNFTSTimepiece.map(async (i) => {
  //         const result = await window
  //           .getAllOffers(window.config.nft_timepiece_address, i)
  //           .catch((e) => {
  //             console.error(e);
  //           });

  //         if (result && result.length > 0) {
  //           result.map((item) => {
  //             return recievedOffers.push({
  //               offer: item.offer,
  //               index: item.index,
  //               nftAddress: window.config.nft_timepiece_address,
  //               tokenId: i,
  //               type: "timepiece",
  //             });
  //           });
  //         }
  //       })
  //     );
  //   }

  //   if (MyNFTSLand && MyNFTSLand.length > 0) {
  //     await Promise.all(
  //       MyNFTSLand.map(async (i) => {
  //         const result = await window
  //           .getAllOffers(window.config.nft_land_address, i)
  //           .catch((e) => {
  //             console.error(e);
  //           });

  //         if (result && result.length > 0) {
  //           result.map((item) => {
  //             return recievedOffers.push({
  //               offer: item.offer,
  //               index: item.index,
  //               nftAddress: window.config.nft_land_address,
  //               tokenId: i,
  //               type: "land",
  //             });
  //           });
  //         }
  //       })
  //     );
  //   }

  //   if (MyNFTSCaws && MyNFTSCaws.length > 0) {
  //     await Promise.all(
  //       MyNFTSCaws.map(async (i) => {
  //         const result = await window
  //           .getAllOffers(window.config.nft_caws_address, i)
  //           .catch((e) => {
  //             console.error(e);
  //           });

  //         if (result && result.length > 0) {
  //           result.map((item) => {
  //             return recievedOffers.push({
  //               offer: item.offer,
  //               index: item.index,
  //               nftAddress: window.config.nft_caws_address,
  //               tokenId: i,
  //               type: "caws",
  //             });
  //           });
  //         }
  //       })
  //     );
  //   }
  //   setmyNftsOffer(recievedOffers);
  // };

  const handleSwitchNetwork = async (chain) => {
    if (!window.gatewallet) {
      setChainId(chain);
    } else {
      // const params = CHAINLIST[Number(chain)];
      // connector?.activate(params);
      setChainId(chain);
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId:
                chain === 1
                  ? "0x1"
                  : chain === 56
                  ? "0x38"
                  : chain === 204
                  ? "0xcc"
                  : chain === 1482601649
                  ? "0x585eb4b1"
                  : "0x406",
            },
          ],
        });
        // if (window.ethereum && window.gatewallet) {
        //   window.location.reload();
        // }
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        console.log(switchError, "switch");
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: CHAINLIST[Number(chain)],
            });
            // if (window.ethereum && window.gatewallet) {
            //   window.location.reload();
            // }
          } catch (addError) {
            console.log(addError);
          }
        }
        // handle other "switch" errors
      }
      // window.location.reload();
    }
  };

  const handleDisconnect = async () => {
    if (!window.gatewallet) {
      await window.disconnectWallet();
      localStorage.setItem("logout", "true");
      setSuccess(false);
      setCoinbase();
      setIsConnected(false);
      setIsPremium(false);
    } else {
      disconnect(connector);
      localStorage.setItem("logout", "true");
    }
  };

  const API_BASE_URL = "https://api.worldofdypians.com";

  async function addNewUserIfNotExists(
    walletAddress,
    title,
    description,
    redirect_link
  ) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/notifications/${window.infuraWeb3.utils.toChecksumAddress(
          walletAddress
        )}`
      );

      if (response.data.length === 0) {
        const newUserResponse = await axios.post(
          `${API_BASE_URL}/notifications/${window.infuraWeb3.utils.toChecksumAddress(
            walletAddress
          )}`,
          {
            tokenId: "",
            nftAddress: "",
            timestamp: Date.now(),
            read: false,
            offer: "no",
            offerAccepted: "no",
            buy: "no",
            event: "no",
            news: "no",
            welcome: "yes",
            update: "no",
            title: "Welcome",
            description:
              "Welcome to the immersive World of Dypians! Take a moment to step into our NFT marketplace, where a mesmerizing collection of digital art await your exploration. Happy browsing!",
            redirect_link: "",
          }
        );

        console.log("New user added:", newUserResponse.data);
        let lso = newUserResponse.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setmyNftsOffer(lso);
      } else {
        console.log("User already exists:", response.data);

        const notifications = response.data[0]?.notifications || [];
        let lso = notifications.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setmyNftsOffer(lso);
      }
    } catch (error) {
      console.error("Error adding new user:", error.message);
    }
  }

  const getDomains = async () => {
    if (coinbase) {
      const name = await web3Name.getDomainName({
        address: coinbase,
        queryChainIdList: [56],
      });

      if (name && name !== null) {
        setDomainName(name);
        const metadata = await web3Name.getMetadata({ name: name });
        setDomainMetaData(metadata);
      } else {
        setDomainMetaData(null);
        setDomainName(null);
      }
    }

    // console.log(name, "domain")
  };
  const fetchBscBalance = async () => {
    if (coinbase && chainId === 56 && window.ethereum) {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [coinbase, "latest"],
      });

      const bscWeb3 = new Web3(window.config.bsc_endpoint);
      const stringBalance = bscWeb3.utils.hexToNumberString(balance);

      const amount = bscWeb3.utils.fromWei(stringBalance, "ether");
      setBscAmount(amount.slice(0, 7));
    }
  };

  const handleSkaleRefill = async (address) => {
    const result = await axios
      .get(`https://api.worldofdypians.com/claim/${address}`)
      .catch((e) => {
        console.error(e);
      });

    console.log(result);
  };

  const fetchSkaleBalance = async () => {
    if (coinbase && window.ethereum && chainId === 1482601649) {
      const skaleWeb3 = new Web3(window.config.skale_endpoint);

      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [coinbase, "latest"],
      });

      const stringBalance = skaleWeb3.utils.hexToNumberString(balance);

      const amount = skaleWeb3.utils.fromWei(stringBalance, "ether");
      const formatted_amount = Number(amount);

      if (formatted_amount <= 0.00005) {
        handleSkaleRefill(coinbase);
      } else {
        console.log("formatted_amount", formatted_amount);
      }

      setSkaleAmount(amount.slice(0, 7));
    }
  };

  const getAllData = async () => {
    const result = await axios
      .get("https://api.worldofdypians.com/api/totalTXs")
      .catch((e) => {
        console.error(e);
      });
    const result2 = await axios
      .get("https://api.worldofdypians.com/api/totalVolumes")
      .catch((e) => {
        console.error(e);
      });

    if (result.data && result.data !== "NaN") {
      setTotalTx(result.data);
      localStorage.setItem("cachedTvl", result.data);
    }

    if (result2.data && result2.data !== "NaN") {
      setTotalVolume(result2.data);
      localStorage.setItem("cachedVolume", result2.data);
    }
  };

  useEffect(() => {
    getAllData();
    fetchDogeCoinPrice();
  }, [coinbase, count55, isConnected]);

  useEffect(() => {
    getDomains();
    fetchBscBalance();
  }, [coinbase, isConnected, logout, successMessage, loadingDomain]);

  useEffect(() => {
    fetchSkaleBalance();
  }, [coinbase, isConnected, chainId]);

  useEffect(() => {
    fetchUserFavorites(coinbase);
    // refreshSubscription();
  }, [coinbase, nftCount]);

  useEffect(() => {
    getTokenData();
    getTokenDatabnb();
    getPriceDYP();
    getListedNfts2();
    getLatest20BoughtNFTS();
    // getTop20BoughtByPriceAndPriceTypeNFTS(0).then((NFTS) =>
    //   settop20BoughtByPriceAndPriceTypeETHNFTS(NFTS)
    // );
    // getTop20BoughtByPriceAndPriceTypeNFTS(1).then((NFTS) =>
    //   settop20BoughtByPriceAndPriceTypeDYPNFTS(NFTS)
    // );
    getallNfts();
  }, [nftCount]);

  const checkData = async () => {
    if (coinbase) {
      navigate("/auth");
    }
  };

  useEffect(() => {
    if (count33 !== 0 && count44 !== 0) {
      getOtherNfts();
    }
  }, [count33, count44, nftCount]);

  useEffect(() => {
    if (latest20BoughtNFTS.length > 0) {
      getCawsSold();
    }
  }, [latest20BoughtNFTS.length]);

  useEffect(() => {
    if (coinbase) {
      // getNotifications(coinbase);
      addNewUserIfNotExists(
        coinbase,
        "Welcome",
        "Welcome to the immersive World of Dypians! Take a moment to step into our NFT marketplace, where a mesmerizing collection of digital art await your exploration. Happy browsing!"
      );
    }
  }, [coinbase, nftCount]);

  useEffect(() => {
    const interval = setInterval(async () => {
      setCount2(0);
      return () => clearInterval(interval);
    }, 300000);
  }, [count2]);

  useEffect(() => {
    fetchSocialData();
  }, []);

  return (
    <>
      <div className="container-fluid p-0 main-wrapper2 position-relative">
        <Header
          handleSignUp={handleShowWalletModal}
          coinbase={coinbase}
          avatar={avatar}
          handleRedirect={() => {
            setFireAppContent(true);
          }}
          handleDisconnect={handleDisconnect}
          myOffers={myNftsOffer}
          handleRefreshList={handleRefreshList}
          nftCount={nftCount}
          isConnected={isConnected}
          chainId={chainId}
          handleSwitchNetwork={handleSwitchNetwork}
          handleSwitchChainGateWallet={handleSwitchNetwork}
          handleOpenDomains={() => setDomainPopup(true)}
          domainName={domainName}
          onLogout={() => {
            setCount55(count55 + 1);
          }}
          onSigninClick={checkData}
        />
        <MobileNavbar
          handleSignUp={handleShowWalletModal}
          coinbase={coinbase}
          avatar={avatar}
          handleRedirect={() => {
            setFireAppContent(true);
          }}
          handleDisconnect={handleDisconnect}
          myOffers={myNftsOffer}
          handleRefreshList={handleRefreshList}
          nftCount={nftCount}
          isConnected={isConnected}
          chainId={chainId}
          handleSwitchNetwork={handleSwitchNetwork}
          handleSwitchChainGateWallet={handleSwitchNetwork}
          handleOpenDomains={() => setDomainPopup(true)}
          domainName={domainName}
        />

        <Routes>
          <Route path="/news/:newsId?/:titleId?" element={<News />} />
          <Route
            path="marketplace/nft/:nftId/:nftAddress?"
            element={
              <SingleNft
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                isConnected={isConnected}
                chainId={chainId}
                handleSwitchChain={handleSwitchChain}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
                favorites={favorites}
                dyptokenData_old={dypTokenData_old}
              />
            }
          />

          <Route
            exact
            path="/"
            element={
              <Home
                handleRegister={handleRegister}
                allStarData={allStarData}
                handleDownload={handleDownload}
                coinbase={coinbase}
                ethTokenData={ethTokenData}
                dyptokenDatabnb={dyptokenDatabnb}
                dyptokenDatabnb_old={dyptokenDatabnb_old}
                idyptokenDatabnb={idyptokenDatabnb}
              />
            }
          />
          <Route exact path="/caws" element={<Caws />} />
          <Route
            exact
            path="/notifications"
            element={
              <Notifications
                handleRefreshList={handleRefreshList}
                coinbase={coinbase}
                nftCount={nftCount}
                isConnected={isConnected}
              />
            }
          />
          <Route exact path="/roadmap" element={<Roadmap />} />
          <Route
            exact
            path="/community"
            element={<Community socials={socials} />}
          />
          <Route exact path="/team" element={<OurTeam />} />
          <Route
            exact
            path="/explorer"
            element={<Explorer count={count2} setCount={setCount2} />}
          />
          <Route exact path="/stake" element={<NftMinting />} />
          <Route exact path="/contact-us" element={<PartnerForm />} />
          <Route exact path="/unsubscribe/:email" element={<Unsubscribe />} />
          <Route
            exact
            path="/caws-timepiece"
            element={
              <TimePiece
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={chainId}
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
              />
            }
          />

          <Route
            exact
            path="/marketplace/nft-bridge"
            element={
              <NFTBridge
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                chainId={chainId}
                isConnected={isConnected}
                myNFTSLand={
                  chainId === 1
                    ? myLandNFTs
                    : chainId === 56
                    ? myLandNFTsBnb
                    : chainId === 43114
                    ? myLandNFTsAvax
                    : chainId === 8453
                    ? myLandNFTsBase
                    : myLandNFTs
                }
                myNFTSCaws={
                  chainId === 1
                    ? MyNFTSCaws2
                    : chainId === 56
                    ? MyNFTSCawsBnb
                    : chainId === 43114
                    ? MyNFTSCawsAvax
                    : chainId === 8453
                    ? MyNFTSCawsBase
                    : MyNFTSCaws2
                }
                handleSwitchNetwork={handleSwitchNetwork}
                onSuccessTransfer={() => {
                  setCount(count + 1);
                }}
              />
            }
          />

          <Route
            exact
            path="/join-beta"
            element={
              <JoinBeta
                coinbase={coinbase}
                handleRegister={handleBetaRegister}
              />
            }
          />

          <Route
            exact
            path="/auth"
            element={<Auth isConnected={isConnected} coinbase={coinbase} />}
          />

          <Route exact path="/redirect" element={<Redirect />} />

          <Route
            exact
            path="/bnbchain-alliance-program"
            element={
              <AuthBNB
                isConnected={isConnected}
                coinbase={coinbase}
                isSuccess={isBnbSuccess}
                onWalletLinkComplete={() => {
                  setisBnbSuccess(false);
                }}
                handleConnect={() => {
                  setisBnb(true);
                  setwalletModal(true);
                }}
              />
            }
          />
          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          <Route exact path="/ResetPassword" element={<ResetPassword />} />
          <Route exact path="/player" element={<PlayerCreation />} />

          <Route
            exact
            path="/account"
            element={
              <Dashboard
                ethTokenData={ethTokenData}
                dyptokenDatabnb={dyptokenDatabnb}
                dypTokenData={dypTokenData}
                handleSwitchChain={handleSwitchChain}
                dypTokenData_old={dypTokenData_old}
                coinbase={coinbase}
                account={coinbase}
                isConnected={isConnected}
                chainId={chainId}
                handleConnect={handleConnectWallet}
                onSigninClick={checkData}
                success={success}
                availableTime={availTime}
                handleSwitchNetwork={handleSwitchNetwork}
                handleOpenDomains={() => setDomainPopup(true)}
                domainName={domainName}
                dogePrice={dogePrice}
                onSubscribeSuccess={() => {
                  setCount55(count55 + 1);
                }}
                isPremium={isPremium}
              />
            }
          />

          <Route
            exact
            path="/land"
            element={
              <Land
                count={count2}
                setCount={setCount2}
                handleConnectWallet={handleConnectWallet}
                coinbase={coinbase}
                isConnected={isConnected}
                handleRegister={handleRegister}
                chainId={chainId}
                showForms={showForms2}
                balance={currencyAmount}
                socials={socials}
              />
            }
          />
          <Route exact path="/terms-conditions" element={<TermsConditions />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            exact
            path="/marketplace"
            element={
              <Marketplace
                count={count2}
                setCount={setCount2}
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                dypTokenData_old={dypTokenData_old}
                coinbase={coinbase}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                totalListed={listedNFTSCount}
                totalBoughtNFTSinETH={totalBoughtNFTSinETH / 1e18}
                totalBoughtNFTSinDYP={totalBoughtNFTSinDYP / 1e18}
                latest20RecentListedNFTS={latest20RecentListedNFTS}
                totalBoughtNFTSCount={totalBoughtNFTSCount}
                recentSales={latest20BoughtNFTS}
                topSales={[
                  ...top20BoughtByPriceAndPriceTypeETHNFTS,
                  ...top20BoughtByPriceAndPriceTypeDYPNFTS,
                ]}
                nftCount={nftCount}
                totalTx={totalTx}
                totalvolume={totalvolume}
              />
            }
          />
          <Route
            exact
            path="/marketplace/caws"
            element={
              <CawsNFT
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                dypTokenData_old={dypTokenData_old}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                coinbase={coinbase}
                cawsBought={cawsBought}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
              />
            }
          />
          <Route
            exact
            path="/marketplace/land"
            element={
              <WoDNFT
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                dypTokenData_old={dypTokenData_old}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                coinbase={coinbase}
                wodBought={landBought}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
              />
            }
          />
          <Route
            exact
            path="/marketplace/timepiece"
            element={
              <TimepieceNFT
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                dypTokenData_old={dypTokenData_old}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                coinbase={coinbase}
                timepieceBought={timepieceBought}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
              />
            }
          />

          <Route exact path="/reset-password" element={<ResetPasswordTest />} />

          <Route
            exact
            path="/marketplace/beta-pass/bnb"
            element={
              <BetaPassNFT
                type={"bnb"}
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                coinbase={coinbase}
                timepieceBought={timepieceBought}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                chainId={chainId}
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                totalCoingeckoNft={totalCoingeckoNft}
                myNFTSCoingecko={MyNFTSCoingecko}
                myGateNfts={myGateNfts}
                totalGateNft={totalGateNft}
                totalBaseNft={totalBaseNft}
                totalBnbNft={totalBnbNft}
                myBaseNFTs={myBaseNFTs}
                myBnbNfts={myBnbNfts}
                totalConfluxNft={totalConfluxNft}
                myConfluxNfts={myConfluxNfts}
                timepieceMetadata={timepieceMetadata}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

<Route
            exact
            path="/marketplace/beta-pass/manta"
            element={
              <BetaPassNFT
                type={"manta"}
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                coinbase={coinbase}
                timepieceBought={timepieceBought}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
                cawsArray={allCawsForTimepieceMint}
                totalMantaNft={totalMantaNft}
                myMantaNfts={myMantaNfts}
                mintloading={mintloading}
                chainId={chainId}
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                totalCoingeckoNft={totalCoingeckoNft}
                myNFTSCoingecko={MyNFTSCoingecko}
                myGateNfts={myGateNfts}
                totalGateNft={totalGateNft}
                totalBaseNft={totalBaseNft}
                totalBnbNft={totalBnbNft}
                myBaseNFTs={myBaseNFTs}
                myBnbNfts={myBnbNfts}
                totalConfluxNft={totalConfluxNft}
                myConfluxNfts={myConfluxNfts}
                timepieceMetadata={timepieceMetadata}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/conflux"
            element={
              <BetaPassNFT
                type={"conflux"}
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                coinbase={coinbase}
                timepieceBought={timepieceBought}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                chainId={chainId}
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                totalCoingeckoNft={totalCoingeckoNft}
                myNFTSCoingecko={MyNFTSCoingecko}
                myGateNfts={myGateNfts}
                totalGateNft={totalGateNft}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                totalConfluxNft={totalConfluxNft}
                myConfluxNfts={myConfluxNfts}
                timepieceMetadata={timepieceMetadata}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/sei"
            element={
              <BetaPassNFT
                type={"sei"}
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                coinbase={coinbase}
                timepieceBought={timepieceBought}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                chainId={chainId}
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                totalCoingeckoNft={totalCoingeckoNft}
                myNFTSCoingecko={MyNFTSCoingecko}
                myGateNfts={myGateNfts}
                totalGateNft={totalGateNft}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                totalConfluxNft={totalConfluxNft}
                myConfluxNfts={myConfluxNfts}
                totalCoreNft={totalCoreNft}
                myCoreNfts={myCoreNfts}
                totalseiNft={totalseiNft}
                totalMantaNft={totalMantaNft}
                myMantaNfts={myMantaNfts}
                myseiNfts={myseiNfts}
                totalVictionNft={totalVictionNft}
                myVictionNfts={myVictionNfts}
                totalMultiversNft={totalMultiversNft}
                totalImmutableNft={totalImmutableNft}
                myImmutableNfts={myImmutableNfts}
                myMultiversNfts={myMultiversNfts}
                timepieceMetadata={timepieceMetadata}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/core"
            element={
              <BetaPassNFT
                type={"core"}
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                coinbase={coinbase}
                timepieceBought={timepieceBought}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                chainId={chainId}
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                totalCoingeckoNft={totalCoingeckoNft}
                myNFTSCoingecko={MyNFTSCoingecko}
                myGateNfts={myGateNfts}
                totalGateNft={totalGateNft}
                totalBaseNft={totalBaseNft}
                totalCoreNft={totalCoreNft}
                myCoreNfts={myCoreNfts}
                totalMultiversNft={totalMultiversNft}
                totalImmutableNft={totalImmutableNft}
                myImmutableNfts={myImmutableNfts}
                myMultiversNfts={myMultiversNfts}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                totalMantaNft={totalMantaNft}
                myMantaNfts={myMantaNfts}
                totalVictionNft={totalVictionNft}
                myVictionNfts={myVictionNfts}
                myBaseNFTs={myBaseNFTs}
                totalConfluxNft={totalConfluxNft}
                myConfluxNfts={myConfluxNfts}
                timepieceMetadata={timepieceMetadata}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />
          <Route
            exact
            path="/account"
            element={
              <Dashboard
                logoutCount={logoutCount}
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                handleSwitchChain={handleSwitchChain}
                dypTokenData_old={dypTokenData_old}
                coinbase={coinbase}
                account={coinbase}
                isConnected={isConnected}
                chainId={chainId}
                handleConnect={handleConnectWallet}
                onSigninClick={checkData}
                success={success}
                availableTime={availTime}
                handleSwitchNetwork={handleSwitchNetwork}
                handleOpenDomains={() => setDomainPopup(true)}
                domainName={domainName}
                dogePrice={dogePrice}
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/multiversx"
            element={
              <BetaPassNFT
                type={"multiversx"}
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                coinbase={coinbase}
                timepieceBought={timepieceBought}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                chainId={chainId}
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                totalCoingeckoNft={totalCoingeckoNft}
                myNFTSCoingecko={MyNFTSCoingecko}
                myGateNfts={myGateNfts}
                totalGateNft={totalGateNft}
                totalBaseNft={totalBaseNft}
                totalCoreNft={totalCoreNft}
                myCoreNfts={myCoreNfts}
                totalMultiversNft={totalMultiversNft}
                totalImmutableNft={totalImmutableNft}
                myImmutableNfts={myImmutableNfts}
                myMultiversNfts={myMultiversNfts}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                totalMantaNft={totalMantaNft}
                myMantaNfts={myMantaNfts}
                totalVictionNft={totalVictionNft}
                myVictionNfts={myVictionNfts}
                myBaseNFTs={myBaseNFTs}
                totalConfluxNft={totalConfluxNft}
                myConfluxNfts={myConfluxNfts}
                timepieceMetadata={timepieceMetadata}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/viction"
            element={
              <BetaPassNFT
                type={"viction"}
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                coinbase={coinbase}
                timepieceBought={timepieceBought}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                chainId={chainId}
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                totalCoreNft={totalCoreNft}
                myCoreNfts={myCoreNfts}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                totalMantaNft={totalMantaNft}
                myMantaNfts={myMantaNfts}
                totalVictionNft={totalVictionNft}
                myVictionNfts={myVictionNfts}
                totalMultiversNft={totalMultiversNft}
                totalImmutableNft={totalImmutableNft}
                myImmutableNfts={myImmutableNfts}
                myMultiversNfts={myMultiversNfts}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                totalCoingeckoNft={totalCoingeckoNft}
                myNFTSCoingecko={MyNFTSCoingecko}
                myGateNfts={myGateNfts}
                totalGateNft={totalGateNft}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                totalConfluxNft={totalConfluxNft}
                myConfluxNfts={myConfluxNfts}
                timepieceMetadata={timepieceMetadata}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/skale"
            element={
              <BetaPassNFT
                type={"skale"}
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                coinbase={coinbase}
                timepieceBought={timepieceBought}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                chainId={chainId}
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                totalCoingeckoNft={totalCoingeckoNft}
                myNFTSCoingecko={MyNFTSCoingecko}
                myGateNfts={myGateNfts}
                totalGateNft={totalGateNft}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                totalConfluxNft={totalConfluxNft}
                myConfluxNfts={myConfluxNfts}
                timepieceMetadata={timepieceMetadata}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalCmcNft={totalCmcNft}
                totalSkaleNft={totalSkaleNft}
                mySkaleNfts={myskaleNFTsCreated}
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/doge"
            element={
              <BetaPassNFT
                type={"doge"}
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                coinbase={coinbase}
                timepieceBought={timepieceBought}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                chainId={chainId}
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                totalCoingeckoNft={totalCoingeckoNft}
                myNFTSCoingecko={MyNFTSCoingecko}
                myGateNfts={myGateNfts}
                totalGateNft={totalGateNft}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                totalConfluxNft={totalConfluxNft}
                myConfluxNfts={myConfluxNfts}
                timepieceMetadata={timepieceMetadata}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalDogeNft={totalDogeNft}
                myDogeNFTs={myDogeNFTs}
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/coinmarketcap"
            element={
              <BetaPassNFT
                type={"cmc"}
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                coinbase={coinbase}
                timepieceBought={timepieceBought}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                chainId={chainId}
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                totalCoingeckoNft={totalCoingeckoNft}
                myNFTSCoingecko={MyNFTSCoingecko}
                myGateNfts={myGateNfts}
                totalGateNft={totalGateNft}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                totalConfluxNft={totalConfluxNft}
                myConfluxNfts={myConfluxNfts}
                timepieceMetadata={timepieceMetadata}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalDogeNft={totalDogeNft}
                myDogeNFTs={myDogeNFTs}
                totalCmcNft={totalCmcNft}
                myCmcNFTs={myCmcNFTs}
              />
            }
          />

          <Route
            exact
            path="/marketplace/beta-pass/gate"
            element={
              <BetaPassNFT
                type={"gate"}
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                coinbase={coinbase}
                timepieceBought={timepieceBought}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                chainId={chainId}
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                totalCoingeckoNft={totalCoingeckoNft}
                myNFTSCoingecko={MyNFTSCoingecko}
                myGateNfts={myGateNfts}
                totalGateNft={totalGateNft}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                totalConfluxNft={totalConfluxNft}
                myConfluxNfts={myConfluxNfts}
                timepieceMetadata={timepieceMetadata}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />

          {/* <Route
                exact
                path="/marketplace/beta-pass/avalanche"
                element={
                  <BetaPassNFT
                    type={"avalanche"}
                    ethTokenData={ethTokenData}
                    dypTokenData={dypTokenData}
                    isConnected={isConnected}
                    handleConnect={handleShowWalletModal}
                    listedNFTS={listedNFTS}
                    coinbase={coinbase}
                    timepieceBought={timepieceBought}
                    handleRefreshListing={handleRefreshList}
                    nftCount={nftCount}
                    cawsArray={allCawsForTimepieceMint}
                    mintloading={mintloading}
                    chainId={chainId}
                    handleMint={handleTimepieceMint}
                    mintStatus={mintStatus}
                    textColor={textColor}
                    calculateCaws={calculateCaws}
                    totalCreated={totalTimepieceCreated}
                    totalCoingeckoNft={totalCoingeckoNft}
                    myNFTSCoingecko={MyNFTSCoingecko}
                    myGateNfts={myGateNfts}
                    totalGateNft={totalGateNft}
                    totalConfluxNft={totalConfluxNft}
                    myConfluxNfts={myConfluxNfts}
                    timepieceMetadata={timepieceMetadata}
                    handleSwitchNetwork={handleSwitchNetwork}
                  />
                }
              /> */}
          {/* <Route
                exact
                path="/marketplace/beta-pass/coin98"
                element={
                  <BetaPassNFT
                    type={"coin98"}
                    ethTokenData={ethTokenData}
                    dypTokenData={dypTokenData}
                    cawsArray={allCawsForTimepieceMint}
                    mintloading={mintloading}
                    isConnected={isConnected}
                    chainId={chainId}
                    handleMint={handleTimepieceMint}
                    mintStatus={mintStatus}
                    textColor={textColor}
                    calculateCaws={calculateCaws}
                    totalCreated={totalTimepieceCreated}
                    totalCoingeckoNft={totalCoingeckoNft}
                    myNFTSCoingecko={MyNFTSCoingecko}
                    myGateNfts={myGateNfts}
                    totalGateNft={totalGateNft}
                    totalConfluxNft={totalConfluxNft}
                    myConfluxNfts={myConfluxNfts}
                    timepieceMetadata={timepieceMetadata}
                    handleConnect={handleShowWalletModal}
                    listedNFTS={listedNFTS}
                    coinbase={coinbase}
                    timepieceBought={timepieceBought}
                    handleRefreshListing={handleRefreshList}
                    nftCount={nftCount}
                    handleSwitchNetwork={handleSwitchNetwork}
                  />
                }
              /> */}
          <Route
            exact
            path="/marketplace/beta-pass/coingecko/:terms?"
            element={
              <BetaPassNFT
                type={"coingecko"}
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={chainId}
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                totalCoingeckoNft={totalCoingeckoNft}
                myNFTSCoingecko={MyNFTSCoingecko}
                myGateNfts={myGateNfts}
                totalGateNft={totalGateNft}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                totalConfluxNft={totalConfluxNft}
                myConfluxNfts={myConfluxNfts}
                timepieceMetadata={timepieceMetadata}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                coinbase={coinbase}
                timepieceBought={timepieceBought}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
                handleSwitchNetwork={handleSwitchNetwork}
                success={success}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
              />
            }
          />
          <Route
            exact
            path="/marketplace/beta-pass/base"
            element={
              <BetaPassNFT
                type={"base"}
                ethTokenData={ethTokenData}
                dypTokenData={dypTokenData}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={chainId}
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                totalCoingeckoNft={totalCoingeckoNft}
                myNFTSCoingecko={MyNFTSCoingecko}
                myGateNfts={myGateNfts}
                totalGateNft={totalGateNft}
                totalBaseNft={totalBaseNft}
                myBaseNFTs={myBaseNFTs}
                totalConfluxNft={totalConfluxNft}
                myConfluxNfts={myConfluxNfts}
                timepieceMetadata={timepieceMetadata}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                coinbase={coinbase}
                timepieceBought={timepieceBought}
                handleRefreshListing={handleRefreshList}
                nftCount={nftCount}
                handleSwitchNetwork={handleSwitchNetwork}
              />
            }
          />
          <Route
            exact
            path="/marketplace/events/:eventId"
            element={
              <MarketEvents
                tabState={"live"}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                account={coinbase?.toLowerCase()}
                chainId={chainId}
                dyptokenDatabnb={dyptokenDatabnb}
                dyptokenDatabnb_old={dyptokenDatabnb_old}
                idyptokenDatabnb={idyptokenDatabnb}
                handleAvailableTime={(value) => {
                  setavailTime(value);
                }}
                ethTokenData={ethTokenData}
                dyptokenData_old={dypTokenData_old}
                dogePrice={dogePrice}
              />
            }
          />
          <Route
            exact
            path="/marketplace/events/upcoming"
            element={
              <MarketEvents
                tabState={"upcoming"}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                account={coinbase?.toLowerCase()}
                chainId={chainId}
                dyptokenDatabnb={dyptokenDatabnb}
                idyptokenDatabnb={idyptokenDatabnb}
                dyptokenDatabnb_old={dyptokenDatabnb_old}
                dyptokenData_old={dypTokenData_old}
                handleAvailableTime={(value) => {
                  setavailTime(value);
                }}
                ethTokenData={ethTokenData}
                dogePrice={dogePrice}
              />
            }
          />
          <Route
            exact
            path="/marketplace/events/past"
            element={
              <MarketEvents
                tabState={"past"}
                isConnected={isConnected}
                handleConnect={handleShowWalletModal}
                listedNFTS={listedNFTS}
                account={coinbase?.toLowerCase()}
                chainId={chainId}
                dyptokenDatabnb={dyptokenDatabnb}
                dyptokenDatabnb_old={dyptokenDatabnb_old}
                idyptokenDatabnb={idyptokenDatabnb}
                handleAvailableTime={(value) => {
                  setavailTime(value);
                }}
                dyptokenData_old={dypTokenData_old}
                ethTokenData={ethTokenData}
                dogePrice={dogePrice}
              />
            }
          />
          <Route
            exact
            path="/marketplace/stake"
            element={
              <MarketStake
                isConnected={isConnected}
                handleConnect={handleConnectWallet}
                chainId={chainId}
                coinbase={coinbase}
                isPremium={isPremium}
                handleSwitchNetwork={handleSwitchNetwork}
                onSuccessDeposit={() => {
                  setCount55(count55 + 1);
                }}
              />
            }
          />
          <Route
            exact
            path="/marketplace/mint/timepiece"
            element={
              <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                totalMantaNft={totalMantaNft}
                mantaMintAllowed={mantaMintAllowed}
                myMantaNfts={myMantaNfts}
                myMantaNFTsCreated={myMantaNFTsCreated}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={chainId}
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalopbnbNft={totalopbnbNft}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
                opbnbMintAllowed={opbnbMintAllowed}
                myopbnbNFTsCreated={myopbnbNFTsCreated}
                myConfluxNFTsCreated={myConfluxNFTsCreated}
                mybaseNFTsCreated={mybaseNFTsCreated}
                myskaleNFTsCreated={myskaleNFTsCreated}
                handleConfluxMint={handleConfluxNftMint}
                handleBaseNftMint={handleBaseNftMint}
                confluxMintAllowed={confluxMintAllowed}
                baseMintAllowed={baseMintAllowed}
                skaleMintAllowed={skaleMintAllowed}
                coreMintAllowed={coreMintAllowed}
                victionMintAllowed={victionMintAllowed}
                immutableMintAllowed={immutableMintAllowed}
                totalCoreNft={totalCoreNft}
                myCoreNfts={myCoreNfts}
                totalMultiversNft={totalMultiversNft}
                totalImmutableNft={totalImmutableNft}
                myImmutableNfts={myImmutableNfts}
                myMultiversNfts={myMultiversNfts}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                totalVictionNft={totalVictionNft}
                myVictionNfts={myVictionNfts}
                myOpbnbNfts={myOpbnbNfts}
                myBnbNfts={myBnbNfts}
                totalBnbNft={totalBnbNft}
              />
            }
          />

          {/* <Route
            exact
            path="/marketplace/mint/bnbchain"
            element={
              <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={chainId}
                handleMint={handleBnbNftMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
                myConfluxNFTsCreated={myConfluxNFTsCreated}
                myBnbNFTsCreated={myBnbNFTsCreated}
                mybaseNFTsCreated={mybaseNFTsCreated}
                myskaleNFTsCreated={myskaleNFTsCreated}
                handleConfluxMint={handleConfluxNftMint}
                handleBaseNftMint={handleBaseNftMint}
                handleBnbNftMint={handleBnbNftMint}
                confluxMintAllowed={confluxMintAllowed}
                baseMintAllowed={baseMintAllowed}
                skaleMintAllowed={skaleMintAllowed}
                coreMintAllowed={coreMintAllowed}
                bnbMintAllowed={bnbMintAllowed}
                victionMintAllowed={victionMintAllowed}
                totalCoreNft={totalCoreNft}
                myCoreNfts={myCoreNfts}
                totalMultiversNft={totalMultiversNft}
                totalImmutableNft={totalImmutableNft}
                totalBnbNft={totalBnbNft}
                myImmutableNfts={myImmutableNfts}
                myMultiversNfts={myMultiversNfts}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                totalVictionNft={totalVictionNft}
                myVictionNfts={myVictionNfts}
                myBnbNfts={myBnbNfts}
              />
            }
          /> */}

          <Route
            exact
            path="/marketplace/mint/opbnbchain"
            element={
              <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={chainId}
                handleMint={handleOpbnbNftMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalopbnbNft={totalopbnbNft}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
                opbnbMintAllowed={opbnbMintAllowed}
                myopbnbNFTsCreated={myopbnbNFTsCreated}
                myConfluxNFTsCreated={myConfluxNFTsCreated}
                mybaseNFTsCreated={mybaseNFTsCreated}
                myskaleNFTsCreated={myskaleNFTsCreated}
                handleConfluxMint={handleConfluxNftMint}
                handleBaseNftMint={handleBaseNftMint}
                confluxMintAllowed={confluxMintAllowed}
                baseMintAllowed={baseMintAllowed}
                skaleMintAllowed={skaleMintAllowed}
                coreMintAllowed={coreMintAllowed}
                victionMintAllowed={victionMintAllowed}
                immutableMintAllowed={immutableMintAllowed}
                totalCoreNft={totalCoreNft}
                myCoreNfts={myCoreNfts}
                totalMultiversNft={totalMultiversNft}
                totalImmutableNft={totalImmutableNft}
                myImmutableNfts={myImmutableNfts}
                myMultiversNfts={myMultiversNfts}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                totalVictionNft={totalVictionNft}
                myVictionNfts={myVictionNfts}
                myOpbnbNfts={myOpbnbNfts}
                myBnbNfts={myBnbNfts}
                totalBnbNft={totalBnbNft}
                totalMantaNft={totalMantaNft}
                mantaMintAllowed={mantaMintAllowed}
                myMantaNfts={myMantaNfts}
                myMantaNFTsCreated={myMantaNFTsCreated}
              />
            }
          />
            {/* <Route
            exact
            path="/marketplace/mint/manta"
            element={
              <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={chainId}
                handleMint={handleMantaNftMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalopbnbNft={totalopbnbNft}
                totalMantaNft={totalMantaNft}
                mantaMintAllowed={mantaMintAllowed}
                myMantaNfts={myMantaNfts}
                myMantaNFTsCreated={myMantaNFTsCreated}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
                opbnbMintAllowed={opbnbMintAllowed}
                myopbnbNFTsCreated={myopbnbNFTsCreated}
                myConfluxNFTsCreated={myConfluxNFTsCreated}
                mybaseNFTsCreated={mybaseNFTsCreated}
                myskaleNFTsCreated={myskaleNFTsCreated}
                handleConfluxMint={handleConfluxNftMint}
                handleBaseNftMint={handleBaseNftMint}
                confluxMintAllowed={confluxMintAllowed}
                baseMintAllowed={baseMintAllowed}
                skaleMintAllowed={skaleMintAllowed}
                coreMintAllowed={coreMintAllowed}
                victionMintAllowed={victionMintAllowed}
                immutableMintAllowed={immutableMintAllowed}
                totalCoreNft={totalCoreNft}
                myCoreNfts={myCoreNfts}
                totalMultiversNft={totalMultiversNft}
                totalImmutableNft={totalImmutableNft}
                myImmutableNfts={myImmutableNfts}
                myMultiversNfts={myMultiversNfts}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                totalVictionNft={totalVictionNft}
                myVictionNfts={myVictionNfts}
                myOpbnbNfts={myOpbnbNfts}
                myBnbNfts={myBnbNfts}
                totalBnbNft={totalBnbNft}
              />
            }
          /> */}
          
         <Route
            exact
            path="/marketplace/mint/immutable"
            element={
              <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={chainId}
                handleMint={handleImmutableNftMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalopbnbNft={totalopbnbNft}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
                opbnbMintAllowed={opbnbMintAllowed}
                myopbnbNFTsCreated={myopbnbNFTsCreated}
                myConfluxNFTsCreated={myConfluxNFTsCreated}
                mybaseNFTsCreated={mybaseNFTsCreated}
                myskaleNFTsCreated={myskaleNFTsCreated}
                handleConfluxMint={handleConfluxNftMint}
                handleBaseNftMint={handleBaseNftMint}
                confluxMintAllowed={confluxMintAllowed}
                baseMintAllowed={baseMintAllowed}
                skaleMintAllowed={skaleMintAllowed}
                coreMintAllowed={coreMintAllowed}
                victionMintAllowed={victionMintAllowed}
                immutableMintAllowed={immutableMintAllowed}
                totalCoreNft={totalCoreNft}
                myCoreNfts={myCoreNfts}
                totalMultiversNft={totalMultiversNft}
                totalImmutableNft={totalImmutableNft}
                myImmutableNfts={myImmutableNfts}
                myMultiversNfts={myMultiversNfts}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                totalVictionNft={totalVictionNft}
                myVictionNfts={myVictionNfts}
                myOpbnbNfts={myOpbnbNfts}
                myBnbNfts={myBnbNfts}
                totalMantaNft={totalMantaNft}
                mantaMintAllowed={mantaMintAllowed}
                myMantaNfts={myMantaNfts}
                myMantaNFTsCreated={myMantaNFTsCreated}
                totalBnbNft={totalBnbNft}
              />
            }
          />
          {/* <Route
            exact
            path="/marketplace/mint/viction"
            element={
              <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={chainId}
                handleMint={handleVictionNftMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
                myConfluxNFTsCreated={myConfluxNFTsCreated}
                mybaseNFTsCreated={mybaseNFTsCreated}
                myskaleNFTsCreated={myskaleNFTsCreated}
                handleConfluxMint={handleConfluxNftMint}
                handleBaseNftMint={handleBaseNftMint}
                confluxMintAllowed={confluxMintAllowed}
                baseMintAllowed={baseMintAllowed}
                skaleMintAllowed={skaleMintAllowed}
                coreMintAllowed={coreMintAllowed}
                victionMintAllowed={victionMintAllowed}
                totalCoreNft={totalCoreNft}
                myCoreNfts={myCoreNfts}
                totalMultiversNft={totalMultiversNft}
                totalImmutableNft={totalImmutableNft}
                myImmutableNfts={myImmutableNfts}
                myMultiversNfts={myMultiversNfts}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                totalVictionNft={totalVictionNft}
                myVictionNfts={myVictionNfts}
                immutableMintAllowed={immutableMintAllowed}
              />
            }
          />

        */}

          {/* <Route
              exact
              path="/marketplace/mint/multiversx"
              element={
                <MarketMint
                  coinbase={coinbase}
                  showWalletConnect={() => {
                    setwalletModal(true);
                  }}
                  cawsArray={allCawsForTimepieceMint}
                  mintloading={mintloading}
                  isConnected={isConnected}
                  chainId={chainId}
                  handleMint={handleVictionNftMint}
                  mintStatus={mintStatus}
                  textColor={textColor}
                  calculateCaws={calculateCaws}
                  totalCreated={totalTimepieceCreated}
                  timepieceMetadata={timepieceMetadata}
                  myConfluxNFTsCreated={myConfluxNFTsCreated}
                  mybaseNFTsCreated={mybaseNFTsCreated}
                  myskaleNFTsCreated={myskaleNFTsCreated}
                  handleConfluxMint={handleConfluxNftMint}
                  handleBaseNftMint={handleBaseNftMint}
                  confluxMintAllowed={confluxMintAllowed}
                  baseMintAllowed={baseMintAllowed}
                  skaleMintAllowed={skaleMintAllowed}
                  coreMintAllowed={coreMintAllowed}
                  victionMintAllowed={victionMintAllowed}
                  totalCoreNft={totalCoreNft}
                  myCoreNfts={myCoreNfts}
                  totalMultiversNft={totalMultiversNft}
                  totalImmutableNft={totalImmutableNft}
                  myImmutableNfts={myImmutableNfts}
                  myMultiversNfts={myMultiversNfts}
                  totalseiNft={totalseiNft}
                  myseiNfts={myseiNfts}
                  totalVictionNft={totalVictionNft}
                  myVictionNfts={myVictionNfts}
                />
              }
            /> */}

          <Route
            exact
            path="/marketplace/mint/core"
            element={
              <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={chainId}
                handleMint={handleCoreNftMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalopbnbNft={totalopbnbNft}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
                opbnbMintAllowed={opbnbMintAllowed}
                myopbnbNFTsCreated={myopbnbNFTsCreated}
                myConfluxNFTsCreated={myConfluxNFTsCreated}
                mybaseNFTsCreated={mybaseNFTsCreated}
                myskaleNFTsCreated={myskaleNFTsCreated}
                handleConfluxMint={handleConfluxNftMint}
                handleBaseNftMint={handleBaseNftMint}
                confluxMintAllowed={confluxMintAllowed}
                baseMintAllowed={baseMintAllowed}
                skaleMintAllowed={skaleMintAllowed}
                coreMintAllowed={coreMintAllowed}
                victionMintAllowed={victionMintAllowed}
                immutableMintAllowed={immutableMintAllowed}
                totalCoreNft={totalCoreNft}
                myCoreNfts={myCoreNfts}
                totalMultiversNft={totalMultiversNft}
                totalImmutableNft={totalImmutableNft}
                myImmutableNfts={myImmutableNfts}
                myMultiversNfts={myMultiversNfts}
                totalseiNft={totalseiNft}
                myseiNfts={myseiNfts}
                totalVictionNft={totalVictionNft}
                myVictionNfts={myVictionNfts}
                myOpbnbNfts={myOpbnbNfts}
                myBnbNfts={myBnbNfts}
                totalBnbNft={totalBnbNft}
                totalMantaNft={totalMantaNft}
                mantaMintAllowed={mantaMintAllowed}
                myMantaNfts={myMantaNfts}
                myMantaNFTsCreated={myMantaNFTsCreated}
                />
              }
            />
          {/* <Route
              exact
              path="/marketplace/mint/sei"
              element={
                <MarketMint
                  coinbase={coinbase}
                  showWalletConnect={() => {
                    setwalletModal(true);
                  }}
                  cawsArray={allCawsForTimepieceMint}
                  mintloading={mintloading}
                  isConnected={isConnected}
                  chainId={chainId}
                  handleMint={handleTimepieceMint}
                  mintStatus={mintStatus}
                  textColor={textColor}
                  calculateCaws={calculateCaws}
                  totalCreated={totalTimepieceCreated}
                  timepieceMetadata={timepieceMetadata}
                  myConfluxNFTsCreated={myConfluxNFTsCreated}
                  mybaseNFTsCreated={mybaseNFTsCreated}
                  myskaleNFTsCreated={myskaleNFTsCreated}
                  handleConfluxMint={handleConfluxNftMint}
                  handleBaseNftMint={handleBaseNftMint}
                  confluxMintAllowed={confluxMintAllowed}
                  baseMintAllowed={baseMintAllowed}
                  skaleMintAllowed={skaleMintAllowed}
                  totalCoreNft={totalCoreNft}
                  myCoreNfts={myCoreNfts}
                  totalMultiversNft={totalMultiversNft}
                  totalImmutableNft={totalImmutableNft}
                  myImmutableNfts={myImmutableNfts}
                  myMultiversNfts={myMultiversNfts}
                  totalseiNft={totalseiNft}
                  myseiNfts={myseiNfts}
                  totalVictionNft={totalVictionNft}
                  myVictionNfts={myVictionNfts}
                />
              }
            /> */}
        </Routes>
        {/* <img src={scrollToTop} alt="scroll top" onClick={() => window.scrollTo(0, 0)} className="scroll-to-top" /> */}
        <ScrollTop />
        {location.pathname.includes("marketplace") ||
        location.pathname.includes("notifications") ||
        location.pathname.includes("account") ? (
          location.pathname.includes("caws") ||
          location.pathname.includes("land") ? null : (
            <MarketplaceFooter />
          )
        ) : (
          <Footer />
        )}
      </div>

      {!location.pathname.includes("account") &&
        !location.pathname.includes("auth") &&
        !location.pathname.includes("explorer") &&
        !location.pathname.includes("bnbchain-alliance-program") && (
          <ChestFlyout />
        )}
      {domainPopup && (
        <DomainModal
          onClose={() => setDomainPopup(false)}
          onSearch={searchDomain}
          available={availableDomain}
          price={domainPrice}
          chainId={chainId}
          bnbUSDPrice={bnbUSDPrice}
          onRegister={registerDomain}
          loading={loadingDomain}
          successMessage={successMessage}
          successDomain={successDomain}
          metadata={domainMetaData}
          bscAmount={bscAmount}
        />
      )}

      {showWalletModal === true && (
        <RegisterModal
          open={showWalletModal}
          onClose={() => {
            setShowWalletModal(false);
          }}
          handleConnect={handleConnection}
          coinbase={coinbase}
          showForms={showForms}
          myCawsWodStakes={myCawsWodStakesAll}
        />
      )}
      {betaModal === true && (
        <JoinBetaModal
          open={betaModal}
          onClose={() => {
            setBetaModal(false);
          }}
          handleConnect={handleConnection}
          coinbase={coinbase}
          showForms={showForms}
        />
      )}

      {walletModal === true && walletId === "connect" && (
        <WalletModal
          show={walletId === "connect" && walletModal === true}
          handleClose={() => {
            setwalletModal(false);
          }}
          handleConnection={() => {
            handleConnectWallet();
          }}
          handleConnectionPassport={handleConnectPassport}
        />
      )}

      {walletId === "connect_simple" && walletModal === true && (
        <WalletModal2
          show={walletId === "connect_simple" && walletModal === true}
          handleClose={() => {
            setwalletModal(false);
            setwalletId("connect");
          }}
          handleConnection={() => {
            handleConnectWallet();
          }}
          handleConnectionPassport={handleConnectWalletPassport}
        />
      )}

      {showWalletModalDownload === true && (
        <CheckWhitelistModal
          open={showWalletModalDownload}
          onClose={() => {
            setdownloadSelected(false);
            setShowWalletModalDownload(false);
          }}
          isPremium={isPremium}
          handleConnect={handleConnection}
          coinbase={coinbase}
          showForms={showForms}
          openRegister={handleRegister}
          donwloadSelected={donwloadSelected}
          cawsMinted={myCAWSNFTsCreated.length}
          cawsStaked={myCAWSNFTsTotalStaked.length}
          landMinted={myNFTs.length}
          landStaked={mystakes.length}
          handleActiveUser={(value) => {
            setactiveUser(value);
          }}
        />
      )}

      {fireAppcontent === true && <AppContent />}

      {showWalletModalRegister === true && (
        <CheckWhitelistModal
          open={showWalletModalRegister}
          onClose={() => {
            setShowWalletModalRegister(false);
          }}
          isPremium={isPremium}
          handleConnect={handleConnection}
          coinbase={coinbase}
          showForms={showForms}
          openRegister={handleRegister}
          donwloadSelected={donwloadSelected}
          cawsMinted={myCAWSNFTsCreated.length}
          cawsStaked={myCAWSNFTsTotalStaked.length}
          landMinted={myNFTs.length}
          landStaked={mystakes.length}
          handleRedirect={() => {
            setFireAppContent(true);
          }}
          handleActiveUser={(value) => {
            setactiveUser(value);
          }}
        />
      )}

      {showWalletModalRegister2 === true && (
        <CheckAuthUserModal
          open={showWalletModalRegister2}
          onClose={() => {
            setShowWalletModalRegister2(false);
          }}
          handleConnect={handleConnection}
          coinbase={coinbase}
          showForms={showForms}
          openRegister={handleRegister}
          donwloadSelected={donwloadSelected}
          cawsMinted={myCAWSNFTsCreated.length}
          cawsStaked={myCAWSNFTsTotalStaked.length}
          landMinted={myNFTs.length}
          landStaked={mystakes.length}
          handleRedirect={() => {
            setFireAppContent(true);
          }}
          handleActiveUser={(value) => {
            setactiveUser(value);
          }}
        />
      )}
    </>
  );
}

export default App;
