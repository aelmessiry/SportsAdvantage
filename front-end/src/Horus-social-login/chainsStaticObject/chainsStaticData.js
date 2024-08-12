import binanceIcon from "../assets/images/networks-icons/binance.png";
import casperIcon from "../assets/images/networks-icons/casper.png";
import etherIcon from "../assets/images/networks-icons/eth.png";
import polygonIcon from "../assets/images/networks-icons/polygon.png";
export const ChainsObjectsArr = [
    {
      title: "Polygon",
      chain: "MUMBAI",
      symbol: "MATIC",
      nativeToken: "MATIC", 
      networkId: "80001",
      logo: polygonIcon,
      image: polygonIcon, // set this var to use it in header networks original images 
      baseUrl: "https://api-testnet.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=",
      apiKey: process.env.REACT_APP_POLYGONSCAN_API_KEY,
      tokenAddress: "0x0000000000000000000000000000000000000000",
      submenu: [
        {
          title: "MATIC",
          contractAddress: "0x0000000000000000000000000000000000001010",
          tokenAddress: "0x0000000000000000000000000000000000000000",
        },
        {
          title: "HC",
          contractAddress: "0x08bd476283A02AC7762dbfff8441525c87cC1A06",
          tokenAddress: "0x08bd476283A02AC7762dbfff8441525c87cC1A06",
        },
        {
          title: "GROOVE",
          contractAddress: "0x8FA8e01C23FC7e12060447DFFD3472827A55573A",
          tokenAddress: "0x8FA8e01C23FC7e12060447DFFD3472827A55573A",
        },
        {
          title: "TETHERUSD",
          contractAddress: "0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832",
          tokenAddress: "0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832",
        },
        {
          title: "SAFEMOON",
          contractAddress: "0xD6551529918370DB4F096dA14F1e0f6A467c68ED",
          tokenAddress: "0xD6551529918370DB4F096dA14F1e0f6A467c68ED",
        },
        {
          title: "SHIBA",
          contractAddress: "0x4Cee7E1C4AA8de0cf86d94bb0Ab610e49CE0a2aC",
          tokenAddress: "0x4Cee7E1C4AA8de0cf86d94bb0Ab610e49CE0a2aC",
        }
      ],
    },
    {
      title: "Binance",
      chain: "BSC_TESTNET",
      symbol: "BNB",
      nativeToken: "BNB",
      networkId: "97",
      logo: binanceIcon,
      image:binanceIcon, // set this var to use it in header networks original images 
      baseUrl: "https://api-testnet.bscscan.com/api?module=account&action=",
      apiKey: process.env.REACT_APP_BSSCAN_API_KEY,
      tokenAddress: "0x0000000000000000000000000000000000000000",
      submenu: [
        {
          title: "BNB",
          contractAddress: "balance",
          tokenAddress: "0x0000000000000000000000000000000000000000",
        },
        {
          title: "DXSALE",
          contractAddress: "tokenbalance&contractaddress=0xA598D374715C9a82a2AD36F1Ee4FFdC551CBF342",
          tokenAddress: "0xA598D374715C9a82a2AD36F1Ee4FFdC551CBF342",
        },
        {
          title: "HC",
          tokenAddress: "0x43C995ddaf664856a89d30b9aA8D66dF578f6e98",
          contractAddress: "tokenbalance&contractaddress=0x43C995ddaf664856a89d30b9aA8D66dF578f6e98",
          path: "contact",
        },
  
        {
          title: "EVERGROW",
          contractAddress: "tokenbalance&contractaddress=0x48e974effCb24504c00d0E6ce41B5A21d6D21Aa7",
          tokenAddress: "0x48e974effCb24504c00d0E6ce41B5A21d6D21Aa7",
        },
        {
          title: "HOODOOI",
          contractAddress: "tokenbalance&contractaddress=0xe443DbfB3C11AEd895A9e476cA02055cfdF816Ee",
          tokenAddress: "0xe443DbfB3C11AEd895A9e476cA02055cfdF816Ee",
        },
        {
          title: "BIFI",
          contractAddress: "tokenbalance&contractaddress=0xaB098F4DAB2caC60Fa67dd12382dA000180a50Bd",
          tokenAddress: "0xaB098F4DAB2caC60Fa67dd12382dA000180a50Bd",
        },
      ],
    },
    {
      title: "Ethereum",
      chain: "ETHEREUM_TESTNET",
      symbol: "ETH",
      nativeToken: "ETH",
      networkId: "42161",
      logo: etherIcon, 
      image: etherIcon, // set this var to use it in header networks original images 
      baseUrl: "https://api-sepolia.etherscan.io/api?module=account&action=",
      apiKey: process.env.REACT_APP_ETHERSCAN_API_KEY,
      tokenAddress: "0x0000000000000000000000000000000000000000",
      submenu: [
        {
          title: "ETH",
          contractAddress: "balance",
          tokenAddress: "0x0000000000000000000000000000000000000000",
        },
        {
          title: "SHIBA",
          contractAddress: "tokenbalance&contractaddress=0x2c99824587B30FF4e10433A31256D27C557aF3A9",
          tokenAddress: "0x2c99824587B30FF4e10433A31256D27C557aF3A9"
        },
        {
          title: "TETHERUSD",
          contractAddress: "tokenbalance&contractaddress=0x1ADD3677797E0EB40ab83C4d91A1b05008892dF5",
          tokenAddress: "0x1ADD3677797E0EB40ab83C4d91A1b05008892dF5"
        },
        {
          title: "GROVE",
          contractAddress: "tokenbalance&contractaddress=0x47a5FB4ee97aaA52EB96d6874fcE089767000288",
          tokenAddress: "0x47a5FB4ee97aaA52EB96d6874fcE089767000288"
        },
        {
          title: "USDC",
          contractAddress: "tokenbalance&contractaddress=0x5A4cfB39cA25F33B459eC29Cb3f30aA80b59be6E",
          tokenAddress: "0x5A4cfB39cA25F33B459eC29Cb3f30aA80b59be6E"
        },
        {
          title: "HC",
          name: "Horus Coin",
          contractAddress: "0x92eeF0d44404C7A34a3b99BE253B0197F49Aba73",
          tokenAddress: "0x92eeF0d44404C7A34a3b99BE253B0197F49Aba73",
        }
      ],
    },
    {
      title: "CASPER",
      chain: "CASPER",
      symbol: "CSPR",
      nativeToken: "CSPR",
      networkId: "0",
      logo: casperIcon, 
      image: casperIcon, // set this var to use it in header networks original images 
      baseUrl: "",
      apiKey: process.env.REACT_APP_ETHERSCAN_API_KEY,
      tokenAddress: "0x0000000000000000000000000000000000000000",
      submenu: [
      ],
    }
  ];
