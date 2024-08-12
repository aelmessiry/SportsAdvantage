import casperIcon from "../assets/images/networks-icons/casper.png";
import casperWallet from '../assets/images/networks-icons/casper-wallet.png';
import casperDash from '../assets/images/networks-icons/casper-dash.jpeg';
import solanaLogo from '../assets/images/networks-icons/Solana_logo.png';
import tezosLogo from '../assets/images/networks-icons/tezos.webp';
import xrpLogo from '../assets/images/networks-icons/xrp-xrp-logo.png'

export const chainProviders = [
    {
        name: 'CASPER',
        image: casperIcon,
        id: 0,
        walletsProviders: [
            { name: 'CASPER wallet', id: 0, logo: casperWallet },
            { name: "CASPER SIGNER", id: 1, logo: casperIcon },
            { name: "CASPER DASH", id: 2, logo: casperDash },
        ],
    },
    {
        name: 'TEZOS',
        image: tezosLogo,
        id: 1,
        walletsProviders: [
            { name: "CASPER DASH", id: 2, logo: casperDash },
        ],
    },
    {
        name: 'SOLANA',
        image: solanaLogo,
        id: 2,
        walletsProviders: [
            { name: 'CASPER wallet', id: 0, logo: casperWallet },
        ],
    },
    {
        name: 'XRP',
        image: xrpLogo,
        id: 3,
        walletsProviders: [
            { name: 'CASPER wallet', id: 0, logo: casperWallet },
        ],
    },

];