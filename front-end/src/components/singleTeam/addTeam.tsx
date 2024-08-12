import React from 'react';
import SpAdvInput from '../ui/SpAdvInput';
import { hero5, team } from '../../assets/images';
import SpAdvButton from '../ui/SpAdvButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'flowbite-react';
import axios from 'axios';
import { useAuth } from '../../Horus-social-login/web3/context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../ui/shared/modals/LoginModal';
import { APIERRORHandling } from '../../Enum/apiErrorHandling';
import { ChangingProfileImage } from '../../Enum/changingProfileImage';
import { useUserRole } from '../../contexts/LoggedUserRoleContext';
import { UserRole } from '../../Enum/userRole';

import SpAdvEditor from '../ui/SpAdvEditor';
import {
  isContainsLetters,
  isValidCasperWallet,
  isValidEmail,
  isValidFacebookUrl,
  isValidInstagramUrl,
  isValidTwitterUrl,
  isValidURL,
  isValidYear,
  isValidYouTubeUrl,
} from '../../utils/formValidation';
function AddTeam(props) {
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const fileImgCoverInput = React.useRef();
  const fileImgProfileInput = React.useRef();
  const navigate = useNavigate();
  const { setUserRoleData } = useUserRole();
  const [uploadedCoverImage, setUploadedCoverImage] = React.useState();
  const [coverImage, setCoverImage] = React.useState(
    props.itemInfo ? props.itemInfo.cover_image : hero5
  );
  const [uploadedProfileImage, setUploadedProfileImage] = React.useState();
  const [profileImage, setProfileImage] = React.useState(
    props.itemInfo ? props.itemInfo.image : team
  );
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);
  const [isShowErrors, setIsShowErrors] = React.useState(false);

  const [bio, setBio]: any = React.useState(
    props.itemInfo ? props.itemInfo.bio : ''
  );
  const [isBioEmpty, setIsBioEmpty] = React.useState(
    props.itemInfo && props.itemInfo?.bio ? false : true
  );

  const { isLoggedIn, entityInfo } = useAuth();
  const [address, setAddress] = React.useState(
    props.itemInfo
      ? props.itemInfo.address
      : !props.isAdmin
      ? entityInfo?.activePublicKey
      : ''
  );

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

  const InitialInputs = () => ({
    inputs: {
      teamOwner: props.itemInfo ? props.itemInfo.teamOwner : '',
      foundedIn: props.itemInfo ? props.itemInfo.foundedIn : '',
      headQuarters: props.itemInfo ? props.itemInfo.headQuarters : '',
      teamManager: props.itemInfo ? props.itemInfo.teamManager : '',
      facebookLink: props.itemInfo ? props.itemInfo.facebookLink : '',
      twitterLink: props.itemInfo ? props.itemInfo.twitterLink : '',
      instagramLink: props.itemInfo ? props.itemInfo.instagramLink : '',
      youtubeLink: props.itemInfo ? props.itemInfo.youtubeLink : '',
      name: props.itemInfo ? props.itemInfo.name : '',
      email: props.itemInfo ? props.itemInfo.email : '',
      website: props.itemInfo ? props.itemInfo.website : '',
    },
  });
  const [state, setState] = React.useState(InitialInputs());
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    const { inputs }: any = state;

    inputs[name] = value;
    setState({
      ...state,
      inputs,
    });
  };
  React.useEffect(() => {
    try {
      setAddress(
        props.itemInfo
          ? props.itemInfo.address
          : !props.isAdmin
          ? entityInfo?.activePublicKey
          : ''
      );
    } catch (err) {}
  }, [isLoggedIn, entityInfo]);
  const handleAddTeam = async () => {
    try {
      if (!uploadedCoverImage || !uploadedProfileImage) {
        toast.error('Please upload team images first!');
        return;
      }
      if (
        (address !== '' && !isValidCasperWallet(address)) ||
        (state.inputs.email !== '' && !isValidEmail(state.inputs.email)) ||
        (state.inputs.website !== '' && !isValidURL(state.inputs.website)) ||
        (state.inputs.facebookLink !== '' &&
          !isValidFacebookUrl(state.inputs.facebookLink)) ||
        (state.inputs.instagramLink !== '' &&
          !isValidInstagramUrl(state.inputs.instagramLink)) ||
        (state.inputs.twitterLink !== '' &&
          !isValidTwitterUrl(state.inputs.twitterLink)) ||
        (state.inputs.youtubeLink !== '' &&
          !isValidYouTubeUrl(state.inputs.youtubeLink)) ||
        !isContainsLetters(state.inputs.name) ||
        (state.inputs.teamManager !== '' &&
          !isContainsLetters(state.inputs.teamManager)) ||
        (state.inputs.teamOwner !== '' &&
          !isContainsLetters(state.inputs.teamOwner)) ||
        (state.inputs.foundedIn !== '' &&
          !isValidYear(
            Number(state.inputs.foundedIn),
            1894,
            new Date().getFullYear()
          ))
      ) {
        setIsShowErrors(true);
        return;
      }
      setIsShowErrors(false);

      setIsButtonClicked(true);
      var formdata: any = new FormData();
      formdata.append('cover_image', uploadedCoverImage);
      formdata.append('image', uploadedProfileImage);
      formdata.append(
        'team',
        JSON.stringify({
          name: state.inputs.name.trim(),
          teamOwner: state.inputs.teamOwner,
          foundedIn: state.inputs.foundedIn,
          headQuarters: state.inputs.headQuarters,
          teamManager: state.inputs.teamManager,
          bio: bio,
          facebookLink: state.inputs.facebookLink,
          twitterLink: state.inputs.twitterLink,
          instagramLink: state.inputs.instagramLink,
          youtubeLink: state.inputs.youtubeLink,
          address: address.trim(),
          email: state.inputs.email,
          website: state.inputs.website,
          is_approved: false,
        })
      );

      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/add_team`,
        data: formdata,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
        },
      })
        .then(() => {
          toast.success('Data saved Successfully');
          if (props.isAdmin) {
            setState(InitialInputs());
            setUploadedCoverImage(undefined);
            setCoverImage(hero5);
            setUploadedProfileImage(undefined);
            setProfileImage(team);
            setAddress('');
          } else {
            setUserRoleData({
              pk: entityInfo.activePublicKey,
              role: UserRole.teamAdmin,
              isDisabled: false,
            });
            navigate('/team-admin');
          }
        })
        .catch((e) => {
          if (e.response.data.code === APIERRORHandling.ITEM_DUPLICATED) {
            toast.error(
              `This item is already in use, please change the item and try again.`
            );
          } else if (
            e.response.data.code === APIERRORHandling.ADDRESS_DUPLICATED
          ) {
            toast.error(
              'This address is already in use, please change the address and try again.'
            );
          } else if (
            e.response.data.code === APIERRORHandling.NAME_DUPLICATED
          ) {
            toast.error(
              'This name is already in use, please change the name and try again.'
            );
          } else {
            toast.error('Something went wrong please try again later!');
          }
        });
    } catch (err) {
      toast.error(err.message);
    }
    setIsButtonClicked(false);
  };
  const handleEditTeam = async () => {
    try {
      if (
        (address !== '' && !isValidCasperWallet(address)) ||
        (state.inputs.email !== '' && !isValidEmail(state.inputs.email)) ||
        (state.inputs.website !== '' && !isValidURL(state.inputs.website)) ||
        (state.inputs.facebookLink !== '' &&
          !isValidFacebookUrl(state.inputs.facebookLink)) ||
        (state.inputs.instagramLink !== '' &&
          !isValidInstagramUrl(state.inputs.instagramLink)) ||
        (state.inputs.twitterLink !== '' &&
          !isValidTwitterUrl(state.inputs.twitterLink)) ||
        (state.inputs.youtubeLink !== '' &&
          !isValidYouTubeUrl(state.inputs.youtubeLink)) ||
        !isContainsLetters(state.inputs.name) ||
        (state.inputs.teamManager !== '' &&
          !isContainsLetters(state.inputs.teamManager)) ||
        (state.inputs.teamOwner !== '' &&
          !isContainsLetters(state.inputs.teamOwner)) ||
        (state.inputs.foundedIn !== '' &&
          !isValidYear(
            Number(state.inputs.foundedIn),
            1894,
            new Date().getFullYear()
          ))
      ) {
        setIsShowErrors(true);
        return;
      } else {
        setIsShowErrors(false);
      }
      setIsShowErrors(false);
      setIsButtonClicked(true);
      var formdata: any = new FormData();
      const sharedAttrs = {
        id: props.itemInfo.id,
        name: state.inputs.name.trim(),
        teamOwner: state.inputs.teamOwner,
        foundedIn: state.inputs.foundedIn,
        headQuarters: state.inputs.headQuarters,
        teamManager: state.inputs.teamManager,
        bio: bio,
        facebookLink: state.inputs.facebookLink,
        twitterLink: state.inputs.twitterLink,
        instagramLink: state.inputs.instagramLink,
        youtubeLink: state.inputs.youtubeLink,
        address: address.trim(),
        email: state.inputs.email,
        website: state.inputs.website,
      };
      uploadedProfileImage && formdata.append('image', uploadedProfileImage);
      uploadedCoverImage && formdata.append('cover_image', uploadedCoverImage);
      if (uploadedCoverImage && !uploadedProfileImage) {
        formdata.append(
          'team',
          JSON.stringify({
            ...sharedAttrs,
            image: props.itemInfo.image,
            files_status: ChangingProfileImage.COVER,
          })
        );
      } else if (!uploadedCoverImage && uploadedProfileImage) {
        formdata.append(
          'team',
          JSON.stringify({
            ...sharedAttrs,
            cover_image: props.itemInfo.cover_image,
            files_status: ChangingProfileImage.PROFILE,
          })
        );
      } else if (uploadedCoverImage && uploadedProfileImage) {
        formdata.append(
          'team',
          JSON.stringify({
            ...sharedAttrs,
            files_status: ChangingProfileImage.PROFILE_COVER,
          })
        );
      } else {
        formdata.append(
          'team',
          JSON.stringify({
            ...sharedAttrs,
            cover_image: props.itemInfo.cover_image,
            image: props.itemInfo.image,
            files_status: ChangingProfileImage.VOID,
          })
        );
      }

      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_API}/edit_team`,
        data: formdata,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
        },
      })
        .then(() => {
          toast.success('Data saved Successfully');
        })
        .catch((e) => {
          if (e.response.data.code === APIERRORHandling.ITEM_DUPLICATED) {
            toast.error(
              `This item is already in use, please change the item and try again.`
            );
          } else if (
            e.response.data.code === APIERRORHandling.ADDRESS_DUPLICATED
          ) {
            toast.error(
              'This address is already in use, please change the address and try again.'
            );
          } else if (
            e.response.data.code === APIERRORHandling.NAME_DUPLICATED
          ) {
            toast.error(
              'This name is already in use, please change the name and try again.'
            );
          } else {
            toast.error('Something went wrong please try again later!');
          }
        });
    } catch (err) {
      toast.error(err.message);
    }
    setIsButtonClicked(false);
  };
  return (
    <>
      {!props.isAdmin && !isLoggedIn ? (
        <>
          <div className=" flex items-center justify-center min-h-screen text-xl">
            Please{' '}
            <div
              className=" hover:underline hover:cursor-pointer mx-1 text-blue-700"
              onClick={() => setOpenLoginModal(true)}
            >
              Login
            </div>
            First
          </div>
          {openLoginModal && (
            <LoginModal
              show={openLoginModal}
              handleCloseParent={() => {
                setOpenLoginModal(false);
              }}
            />
          )}
        </>
      ) : (
        <>
          <div>
            {/* team upload images */}
            <div className=" relative mb-32">
              <div className=" h-80 relative">
                <img
                  alt="hero5"
                  className=" h-80 object-cover w-full"
                  src={coverImage}
                />
                <label className=" bottom-4 right-3 bg-opacity-70 absolute px-3 py-2 text-base text-white bg-black rounded-md cursor-pointer">
                  <FontAwesomeIcon icon={faCameraRetro} className="mr-1" />
                  Change Cover Image
                  <input
                    accept="*/*"
                    className=" hidden"
                    type="file"
                    ref={fileImgCoverInput}
                    onChange={(e) => uploadCover(e)}
                  />
                </label>
              </div>
              <div className="lg:flex relative">
                <div className="lg:w-72 ">
                  <div className=" -top-28 lg:left-7 lg:-translate-x-0 left-1/2 border-antiFlashWhite-100 lg:w-56 absolute inline-block w-24 transform -translate-x-1/2 border-4 rounded-full">
                    <div className="relative">
                      <img
                        className=" border-antiFlashWhite-100 lg:w-56 lg:h-56 w-24 h-24 border-4 rounded-full"
                        src={profileImage}
                        alt="driver"
                      />
                      <label className=" bottom-4 bg-neutral-600 absolute right-0 z-20 p-3 text-white rounded-full cursor-pointer">
                        <FontAwesomeIcon
                          icon={faCameraRetro}
                          className="mr-1"
                          size="lg"
                        />
                        <input
                          accept="*/*"
                          className=" hidden"
                          type="file"
                          ref={fileImgProfileInput}
                          onChange={(e) => uploadProfile(e)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* team information */}

            <div className="flex flex-wrap justify-start">
              <div className="lg:w-1/2 h-full p-4">
                <SpAdvInput
                  placeholder="Team Name"
                  name="name"
                  value={state.inputs.name}
                  onChange={(e: any) => handleChange(e)}
                  label="Team Name"
                  required={true}
                  type="text"
                />
                {isShowErrors && !isContainsLetters(state.inputs.name) && (
                  <span className=" text-lava-100 text-sm font-normal">
                    Name must contain letters
                  </span>
                )}
              </div>
              <div className="lg:w-1/2 h-full p-4">
                <SpAdvInput
                  placeholder="Team Wallet"
                  name="address"
                  value={address}
                  onChange={(e: any) => setAddress(e.target.value)}
                  label="Team Wallet"
                  required={!props.isAdmin}
                  type="text"
                  className="disabled:cursor-not-allowed"
                  disabled={!props.isAdmin}
                />
                {isShowErrors &&
                  address !== '' &&
                  !isValidCasperWallet(address) && (
                    <span className=" text-lava-100 text-sm font-normal">
                      Please enter valid wallet address
                    </span>
                  )}
              </div>
            </div>
            <div className="flex flex-wrap justify-start">
              <div className="lg:w-1/2 h-full p-4">
                <SpAdvInput
                  placeholder="Team Email"
                  name="email"
                  value={state.inputs.email}
                  onChange={(e: any) => handleChange(e)}
                  label="Team Email"
                  required={!props.isAdmin}
                  type="text"
                />
                {isShowErrors &&
                  state.inputs.email !== '' &&
                  !isValidEmail(state.inputs.email) && (
                    <span className=" text-lava-100 text-sm font-normal">
                      Please enter valid email
                    </span>
                  )}
              </div>
              <div className="lg:w-1/2 h-full p-4">
                <SpAdvInput
                  placeholder="Website"
                  name="website"
                  value={state.inputs.website}
                  onChange={(e: any) => handleChange(e)}
                  label="Website"
                  required={!props.isAdmin}
                  type="text"
                />
                {isShowErrors &&
                  state.inputs.website !== '' &&
                  !isValidURL(state.inputs.website) && (
                    <span className=" text-lava-100 text-sm font-normal">
                      Please enter valid website url ex:https://www.example.com
                    </span>
                  )}
              </div>
            </div>
            <div className="flex flex-wrap justify-start">
              <div className="lg:w-1/2 h-full p-4">
                <SpAdvInput
                  placeholder="Team Owner Name"
                  name="teamOwner"
                  value={state.inputs.teamOwner}
                  onChange={(e: any) => handleChange(e)}
                  label="Team Owner Name"
                  required={!props.isAdmin}
                  type="text"
                />
                {isShowErrors &&
                  state.inputs.teamOwner !== '' &&
                  !isContainsLetters(state.inputs.teamOwner) && (
                    <span className=" text-lava-100 text-sm font-normal">
                      Name must contain letters
                    </span>
                  )}
              </div>
              <div className="lg:w-1/2 h-full p-4">
                <SpAdvInput
                  placeholder="Founded IN"
                  name="foundedIn"
                  value={state.inputs.foundedIn}
                  onChange={(e: any) => handleChange(e)}
                  label="Founded IN"
                  required={!props.isAdmin}
                  type="number"
                />
                {isShowErrors &&
                  state.inputs.foundedIn !== '' &&
                  !isValidYear(
                    Number(state.inputs.foundedIn),
                    1894,
                    new Date().getFullYear()
                  ) && (
                    <span className=" text-lava-100 text-sm font-normal">
                      Please enter valid year conatins of 4 numbers from (1894
                      to {new Date().getFullYear()})
                    </span>
                  )}
              </div>
            </div>
            <div className="flex flex-wrap justify-start">
              <div className="lg:w-1/2 h-full p-4">
                <SpAdvInput
                  placeholder="Head Quarters"
                  name="headQuarters"
                  value={state.inputs.headQuarters}
                  onChange={(e: any) => handleChange(e)}
                  label="Head Quarters"
                  required={!props.isAdmin}
                  type="text"
                />
                {isShowErrors &&
                  state.inputs.headQuarters !== '' &&
                  !isContainsLetters(state.inputs.headQuarters) && (
                    <span className=" text-lava-100 text-sm font-normal">
                      Name must contain letters
                    </span>
                  )}
              </div>
              <div className="lg:w-1/2 h-full p-4">
                <SpAdvInput
                  placeholder="Team Manager"
                  name="teamManager"
                  value={state.inputs.teamManager}
                  onChange={(e: any) => handleChange(e)}
                  label="Team Manager"
                  required={!props.isAdmin}
                  type="text"
                />
                {isShowErrors &&
                  state.inputs.teamManager !== '' &&
                  !isContainsLetters(state.inputs.teamManager) && (
                    <span className=" text-lava-100 text-sm font-normal">
                      Name must contain letters
                    </span>
                  )}
              </div>
            </div>

            <div className="flex flex-col p-4 mt-8">
              <SpAdvEditor
                placeholder="Team BIO"
                name="bio"
                value={bio}
                onChange={(e: any) => {
                  setBio(e);
                }}
                label="Team Bio"
                required={!props.isAdmin}
                className=" h-full"
                isEmpty={(isEmpty) => {
                  setIsBioEmpty(isEmpty);
                }}
              />
            </div>
            {/* socials links */}
            <div className="flex flex-wrap justify-start">
              <div className="lg:w-1/2 h-full p-4">
                <SpAdvInput
                  placeholder="Facebook Link"
                  name="facebookLink"
                  value={state.inputs.facebookLink}
                  onChange={(e: any) => handleChange(e)}
                  label="Facebook Link"
                  required={false}
                  type="text"
                />
                {isShowErrors &&
                  state.inputs.facebookLink !== '' &&
                  !isValidFacebookUrl(state.inputs.facebookLink) && (
                    <span className=" text-lava-100 text-sm font-normal">
                      Please Enter Valid facebook URL
                    </span>
                  )}
              </div>
              <div className="lg:w-1/2 h-full p-4">
                <SpAdvInput
                  placeholder="Youtube Link"
                  name="youtubeLink"
                  value={state.inputs.youtubeLink}
                  onChange={(e: any) => handleChange(e)}
                  label="Youtube Link"
                  required={false}
                  type="text"
                />
                {isShowErrors &&
                  state.inputs.youtubeLink !== '' &&
                  !isValidYouTubeUrl(state.inputs.youtubeLink) && (
                    <span className=" text-lava-100 text-sm font-normal">
                      Please Enter Valid youtube URL
                    </span>
                  )}
              </div>
            </div>
            <div className="flex flex-wrap justify-start">
              <div className="lg:w-1/2 h-full p-4">
                <SpAdvInput
                  placeholder="Twitter Link"
                  name="twitterLink"
                  value={state.inputs.twitterLink}
                  onChange={(e: any) => handleChange(e)}
                  label="Twitter Link"
                  required={false}
                  type="text"
                />
                {isShowErrors &&
                  state.inputs.twitterLink !== '' &&
                  !isValidTwitterUrl(state.inputs.twitterLink) && (
                    <span className=" text-lava-100 text-sm font-normal">
                      Please Enter Valid twitter URL
                    </span>
                  )}
              </div>
              <div className="lg:w-1/2 h-full p-4">
                <SpAdvInput
                  placeholder="Instagram Link"
                  name="instagramLink"
                  value={state.inputs.instagramLink}
                  onChange={(e: any) => handleChange(e)}
                  label="Instagram Link"
                  required={false}
                  type="text"
                />
                {isShowErrors &&
                  state.inputs.instagramLink !== '' &&
                  !isValidInstagramUrl(state.inputs.instagramLink) && (
                    <span className=" text-lava-100 text-sm font-normal">
                      Please Enter Valid intagram URL
                    </span>
                  )}
              </div>
            </div>
            <div className=" p-4 mt-12">
              <SpAdvButton
                className="grow flex-1"
                onClick={() =>
                  props.itemInfo ? handleEditTeam() : handleAddTeam()
                }
                disabled={
                  isButtonClicked ||
                  state.inputs.name.trim() === '' ||
                  (!props.isAdmin &&
                    (isBioEmpty ||
                      address.trim() === '' ||
                      state.inputs.email.trim() === '' ||
                      state.inputs.foundedIn.trim() === '' ||
                      state.inputs.headQuarters.trim() === '' ||
                      state.inputs.teamManager.trim() === '' ||
                      state.inputs.teamOwner.trim() === '' ||
                      state.inputs.website.trim() === ''))
                }
              >
                {isButtonClicked ? (
                  <Spinner />
                ) : props.isAdmin && !props.itemInfo ? (
                  'ADD NEW TEAM'
                ) : props.itemInfo ? (
                  'Edit'
                ) : (
                  'Register'
                )}
              </SpAdvButton>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AddTeam;
