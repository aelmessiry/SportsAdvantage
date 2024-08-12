import React, { useState } from 'react';
import ReactGA from 'react-ga4';
import {
  hero1,
  // etherumIcon,
  casperWhiteIcon,
  genesisNFT,
  freeNFT,
  claimedNft,
} from '../../assets/images';
import SpAdvIcon from '../ui/shared/SpAdvIcon';
import SpAdvButton from '../ui/SpAdvButton';
import axios from 'axios';
import {
  balanceOf,
  getDeploymentStatus,
  getNoOfMintedGenesisNFTs,
  getNoOfMintedIncNFTs,
  getNoOfMintedStagingIncNFTs,
  mintGenesisNFT,
} from '../../web3/utils';
import toast from 'react-hot-toast';
import LoginModal from '../ui/shared/modals/LoginModal';
import { useAuth } from '../../Horus-social-login/web3/context/AuthContext';
import FreeNftProcess from '../ui/shared/modals/FreeNftProcess';
import { INCEPTION_NFT_METADATA } from '../../data/freeNftMetas';
import { useNavigate } from 'react-router-dom';
import WalletTooltip from '../../Horus-social-login/social-wallet/tooltip';
import { openPasswordModel } from '../../Horus-social-login/social-wallet/PasswordModal';
import {
  STAGING_INCEPTION_CONTRACT_PACKAGE,
  INCEPTION_CONTRACT_PACKAGE,
  TEAM_CONTRACT_PACKAGE,
  TEAM_NFT_METADATA,
} from '../../web3/constants';
import { Spinner } from 'flowbite-react';
export default function Hero() {
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [noOfFreeNFTs, setNoOfFreeNFTs] = React.useState();
  const [noOfStagingFreeNFTs, setNoOfStagingFreeNFTs] = React.useState();
  const [noOfGensisNFTs, setNoOfGensisNFTs] = React.useState();
  const {
    isLoggedIn,
    entityInfo,
    loginOption,
    email,
    hasPassword,
    network,
    refreshBalance,
  } = useAuth();
  const [minting, setMinting] = useState('LOADING');
  const [claimed, setClaimed] = useState(false);
  const [showFreeNftProcess, setShowFreeNftProcess] = useState(false);
  const [mintingProcessMsg, setMintingProcessMsg] = useState('LOADING ..');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const result = await balanceOf(entityInfo.activePublicKey);
      if (result == 0) {
        setShowFreeNftProcess(true);
        getFreeNFT();
      } else {
        setMinting('CLAIMED');
        //  setMintingProcessMsg("Congratulations, your Inception NFT is minting successfully 🎉")
        setClaimed(true);
      }
    } catch (e) {
      console.log(e);
      setMinting('Failed to fetch NFTs');
    }
  };

  const handleMinting = async () => {
    let tx: any = {
      walletId: email,
      network: network.chain,
    };
    if (hasPassword && loginOption == 'social') {
      const handlePassSecureMinting = async (password: string) => {
        if (password === '') return toast.error('Password is required');
        if (password == null) return;
        tx = {
          ...tx,
          password,
        };
        await mintGenesisNFT(
          entityInfo.activePublicKey,
          loginOption,
          JSON.stringify(TEAM_NFT_METADATA['Genesis']),
          tx
        );
        refreshBalance();
        ReactGA.event({
          category: 'Genesis Mint',
          action: 'Genesis Mint',
        });
      };
      openPasswordModel(handlePassSecureMinting);
    } else {
      await mintGenesisNFT(
        entityInfo.activePublicKey,
        loginOption,
        JSON.stringify(TEAM_NFT_METADATA['Genesis']),
        tx
      );
      refreshBalance();
      ReactGA.event({
        category: 'Genesis Mint',
        action: 'Genesis Mint',
      });
    }
  };

  const getFreeNFT = async () => {
    setMinting('YOUR NFT IS MINTING..');
    setMintingProcessMsg('Congratulations your Inception NFT is minting NOW ');
    try {
      const url = `${import.meta.env.VITE_BACKEND_NFT_API}/getInceptionNft`;
      const params = {
        network: import.meta.env.VITE_NETWORK,
        userAddress: entityInfo.activePublicKey,
      };
      const response: any = await axios.post(url, params);
      if (response.data.isSuccess) {
        const txPromise = getDeploymentStatus(response.data.txHash);

        toast
          .promise(txPromise, {
            loading: 'Waiting for deployment',
            success: 'Your Inception NFT is deployed successfully',
            error: 'Failed to deploy your NFT',
          })
          .then(() => {
            setMintingProcessMsg(
              'Congratulations, your Inception NFT minted successfully! Please wait till deployment 🎉'
            );
            setMinting("YOU'VE GOT The FREE Inception NFT");
            setClaimed(true);
            ReactGA.event({
              category: 'Inception Mint',
              action: 'Inception Mint',
            });
          })
          .catch((error) => {
            console.error('Error during deployment:', error);
          });
      } else {
        setMinting('Minting Failed');
        setMintingProcessMsg(
          'Minting a free Inception NFT is Failed, Try to logout and login again '
        );
        toast.error('Something went wrong please try again later!');
      }
    } catch (e: any) {
      setMinting('Minting Failed');
      console.error(e);
      toast.error(e.message);
    }
  };
  const getGensisNfts = React.useCallback(async () => {
    const totalGensis = await getNoOfMintedGenesisNFTs();
    totalGensis && setNoOfGensisNFTs(totalGensis);
  }, []);
  const getIncNfts = React.useCallback(async () => {
    const totalFree = await getNoOfMintedIncNFTs();
    totalFree && setNoOfFreeNFTs(totalFree);
  }, []);
  const getStagingIncNfts = React.useCallback(async () => {
    const totalFree = await getNoOfMintedStagingIncNFTs();
    totalFree && setNoOfStagingFreeNFTs(totalFree);
  }, []);
  React.useEffect(() => {
    try {
      !noOfGensisNFTs && getGensisNfts();
      !noOfFreeNFTs && getIncNfts();
      !noOfStagingFreeNFTs && getStagingIncNfts();
    } catch (err) {
      console.log(err);
    }
  }, [
    getGensisNfts,
    noOfGensisNFTs,
    getIncNfts,
    noOfFreeNFTs,
    getStagingIncNfts,
    noOfStagingFreeNFTs,
  ]);
  React.useEffect(() => {
    isLoggedIn && handleLogin();
  }, [isLoggedIn, entityInfo.activePublicKey]);
  return (
    <div className="lg:flex-row flex flex-col items-center justify-between w-full mb-10">
      <div className="lg:mb-0 lg:max-w-lg lg:pr-5 sm:max-w-xl md:max-w-full md:px-24 lg:px-8 lg:py-20 px-4 py-16 mx-auto mb-16">
        <div className="max-w-xl mb-6">
          <div>
            <p className="text-h1 text-darkGunmetal-200 inline-block py-px mb-4 font-bold leading-snug tracking-normal rounded-full">
              Accelerate Your Brand with{' '}
              <span className=" text-lava-100 ml-1">
                Motorsports Sponsorship
              </span>
            </p>
          </div>
          <p className="text-darkGunmetal-200 font-spAdvRegular text-base">
            Discover a World of Opportunities to Promote Your Business on the
            Fast Track.
          </p>
        </div>
        <div className="place-items-stretch flex">
          <div className=" flex flex-col items-stretch justify-around w-1/2 pr-2">
            <p className="text-darkGunmetal-200 font-spAdvRegular mb-6 text-base">
              Reach a Global Audience
              <br />
              Drive Brand Recognition
              <br />
              Boost Your ROI
              <br />
              Fuel Your Success
            </p>
            {!isLoggedIn ? (
              <SpAdvButton
                onClick={() => setOpenLoginModal(!openLoginModal)}
                className="font-spAdvRegular tracking-normal"
              >
                {'Login to get a free NFT!'}
              </SpAdvButton>
            ) : (
              <p
                className=" font-spAdvSemiBold text-neutral-400 text-3xl font-semibold cursor-pointer"
                onClick={() => isLoggedIn && claimed && navigate('/my-assets')}
              >
                {minting}
              </p>
            )}
          </div>
          <WalletTooltip
            title={
              isLoggedIn && claimed ? INCEPTION_NFT_METADATA.description : ''
            }
          >
            <img
              className=" object-cover w-1/2"
              src={isLoggedIn && claimed ? claimedNft : freeNFT}
              alt=""
            />
          </WalletTooltip>
        </div>
        <br />
        <div className=" flex">
          {/* <a
            href={`${import.meta.env.VITE_APP_CPR_LINK_CONTRACT_PACKAGE}${
              INCEPTION_CONTRACT_PACKAGE[import.meta.env.VITE_NETWORK]
            }`}
            className=" hover:underline cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          > */}
          <span className="text-darkGunmetal-200 font-spAdvRegular text-base">
            Minted Inception NFTs:
          </span>
          <span className="text-lava-100 ml-1">
            {noOfFreeNFTs ? (
              `${noOfFreeNFTs + noOfStagingFreeNFTs}`
            ) : (
              <Spinner />
            )}
          </span>
          {/* </a> */}
          {noOfFreeNFTs ? (
            <>
              <span
                onClick={() =>
                  window.open(
                    `${import.meta.env.VITE_APP_CPR_LINK_CONTRACT_PACKAGE}${
                      INCEPTION_CONTRACT_PACKAGE[import.meta.env.VITE_NETWORK]
                    }`,
                    '_blank'
                  )
                }
                className="text-lava-100 hover:underline inline ml-1 cursor-pointer"
              >
                (Main {noOfFreeNFTs}
              </span>
              <span
                onClick={() =>
                  window.open(
                    `${import.meta.env.VITE_APP_CPR_LINK_CONTRACT_PACKAGE}${
                      STAGING_INCEPTION_CONTRACT_PACKAGE[
                        import.meta.env.VITE_NETWORK
                      ]
                    }`,
                    '_blank'
                  )
                }
                className="text-lava-100 hover:underline inline ml-1 cursor-pointer"
              >
                , Staging {noOfStagingFreeNFTs})
              </span>
            </>
          ) : (
            <Spinner />
          )}
        </div>
        <div>
          <a
            href={`${import.meta.env.VITE_APP_CPR_LINK_CONTRACT_PACKAGE}${
              TEAM_CONTRACT_PACKAGE[import.meta.env.VITE_NETWORK]
            }`}
            className=" hover:underline cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-darkGunmetal-200 font-spAdvRegular text-base">
              Minted Gensis NFTs:
            </span>
            <span className=" text-lava-100 ml-1">
              {noOfGensisNFTs ? noOfGensisNFTs : <Spinner />}
            </span>
          </a>
        </div>
      </div>
      <div className="lg:w-1/2 relative flex items-center justify-end">
        <div className="z-2 relative w-2/5">
          <img className="object-cover" src={genesisNFT} alt="" />{' '}
          <SpAdvIcon
            image={casperWhiteIcon}
            ParentClassName=" absolute md:-left-4 -left-4 top-4  md:top-32 sp-adv-rec-lava flex items-center justify-center rounded-md bg-lava-100"
          />
        </div>
        <div className="sp-adv-hero-images relative -ml-32">
          <img className="object-cover" src={hero1} alt="" />
          <SpAdvButton
            className="top-1/2 left-1/4 z-3 absolute transform -translate-x-1/2 -translate-y-1/2"
            onClick={() => {
              isLoggedIn ? handleMinting() : setOpenLoginModal(true);
            }}
          >
            Buy Genesis NFT! <br /> <span className=" text-xs">1 k CSPR</span>
          </SpAdvButton>
        </div>
      </div>
      {openLoginModal && (
        <LoginModal
          show={openLoginModal}
          handleCloseParent={() => {
            setOpenLoginModal(false);
          }}
        />
      )}
      {showFreeNftProcess && (
        <FreeNftProcess
          show={showFreeNftProcess}
          handleCloseParent={() => {
            setShowFreeNftProcess(false);
            setMintingProcessMsg('');
          }}
          processMessage={mintingProcessMsg}
        />
      )}
    </div>
  );
}
