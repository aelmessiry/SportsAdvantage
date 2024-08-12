import {
  Contracts,
  Keys,
  CasperClient,
  RuntimeArgs,
  CLValueBuilder,
  encodeBase16,
  CLPublicKey,
  DeployUtil,
  Signer,
  CasperServiceByJsonRPC,
} from "casper-js-sdk";
import {
  RPC,
  INCEPTION_CONTRACT_HASH,
  TEAM_CONTRACT_HASH,
  TEAM_NFT_METADATA,
  INCEPTION_CONTRACT_PACKAGE,
  TEAM_CONTRACT_PACKAGE,
  STAGING_INCEPTION_CONTRACT_PACKAGE,
} from "./constants";
import toast from "react-hot-toast";
import { signDeployTransaction } from "../Horus-social-login/web3/utils/utils";
import { TypedJSON } from "typedjson";
import { displayMessageWithLink } from "../Horus-social-login/web3/utils/utils";
import axios from "axios";
import { HTTPTransport, Client } from "@open-rpc/client-js";
export class CustomCasperClient extends CasperServiceByJsonRPC {
  constructor() {
    const url = import.meta.env.VITE_CSPR_CLOUD_RPC;
    const options = {
      headers: {
        Authorization: import.meta.env.VITE_CSPR_CLOUD_KEY,
      },
    };
    super(url);
    const transport = new HTTPTransport(url, options);
    this.client.requestManager.transports = [transport];
  }
}


export async function balanceOf(userAddress) {
  // try {
  //   const network = import.meta.env.VITE_NETWORK;
  //   const client = new CasperClient(import.meta.env.VITE_NODE_RPC_ADDRESS);
  //   // const client = new MakeCasperClient();
  //   const contract = new Contracts.Contract(client);
  //   contract.setContractHash(INCEPTION_CONTRACT_HASH[network]);
  //   const accountHash = CLPublicKey.fromHex(userAddress)
  //     .toAccountHashStr()
  //     .substring(13);
  //   const response = await contract.queryContractDictionary(
  //     "balances",
  //     accountHash
  //   );
  //   return parseInt(response.data._hex, 16);
  // } catch (error) {
  //   console.error(error);
  //   throw error;
  // }
  try {
    const nfts = await getUserNFTs(userAddress);
    const inceptionPackage =
      INCEPTION_CONTRACT_PACKAGE[import.meta.env.VITE_NETWORK];
    const count = nfts.filter(
      (nft) => nft.contract_package_hash === inceptionPackage
    ).length;
    return count;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export async function getDeploymentStatus(deployHash) {
//   // const network = import.meta.env.VITE_NETWORK;
//   const client = new CasperClient(import.meta.env.VITE_CSPR_CLOUD_RPC);
//   client.nodeClient = new CustomCasperClient(network);
//   let i = 300;
//   await new Promise((r) => setTimeout(r, 5000));
//   while (i != 0) {
//     const [deploy, raw] = await client.getDeploy(deployHash);
//     if (raw.execution_results.length !== 0) {
//       if (raw.execution_results[0].result.Success) {
//         return true;
//       } else {
//         throw Error("Minting Failed!");
//       }
//     } else {
//       i--;
//       await new Promise((r) => setTimeout(r, 5000));
//       continue;
//     }
//   }
//   throw Error("Timeout after " + i + "s. Something's wrong");
// }

export async function getDeploymentStatus(deployHash) {
  const network = import.meta.env.VITE_NETWORK;
  // let url;
  // if (network === "MAINNET")
  //   url = `https://corsproxy.io/?https://api.cspr.cloud/deploys/${deployHash}`;
  // else
  //   url = `https://corsproxy.io/?https://api.testnet.cspr.cloud/deploys/${deployHash}`;

  let i = 0;
  await new Promise((r) => setTimeout(r, 5000));
  while (i <= 100) {
    const response = await axios.get(import.meta.env.VITE_BACKEND_CSPR_CLOUDS_API + "getDeploymentStatus", {
      params: {
        deployHash: deployHash,
        network: network,
      },
      headers: {
        accept: "application/json",
        authorization: import.meta.env.VITE_CSPR_CLOUD_KEY,
      },
    });
    const status = response.data.status;
    const error_message = response.data.error_message;
    if (status === "processed") {
      if (error_message == null) {
        return true;
      } else {
        throw Error(error_message);
      }
    } else {
      i++;
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
  throw Error("Timeout after " + i + " tries. Something's wrong");
}

export async function mintGenesisNFT(
  userAddress,
  loginOption,
  metadata,
  tx = null
) {
  try {
    const csprBalance = await getCasperUserBalance(userAddress);
    if (csprBalance < 1015) {
      toast.error("Insufficient CSPR balance");
      return null;
    }
    const network = import.meta.env.VITE_NETWORK;
    const client = new CasperClient(import.meta.env.VITE_NODE_RPC_ADDRESS);
    const contract = new Contracts.Contract(client);
    const runtimeArgs = RuntimeArgs.fromMap({
      token_owner: CLValueBuilder.key(CLPublicKey.fromHex(userAddress)),
      token_meta_data: CLValueBuilder.string(metadata),
      amount: CLValueBuilder.u512(1000_000_000_000),
      sa_contract_hash: CLValueBuilder.string(TEAM_CONTRACT_HASH[network]),
      sa_entry_point_name: CLValueBuilder.string("mint"),
    });
    const paymentBinary = await getPaymentBinaryForPayment();
    if (loginOption === "social") {
      const res = await signDeployTransaction(
        {
          paymentBinary: JSON.stringify(paymentBinary),
          runtimeArgs: serializeArgs(runtimeArgs),
          paymentAmount: 15000000000,
          recipient: userAddress,
        },
        tx.walletId,
        tx.password,
        tx.network,
        "Signing tx"
      );

      console.log(res);

      const txPromise = getDeploymentStatus(res);

      toast.promise(txPromise, {
        loading: "Minting ...",
        success: () => displayMessageWithLink(res, "Minting", network),
        error: "Minting Failed",
      });
    } else {
      const deploy = await contract.install(
        paymentBinary,
        runtimeArgs,
        15000000000,
        CLPublicKey.fromHex(userAddress),
        network === "TESTNET" ? "casper-test" : "casper"
      );

      const signedBuyDeploy = await signDeploy(deploy, userAddress);
      console.log("signedBuyDeploy: ", signedBuyDeploy);

      const hash = signedBuyDeploy.deployHash;

      if (signedBuyDeploy.cancelled) throw Error("User rejected transaction");
      if (!signedBuyDeploy.deployHash ) throw Error("Signing failed");

      const deployment = getDeploymentStatus(hash);

      toast.promise(deployment, {
        loading: "Minting NFT...",
        success: () => displayMessageWithLink(hash, "Minting ", network),
        error: "Error Minting NFT",
      });

      await deployment;
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return null;
  }
}

const getPaymentBinaryForPayment = async () => {
  return fetch(`${import.meta.env.BASE_URL}payment.wasm`, {
    headers: {
      "Content-Type": "application/wasm",
    },
  })
    .then((response) => response.arrayBuffer())
    .then((bytes) => new Uint8Array(bytes));
};

export const signDeploy = async (deploy, accountPublicKey) => {
  const deployJSON = await DeployUtil.deployToJson(deploy);
  const signedDeployJSON = await window.csprclick.send(
    JSON.stringify(deployJSON.deploy),
    accountPublicKey
  );

  return signedDeployJSON;
};

export async function getUserNFTs(userAddress) {
  const network = import.meta.env.VITE_NETWORK;
  // let url;
  // if (network === "MAINNET")
  //   url = `https://corsproxy.io/?https://api.cspr.cloud/accounts/${userAddress}/nft-tokens?page=1&page_size=100`;
  // else
  //   url = `https://corsproxy.io/?https://api.testnet.cspr.cloud/accounts/${userAddress}/nft-tokens?page=1&page_size=100`;

  try {
    const response = await axios.get(import.meta.env.VITE_BACKEND_CSPR_CLOUDS_API + "getNfts", {
      params: {
        userAddress: userAddress,
        network: network,
      },
      headers: {
        accept: "application/json",
      },
    });
    return response.data.nftData.map((item) => {
      return {
        contract_package_hash: item.contract_package_hash,
        attributes: item.onchain_metadata.attributes,
        description: item.onchain_metadata.description,
        external_url: item.onchain_metadata.external_url,
        image: item.onchain_metadata.image,
        poster: item.onchain_metadata.poster,
        title: item.onchain_metadata.title,
        type: item.onchain_metadata.type,
        token_id: item.token_id,
      };
    });;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function getCasperUserBalance(userAddress) {
  const network = import.meta.env.VITE_NETWORK;
  // let url;

  // if (network === "MAINNET")
  //   url = `https://corsproxy.io/?https://api.cspr.cloud/accounts/${userAddress}`;
  // else
  //   url = `https://corsproxy.io/?https://api.testnet.cspr.cloud/accounts/${userAddress}`;

  try {
    const response = await axios.get(import.meta.env.VITE_BACKEND_CSPR_CLOUDS_API + "getBalance", {
      params: {
        userAddress: userAddress,
        network: network,
      },
      headers: {
        accept: "application/json"
      },
    });

    return response.data.balance;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function waitForDeploy(hash, timeout = 60000) {
  const client = new CasperClient(import.meta.env.VITE_NODE_RPC_ADDRESS);
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const timer = setTimeout(() => {
    throw new Error("Timeout");
  }, timeout);
  while (true) {
    const deploy = await client.nodeClient.getDeployInfo(hash);
    if (deploy.execution_results.length > 0) {
      clearTimeout(timer);
      return deploy;
    } else {
      await sleep(400);
    }
  }
}

export async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

export const serializeArgs = (ra) => {
  const raSerializer = new TypedJSON(RuntimeArgs);
  const json = raSerializer.toPlainJson(ra);
  return Object.values(json)[0];
};

const getNumberOfNFTs = async (contract_package_hash) => {
  const network = import.meta.env.VITE_NETWORK;
  // let url;

  // if (network === "MAINNET")
  //   url = `https://corsproxy.io/?https://api.cspr.cloud/contract-packages/${contract_package_hash}/nft-tokens`;
  // else
  //   url = `https://corsproxy.io/?https://api.testnet.cspr.cloud/contract-packages/${contract_package_hash}/nft-tokens`;

  try {
    const response = await axios.get(import.meta.env.VITE_BACKEND_CSPR_CLOUDS_API + "getNumberOfNFTs", {
      params: {
        contract_package_hash: contract_package_hash,
        network: network,
      },
      headers: {
        accept: "application/json"
      },
    });

    return response.data.nftCount;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const getNoOfMintedIncNFTs = async () => { 
  return await getNumberOfNFTs(
    INCEPTION_CONTRACT_PACKAGE[import.meta.env.VITE_NETWORK]
  );
}

export const getNoOfMintedGenesisNFTs = async () => { 
  return await getNumberOfNFTs(
    TEAM_CONTRACT_PACKAGE[import.meta.env.VITE_NETWORK]
  );
}

export const getNoOfMintedStagingIncNFTs = async () => { 
  return await getNumberOfNFTs(
    STAGING_INCEPTION_CONTRACT_PACKAGE[import.meta.env.VITE_NETWORK]
  );
}