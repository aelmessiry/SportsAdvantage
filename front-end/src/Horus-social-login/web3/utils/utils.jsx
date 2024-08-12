import toast from "react-hot-toast";
import { ethers } from "ethers";
import axiosToken from "../../social-wallet/AxiosToken";
import CryptoJS from "crypto-js";
import PROVIDERS_DICT from "./Providers";
import CHAIN_SCAN_DICT from "./ChainScan";

const signTransaction = async (walletId, network, password, txs, toastMsg) => {
  try {
    const txPromise = axiosToken.post("signTransaction", {
      walletId,
      network,
      password,
      txs,
    });

    const tx = await toast.promise(txPromise, {
      loading: `${toastMsg}`,
      success: (res) =>
        displayMessageWithLink(
          res.data.res[res.data.res.length - 1].hash,
          toastMsg,
          network
        ),
      error: `${toastMsg} Failed`,
    });

    const res = tx.data.res;

    console.log("signature res ====> ", res);

    for (let i = 0; i < res.length; i++) {
      if (tx.data.res[i].status !== true) {
        toast.error(`${toastMsg} Failed! Please try again later`);
      }
    }
    return tx.data.signDeployHash;
  } catch (error) {
    console.log(error);
    toast.error(`${toastMsg} Failed!`);
  }
};

const casperSignTransaction = async (walletId, network, password, txs, toastMsg) => {
  const {runtimeArgs ,  contractHash , packageHash , paymentAmount,functionName} = txs
  try {
    
    const txPromise = axiosToken.post("signTransaction", {
      walletId,
      network,
      password,
      runtimeArgs,
      contractHash,
      packageHash,
      paymentAmount,
      functionName
    });
    
    const tx = await toast.promise(txPromise, {
      loading: `${toastMsg}`,
      success: (res) =>
        displayMessageWithLink(
          res.data.res[res.data.res.length - 1].hash,
          toastMsg,
          network
        ),
      error: `${toastMsg} Failed`,
    });

      return tx.data.res
  } catch (error) {
    console.log(error);
    toast.error(`${toastMsg} Failed!`);
  }
};

// casper sign transaction api
const signDeployTransaction = async (tx, walletId,password,network,toastMsg) => {
  const { runtimeArgs,recipient,paymentAmount,paymentBinary} = tx
  try {
    const txPromise = axiosToken.post("signDeployTransaction", {
      paymentBinary,
        runtimeArgs,
        paymentAmount,
        walletId,
        recipient,
        password,
        network
    });
    const tx = await toast.promise(txPromise, {
      loading: `${toastMsg}`,
      success: (res) =>
        displayMessageWithLink(
          res.data.signDeployHash,
          toastMsg,
          "TESTNET"
        ),
      error: `${toastMsg} Failed`,
    });

    // const res = tx.data;

    // console.log("signature res ====> ", res);
    return tx.data.signDeployHash;;
  } catch (error) {
    console.log(error);
   // toast.error(`${toastMsg} Failed!`);
  }
};
const displayMessageWithLink = (hash, toastMsg, network) => {
  return (
    <div>
      {toastMsg} Success! Transaction Hash:{" "}
      <a
        href={`${CHAIN_SCAN_DICT[network]}${hash}`}
        target="_blank"
        rel="noreferrer"
      >
        Click Here
      </a>
    </div>
  );
};

const hashWalletIds = (walletIds, network) => {
  let hashedArr = [];

  for (let i = 0; i < walletIds.length; i++) {
    const walletId = walletIds[i].toLowerCase();
    const combinedInput = `${walletId}:${network}:${process.env.REACT_APP_SECRET_KEY}`;
    const hashedWalletId = CryptoJS.SHA256(combinedInput).toString();
    hashedArr.push(hashedWalletId);
  }
  return hashedArr;
};

const getHashedWalletId = (walletIds, network) => {
  const hashedArr = hashWalletIds([walletIds], network);
  return hashedArr[0];
};

export {
  signTransaction,
  displayMessageWithLink,
  getHashedWalletId,
  hashWalletIds,
  signDeployTransaction,
  casperSignTransaction
};
