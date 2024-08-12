import { ethers } from "ethers";

let NON_CUSTODIAL;

if (typeof window !== "undefined" && window.ethereum) {
  NON_CUSTODIAL = new ethers.providers.Web3Provider(window.ethereum);
} else {
  // Handle the case when MetaMask is not available or not enabled avoiding browser crash
  NON_CUSTODIAL = null;
}

export const PROVIDERS_DICT = {
  MUMBAI: new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.infura.io/v3/853c7c382bc74e69ac0540c9792ceec4"
  ),
  BSC_TESTNET: new ethers.providers.JsonRpcProvider(
    "https://data-seed-prebsc-2-s1.binance.org:8545"
  ),
  ETHEREUM_TESTNET: new ethers.providers.JsonRpcProvider(
    "https://rpc.sepolia.org/"
  ),
  NON_CUSTODIAL,
};

export default PROVIDERS_DICT;
