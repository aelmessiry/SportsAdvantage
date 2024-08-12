import React from 'react';
//import { useNavigate } from 'react-router-dom';
import SpAdvButton from '../ui/SpAdvButton';
import BackToHistory from '../shared/BackToHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCameraRetro,
  // faCameraRetro,
  faLocationDot,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { faSuperpowers } from '@fortawesome/free-brands-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons/faXTwitter';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import toast from 'react-hot-toast';
import { openPasswordModel } from '../../Horus-social-login/social-wallet/PasswordModal';
import { mintGenesisNFT } from '../../web3/utils';
import { useAuth } from '../../Horus-social-login/web3/context/AuthContext';
import LoginModal from '../ui/shared/modals/LoginModal';
import { Spinner } from 'flowbite-react';
function Banner(props) {
  const fileImgCoverInput = React.useRef();
  const fileImgProfileInput = React.useRef();
  const [uploadedCoverImage, setUploadedCoverImage] = React.useState();
  const [coverImage, setCoverImage] = React.useState(props.team?.cover_image);
  const [uploadedProfileImage, setUploadedProfileImage] = React.useState();
  const [profileImage, setProfileImage] = React.useState(props.team?.image);
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const {
    isLoggedIn,
    entityInfo,
    loginOption,
    hasPassword,
    network,
    email,
    refreshBalance,
  } = useAuth();
  // let navigate = useNavigate();
  // const goToSelectCar = () => {
  //   navigate(`/team-cars?id=${props.team?.id}`);
  // };
  const [isVideo, setIsVideo] = React.useState<String | undefined>();
  const checkIsIPFSContentVideo = (url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then((blob) => {
        if (blob.type.includes('image')) {
          setIsVideo('image');
        } else if (blob.type.includes('video')) {
          setIsVideo('video');
        } else {
          setIsVideo(undefined);
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setIsVideo(undefined);
      });
  };
  React.useEffect(() => {
    props?.team?.metadata &&
      typeof JSON.parse(props?.team?.metadata) === 'object' &&
      props?.team?.metadata !== null &&
      !Array.isArray(props?.team?.metadata) &&
      checkIsIPFSContentVideo(
        !JSON.parse(props?.team?.metadata)?.image.startsWith('https://') &&
          !JSON.parse(props?.team?.metadata)?.image.startsWith('http://')
          ? `https://${JSON.parse(props?.team?.metadata)?.image}`
          : JSON.parse(props?.team?.metadata)?.image
      );
  }, [props.team]);
  const handleMinting = async () => {
    if (!isLoggedIn) {
      return;
    }
    let tx: any;
    if (hasPassword) {
      tx = {
        walletId: email,
        network: network.chain,
      };
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
          JSON.stringify(props.team.metadata),
          tx
        );
        refreshBalance();
      };
      openPasswordModel(handlePassSecureMinting);
    } else {
      await mintGenesisNFT(
        entityInfo.activePublicKey,
        loginOption,
        props.team.metadata,
        tx
      );
      refreshBalance();
    }
  };

  const uploadCover = async (e) => {
    setCoverImage(URL.createObjectURL(e.target.files[0]));
    setUploadedCoverImage(e.target.files[0]);
    console.log(uploadedCoverImage);
  };
  const uploadProfile = async (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    setUploadedProfileImage(e.target.files[0]);
    console.log(uploadedProfileImage);
  };
  return (
    <div className="md:px-16 lg:flex-row px-4 my-6">
      <BackToHistory text="Back to Browse" />
      <div className=" mt-10">
        <div className=" h-80 relative">
          <img
            alt="hero5"
            className=" h-80 object-cover w-full"
            src={coverImage}
          />

          {props.isTeamAdmin && (
            <label className=" bottom-4 right-3 bg-opacity-70 absolute px-3 py-2 text-white bg-black rounded-md cursor-pointer">
              <FontAwesomeIcon icon={faCameraRetro} className="mr-1" />
              Change Cover Image
              <input
                className=" hidden"
                type="file"
                ref={fileImgCoverInput}
                onChange={(e) => uploadCover(e)}
              />
            </label>
          )}
        </div>
        <div className="lg:flex relative items-end justify-between">
          <div className="lg:w-72 ">
            <div className="-top-1/2 lg:left-7 lg:-translate-x-0 left-1/2 border-antiFlashWhite-100 lg:w-56 absolute inline-block w-24 transform -translate-x-1/2 border-4 rounded-full">
              <div className="relative">
                <img
                  className=" border-antiFlashWhite-100 lg:w-56 lg:h-56 object-contain w-24 h-24 bg-white border-4 rounded-full"
                  src={profileImage}
                  alt="team"
                />
                {props.isTeamAdmin && (
                  <label className=" bottom-4 bg-neutral-600 absolute right-0 z-20 p-3 text-white rounded-full cursor-pointer">
                    <FontAwesomeIcon
                      icon={faCameraRetro}
                      className="mr-1"
                      size="lg"
                    />
                    <input
                      className=" hidden"
                      type="file"
                      ref={fileImgProfileInput}
                      onChange={(e) => uploadProfile(e)}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
          <div className=" flex-1 mt-5">
            <div className=" font-spAdvSemiBold text-h2 font-semibold leading-relaxed text-black">
              {props.team?.name}
            </div>
            <div className=" text-neutral-400 font-spAdvRegular text-base font-normal leading-6">
              <FontAwesomeIcon icon={faSuperpowers} /> {props.team?.teamOwner}
              <br />
              <FontAwesomeIcon icon={faCalendar} /> {props.team?.foundedIn}
              <br />
              <FontAwesomeIcon icon={faUserTie} /> {props.team?.teamManager}
              <br />
              <FontAwesomeIcon icon={faLocationDot} />{' '}
              {props.team?.headQuarters}
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between flex-1">
                <div className=" font-spAdvBold text-lava-100 text-lg font-bold leading-7">
                  {props.team?.website}
                </div>
              </div>
            </div>
            <ul className="b-5 lg:gap-4 flex gap-4 mt-3 list-none">
              <li>
                <a
                  href={props.team?.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    props.team?.youtubeLink === '' && 'pointer-events-none'
                  } hover:underline `}
                >
                  <FontAwesomeIcon
                    icon={faYoutube}
                    className={`${
                      props.team?.youtubeLink === ''
                        ? 'pointer-events-none text-gray-500'
                        : ' text-black '
                    } lg:text-xl md:text-2xl text-3xl `}
                  />
                </a>
              </li>
              <li>
                <a
                  href={props.team?.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    props.team?.youtubeLink === '' && 'pointer-events-none'
                  } hover:underline `}
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className={`${
                      props.team?.instagramLink === ''
                        ? 'pointer-events-none text-gray-500'
                        : ' text-black '
                    } lg:text-xl md:text-2xl text-3xl `}
                  />
                </a>
              </li>
              <li>
                <a
                  href={props.team?.twitterLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    props.team?.twitterLink === '' && 'pointer-events-none'
                  } hover:underline `}
                >
                  <FontAwesomeIcon
                    icon={faXTwitter}
                    className={`${
                      props.team?.twitterLink === ''
                        ? 'pointer-events-none text-gray-500'
                        : ' text-black '
                    } lg:text-xl md:text-2xl text-3xl `}
                  />
                </a>
              </li>
              <li>
                <a
                  href={props.team?.facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    props.team?.youtubeLink === '' && 'pointer-events-none'
                  } hover:underline `}
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className={`${
                      props.team?.facebookLink === ''
                        ? 'pointer-events-none text-gray-500'
                        : ' text-black '
                    } lg:text-xl md:text-2xl text-3xl `}
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-between text-right">
            {props?.team?.metadata &&
              typeof JSON.parse(props?.team?.metadata) === 'object' &&
              props?.team?.metadata !== null &&
              !Array.isArray(props?.team?.metadata) &&
              (isVideo == 'video' ? (
                <video
                  autoPlay={false}
                  controls
                  poster={`${
                    !JSON.parse(props?.team?.metadata)?.poster.startsWith(
                      'https://'
                    ) &&
                    !JSON.parse(props?.team?.metadata)?.poster.startsWith(
                      'http://'
                    )
                      ? `https://${JSON.parse(props?.team?.metadata)?.poster}`
                      : JSON.parse(props?.team?.metadata)?.poster
                  }`}
                  height={'100%'}
                  className=" w-44 object-cover my-2"
                >
                  <source
                    src={`${
                      !JSON.parse(props?.team?.metadata)?.image.startsWith(
                        'https://'
                      ) &&
                      !JSON.parse(props?.team?.metadata)?.image.startsWith(
                        'http://'
                      )
                        ? `https://${JSON.parse(props?.team?.metadata)?.image}`
                        : JSON.parse(props?.team?.metadata)?.image
                    }`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              ) : isVideo == 'image' ? (
                <img
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                  }}
                  className=" w-44 object-cover my-2"
                  src={`${
                    !JSON.parse(props?.team?.metadata)?.image.startsWith(
                      'https://'
                    ) &&
                    !JSON.parse(props?.team?.metadata)?.image.startsWith(
                      'http://'
                    )
                      ? `https://${JSON.parse(props?.team?.metadata)?.image}`
                      : JSON.parse(props?.team?.metadata)?.image
                  }`}
                  alt={'nft'}
                />
              ) : (
                <Spinner />
              ))}
            <div>
              {props?.team?.metadata && (
                <SpAdvButton
                  className="mr-2"
                  onClick={() => {
                    isLoggedIn ? handleMinting() : setOpenLoginModal(true);
                  }}
                >
                  Buy Team NFT!
                </SpAdvButton>
              )}
              <SpAdvButton
                onClick={() =>
                  window.open(
                    `${import.meta.env.VITE_CONTACT_SPONSOR_FORM}?Offer=${
                      props.team.name
                    }`,
                    '_blank'
                  )
                }
              >
                Contact us to Sponsor
              </SpAdvButton>
            </div>
            {/* <SpAdvButton onClick={() => goToSelectCar()}>
              Purchase Sponsorship
            </SpAdvButton> */}
          </div>
        </div>
      </div>
      <hr className="mb-14 mt-20" />
      {openLoginModal && (
        <LoginModal
          show={openLoginModal}
          handleCloseParent={() => {
            setOpenLoginModal(false);
          }}
        />
      )}
    </div>
  );
}

export default Banner;
