import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  TwitterAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { Avatar } from '@mui/material';
import { getAuthConfig } from './firebase';
import WalletTooltip from './tooltip';
import google_icon from './icon/google-icon.png';
import facebook_icon from './icon/facebook-icon.png';
import twitter_icon from './icon/twitter-icon.png';
import email_icon from './icon/email-icon.png';
import phone_icon from './icon/phone-icon.png';
import toast from 'react-hot-toast';
import { openNewPasswordModel } from './NewPasswordModal';
import axiosToken, { setAxiosToken } from './AxiosToken';
import { useAuth } from '../web3/context/AuthContext';
import Preloader from './preloader/preloader';
import { openPhoneModal } from './PhoneModal';
import { openEmailModal } from './EmailModal';
import logout_icon from './icon/logout-icon.png';
import logoutgoogle from './icon/logout-google-icon.png';
import logoutfacebook from './icon/logout-facebook-icon.png';
import logoutTwitter from './icon/logout-twitter-icon.png';
import logoutPhone from './icon/LogoutPhone.png';
import csprClickIcon from './icon/csprClick.svg';
import csprClickLightIcon from './icon/csprClick.png';
import { Web3ChainsObjectsArr } from '../chainsStaticObject/supportedWeb3networks';
import { ClickTopBar } from '@make-software/csprclick-ui';
import styled, { ThemeProvider } from 'styled-components';
import { useClickRef, ThemeModeType } from '@make-software/csprclick-ui';
import { CsprClickThemes } from '@make-software/csprclick-ui';

const LoginButtons = ({ onCloseModal = () => {}, isModal = false }) => {
  // State to store the authenticated user
  const [walletAddress, setWalletAddress] = useState('');
  const [providerName, setProviderName] = useState('');
  const [userWalletsData, setUserWalletsData] = useState();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [logoutImage, setLogoutImage] = useState(logout_icon);
  const [auth, setAuth] = useState(null);
  const { search } = location;
  const {
    VITE_FACEBOOK_AVAILABLE,
    VITE_TWITTER_AVAILABLE,
    VITE_GOOGLE_AVAILABLE,
  } = import.meta.env;
  const [themeMode, setThemeMode] = useState(ThemeModeType.light);
  const {
    setEmail,
    setToken,
    setIsLoggedIn,
    setHasPassword,
    logout,
    entityInfo,
    isLoggedIn,
    balance,
    loginOption,
    email,
    loginProvider,
    setNetwork,
  } = useAuth();

  const currentNetwork = Web3ChainsObjectsArr.find(
    (item) => item.chain == 'CASPER'
  );
  function handleSignOutIcon() {
    if (!isLoggedIn) return;
    if (loginProvider == 'google') {
      setLogoutImage(logoutgoogle);
    } else if (loginProvider == 'facebook') {
      setLogoutImage(logoutfacebook);
    } else if (loginProvider == 'twitter') {
      setLogoutImage(logoutTwitter);
    } else if (loginProvider == 'phone') {
      setLogoutImage(logoutPhone);
    } else {
      setLogoutImage(logout_icon);
    }
  }
  // Function to handle authentication with Google
  const handleSignIn = async (loginOption, user = null) => {
    try {
      // Create AuthProvider instance
      let provider;
      let authFlag = true;
      //Replace all if else statements with one line by indexing a map:
      //provider = mapName[loginOption];
      if (loginOption === 'google') provider = new GoogleAuthProvider();
      else if (loginOption === 'facebook')
        provider = new FacebookAuthProvider();
      else if (loginOption === 'twitter') provider = new TwitterAuthProvider();
      else if (loginOption === 'phone' || loginOption === 'email') {
        authFlag = false;
        // Update user state with the result of signInWithPopup function
        setProviderName(loginOption);
        const accessToken = user.stsTokenManager.accessToken;
        const walletId = user.phoneNumber || user.email;
        setEmail(walletId);
        setToken(accessToken);
        setAxiosToken(accessToken);
        getWallet(walletId);
      }
      if (authFlag) {
        // Get the auth object from firebase
        const auth = await getAuthConfig();
        // Call signInWithPopup function with GoogleAuthProvider instance as argument
        const result = await signInWithPopup(auth, provider);
        // Update user state with the result of signInWithPopup function
        setProviderName(loginOption);
        setEmail(result.user.email);
        setToken(result.user.accessToken);
        setAxiosToken(result.user.accessToken);
        getWallet(result.user.email);
      }
    } catch (error) {
      // Log error in the console if any
      console.log(error);
    }
  };

  // check exist user in horus account and return the account wallets
  const getWallet = async (email) => {
    setLoading(true);
    const apiName = 'getWallet';
    const network = ''; // get all wallets data
    try {
      const response = await axiosToken.get(apiName, {
        params: {
          walletId: email,
          network: network,
        },
      });
      console.log('wallet data', response.data);
      // this condition to create new wallet with user password restrictions
      if (!response.data.wallets['CASPER']) {
        openNewPasswordModel(CreateCasperWallet, email);
      } else {
        setHasPassword(response.data.wallets['CASPER'].wallets[0].hasPassword);
        setWalletAddress(response.data.wallets['CASPER'].wallets[0].publicKey);
        setUserWalletsData(response.data.wallets);
        setNetwork(currentNetwork);
        setTimeout(() => {
          onCloseModal();
        }, 1500);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (
        error.hasOwnProperty('response') &&
        error.response &&
        error.response.status === 500
      )
        openNewPasswordModel(createWallet, email);
      else toast.error('Error getting wallet');
    }
  };

  const CreateCasperWallet = async (password, email) => {
    try {
      const response = await axiosToken.get('getWallet', {
        params: {
          walletId: email,
          network: 'CASPER',
          password: password,
        },
      });
      toast.success('CASPER Wallet is created successfully');
      setHasPassword(response.data.wallets['CASPER'].wallets[0].hasPassword);
      setWalletAddress(response.data.wallets['CASPER'].wallets[0].publicKey);
      setUserWalletsData(response.data.wallets);
      setNetwork(currentNetwork);
      setLoading(false);
      setTimeout(() => {
        onCloseModal();
      }, 1500);
      // navigate("/");
    } catch (error) {
      console.log('error', error);
      const auth = await getAuthConfig();
      signOut(auth);
      toast.error('Error creating wallet');
      setLoading(false);
    }
  };
  // this func is create a new account in Horus system
  const createWallet = async (password, email) => {
    const apiName = 'createWallet';
    const network = 'CASPER';
    if (password === null) return;
    setLoading(true);

    try {
      const response = await axiosToken.post(apiName, {
        walletId: email,
        network: network,
        password: password,
      });
      toast.success('Wallet created successfully');
      setHasPassword(response.data.wallets['CASPER'].wallets[0].hasPassword);
      setWalletAddress(response.data.wallets['CASPER'].wallets[0].publicKey);
      setUserWalletsData(response.data.wallets);
      setNetwork(currentNetwork);
      setLoading(false);
      // navigate("/");
      setTimeout(() => {
        onCloseModal();
      }, 1500);
    } catch (error) {
      console.log('error', error);
      const auth = await getAuthConfig();
      signOut(auth);
      toast.error('Error creating wallet');
      setLoading(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (walletAddress !== '') {
      let modifiedWalletsWithIndex = {};
      let walletIndex;
      Object.keys(userWalletsData).forEach((key) => {
        let value = userWalletsData[key];
        modifiedWalletsWithIndex[key] = {
          ...value,
          wallets: value.wallets.map((w, index) => ({ ...w, index: index })),
        };
        const wallets = modifiedWalletsWithIndex[key].wallets;
        walletIndex = wallets.findIndex((w) => w.publicKey === walletAddress);
      });

      console.log('wallet index', walletIndex);

      setIsLoggedIn(
        true,
        walletAddress,
        'social',
        providerName,
        0,
        modifiedWalletsWithIndex
      );
      setLoading(false);
    }
  }, [walletAddress]);

  useEffect(() => {
    if (walletAddress !== '') {
      let modifiedWalletsWithIndex = {};
      let walletIndex;
      Object.keys(userWalletsData).forEach((key) => {
        let value = userWalletsData[key];
        modifiedWalletsWithIndex[key] = {
          ...value,
          wallets: value.wallets.map((w, index) => ({ ...w, index: index })),
        };
        const wallets = modifiedWalletsWithIndex[key].wallets;
        walletIndex = wallets.findIndex((w) => w.publicKey === walletAddress);
      });

      console.log('wallet index', walletIndex);

      setIsLoggedIn(
        true,
        walletAddress,
        'social',
        providerName,
        walletIndex, //active wallet index
        modifiedWalletsWithIndex
      );
      setLoading(false);
    }
  }, [userWalletsData]);

  const generateRandomCharacter = () => {
    // const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    // return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  const checkUserAuthState = async (href) => {
    if (!user) {
      // user is not signed in but the link is valid
      const auth = await getAuthConfig();
      if (isSignInWithEmailLink(auth, href)) {
        // now in case user clicks the email link on a different device, we will ask for email confirmation
        let email = localStorage.getItem('email');
        if (email) {
          // after that we will complete the login process
          signInWithEmailLink(auth, email, href)
            .then((result) => {
              // we can get the user from result.user but no need in this case
              console.log(JSON.stringify(result.user, null, 4));
              setUser(result.user);
              localStorage.removeItem('email');
              // call handleSignIn with email method
              handleSignIn('email', result.user);
            })
            .catch((err) => {
              console.log(`Error: ${err}`);
            });
        } else {
          console.log(`No email found, try again`);
        }
      }
    }
  };

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 922) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  // const handleResize2 = () => {
  //   const screenWidth = window.innerWidth;
  //   if (screenWidth < 1300) {
  //     setIsSmallScreen(true);
  //   } else {
  //     setIsSmallScreen(false);
  //   }
  // };

  const logoutHandler = async () => {
    if (isLoggedIn && loginOption == 'social') {
      const auth = await getAuthConfig();
      signOut(auth);
    }
    logout();
  };

  const redirectUserToCsprSite = () => {
    if (isLoggedIn) {
      window.open(
        import.meta.env.VITE_APP_CPR_LINK_TEST + entityInfo.activePublicKey,
        '_blank'
      );
    }
  };
  const callCasperClickLogin = async () => {
    onCloseModal();
    window.csprclick.signIn();
  };

  useEffect(() => {
    const href = window.location.href;
    checkUserAuthState(href);
  }, [user, search, navigate]);
  useEffect(() => {
    handleSignOutIcon();
  }, [isLoggedIn]);

  const initAuth = async () => {
    const authConfig = await getAuthConfig();
    setAuth(authConfig);
  };

  useEffect(() => {
    if (!isLoggedIn && !auth) {
      initAuth();
    } else {
      if (!isLoggedIn) {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          // Handle user state changes
          if (user) {
            console.log('User:', user?.email);
            const walletId = user?.phoneNumber || user?.email;
            // console.log('Access Token:', user?.stsTokenManager?.accessToken);
            if (user?.providerData.length > 0) {
              const providerId = user.providerData[0].providerId;
              const providerName = providerId.split('.')[0];
              setProviderName(providerName);
              // Use the provider information as needed
            }
            setEmail(walletId);
            setToken(user?.stsTokenManager?.accessToken);
            setAxiosToken(user?.stsTokenManager?.accessToken);
            getWallet(walletId);
          }
        });
        return () => {
          unsubscribe();
        };
      }
    }
  }, [auth]);

  return (
    <div>
      {loading && <Preloader show={loading} />}
      <div className="hidden">
        <ThemeProvider theme={CsprClickThemes.light}>
          <ClickTopBar
            themeMode={themeMode}
            onThemeSwitch={() =>
              setThemeMode(
                themeMode === ThemeModeType.light
                  ? ThemeModeType.dark
                  : ThemeModeType.light
              )
            }
          />
        </ThemeProvider>
      </div>
      {!isLoggedIn ? (
        <div
          className={`row mx-4  ${
            isSmallScreen && 'mt-5 block'
          } sm:block xl:flex`}
        >
          <div
            className="xl:p-0 flex self-center col-auto py-2 ml-2"
            onClick={() => callCasperClickLogin()}
          >
            <WalletTooltip title="Connect with casper click" className="mx-4">
              <img
                src={isModal ? csprClickLightIcon : csprClickIcon}
                className="w-20"
              />
            </WalletTooltip>
          </div>
          <div
            className="xl:p-0 flex items-center col-auto py-2 ml-2"
            onClick={() =>
              VITE_GOOGLE_AVAILABLE == 'true' ? handleSignIn('google') : null
            }
          >
            <WalletTooltip title="Connect with Google" className="mx-4">
              <img
                alt="google"
                src={google_icon}
                className={`${isSmallScreen && 'me-2'} w-8 h-8`}
              />
            </WalletTooltip>
            <p className="xl:hidden mx-1 pointer-events-none">
              Connect with Google
            </p>
          </div>
          <div
            className="xl:p-0 flex items-center col-auto py-2 ml-2"
            onClick={() =>
              VITE_FACEBOOK_AVAILABLE === 'true'
                ? handleSignIn('facebook')
                : null
            }
          >
            <WalletTooltip
              title={
                VITE_FACEBOOK_AVAILABLE === 'true'
                  ? 'Connect with Facebook'
                  : 'Coming soon'
              }
              className="mx-4"
            >
              <div
                className={`image-overlay ${
                  VITE_FACEBOOK_AVAILABLE === 'true' ? '' : 'disabled'
                }`}
              >
                <img
                  alt="facebook"
                  src={facebook_icon}
                  className={`${isSmallScreen && 'me-2'}  w-8 h-8`}
                />
              </div>
            </WalletTooltip>
            <p className="xl:hidden mx-1">
              {VITE_FACEBOOK_AVAILABLE === 'true'
                ? 'Connect with Facebook'
                : 'Connect with Facebook (Coming soon)'}
            </p>
          </div>
          <div
            className="xl:p-0 flex items-center col-auto py-2 ml-2"
            onClick={() =>
              VITE_TWITTER_AVAILABLE == 'true' ? handleSignIn('twitter') : null
            }
          >
            <WalletTooltip
              title={
                VITE_TWITTER_AVAILABLE == 'true'
                  ? 'Connect with Twitter'
                  : 'Coming soon'
              }
              className="mx-4"
            >
              <div
                className={`image-overlay ${
                  VITE_TWITTER_AVAILABLE === 'true' ? '' : 'disabled'
                }`}
              >
                <img
                  alt="twitter"
                  src={twitter_icon}
                  className={`${isSmallScreen && 'me-2'}  w-8 h-8`}
                />
              </div>
            </WalletTooltip>
            <p className="xl:hidden mx-1">
              {VITE_TWITTER_AVAILABLE == 'true'
                ? 'Connect with Twitter'
                : 'Coming soon'}
            </p>
          </div>
          <div className="xl:p-0 flex items-center col-auto py-2 ml-2">
            <WalletTooltip title="Connect with Email" className="mx-4">
              <img
                alt="email"
                src={email_icon}
                onClick={() => openEmailModal()}
                className={`${isSmallScreen && 'me-2'}  w-8 h-8`}
              />
            </WalletTooltip>
            <p className="xl:hidden mx-1">Connect with Email</p>
          </div>
          <div
            className="xl:p-0 flex items-center col-auto py-2 ml-2"
            onClick={() => openPhoneModal(handleSignIn)}
          >
            <WalletTooltip title="Connect with Phone" className="mx-4">
              <img
                alt="phone"
                src={phone_icon}
                className={`${isSmallScreen && 'me-2'}  w-8 h-8`}
              />
            </WalletTooltip>
            <p className="xl:hidden mx-1">Connect with Phone</p>
          </div>
        </div>
      ) : (
        <div className={`mx-4 flex align-items-center justify-center `}>
          <span className="d-inline-block me-2 self-center">
            {Number(balance).toFixed(2)} CSPR
          </span>
          <div className="center">
            <Avatar className="float-left" aria-label="avatar">
              {generateRandomCharacter()}
            </Avatar>
          </div>

          <div>
            {isLoggedIn && entityInfo && (
              <div className="flex">
                <Link
                  className="self-center float-left m-2"
                  onClick={() => redirectUserToCsprSite()}
                >
                  {entityInfo.activePublicKey?.slice(0, 3)} ...
                  {entityInfo.activePublicKey?.slice(
                    entityInfo.activePublicKey.length - 2
                  )}
                </Link>
                <WalletTooltip title="Logout" className="mx-4">
                  <img
                    alt="logout"
                    src={logoutImage}
                    className="img img-fluid w-12 h-12"
                    onClick={logoutHandler}
                  />
                </WalletTooltip>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="ms-2 self-center">
        {isLoggedIn && loginOption === 'social' && (
          <div>
            <p className="text-center">{email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginButtons;
