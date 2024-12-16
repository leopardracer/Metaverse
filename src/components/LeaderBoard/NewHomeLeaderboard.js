import React, { useState, useEffect, useRef } from "react";

import { CircularProgress } from "@mui/material"; 
// import axios from "axios";
// import Switch from "@mui/material/Switch";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
// import "./_leaderboard.scss";
// import ComingSoon from "./ComingSoon";

// import bnbIcon from "./assets/bnbIcon.svg";
// import coreIcon from "./assets/coreIcon.svg";
import bnbActive from "./assets/bnbActive.svg";
import bnbInactive from "./assets/bnbInactive.svg";
import skaleActive from "./assets/skaleActive.svg";
import skaleInactive from "./assets/skaleInactive.svg";
import wodActive from "./assets/wodActive.svg";
import wodInactive from "./assets/wodInactive.svg";
import leftArrow from "./assets/leftArrow.svg";
import rightArrow from "./assets/rightArrow.svg";
import star from "./assets/star.svg";
import premiumIcon from "./assets/premiumIcon.png";

// import React, { useState, useEffect } from "react";

// import { CircularProgress } from "@mui/material";  
// import premiumStar from "../../Images/userProfile/premiumStar.png";
import axios from "axios";
import Switch from "@mui/material/Switch";
// import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import "./_leaderboard.scss";
import ComingSoon from "./ComingSoon";
import OutsideClickHandler from "react-outside-click-handler";
// import { dyp700_abi } from "../../web3";
import Countdown from "react-countdown";
import Slider from "react-slick";
import useWindowSize from "../../hooks/useWindowSize";

const renderer = ({ hours, minutes, seconds }) => {
  return (
    <div className="timer-wrapper d-none align-items-start gap-3 justify-content-center">
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{hours < 10 ? "0" + hours : hours}</h6>
        <span className="days">Hours</span>
      </div>
      <h6 className="mint-time">:</h6>
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{minutes < 10 ? "0" + minutes : minutes}</h6>
        <span className="days">minutes</span>
      </div>
      <h6 className="mint-time">:</h6>
      <div className="d-flex flex-column gap-1">
        <h6 className="mint-time">{seconds < 10 ? "0" + seconds : seconds}</h6>
        <span className="days">seconds</span>
      </div>
    </div>
  );
};

const NewHomeLeaderboard = ({ username, userId, dypBalancebnb, address }) => {
  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
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
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  const playerData = [
    {
      position: "1",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "2",
      displayName: "DarkSliffer",
      reward: "$500",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "3",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "4",
      displayName: "DarkSliffer",
      reward: "500",
      statValue: "7757920",
      premium: false,
    },

    {
      position: "5",
      displayName: "DarkSliffer",
      reward: "50",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "6",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "7",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "8",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "9",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
    {
      position: "10",
      displayName: "DarkSliffer",
      reward: "---",
      premium: false,
      statValue: "7757920",
    },
  ];
  const [tooltip, setTooltip] = useState(false);
  const sliderRef = useRef(null);
  const windowSize = useWindowSize();

  const placeholderplayerData = [
    {
      position: 0,
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: 1,
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: 2,
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: 3,
      displayName: "---",
      reward: "---",
      statValue: "---",
      premium: false,
    },

    {
      position: 4,
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: 5,
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: 6,
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: 7,
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: 8,
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
    {
      position: 9,
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "---",
    },
  ];

  const dailyPrizes = ["10", "8", "5", "5", "0", "0", "0", "0", "0", "0"];
  const previous_dailyPrizes = [
    "20",
    "10",
    "8",
    "5",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ];

  const dailyPrizesGolden = ["10", "8", "5", "5", "5", "5", "5", "5", "5", "5"];

  const prizeSkale = ["25", "15", "10", "8", "5", "5", "5", "5", "5", "5"];

  const previous_dailyPrizesGolden = [
    "20",
    "10",
    "8",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
  ];

  const weeklyPrizes = ["25", "15", "10", "8", "0", "0", "0", "0", "0", "0"];
  const weeklyPrizesGolden = [
    "25",
    "15",
    "10",
    "8",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
  ];

  const previous_weeklyPrizes = [
    "40",
    "20",
    "15",
    "10",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ];

  const previous_weeklyPrizesGolden = [
    "40",
    "20",
    "15",
    "10",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
    "5",
  ];

  const monthlyPrizes = [
    "250",
    "150",
    "100",
    "50",
    "50",
    "20",
    "20",
    "10",
    "10",
    "10",
  ];

  const previous_monthlyPrizes = [
    "500",
    "250",
    "150",
    "50",
    "25",
    "25",
    "25",
    "25",
    "25",
    "25",
  ];

  const monthlyPrizesGolden = [
    "250",
    "150",
    "100",
    "50",
    "50",
    "20",
    "20",
    "10",
    "10",
    "10",
  ];

  const previous_monthlyPrizesGolden = [
    "500",
    "250",
    "150",
    "50",
    "25",
    "25",
    "25",
    "25",
    "25",
    "25",
  ];

  const dummyPrizes = [
    "250",
    "150",
    "100",
    "50",
    "50",
    "20",
    "20",
    "10",
    "10",
    "10",
  ];

  const [optionText, setOptionText] = useState("daily");
  const [optionText2, setOptionText2] = useState("bnb");

  const [dailyrecords, setRecords] = useState([]);
  const [weeklyrecords, setWeeklyRecords] = useState([]);
  const [monthlyrecords, setMonthlyRecords] = useState([]);

  const [dailyrecordsAroundPlayer, setRecordsAroundPlayer] = useState([]);
  const [prizes, setPrizes] = useState(dailyPrizes);
  const [activePlayer, setActivePlayer] = useState(false);
  const [userData, setUserData] = useState({});
  const [inactiveBoard, setInactiveBoard] = useState(false);
  const [dailyplayerData, setdailyplayerData] = useState([]);
  const [weeklyplayerData, setweeklyplayerData] = useState([]);
  const [monthlyplayerData, setmonthlyplayerData] = useState([]);
  const [skaleRecords, setskaleRecords] = useState([]);
  const [skalePreviousRecords, setskalePreviousRecords] = useState([]);
  const [skalepreviousVersion, setskalepreviousVersion] = useState(0);
  const [skaleMonthlyData, setSkaleMonthlyData] = useState([]);
  const [skalePreviousMonthlyData, setSkalePreviousMonthlyData] = useState([]);
  const [skalePreviousVersionMontly, setSkalePreviousVersionMontly] =
    useState(0);

  const [previousVersion, setpreviousVersion] = useState(0);
  const [previousWeeklyVersion, setpreviousWeeklyVersion] = useState(0);
  const [previousMonthlyVersion, setpreviousMonthlyVersion] = useState(0);
  const [genesisData, setgenesisData] = useState([]);
  const [previousgenesisData, setpreviousgenesisData] = useState([]);

  const [isactive, setisActive] = useState(false);
  const [countdown, setcountdown] = useState();
  const [previousGenesisVersion, setpreviousGenesisVersion] = useState(0);
  const [globalTooltip, setGlobalTooltip] = useState(false);

  const backendApi =
    "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod";

  const fetchGenesisRecords = async () => {
    const data2 = {
      StatisticName: "GenesisLandRewards",
      StartPosition: 0,
      MaxResultsCount: 10,
    };

    const result2 = await axios
      .post(`${backendApi}/auth/GetLeaderboard`, data2)
      .catch((err) => {
        console.log(err);
      });
    if (result2) {
      setgenesisData(result2.data.data.leaderboard);
      setpreviousGenesisVersion(result2.data.data.version);

      fillRecordsGenesis(result2.data.data.leaderboard);
    }
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };
  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const fetchDailyRecords = async () => {
    const data = {
      StatisticName: "DailyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data).catch((err) => {
      console.log(err);
    });
    setpreviousVersion(parseInt(result.data.data.version));
    setRecords(result.data.data.leaderboard);
    fillRecords(result.data.data.leaderboard);
  };

  const fetchWeeklyRecords = async () => {
    const data = {
      StatisticName: "WeeklyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data).catch((err) => {
      console.log(err);
    });
    setWeeklyRecords(result.data.data.leaderboard);
    setpreviousWeeklyVersion(result.data.data.version);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    fillRecords(result.data.data.leaderboard);
  };

  const fetchMonthlyRecords = async () => {
    const data = {
      StatisticName: "MonthlyLeaderboard",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data).catch((err) => {
      console.log(err);
    });
    setMonthlyRecords(result.data.data.leaderboard);
    setpreviousMonthlyVersion(result.data.data.version);
    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );
    if (testArray.length > 0) {
      setActivePlayer(true);
    }
    fillRecords(result.data.data.leaderboard);
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleOption = (item) => {
    setOptionText2(item);
    if (item === "bnb" && inactiveBoard === false) {
      setPrizes(dummyPrizes);
    } else if (item === "bnb" && inactiveBoard === true) {
      setPrizes(dummyPrizes);
    } else if (item === "skale" && inactiveBoard === false) {
      setPrizes(dummyPrizes);
    } else if (item === "skale" && inactiveBoard === true) {
      setPrizes(dummyPrizes);
    } else if (item === "wod" && inactiveBoard === false) {
      setPrizes(dummyPrizes);
    } else if (item === "wod" && inactiveBoard === true) {
      setPrizes(dummyPrizes);
    }
  };
  const fillRecords = (itemData) => {
    if (itemData.length === 0) {
      setRecords(placeholderplayerData);
    } else if (itemData.length < 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setRecords(finalData);
    }
  };

  const fillRecordsGenesis = (itemData) => {
    if (itemData.length === 0) {
      setgenesisData(placeholderplayerData);
    } else if (itemData.length < 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setgenesisData(finalData);
    }
  };

  const fillRecordsSkale = (itemData) => {
    if (itemData.length === 0) {
      setskaleRecords(placeholderplayerData);
    } else if (itemData.length < 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setskaleRecords(finalData);
    }
  };

  const fillPreviousRecordsSkale = (itemData) => {
    if (itemData.length === 0) {
      setskalePreviousRecords(placeholderplayerData);
    } else if (itemData.length < 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setskalePreviousRecords(finalData);
    }
  };
  const fillRecordsSkaleMonthly = (itemData) => {
    if (itemData.length === 0) {
      setSkaleMonthlyData(placeholderplayerData);
    } else if (itemData.length < 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setSkaleMonthlyData(finalData);
    }
  };

  const fillPreviousRecordsSkaleMonthly = (itemData) => {
    if (itemData.length === 0) {
      setSkalePreviousMonthlyData(placeholderplayerData);
    } else if (itemData.length < 10) {
      const testArray = itemData;
      const placeholderArray = placeholderplayerData.slice(itemData.length, 10);
      const finalData = [...testArray, ...placeholderArray];
      setSkalePreviousMonthlyData(finalData);
    }
  };

  const fetchSkaleRecords = async () => {
    const data = {
      StatisticName: "LeaderboardSkaleWeekly",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data).catch((err) => {
      console.log(err);
    });
    setskalepreviousVersion(result.data.data.version);

    setskaleRecords(result.data.data.leaderboard);
    fillRecordsSkale(result.data.data.leaderboard);
  };

  const fetchPreviousSkaleRecords = async () => {
    if (skalepreviousVersion != 0) {
      const data = {
        StatisticName: "LeaderboardSkaleWeekly",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: skalepreviousVersion - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      ).catch((err) => {
        console.log(err);
      });
      // setpreviousVersion(parseInt(result.data.data.version));
      setskalePreviousRecords(result.data.data.leaderboard);
      fillPreviousRecordsSkale(result.data.data.leaderboard);
    }
  };
  const fetchSkaleRecordsMonthly = async () => {
    const data = {
      StatisticName: "LeaderboardSkaleMonthly",
      StartPosition: 0,
      MaxResultsCount: 10,
    };
    const result = await axios.post(`${backendApi}/auth/GetLeaderboard`, data).catch((err) => {
      console.log(err);
    });
    setskalepreviousVersion(result.data.data.version);

    setSkaleMonthlyData(result.data.data.leaderboard);
    fillRecordsSkaleMonthly(result.data.data.leaderboard);
  };

  const fetchPreviousSkaleRecordsMonthly = async () => {
    if (skalepreviousVersion != 0) {
      const data = {
        StatisticName: "LeaderboardSkaleMonthly",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: skalepreviousVersion - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard`,
        data
      ).catch((err) => {
        console.log(err);
      });
      // setpreviousVersion(parseInt(result.data.data.version));
      setSkalePreviousMonthlyData(result.data.data.leaderboard);
      fillPreviousRecordsSkaleMonthly(result.data.data.leaderboard);
    }
  };

  const fetchPreviousWinners = async () => {
    if (previousVersion != 0) {
      const data = {
        StatisticName: "DailyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: previousVersion - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      ).catch((err) => {
        console.log(err);
      });

      setdailyplayerData(result.data.data.leaderboard);
    }
  };

  const fetchGenesisPreviousWinners = async () => {
    if (previousGenesisVersion != 0) {
      const data = {
        StatisticName: "GenesisLandRewards",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: previousGenesisVersion - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      ).catch((err) => {
        console.log(err);
      });
      fillRecordsGenesis(result.data.data.leaderboard);

      setpreviousgenesisData(result.data.data.leaderboard);
    }
  };

  const fetchPreviousWeeklyWinners = async () => {
    if (previousWeeklyVersion != 0) {
      const data = {
        StatisticName: "WeeklyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: previousWeeklyVersion - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      ).catch((err) => {
        console.log(err);
      });

      setweeklyplayerData(result.data.data.leaderboard);
    }
  };

  const fetchPreviousMonthlyWinners = async () => {
    if (previousMonthlyVersion != 0) {
      const data = {
        StatisticName: "MonthlyLeaderboard",
        StartPosition: 0,
        MaxResultsCount: 10,
        Version: previousMonthlyVersion - 1,
      };
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboard?Version=-1`,
        data
      ).catch((err) => {
        console.log(err);
      });

      setmonthlyplayerData(result.data.data.leaderboard);
    }
  };

  useEffect(() => {
    fetchDailyRecords();
    fetchWeeklyRecords();
    fetchMonthlyRecords();
    fetchGenesisRecords();
    fetchSkaleRecords();
    fetchSkaleRecordsMonthly();
  }, []);

  useEffect(() => {
    fetchGenesisPreviousWinners();
    fetchPreviousWinners();
    fetchPreviousWeeklyWinners();
    fetchPreviousMonthlyWinners();
    fetchPreviousSkaleRecords();
    fetchPreviousSkaleRecordsMonthly();
  }, [
    previousGenesisVersion,
    previousMonthlyVersion,
    previousVersion,
    previousWeeklyVersion,
  ]);

  // useEffect(() => {
  //   handleOption(optionText);
  // }, [inactiveBoard]);

  useEffect(() => {
    if (countdown === null || countdown === undefined || countdown === "0") {
      setisActive(false);
    } else setisActive(true);
  }, [countdown]);

  useEffect(() => {
    setOptionText2("bnb");
  }, []);

  return (
    <div
      className="d-flex flex-column gap-3 leaderboard-wrapper mt-4 position-relative"
      // style={{ alignSelf: "baseline", minWidth: "92%", maxWidth: "92%" }}
    >
      {/* <div className="nft-hover">
        <div className="d-flex flex-column align-items-center gap-4">
          <div className="nft-hover-wrapper d-flex flex-column align-items-center">
            <div className="d-flex align-items-center nft-badges-wrapper gap-4 gap-lg-0">
              <a
                href="https://opensea.io/collection/catsandwatchessocietycaws"
                target="_blank"
              >
                <img src={cawsBadge} alt="" className="opensea-badge" />
              </a>
              <a
                href="https://opensea.io/collection/worldofdypians"
                target="_blank"
              >
                <img src={genesisBadge} alt="" className="opensea-badge" />
              </a>
            </div>
            <span
              className="nft-hover-desc"
              style={{ position: "relative", top: "-22px" }}
            >
              CAWS and WOD owners are granted VIP access and also benefit from
              appealing rewards.
            </span>
          </div>
        </div>
      </div> */}
      {countdown !== "0" && countdown && (
        <Countdown
          date={Number(countdown) * 1000}
          renderer={renderer}
          onComplete={() => {
            setcountdown();
          }}
        />
      )}
      <h2
        className={`font-organetto d-flex gap-1 align-items-center  leaderboardTitle justify-content-between`}
      >
        Leaderboard
        <OutsideClickHandler onOutsideClick={() => setTooltip(false)}>
          <div className="d-flex align-items-center gap-2 position-relative">
            <img
              src={'https://cdn.worldofdypians.com/wod/tooltip.svg'}
              alt=""
              className="tooltip-icon"
              style={{ cursor: "pointer", width: "20px", height: "20px" }}
              onClick={() => setTooltip(!tooltip)}
            />
            <div
              className={`tooltip-wrapper p-3 ${tooltip && "tooltip-active"}`}
              style={{ width: 350, right: "20%" }}
            >
              <p className="tooltip-content">
                BNB Chain Leaderboard: In World of Dypians, the BNB Chain
                Leaderboard tracks players' activities related to the BNB Chain,
                such as in-game activities, Daily Bonus, and different events.
                This leaderboard operates on a daily, weekly, and monthly basis,
                with rewards distributed monthly based on players' performance.
                <br />
                <br />
                SKALE Leaderboard: In World of Dypians, the SKALE Leaderboard
                tracks players' activities related to SKALE, such as Daily Bonus
                and Treasure Hunt. This leaderboard operates on a weekly basis,
                with rewards distributed weekly based on players' performance.
                <br />
                <br />
                Genesis Leaderboard: In World of Dypians, the Genesis
                Leaderboard is a monthly competition exclusive to Genesis Land
                NFT owners. This leaderboard tracks players' activities on their
                Genesis Land, such as hitting the gem once a day, to earn points
                for BNB Chain leaderboard. Players have the opportunity to earn
                rewards in USD based on the amount that the genesis gem gives.
              </p>
            </div>
          </div>
        </OutsideClickHandler>
      </h2>
      <div className="grandPrices-wrapper position-relative"></div>
      <div className="d-flex align-items-center gap-1">
        <div className="optionsWrapper position-relative col-12">
          <div
            className={`optionswrapper-bg-home ${
              optionText2 === "skale"
                ? "move-1-home"
                : optionText2 === "wod"
                ? "move-2-home"
                : ""
            }`}
          ></div>

          <div
            className="d-flex gap-1 align-items-center justify-content-between position-relative"
            style={{ height: 38 }}
          >
            <span
              className={`
                d-flex align-items-center gap-2
                ${optionText2 === "bnb" && "otheroptionsActive"} optionText `}
              onClick={() => {
                handleOption("bnb");
                fetchGenesisRecords();
              }}
              style={{ width: "33%", fontSize: "12px" }}
            >
              <img
                src={optionText2 === "bnb" ? bnbActive : bnbInactive}
                className={`${
                  optionText2 === "bnb"
                    ? "leaderboard-icon leaderboard-icon-active"
                    : "leaderboard-icon"
                }`}
                width={20}
                height={20}
                alt=""
              />
              {windowSize.width > 768
                ? "BNB Chain"
                : windowSize.width < 786 && optionText2 === "bnb"
                ? "BNB Chain"
                : ""}
            </span>

            <span
              className={` 
                d-flex align-items-center gap-2
                ${optionText2 === "skale" && "otheroptionsActive"} optionText `}
              style={{ width: "33%", fontSize: "12px" }}
              onClick={() => {
                handleOption("skale");
                fetchWeeklyRecords();
              }}
            >
              <img
                src={optionText2 === "skale" ? skaleActive : skaleInactive}
                className={`${
                  optionText2 === "skale"
                    ? "leaderboard-icon leaderboard-icon-active"
                    : "leaderboard-icon"
                }`}
                width={20}
                height={20}
                alt=""
              />
              {windowSize.width > 768
                ? "SKALE"
                : windowSize.width < 786 && optionText2 === "skale"
                ? "SKALE"
                : ""}
            </span>
            <span
              className={`
                d-flex align-items-center gap-2
                
                ${optionText2 === "wod" && "otheroptionsActive"} optionText `}
              style={{ width: "33%", fontSize: "12px" }}
              onClick={() => {
                handleOption("wod");
                fetchMonthlyRecords();
              }}
            >
              <img
                src={optionText2 === "wod" ? wodActive : wodInactive}
                className={`${
                  optionText2 === "monthly"
                    ? "leaderboard-icon leaderboard-icon-active"
                    : "leaderboard-icon"
                }`}
                width={20}
                height={20}
                style={{ borderRadius: "50%" }}
                alt=""
              />
              {windowSize.width > 768
                ? "Genesis Land"
                : windowSize.width < 786 && optionText2 === "wod"
                ? "Genesis Land"
                : ""}
            </span>
          </div>
        </div>
      </div>
      {optionText2 === "bnb" && (
        <Slider {...settings} ref={sliderRef}>
          <div className="leaderboard-item d-flex flex-column gap-2 p-0">
            <div className="d-flex w-100 position-relative justify-content-between leaderboard-title-wrapper p-2">
              <img
                src={leftArrow}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={prevSlide}
              />
              <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                DAILY
              </h6>
              <img
                src={rightArrow}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={nextSlide}
              />
              <div
                className="d-flex flex-column px-2 reset-time-wrapper"
                style={{ right: "8%" }}
              >
                <span className="reset-time-lb">Reset time</span>
                <span className="reset-time-lb-value">Daily (00:00 UTC)</span>
              </div>
            </div>
            <div className="p-2">
              <table className="playerTable w-100">
                <tbody>
                  <tr className="playerRow">
                    <th className="playerHeader font-montserrat">Rank</th>
                    <th className="playerHeader font-montserrat">Player</th>
                    {optionText !== "genesis" && (
                      <th className="playerHeader text-center font-montserrat">
                        Score
                      </th>
                    )}
                    {optionText !== "genesis" && (
                      <th className="playerHeader text-center font-montserrat">
                        Reward
                      </th>
                    )}
                    <th className="playerHeader text-center font-montserrat">
                      Golden Pass
                    </th>
                  </tr>
                  {dailyrecords &&
                    inactiveBoard === false &&
                    dailyrecords.length > 0 &&
                    dailyrecords.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={`playerInnerRow ${
                            inactiveBoard || item.displayName === username
                              ? "playerInnerRow-inactive"
                              : null
                          }`}
                        >
                          <td className="playerData col-1 font-montserrat">
                            {playerData[index].position}
                          </td>
                          <td className="playerName col-5 font-montserrat">
                            {item.displayName === username ? (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/premiumAvatar.png'}
                                  alt=""
                                  className="playerAvatar"
                                />
                                <span>
                                  {" "}
                                  {item.displayName?.slice(0, 13)}
                                  {item.displayName?.length > 13 && "..."}
                                </span>
                              </div>
                            ) : (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/userAvatar2.png'}
                                  alt=""
                                  className="playerAvatar"
                                />{" "}
                                {item.displayName?.slice(0, 13)}
                                {item.displayName?.length > 13 && "..."}
                              </div>
                            )}
                          </td>
                          <td className="playerScore col-2 text-center font-montserrat">
                            {getFormattedNumber(item.statValue, 0)}
                          </td>
                          <td
                            className={`playerReward text-center col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "playerReward"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(dailyPrizes[index], 0)}
                            </div>
                          </td>
                          <td
                            className={`playerReward  mb-0 ${
                              optionText2 === "skale" && "premium-goldenscore"
                            } col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "goldenscore-inactive2"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(dailyPrizesGolden[index], 0)}
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                  {dailyplayerData &&
                    inactiveBoard === true &&
                    dailyplayerData.length > 0 &&
                    dailyplayerData.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={`playerInnerRow ${
                            inactiveBoard || item.displayName === username
                              ? "playerInnerRow-inactive"
                              : null
                          }`}
                        >
                          <td className="playerData col-1 font-montserrat">
                            {playerData[index].position}
                          </td>
                          <td className="playerName col-5 font-montserrat">
                            {item.displayName === username ? (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/premiumAvatar.png'}
                                  alt=""
                                  className="playerAvatar"
                                />
                                <span>
                                  {" "}
                                  {item.displayName?.slice(0, 13)}
                                  {item.displayName?.length > 13 && "..."}
                                </span>
                              </div>
                            ) : (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/userAvatar2.png'}
                                  alt=""
                                  className="playerAvatar"
                                />{" "}
                                {item.displayName?.slice(0, 13)}
                                {item.displayName?.length > 13 && "..."}
                              </div>
                            )}
                          </td>
                          <td className="playerScore col-2 text-center font-montserrat">
                            {getFormattedNumber(item.statValue, 0)}
                          </td>
                          <td
                            className={`playerReward text-center col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "playerReward"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(dailyPrizes[index], 0)}
                            </div>
                          </td>
                          <td
                            className={`playerReward  mb-0 ${
                              optionText2 === "skale" && "premium-goldenscore"
                            } col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "goldenscore-inactive2"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(dailyPrizesGolden[index], 0)}
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                  {inactiveBoard === true && dailyplayerData.length === 0 && (
                    <CircularProgress
                      size={20}
                      style={{ alignSelf: "center", margin: "auto" }}
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="leaderboard-item d-flex flex-column gap-2 p-0">
            <div
              className={`d-flex w-100 position-relative ${
                optionText2 !== "skale"
                  ? "justify-content-between"
                  : "justify-content-center p-2"
              } leaderboard-title-wrapper p-2`}
            >
              {optionText2 !== "skale" && (
                <img
                  src={leftArrow}
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={prevSlide}
                />
              )}
              <h6
                className="leaderboard-title  text-white font-oxanium mb-0"
                style={{ width: "fit-content" }}
              >
                WEEKLY
              </h6>
              {optionText2 !== "skale" && (
                <img
                  src={rightArrow}
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={nextSlide}
                />
              )}
              <div
                className="d-flex flex-column px-2 reset-time-wrapper"
                style={{ right: optionText2 !== "skale" ? "8%" : "0%" }}
              >
                <span className="reset-time-lb">Reset time</span>
                <span className="reset-time-lb-value">Monday (00:00 UTC)</span>
              </div>
            </div>
            <div className="p-2">
              <table className="playerTable w-100">
                <tbody>
                  <tr className="playerRow">
                    <th className="playerHeader font-montserrat">Rank</th>
                    <th className="playerHeader font-montserrat">Player</th>
                    {optionText !== "genesis" && (
                      <th className="playerHeader text-center font-montserrat">
                        Score
                      </th>
                    )}
                    {optionText !== "genesis" && (
                      <th className="playerHeader text-center font-montserrat">
                        Reward
                      </th>
                    )}
                    <th className="playerHeader text-center font-montserrat">
                      {optionText2 === "skale" ? "Prime" : "Golden Pass"}
                    </th>
                  </tr>
                  {weeklyrecords &&
                    inactiveBoard === false &&
                    weeklyrecords.length > 0 &&
                    weeklyrecords.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={`playerInnerRow ${
                            inactiveBoard || item.displayName === username
                              ? "playerInnerRow-inactive"
                              : null
                          }`}
                        >
                          <td className="playerData col-1 font-montserrat">
                            {item.position + 1}
                          </td>
                          <td className="playerName col-5 font-montserrat">
                            {item.displayName === username ? (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/premiumAvatar.png'}
                                  alt=""
                                  className="playerAvatar"
                                />
                                <span>
                                  {" "}
                                  {item.displayName?.slice(0, 13)}
                                  {item.displayName?.length > 13 && "..."}
                                </span>
                              </div>
                            ) : (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/userAvatar2.png'}
                                  alt=""
                                  className="playerAvatar"
                                />{" "}
                                {item.displayName?.slice(0, 13)}
                                {item.displayName?.length > 13 && "..."}
                              </div>
                            )}
                          </td>
                          <td className="playerScore col-2 text-center font-montserrat">
                            {getFormattedNumber(item.statValue, 0)}
                          </td>
                          <td
                            className={`playerReward text-center col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "playerReward"
                            }`}
                          >
                            ${getFormattedNumber(weeklyPrizes[index], 0)}
                          </td>
                          <td
                            className={`playerReward  mb-0 ${
                              optionText2 === "skale" && "premium-goldenscore"
                            } col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "goldenscore-inactive2"
                            }`}
                          >
                            ${getFormattedNumber(weeklyPrizesGolden[index], 0)}
                          </td>
                        </tr>
                      );
                    })}
                  {weeklyplayerData &&
                    inactiveBoard === true &&
                    weeklyplayerData.length > 0 &&
                    weeklyplayerData.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={`playerInnerRow ${
                            inactiveBoard || item.displayName === username
                              ? "playerInnerRow-inactive"
                              : null
                          }`}
                        >
                          <td className="playerData col-1 font-montserrat">
                            {item.position + 1}
                          </td>
                          <td className="playerName col-5 font-montserrat">
                            {item.displayName === username ? (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/premiumAvatar.png'}
                                  alt=""
                                  className="playerAvatar"
                                />
                                <span>
                                  {" "}
                                  {item.displayName?.slice(0, 13)}
                                  {item.displayName?.length > 13 && "..."}
                                </span>
                              </div>
                            ) : (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/userAvatar2.png'}
                                  alt=""
                                  className="playerAvatar"
                                />{" "}
                                {item.displayName?.slice(0, 13)}
                                {item.displayName?.length > 13 && "..."}
                              </div>
                            )}
                          </td>
                          <td className="playerScore col-2 text-center font-montserrat">
                            {getFormattedNumber(item.statValue, 0)}
                          </td>
                          <td
                            className={`playerReward text-center col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "playerReward"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(weeklyPrizes[index], 0)}
                            </div>
                          </td>
                          <td
                            className={`playerReward  mb-0 ${
                              optionText2 === "skale" && "premium-goldenscore"
                            } col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "goldenscore-inactive2"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              $
                              {getFormattedNumber(weeklyPrizesGolden[index], 0)}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  {inactiveBoard === true &&
                    ((dailyplayerData.length === 0 && optionText === "daily") ||
                      (weeklyplayerData.length === 0 &&
                        optionText === "weekly") ||
                      (monthlyplayerData.length === 0 &&
                        optionText === "monthly")) &&
                    optionText !== "genesis" && (
                      <CircularProgress
                        size={20}
                        style={{ alignSelf: "center", margin: "auto" }}
                      />
                    )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="leaderboard-item d-flex flex-column gap-2 p-0">
            <div
              className={`d-flex w-100 position-relative ${
                optionText2 !== "wod"
                  ? "justify-content-between"
                  : "justify-content-center p-2"
              } leaderboard-title-wrapper p-2`}
            >
              {optionText2 !== "wod" && (
                <img
                  src={leftArrow}
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={prevSlide}
                />
              )}
              <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                MONTHLY
              </h6>
              {optionText2 !== "wod" && (
                <img
                  src={rightArrow}
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={nextSlide}
                />
              )}
              <div
                className="d-flex flex-column px-2 reset-time-wrapper"
                style={{ right: optionText2 !== "wod" ? "8%" : "0%" }}
              >
                <span className="reset-time-lb">Reset time</span>
                <span className="reset-time-lb-value">Monthly (00:00 UTC)</span>
              </div>
            </div>
            <div className="p-2">
              <table className="playerTable w-100">
                <tbody>
                  <tr className="playerRow">
                    <th className="playerHeader font-montserrat">Rank</th>
                    <th className="playerHeader font-montserrat">Player</th>
                    {optionText !== "genesis" && (
                      <th className="playerHeader text-center font-montserrat">
                        Score
                      </th>
                    )}
                    {optionText !== "genesis" && (
                      <th className="playerHeader text-center font-montserrat">
                        Reward
                      </th>
                    )}
                    <th className="playerHeader text-center font-montserrat">
                      Golden Pass
                    </th>
                  </tr>
                  {monthlyrecords &&
                    monthlyrecords.length > 0 &&
                    inactiveBoard === false &&
                    monthlyrecords.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={`playerInnerRow ${
                            inactiveBoard || item.displayName === username
                              ? "playerInnerRow-inactive"
                              : null
                          }`}
                        >
                          <td className="playerData col-1 font-montserrat">
                            {item.position + 1}
                          </td>
                          <td className="playerName col-5 font-montserrat">
                            {item.displayName === username ? (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/premiumAvatar.png'}
                                  alt=""
                                  className="playerAvatar"
                                />
                                <span>
                                  {" "}
                                  {item.displayName?.slice(0, 13)}
                                  {item.displayName?.length > 13 && "..."}
                                </span>
                              </div>
                            ) : (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/userAvatar2.png'}
                                  alt=""
                                  className="playerAvatar"
                                />{" "}
                                {item.displayName?.slice(0, 13)}
                                {item.displayName?.length > 13 && "..."}
                              </div>
                            )}
                          </td>
                          <td className="playerScore col-2 text-center font-montserrat">
                            {getFormattedNumber(item.statValue, 0)}
                          </td>
                          <td
                            className={`playerReward text-center col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "playerReward"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(monthlyPrizes[index], 0)}
                            </div>
                          </td>
                          <td
                            className={`playerReward  mb-0 ${
                              optionText2 === "skale" && "premium-goldenscore"
                            } col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "goldenscore-inactive2"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              $
                              {getFormattedNumber(
                                monthlyPrizesGolden[index],
                                0
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                  {monthlyplayerData &&
                    inactiveBoard === true &&
                    monthlyplayerData.length > 0 &&
                    monthlyplayerData.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={`playerInnerRow ${
                            inactiveBoard || item.displayName === username
                              ? "playerInnerRow-inactive"
                              : null
                          }`}
                        >
                          <td className="playerData col-1 font-montserrat">
                            {item.position + 1}
                          </td>
                          <td className="playerName col-5 font-montserrat">
                            {item.displayName === username ? (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/premiumAvatar.png'}
                                  alt=""
                                  className="playerAvatar"
                                />
                                <span>
                                  {" "}
                                  {item.displayName?.slice(0, 13)}
                                  {item.displayName?.length > 13 && "..."}
                                </span>
                              </div>
                            ) : (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/userAvatar2.png'}
                                  alt=""
                                  className="playerAvatar"
                                />{" "}
                                {item.displayName?.slice(0, 13)}
                                {item.displayName?.length > 13 && "..."}
                              </div>
                            )}
                          </td>
                          <td className="playerScore col-2 text-center font-montserrat">
                            {getFormattedNumber(item.statValue, 0)}
                          </td>
                          <td
                            className={`playerReward text-center col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "playerReward"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(monthlyPrizes[index], 0)}
                            </div>
                          </td>
                          <td
                            className={`playerReward  mb-0 ${
                              optionText2 === "skale" && "premium-goldenscore"
                            } col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "goldenscore-inactive2"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              $
                              {getFormattedNumber(
                                monthlyPrizesGolden[index],
                                0
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                  {inactiveBoard === true &&
                    ((dailyplayerData.length === 0 && optionText === "daily") ||
                      (weeklyplayerData.length === 0 &&
                        optionText === "weekly") ||
                      (monthlyplayerData.length === 0 &&
                        optionText === "monthly")) &&
                    optionText !== "genesis" && (
                      <CircularProgress
                        size={20}
                        style={{ alignSelf: "center", margin: "auto" }}
                      />
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </Slider>
      )}
      {optionText2 === "wod" && (
        <Slider {...settings} ref={sliderRef}>
          <div className="leaderboard-item d-flex flex-column gap-2 p-0">
            <div
              className={`d-flex w-100 position-relative  
                   justify-content-center p-2
               leaderboard-title-wrapper p-2`}
            >
              <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                MONTHLY
              </h6>
              <div className="d-flex flex-column px-2 reset-time-wrapper">
                <span className="reset-time-lb">Reset time</span>
                <span className="reset-time-lb-value">Monthly (00:00 UTC)</span>
              </div>
            </div>
            <div className="p-2">
              <table className="playerTable w-100">
                <tbody>
                  <tr className="playerRow">
                    <th className="playerHeader font-montserrat">Rank</th>
                    <th className="playerHeader font-montserrat">Player</th>

                    <th className="playerHeader text-center font-montserrat">
                      Reward
                    </th>
                  </tr>
                  {genesisData &&
                    genesisData.length > 0 &&
                    inactiveBoard === false &&
                    genesisData.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={`playerInnerRow ${
                            inactiveBoard || item.displayName === username
                              ? "playerInnerRow-inactive"
                              : null
                          }`}
                        >
                          <td className="playerData col-1 font-montserrat">
                            {item.position + 1}
                          </td>
                          <td className="playerName col-5 font-montserrat">
                            {item.displayName === username ? (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/premiumAvatar.png'}
                                  alt=""
                                  className="playerAvatar"
                                />
                                <span>
                                  {" "}
                                  {item.displayName?.slice(0, 13)}
                                  {item.displayName?.length > 13 && "..."}
                                </span>
                              </div>
                            ) : (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/userAvatar2.png'}
                                  alt=""
                                  className="playerAvatar"
                                />{" "}
                                {item.displayName?.slice(0, 13)}
                                {item.displayName?.length > 13 && "..."}
                              </div>
                            )}
                          </td>
                          <td className="playerScore col-2 text-center font-montserrat">
                            ${getFormattedNumber(item.statValue, 0)}
                          </td>
                          {/* <td
                            className={`playerReward text-center col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "playerReward"
                            }`}
                          >
                            ${getFormattedNumber(monthlyPrizes[index], 0)}
                          </td>
                          <td
                            className={`playerReward col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "goldenscore-inactive2"
                            }`}
                          >
                            +$
                            {getFormattedNumber(monthlyPrizesGolden[index], 0)}
                          </td> */}
                        </tr>
                      );
                    })}

                  {previousgenesisData &&
                    inactiveBoard === true &&
                    previousgenesisData.length > 0 &&
                    previousgenesisData.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={`playerInnerRow ${
                            inactiveBoard || item.displayName === username
                              ? "playerInnerRow-inactive"
                              : null
                          }`}
                        >
                          <td className="playerData col-1 font-montserrat">
                            {item.position + 1}
                          </td>
                          <td className="playerName col-5 font-montserrat">
                            {item.displayName === username ? (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/premiumAvatar.png'}
                                  alt=""
                                  className="playerAvatar"
                                />
                                <span>
                                  {" "}
                                  {item.displayName?.slice(0, 13)}
                                  {item.displayName?.length > 13 && "..."}
                                </span>
                              </div>
                            ) : (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/userAvatar2.png'}
                                  alt=""
                                  className="playerAvatar"
                                />{" "}
                                {item.displayName?.slice(0, 13)}
                                {item.displayName?.length > 13 && "..."}
                              </div>
                            )}
                          </td>
                          <td className="playerScore col-2 text-center font-montserrat">
                            ${getFormattedNumber(item.statValue, 0)}
                          </td>
                          {/* <td
                            className={`playerReward text-center col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "playerReward"
                            }`}
                          >
                            ${getFormattedNumber(monthlyPrizes[index], 0)}
                          </td>
                          <td
                            className={`playerReward d-flex align-items-center justify-content-center gap-2 mb-0 ${
                              optionText2 === "skale" && "premium-goldenscore"
                            } col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "goldenscore-inactive2"
                            }`}
                            style={{ width: "100%" }}
                          >
                            +$
                            {getFormattedNumber(monthlyPrizesGolden[index], 0)}
                            {optionText2 === "skale" && (
                              <img src={premiumIcon} alt="" />
                            )}
                          </td> */}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </Slider>
      )}

      {optionText2 === "skale" && (
        <Slider {...settings} ref={sliderRef}>
          {/* <div className="leaderboard-item d-flex flex-column gap-2 p-0">
            <div className="d-flex w-100 position-relative justify-content-between leaderboard-title-wrapper p-2">
              <img
                src={leftArrow}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={prevSlide}
              />
              <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                DAILY
              </h6>
              <img
                src={rightArrow}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={nextSlide}
              />
              <div
                className="d-flex flex-column px-2 reset-time-wrapper"
                style={{ right: "8%" }}
              >
                <span className="reset-time-lb">Reset time</span>
                <span className="reset-time-lb-value">Daily (00:00 UTC)</span>
              </div>
            </div>
            <div className="p-2">
              <table className="playerTable w-100">
                <tbody>
                  <tr className="playerRow">
                    <th className="playerHeader font-montserrat">Rank</th>
                    <th className="playerHeader font-montserrat">Player</th>

                    <th className="playerHeader text-center font-montserrat">
                      Score
                    </th>
                    <th className="playerHeader text-center font-montserrat">
                      Reward
                    </th>
                    <th className="playerHeader text-center font-montserrat">
                      Premium
                    </th>
                  </tr>
                  {skaleRecords &&
                    skaleRecords.length > 0 &&
                    inactiveBoard === false &&
                    skaleRecords.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={`playerInnerRow ${
                            inactiveBoard || item.displayName === username
                              ? "playerInnerRow-inactive"
                              : null
                          }`}
                        >
                          <td className="playerData col-1 font-montserrat">
                            {item.position + 1}
                          </td>
                          <td className="playerName col-5 font-montserrat">
                            {item.displayName === username ? (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/premiumAvatar.png'}
                                  alt=""
                                  className="playerAvatar"
                                />
                                <span>
                                  {" "}
                                  {item.displayName?.slice(0, 13)}
                                  {item.displayName?.length > 13 && "..."}
                                </span>
                              </div>
                            ) : (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/userAvatar2.png'}
                                  alt=""
                                  className="playerAvatar"
                                />{" "}
                                {item.displayName?.slice(0, 13)}
                                {item.displayName?.length > 13 && "..."}
                              </div>
                            )}
                          </td>
                          <td className="playerScore col-2 text-center font-montserrat">
                            {getFormattedNumber(item.statValue, 0)}
                          </td>
                          <td
                            className={`playerReward text-center col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "playerReward"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(prizeSkale[index], 0)}
                            </div>
                          </td>
                          <td
                            className={`playerReward  mb-0 ${
                              optionText2 === "skale" && "premium-goldenscore"
                            } col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "goldenscore-inactive2"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(prizeSkale[index], 0)}
                              <img src={premiumIcon} alt="" />
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                  {skalePreviousRecords &&
                    inactiveBoard === true &&
                    skalePreviousRecords.length > 0 &&
                    skalePreviousRecords.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={`playerInnerRow ${
                            inactiveBoard || item.displayName === username
                              ? "playerInnerRow-inactive"
                              : null
                          }`}
                        >
                          <td className="playerData col-1 font-montserrat">
                            {item.position + 1}
                          </td>
                          <td className="playerName col-5 font-montserrat">
                            {item.displayName === username ? (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/premiumAvatar.png'}
                                  alt=""
                                  className="playerAvatar"
                                />
                                <span>
                                  {" "}
                                  {item.displayName?.slice(0, 13)}
                                  {item.displayName?.length > 13 && "..."}
                                </span>
                              </div>
                            ) : (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/userAvatar2.png'}
                                  alt=""
                                  className="playerAvatar"
                                />{" "}
                                {item.displayName?.slice(0, 13)}
                                {item.displayName?.length > 13 && "..."}
                              </div>
                            )}
                          </td>
                          <td className="playerScore col-2 text-center font-montserrat">
                            {getFormattedNumber(item.statValue, 0)}
                          </td>
                        
                          <td
                            className={`playerReward text-center col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "playerReward"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(prizeSkale[index], 0)}
                            </div>
                          </td>
                          <td
                            className={`playerReward  mb-0 ${
                              optionText2 === "skale" && "premium-goldenscore"
                            } col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "goldenscore-inactive2"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(prizeSkale[index], 0)}
                              <img src={premiumIcon} alt="" />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div> */}
          <div className="leaderboard-item d-flex flex-column gap-2 p-0">
            <div className="d-flex w-100 position-relative justify-content-center leaderboard-title-wrapper p-2">
              {/* <img
                src={leftArrow}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={prevSlide}
              /> */}
              <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                WEEKLY
              </h6>
              {/* <img
                src={rightArrow}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={nextSlide}
              /> */}
              <div
                className="d-flex flex-column px-2 reset-time-wrapper"
                style={{ right: "8%" }}
              >
                <span className="reset-time-lb">Reset time</span>
                <span className="reset-time-lb-value">Monday (00:00 UTC)</span>
              </div>
            </div>
            <div className="p-2">
              <table className="playerTable w-100">
                <tbody>
                  <tr className="playerRow">
                    <th className="playerHeader font-montserrat">Rank</th>
                    <th className="playerHeader font-montserrat">Player</th>

                    <th className="playerHeader text-center font-montserrat">
                      Score
                    </th>
                    <th className="playerHeader text-center font-montserrat">
                      Reward
                    </th>
                    <th className="playerHeader text-center font-montserrat">
                    Prime
                    </th>
                  </tr>
                  {skaleRecords &&
                    skaleRecords.length > 0 &&
                    inactiveBoard === false &&
                    skaleRecords.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={`playerInnerRow ${
                            inactiveBoard || item.displayName === username
                              ? "playerInnerRow-inactive"
                              : null
                          }`}
                        >
                          <td className="playerData col-1 font-montserrat">
                            {item.position + 1}
                          </td>
                          <td className="playerName col-5 font-montserrat">
                            {item.displayName === username ? (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/premiumAvatar.png'}
                                  alt=""
                                  className="playerAvatar"
                                />
                                <span>
                                  {" "}
                                  {item.displayName?.slice(0, 13)}
                                  {item.displayName?.length > 13 && "..."}
                                </span>
                              </div>
                            ) : (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/userAvatar2.png'}
                                  alt=""
                                  className="playerAvatar"
                                />{" "}
                                {item.displayName?.slice(0, 13)}
                                {item.displayName?.length > 13 && "..."}
                              </div>
                            )}
                          </td>
                          <td className="playerScore col-2 text-center font-montserrat">
                            {getFormattedNumber(item.statValue, 0)}
                          </td>

                          <td
                            className={`playerReward text-center col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "playerReward"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(prizeSkale[index], 0)}
                            </div>
                          </td>
                          <td
                            className={`playerReward  mb-0 ${
                              optionText2 === "skale" && "premium-goldenscore"
                            } col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "goldenscore-inactive2"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(prizeSkale[index], 0)}
                              <img src={premiumIcon} alt="" />
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                  {skalePreviousRecords &&
                    inactiveBoard === true &&
                    skalePreviousRecords.length > 0 &&
                    skalePreviousRecords.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={`playerInnerRow ${
                            inactiveBoard || item.displayName === username
                              ? "playerInnerRow-inactive"
                              : null
                          }`}
                        >
                          <td className="playerData col-1 font-montserrat">
                            {item.position + 1}
                          </td>
                          <td className="playerName col-5 font-montserrat">
                            {item.displayName === username ? (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/premiumAvatar.png'}
                                  alt=""
                                  className="playerAvatar"
                                />
                                <span>
                                  {" "}
                                  {item.displayName?.slice(0, 13)}
                                  {item.displayName?.length > 13 && "..."}
                                </span>
                              </div>
                            ) : (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/userAvatar2.png'}
                                  alt=""
                                  className="playerAvatar"
                                />{" "}
                                {item.displayName?.slice(0, 13)}
                                {item.displayName?.length > 13 && "..."}
                              </div>
                            )}
                          </td>
                          <td className="playerScore col-2 text-center font-montserrat">
                            {getFormattedNumber(item.statValue, 0)}
                          </td>

                          <td
                            className={`playerReward text-center col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "playerReward"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(prizeSkale[index], 0)}
                            </div>
                          </td>
                          <td
                            className={`playerReward  mb-0 ${
                              optionText2 === "skale" && "premium-goldenscore"
                            } col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "goldenscore-inactive2"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(prizeSkale[index], 0)}
                              <img src={premiumIcon} alt="" />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          {/* <div className="leaderboard-item d-flex flex-column gap-2 p-0">
            <div className="d-flex w-100 position-relative justify-content-between leaderboard-title-wrapper p-2">
              <img
                src={leftArrow}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={prevSlide}
              />
              <h6 className="leaderboard-title  text-white font-oxanium mb-0">
                MONTHLY
              </h6>
              <img
                src={rightArrow}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={nextSlide}
              />
              <div
                className="d-flex flex-column px-2 reset-time-wrapper"
                style={{ right: "8%" }}
              >
                <span className="reset-time-lb">Reset time</span>
                <span className="reset-time-lb-value">Monthly (00:00 UTC)</span>
              </div>
            </div>
            <div className="p-2">
              <table className="playerTable w-100">
                <tbody>
                  <tr className="playerRow">
                    <th className="playerHeader font-montserrat">Rank</th>
                    <th className="playerHeader font-montserrat">Player</th>

                    <th className="playerHeader text-center font-montserrat">
                      Score
                    </th>
                    <th className="playerHeader text-center font-montserrat">
                      Reward
                    </th>
                    <th className="playerHeader text-center font-montserrat">
                      Premium
                    </th>
                  </tr>
                  {skaleMonthlyData &&
                    skaleMonthlyData.length > 0 &&
                    inactiveBoard === false &&
                    skaleMonthlyData.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={`playerInnerRow ${
                            inactiveBoard || item.displayName === username
                              ? "playerInnerRow-inactive"
                              : null
                          }`}
                        >
                          <td className="playerData col-1 font-montserrat">
                            {item.position + 1}
                          </td>
                          <td className="playerName col-5 font-montserrat">
                            {item.displayName === username ? (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/premiumAvatar.png'}
                                  alt=""
                                  className="playerAvatar"
                                />
                                <span>
                                  {" "}
                                  {item.displayName?.slice(0, 13)}
                                  {item.displayName?.length > 13 && "..."}
                                </span>
                              </div>
                            ) : (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/userAvatar2.png'}
                                  alt=""
                                  className="playerAvatar"
                                />{" "}
                                {item.displayName?.slice(0, 13)}
                                {item.displayName?.length > 13 && "..."}
                              </div>
                            )}
                          </td>
                          <td className="playerScore col-2 text-center font-montserrat">
                            {getFormattedNumber(item.statValue, 0)}
                          </td>

                          <td
                            className={`playerReward text-center col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "playerReward"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(prizeSkale[index], 0)}
                            </div>
                          </td>
                          <td
                            className={`playerReward  mb-0 ${
                              optionText2 === "skale" && "premium-goldenscore"
                            } col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "goldenscore-inactive2"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(prizeSkale[index], 0)}
                              <img src={premiumIcon} alt="" />
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                  {skalePreviousMonthlyData &&
                    inactiveBoard === true &&
                    skalePreviousMonthlyData.length > 0 &&
                    skalePreviousMonthlyData.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={`playerInnerRow ${
                            inactiveBoard || item.displayName === username
                              ? "playerInnerRow-inactive"
                              : null
                          }`}
                        >
                          <td className="playerData col-1 font-montserrat">
                            {item.position + 1}
                          </td>
                          <td className="playerName col-5 font-montserrat">
                            {item.displayName === username ? (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/premiumAvatar.png'}
                                  alt=""
                                  className="playerAvatar"
                                />
                                <span>
                                  {" "}
                                  {item.displayName?.slice(0, 13)}
                                  {item.displayName?.length > 13 && "..."}
                                </span>
                              </div>
                            ) : (
                              <div className="position-relative d-flex align-items-center">
                                <img
                                  src={'https://cdn.worldofdypians.com/wod/userAvatar2.png'}
                                  alt=""
                                  className="playerAvatar"
                                />{" "}
                                {item.displayName?.slice(0, 13)}
                                {item.displayName?.length > 13 && "..."}
                              </div>
                            )}
                          </td>
                          <td className="playerScore col-2 text-center font-montserrat">
                            {getFormattedNumber(item.statValue, 0)}
                          </td>
                          <td
                            className={`playerReward text-center col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "playerReward"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(prizeSkale[index], 0)}
                            </div>
                          </td>
                          <td
                            className={`playerReward  mb-0 ${
                              optionText2 === "skale" && "premium-goldenscore"
                            } col-2 font-montserrat ${
                              username === item.displayName
                                ? "goldenscore"
                                : "goldenscore-inactive2"
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              ${getFormattedNumber(prizeSkale[index], 0)}
                              <img src={premiumIcon} alt="" />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div> */}
        </Slider>
      )}

      <div className="optionsWrapper p-2">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between gap-2 align-items-center">
            <span className="viewWinners">View previous winners</span>
            <Switch
              {...label}
              onChange={() => {
                setInactiveBoard(!inactiveBoard);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHomeLeaderboard;
