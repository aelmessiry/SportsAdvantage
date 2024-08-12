import React, { createContext, useState, useEffect } from 'react';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
//import { ERC20_ABI } from '../ERC20-utils/proxy-payment/HorusCoin_Constants'
import { Web3ChainsObjectsArr } from '../../chainsStaticObject/supportedWeb3networks';
// import { getCasperAccountBalance } from '../CASPER-utils/casperUtils';
import { useClickRef } from '@make-software/csprclick-ui';
import { CSPR_CLICK_PROVIDERS_NETWORKS_DIC } from '../../chainsStaticObject/csprClickProvidersDic';
import { getCasperUserBalance } from '../../../web3/utils';
interface Wallet {
  activePublicKey: string;
  hasPassword: boolean;
}

interface Blockchain {
  defaultReceivingAddress: string;
  wallets: Wallet[];
}

interface UserWalletsData {
  EVM: Blockchain;
  CASPER: Blockchain;
}
interface IEntityInfo {
  activePublicKey: string;
  userWalletsData?: UserWalletsData | null;
  indexWallet: number;
}
//interface of the context object
interface IAuthContextValue {
  isLoggedIn: boolean;
  balance: string;
  entityInfo: IEntityInfo;
  email: string;
  token: string;
  loginOption: string;
  loginProvider: string;
  hasPassword: boolean;
  network: any;
  selectedPaymentMethod: string | null;
  userWalletsData?: UserWalletsData | null;
  setNetwork: (network: string) => void;
  setPaymentMethod: (method: string) => void;
  setHasPassword: (hasPassword: boolean) => void;
  setEmail: (email: string) => void;
  setToken: (token: string) => void;
  setLoginOption: (signOption: string) => void;
  setLoginProvider: (loginProvider: string) => void;
  login: () => void;
  logout: () => void;
  refreshAuth: () => void;
  refreshBalance: () => void;
  setIsLoggedIn: (
    isLoggedIn: boolean,
    pubKey: object | any,
    loginOption: string | undefined,
    loginProvider: string | undefined,
    indexWallet: number,
    userWallets?: UserWalletsData
  ) => void;
}

//inital values for the context object
const AuthContext = createContext<IAuthContextValue>({
  isLoggedIn: false,
  balance: '',
  entityInfo: { activePublicKey: '', userWalletsData: null, indexWallet: 0 },
  email: '',
  token: '',
  loginOption: '',
  loginProvider: '',
  hasPassword: false,
  network: null,
  selectedPaymentMethod: '',
  //setUserWalletsData: (walletsData: UserWalletsData | null) => {},
  setNetwork: () => {},
  setPaymentMethod: () => {},
  setHasPassword: () => {},
  setEmail: () => {},
  setToken: () => {},
  setLoginOption: () => {},
  setLoginProvider: () => {},
  login: () => {},
  logout: () => {},
  refreshAuth: () => {},
  refreshBalance: () => {},
  setIsLoggedIn: () => {},
});

const AuthProvider = (props: any) => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const clickRef = useClickRef();
  const [loggedIn, setLoggedIn] = useState(false);
  const [balance, setBalance] = useState('0');
  const [userWalletsData, setUserWalletsData] = useState<UserWalletsData>();
  const [entityInfo, setEntityInfo] = useState<IEntityInfo>({
    activePublicKey: '',
    userWalletsData: null,
    indexWallet: 0,
  });
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [loginOption, setLoginOption] = useState('');
  const [loginProvider, setLoginProvider] = useState('');
  const [hasPassword, setHasPassword] = useState(false);
  const [network, setNetwork] = useState<any | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const { chain, chains } = useNetwork();
  //a flag to indicate to open or close the dialog box

  // type PROVIDERS = {
  //   MUMBAI: ethers.providers.JsonRpcProvider;
  //   BSC_TESTNET: ethers.providers.JsonRpcProvider;
  // };

  /**
   * Updates the login status of the user, if they are logged in or not.
   * @param isLoggedIn - boolean value to indicate if the user is logged in or not.
   * @param pubKey - the public key of the user.
   * @param loginOption - the login option, either evm or walletconnect.
   * @param loginProvider - the login provider, either evm or walletconnect.
   */

  async function updateLoginStatus(
    isLoggedIn: boolean,
    pubKey: string | any,
    loginOption: string = 'evm',
    loginProvider: string = 'evm',
    indexWallet: number,
    userWallets?: UserWalletsData
  ) {
    setEntityInfo({
      activePublicKey: pubKey,
      userWalletsData: userWallets,
      indexWallet,
    });
    console.log('EntityInfo', entityInfo);
    setLoginOption(loginOption);
    setLoginProvider(loginProvider);
    setLoggedIn(isLoggedIn);
    setUserWalletsData(userWallets); //this const update to use it in refreshEntity func
  }

  // this function refreshes the entity info by setting the entity info to the current public key if logged in

  async function refreshEntityInfo() {
    if (loggedIn) {
      // const fundArr:any = await getAllDepositsBalance(email ,network?.chain);
      setEntityInfo({
        activePublicKey: entityInfo.activePublicKey,
        indexWallet: entityInfo.indexWallet,
        userWalletsData: userWalletsData,
      });
    } else setEntityInfo({ activePublicKey: '', indexWallet: 0 });
  }

  //This function is used to get the balance of the entity that is currently logged in. It is used to display the balance in the UI and to check if the entity has enough balance to make a transaction.

  async function refreshEntityBalance() {
    if (entityInfo.activePublicKey !== '' && loggedIn) {
      if (network.chain != 'CASPER') {
        try {
          let balance;
         // const provider = PROVIDERS_DICT[network?.chain as keyof PROVIDERS];
          if (
            network?.tokenAddress ===
            '0x0000000000000000000000000000000000000000'
          ) {
            balance = await getCasperUserBalance(
              entityInfo.activePublicKey
            );
          } else {
            // const tokenContract = new Contract(network?.tokenAddress, ERC20_ABI, provider);
            // const tokenBalance = await tokenContract.balanceOf(entityInfo.activePublicKey);
            // balance = ethers.utils.formatUnits(tokenBalance, 18);
          }
          setBalance(balance);
        } catch (error) {
          console.error(error);
        }
      } else if (network.chain == 'CASPER') {
        try {
          const balance: any = await getCasperUserBalance(
            entityInfo.activePublicKey
          );
          setBalance(balance);
        } catch (e) {
          console.log(e, 'Get casper balance');
        }
      }
    }
  }

  //csprClick sign in listener
  useEffect(() => {
    clickRef?.on('csprclick:signed_in', async (evt) => {
      console.log(evt.account);
      updateLoginStatus(
        true,
        evt.account.public_key,
        'csprClick',
        evt.account.provider,
        entityInfo.indexWallet,
        userWalletsData
      );
      const currentNetwork = Web3ChainsObjectsArr.find(
        (item) =>
          item.chain ===
          CSPR_CLICK_PROVIDERS_NETWORKS_DIC[
            evt.account
              .provider as keyof typeof CSPR_CLICK_PROVIDERS_NETWORKS_DIC
          ]
      );
      setNetwork(currentNetwork);
    });
    clickRef?.on('csprclick:switched_account', async (evt) => {
      updateLoginStatus(
        true,
        evt.account.public_key,
        'csprClick',
        evt.account.provider,
        entityInfo.indexWallet,
        userWalletsData
      );
      console.log(evt.account);
    });
    clickRef?.on('csprclick:signed_out', async () => {
      updateLoginStatus(false, '', '', '', entityInfo.indexWallet, undefined);
    });
    clickRef?.on('csprclick:disconnected', async () => {
      updateLoginStatus(false, '', '', '', entityInfo.indexWallet, undefined);
    });
  }, [clickRef?.on]);

  const login = async () => {};

  const logout = () => {
    if (!loggedIn) {
      console.log('Already logged out !');
      return false;
    }
    if (loginOption === 'social') {
      setEntityInfo({ activePublicKey: '', indexWallet: 0 });
      setLoginOption('');
      setLoginProvider('');
      setBalance('');
      setLoggedIn(false);
      setHasPassword(false)
    } else if (
      CSPR_CLICK_PROVIDERS_NETWORKS_DIC.hasOwnProperty(loginProvider)
    ) {
      setEntityInfo({ activePublicKey: '', indexWallet: 0 });
      setLoginOption('');
      setLoginProvider('');
      setLoggedIn(false);
      setBalance('');
      clickRef?.signOut();
      setHasPassword(false)      
      window.location.reload();
    } else {
      setEntityInfo({ activePublicKey: '', indexWallet: 0 });
      setLoginOption('');
      setLoginProvider('');
      setLoggedIn(false);
      setBalance('');
      setHasPassword(false)
      disconnect();
    }
    return true;
  };

  const contextValue: IAuthContextValue = {
    isLoggedIn: loggedIn,
    balance,
    entityInfo,
    login,
    logout,
    email,
    token,
    loginOption,
    loginProvider,
    refreshAuth: refreshEntityInfo,
    refreshBalance: refreshEntityBalance,
    hasPassword,
    network,
    setNetwork: setNetwork,
    selectedPaymentMethod,
    setPaymentMethod: setSelectedPaymentMethod,
    setHasPassword: setHasPassword,
    setEmail: setEmail,
    setToken: setToken,
    setLoginOption: setLoginOption,
    setLoginProvider: setLoginProvider,
    setIsLoggedIn: updateLoginStatus,
  };

  useEffect(() => {
    if (loginOption == 'evm' || isConnected) {
      const currentNetwork = Web3ChainsObjectsArr.find(
        (item) => item.networkId == chain?.id
      );
      setNetwork(currentNetwork);
    }
  }, [chain, chains, network?.chain, address]);

  useEffect(() => {
    if (loginOption === 'social') {
      console.log(
        '\n\nAuth details changed\n',
        {
          isLoggedIn: loggedIn,
          signType: loginOption,
          pubKey: entityInfo.activePublicKey,
          network: network?.chain,
          user: email,
          wallet: entityInfo.indexWallet,
          hasPassword: hasPassword,
        },
        '\n\n\n'
      );
    } else {
      console.log(
        '\n\nAuth details changed\n',
        {
          isLoggedIn: loggedIn,
          signType: loginOption,
          pubKey: entityInfo.activePublicKey,
          network: network?.chain,
        },
        '\n\n\n'
      );
    }
    refreshEntityBalance();
  }, [
    loggedIn,
    network?.chain,
    network?.tokenAddress,
    chains,
    chain,
    entityInfo?.activePublicKey,
  ]);

  return <AuthContext.Provider value={contextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
