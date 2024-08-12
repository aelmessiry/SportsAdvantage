import binanceIcon from "./icons/binance.png";
import casperIcon from "./icons/casper.png";
import etherIcon from "./icons/eth.png";
import polygonIcon from "./icons/polygon.png";
//metamask user 
export const Web3ChainsObjectsArr = [
    {
      title: "Polygon",
      chain: "MUMBAI",
      symbol: "MATIC", 
      networkId: 80001,
      logo: polygonIcon,
      image: polygonIcon, // set this var to use it in header networks original images 
      baseUrl: "https://api-testnet.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=",
      tokenAddress: "0x0000000000000000000000000000000000000000",
    },
    {
      title: "Binance",
      chain: "BSC_TESTNET",
      symbol: "BNB",
      networkId: 97,
      logo: binanceIcon,
      image:binanceIcon, // set this var to use it in header networks original images 
      baseUrl: "https://api-testnet.bscscan.com/api?module=account&action=",
      tokenAddress: "0x0000000000000000000000000000000000000000",
    },
    {
      title: "Ethereum",
      chain: "ETHEREUM_TESTNET",
      symbol: "ETH",
      networkId: 11155111,
      logo: etherIcon, 
      image: etherIcon, // set this var to use it in header networks original images 
      baseUrl: "https://api-sepolia.etherscan.io/api?module=account&action=",
      apiKey: "process.env.REACT_APP_ETHERSCAN_API_KEY",
      tokenAddress: "0x0000000000000000000000000000000000000000",
      metamaskTestNetworkId: "11155111",
    },
    {
      title: "CASPER",
      chain: "CASPER",
      symbol: "CSPR",
      networkId: 0,
      logo: casperIcon, 
      image: casperIcon, // set this var to use it in header networks original images 
      baseUrl: "https://api-sepolia.etherscan.io/api?module=account&action=",
      apiKey: "",
      tokenAddress: "0x0000000000000000000000000000000000000000",
      metamaskTestNetworkId: "11155111",
    },
  ];
