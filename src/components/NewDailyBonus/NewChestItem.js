import React, { useState, useEffect } from "react";
import premiumLock from "./assets/premiumLock.png";
import errorSound from "./assets/error.mp3";
import axios from "axios";
import Web3 from "web3";

const NewChestItem = ({
  item,
  selectedChest,
  chainId,
  chain,
  isPremium,
  onClaimRewards,
  onLoadingChest,
  onChestStatus,
  handleShowRewards,
  address,
  email,
  rewardTypes,
  chestId,
  chestIndex,
  open,
  disableBtn,
  isActive,
  isActiveIndex,
  buyNftPopup,
  dummypremiumChests,
  claimingChest,
  setClaimingChest,
  image,
}) => {
  const [shake, setShake] = useState(false);
  const [ischestOpen, setIsChestOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const premiumImages = [
    "blueCrystal",
    "purpleCrystal",
    "cyanCrystal",
    "greenCrystal",
    "yellowCrystal",
    "greenCrystal",
    "cyanCrystal",
    "blueCrystal",
    "yellowCrystal",
    "purpleCrystal",
  ];

  const getUserRewardsByChest2 = async (
    userEmail,
    txHash,
    chestId,
    chainText
  ) => {
    const userData = {
      transactionHash: txHash,
      emailAddress: userEmail,
      chestIndex: chestId,
    };

    const userData_bnb = {
      transactionHash: txHash,
      emailAddress: userEmail,
      chestIndex: chestId,
      chainId: chainText,
    };

    if (chainText) {
      const result = await axios.post(
        "https://worldofdypiansdailybonus.azurewebsites.net/api/CollectChest",
        userData_bnb
      );
      if (result.status === 200) {
        onClaimRewards(result.data);
        setIsChestOpen(true);

        // onChestStatus("success");
        onLoadingChest(false);
        setLoading(false);
        setClaimingChest(false);
      } else {
        onLoadingChest(false);
        setLoading(false);
        setClaimingChest(false);
        setIsChestOpen(false);
        window.alertify.error(result?.message);
        onChestStatus("initial");
      }
    } else {
      const result = await axios.post(
        "https://worldofdypiansdailybonus.azurewebsites.net/api/CollectChest",
        userData
      );
      if (result.status === 200) {
        onClaimRewards(result.data);
        setIsChestOpen(true);
        // onChestStatus("success");
        onLoadingChest(false);
        setLoading(false);
        setClaimingChest(false);
      } else {
        onLoadingChest(false);
        setLoading(false);
        setClaimingChest(false);

        setIsChestOpen(false);
        window.alertify.error(result?.message);
        onChestStatus("error");
        setTimeout(() => {
          onChestStatus("initial");
        }, 3000);
      }
    }
  };

  const handleSecondTask = async (wallet) => {
    const result2 = await axios
      .get(
        `https://api.worldofdypians.com/api/airdrop-alliance/task8/${wallet}`
      )
      .catch((err) => {
        console.error(err);
      });

    if (result2 && result2.status === 200) {
      console.log(result2);
    }
  };

  const getUserRewardsByChest = async (
    userEmail,
    txHash,
    chestId,
    chainText
  ) => {
    const userData = {
      transactionHash: txHash,
      emailAddress: userEmail,
      chestIndex: chestId,
    };

    const userData_bnb = {
      transactionHash: txHash,
      emailAddress: userEmail,
      chestIndex: chestId,
      chainId: chainText,
    };

    if (chainText) {
      const result = await axios
        .post(
          "https://worldofdypiansdailybonus.azurewebsites.net/api/CollectChest",
          userData_bnb
        )
        .catch((e) => {
          onLoadingChest(false);
          setLoading(false);
          setClaimingChest(false);

          setIsChestOpen(false);
          window.alertify.error(e?.message);
          onChestStatus("error");
          setTimeout(() => {
            onChestStatus("initial");
          }, 3000);
        });
      if (result.status === 200) {
        onClaimRewards(result.data);

        setIsChestOpen(true);
        // onChestStatus("success");
        onLoadingChest(false);
        setLoading(false);
        setClaimingChest(false);
      } else if (result.status === 400) {
        getUserRewardsByChest2(userEmail, txHash, chestId, chainText);
      }
    } else {
      const result = await axios.post(
        "https://worldofdypiansdailybonus.azurewebsites.net/api/CollectChest",
        userData
      );
      if (result.status === 200) {
        onClaimRewards(result.data);
        setIsChestOpen(true);
        // onChestStatus("success");
        onLoadingChest(false);
        setLoading(false);
        setClaimingChest(false);
      } else if (result.status === 400) {
        getUserRewardsByChest2(userEmail, txHash, chestId, chainText);
      } else {
        onLoadingChest(false);
        setLoading(false);
        setClaimingChest(false);

        setIsChestOpen(false);
        window.alertify.error(result?.message);
        onChestStatus("error");
        setTimeout(() => {
          onChestStatus("initial");
        }, 3000);
      }
    }
  };

  let count = 1;

  const handleCheckIfTxExists = async (
    email,
    txHash,
    chestIndex,
    chainText
  ) => {
    const txResult = await window.web3.eth.getTransaction(txHash).catch((e) => {
      console.error(e);
    });

    if (txResult) {
      getUserRewardsByChest(email, txHash, chestIndex, chainText);
    } else {
      if (count < 10) {
        setTimeout(
          () => {
            handleCheckIfTxExists(txHash);
          },
          count === 9 ? 5000 : 2000
        );
      } else {
        window.alertify.error("Something went wrong.");
        onChestStatus("error");
        onLoadingChest(false);
        setLoading(false);
        setClaimingChest(false);
        setTimeout(() => {
          onChestStatus("initial");
        }, 3000);
      }
    }
    count = count + 1;
  };

  const handleOpenChest = async () => {
    onChestStatus("waiting");
    onLoadingChest(true);
    setLoading(true);
    setClaimingChest(true);

    window.web3 = new Web3(window.ethereum);
    // console.log(window.config.daily_bonus_address, address);
    const daily_bonus_contract = new window.web3.eth.Contract(
      window.DAILY_BONUS_ABI,
      window.config.daily_bonus_address
    );

    const daily_bonus_contract_bnb = new window.web3.eth.Contract(
      window.DAILY_BONUS_BNB_ABI,
      window.config.daily_bonus_bnb_address
    );

    const daily_bonus_contract_skale = new window.web3.eth.Contract(
      window.DAILY_BONUS_SKALE_ABI,
      window.config.daily_bonus_skale_address
    );

    const daily_bonus_contract_core = new window.web3.eth.Contract(
      window.DAILY_BONUS_CORE_ABI,
      window.config.daily_bonus_core_address
    );

    const daily_bonus_contract_viction = new window.web3.eth.Contract(
      window.DAILY_BONUS_VICTION_ABI,
      window.config.daily_bonus_viction_address
    );

    // console.log(daily_bonus_contract);
    if (chainId === 204) {
      if (rewardTypes === "premium" && isPremium) {
        await daily_bonus_contract.methods
          .openPremiumChest()
          .send({
            from: address,
          })
          .then((data) => {
            getUserRewardsByChest(
              email,
              data.transactionHash,
              chestIndex - 1,
              "opbnb"
            );
          })
          .catch((e) => {
            window.alertify.error(e?.message);
            onChestStatus("error");
            setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);

            console.error(e);
          });
      } else if (rewardTypes === "standard") {
        await daily_bonus_contract.methods
          .openChest()
          .send({
            from: address,
          })
          .then((data) => {
            getUserRewardsByChest(
              email,
              data.transactionHash,
              chestIndex - 1,
              "opbnb"
            );
          })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e?.message);
            onChestStatus("error");
            setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);
          });
      }
    } else if (chainId === 1116) {
      if (rewardTypes === "premium" && isPremium) {
        await daily_bonus_contract_core.methods
          .openPremiumChest()
          .send({
            from: address,
          })
          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "core"
            );
          })
          .catch((e) => {
            window.alertify.error(e?.message);
            onChestStatus("error");
            setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);
            console.error(e);
          });
      } else if (rewardTypes === "standard") {
        await daily_bonus_contract_core.methods
          .openChest()
          .send({
            from: address,
          })
          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "core"
            );
          })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e?.message);
            onChestStatus("error");
            setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);
          });
      }
    } else if (chainId === 88) {
      if (rewardTypes === "premium" && isPremium) {
        await daily_bonus_contract_viction.methods
          .openPremiumChest()
          .send({
            from: address,
          })
          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "viction"
            );
          })
          .catch((e) => {
            window.alertify.error(e?.message);
            onChestStatus("error");
            setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);
            console.error(e);
          });
      } else if (rewardTypes === "standard") {
        await daily_bonus_contract_viction.methods
          .openChest()
          .send({
            from: address,
          })
          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "viction"
            );
          })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e?.message);
            onChestStatus("error");
            setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);
          });
      }
    } else if (chainId === 56) {
      if (rewardTypes === "premium" && isPremium) {
        const web3 = new Web3(window.ethereum);
        const gasPrice = await web3.eth.getGasPrice();
        console.log("gasPrice", gasPrice);
        const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
        const increasedGwei = parseInt(currentGwei) + 1;
        console.log("increasedGwei", increasedGwei);

        const transactionParameters = {
          gasPrice: web3.utils.toWei(increasedGwei.toString(), "gwei"),
        };

        await daily_bonus_contract_bnb.methods
          .openPremiumChest()
          .estimateGas({ from: address })
          .then((gas) => {
            transactionParameters.gas = web3.utils.toHex(gas);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(transactionParameters);

        await daily_bonus_contract_bnb.methods
          .openPremiumChest()
          .send({
            from: address,
            ...transactionParameters,
          })
          // .then(() => {
          //
          //   setTimeout(() => {
          //     onOpenChest();
          // onChestStatus("success");
          //     // setIsChestOpen(true);
          //     onLoadingChest(false);
          //   }, 3000);
          // })
          .then((data) => {
            getUserRewardsByChest(
              email,
              data.transactionHash,
              chestIndex - 1,
              "bnb"
            );
          })
          .catch((e) => {
            window.alertify.error(e?.message);
            onChestStatus("error");
            setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);

            console.error(e);
          });
      } else if (rewardTypes === "standard") {
        // console.log("standard");

        const web3 = new Web3(window.ethereum);
        const gasPrice = await web3.eth.getGasPrice();
        console.log("gasPrice", gasPrice);
        const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
        const increasedGwei = parseInt(currentGwei) + 1;
        console.log("increasedGwei", increasedGwei);

        const transactionParameters = {
          gasPrice: web3.utils.toWei(increasedGwei.toString(), "gwei"),
        };

        await daily_bonus_contract_bnb.methods
          .openChest()
          .estimateGas({ from: address })
          .then((gas) => {
            transactionParameters.gas = web3.utils.toHex(gas);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(transactionParameters);

        await daily_bonus_contract_bnb.methods
          .openChest()
          .send({
            from: address,
            ...transactionParameters,
          })
          .then((data) => {
            getUserRewardsByChest(
              email,
              data.transactionHash,
              chestIndex - 1,
              "bnb"
            );
          })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e?.message);
            onChestStatus("error");
            setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);
          });
      }
    } else if (chainId === 1482601649) {
      if (rewardTypes === "premium" && isPremium) {
        await daily_bonus_contract_skale.methods
          .openPremiumChest()
          .send({
            from: address,
          })

          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "skale"
            );
          })
          .catch((e) => {
            window.alertify.error(e.revertReason ?? e?.message);
            onChestStatus("error");
            setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);

            console.error(e);
          });
      } else if (rewardTypes === "standard") {
        // console.log("standard");

        await daily_bonus_contract_skale.methods
          .openChest()
          .send({
            from: address,
          })
          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "skale"
            );
          })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e.revertReason ?? e?.message);
            onChestStatus("error");
            setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);
          });
      }
    }
  };

  const handleChestClick = () => {
    if (!isPremium && rewardTypes === "premium") {
      onShake();
      return;
    }
    if (!disableBtn || open) {
      if (!open && !ischestOpen) {
        handleOpenChest();
        handleShowRewards(100, 100);
      } else {
        handleShowRewards(chestId, chestIndex - 1);
        console.log();
      }
    }
  };

  useEffect(() => {
    if (!isPremium && rewardTypes === "premium") {
      setIsChestOpen(false);
    }
  }, [isPremium, rewardTypes]);

  useEffect(() => {
    setIsChestOpen(false);
  }, [isPremium, rewardTypes]);

  const onShake = () => {
    setShake(true);
    new Audio(errorSound).play();
    setTimeout(() => {
      setShake(false);
    }, 1000);
  };

  return (
    <div
      className={`new-chest-item ${open && "new-chest-item-open"}  ${
        isActive === chestId &&
        isActiveIndex === chestIndex &&
        "chest-item-active"
      } ${selectedChest === chestId ? "selected-new-chest" : ""} 
      ${claimingChest === true ? "disable-chest" : ""}
      d-flex align-items-center justify-content-center position-relative`}
      onClick={() => handleChestClick()}
      style={{
        pointerEvents: !disableBtn && !buyNftPopup ? "auto" : "none",
      }}
    >
      {/* <img
    className='new-chest-item-img'
      src={require(`../../screens/Account/src/Components/WalletBalance/chestImages/premium/blueCrystal${
        !open ? "" :  "OpenGems"
      }.png`)}
      
      alt=""
      style={{ position: "relative", bottom: "5px", filter: item.premium && "blur(5px)" }}
    /> */}
      {rewardTypes !== "premium" ? (
        <img
          className={` ${
            chain === "bnb" ? "new-chest-item-img" : "new-chest-item-img-skale"
          } ${
            loading ? (chain === "skale" ? "chest-pulsate" : "chest-shake") : ""
          }`}
          src={
            chain === "bnb" ||
            chain === "sei" ||
            chain === "viction" ||
            chain === "core"
              ? require(`../../screens/Account/src/Components/WalletBalance/chestImages/${
                  open ? image + "open" : image
                }.png`)
              : require(`../../screens/Account/src/Components/WalletBalance/chestImages/skale/${
                  open ? chestIndex + "open" : chestIndex
                }.png`)
          }
          alt=""
          style={{
            position: "relative",
            bottom: "5px",
            filter: rewardTypes === "premium" && !isPremium && "blur(5px)",
          }}
        />
      ) : rewardTypes === "premium" && dummypremiumChests ? (
        <img
          className={`new-chest-item-img ${
            loading ? (chain === "skale" ? "chest-pulsate" : "chest-shake") : ""
          }`}
          src={
            chain === "bnb" ||
            chain === "core" ||
            chain === "viction" ||
            chain === "sei"
              ? require(`../../screens/Account/src/Components/WalletBalance/chestImages/premium/${
                  open
                    ? chestIndex % 2 === 1
                      ? dummypremiumChests + "OpenCoins"
                      : dummypremiumChests + "OpenGems"
                    : dummypremiumChests
                }.png`)
              : require(`../../screens/Account/src/Components/WalletBalance/chestImages/skale/premium/${
                  open ? chestIndex - 10 + "open" : chestIndex - 10
                }.png`)
          }
          alt=""
          style={{
            position: "relative",
            bottom: "5px",
            filter: rewardTypes === "premium" && !isPremium && "blur(5px)",
          }}
        />
      ) : (
        <></>
      )}
      {rewardTypes === "premium" && !isPremium && (
        <img
          src={premiumLock}
          className={`premium-lock ${shake && "shake-lock"}`}
          alt=""
        />
      )}
      <div className="new-claim-chest-btn d-flex align-items-center justify-content-center">
        {open ? "Claimed" : rewardTypes === "premium" ? "Premium" : "Claim "}
      </div>
    </div>
  );
};

export default NewChestItem;
