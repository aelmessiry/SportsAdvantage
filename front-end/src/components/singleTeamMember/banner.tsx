import React from 'react';
import BackToHistory from '../shared/BackToHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons/faXTwitter';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import PersonalInfo from './PersonalInfo';
import SpAdvButton from '../ui/SpAdvButton';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
function Banner(props) {
  const fileImgCoverInput = React.useRef();
  const fileImgProfileInput = React.useRef();
  const [uploadedCoverImage, setUploadedCoverImage] = React.useState();
  const [coverImage, setCoverImage] = React.useState(
    props.teamMember.cover_image
  );
  const [uploadedProfileImage, setUploadedProfileImage] = React.useState();
  const [profileImage, setProfileImage] = React.useState(
    props.teamMember.profile_image
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
                accept="*/*"
                type="file"
                ref={fileImgCoverInput}
                onChange={(e) => uploadCover(e)}
              />
            </label>
          )}
        </div>
        <div className="lg:flex relative flex items-end justify-between">
          <div className="lg:w-72 ">
            <div className=" -top-28 lg:left-7 lg:-translate-x-0 left-1/2 border-antiFlashWhite-100 lg:w-56 absolute inline-block w-24 transform -translate-x-1/2 border-4 rounded-full">
              <div className="relative">
                <img
                  className=" border-antiFlashWhite-100 lg:w-56 lg:h-56 w-24 h-24 border-4 rounded-full"
                  src={profileImage}
                  alt="driver"
                />
                {/* //return acceto attr */}
                {props.isTeamAdmin && (
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
                )}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <PersonalInfo teamMember={props.teamMember} />
            <ul className="b-5 lg:gap-4 flex gap-4 mt-3 list-none">
              <li>
                <a
                  href={props.teamMember.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    props.teamMember?.youtubeLink === '' &&
                    'pointer-events-none'
                  } hover:underline `}
                >
                  <FontAwesomeIcon
                    icon={faYoutube}
                    className={`${
                      props.teamMember?.youtubeLink === ''
                        ? 'pointer-events-none text-gray-500'
                        : ' text-black '
                    } lg:text-xl md:text-2xl text-3xl `}
                  />
                </a>
              </li>
              <li>
                <a
                  href={props.teamMember.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    props.teamMember?.instagramLink === '' &&
                    'pointer-events-none'
                  } hover:underline `}
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className={`${
                      props.teamMember?.instagramLink === ''
                        ? 'pointer-events-none text-gray-500'
                        : ' text-black '
                    } lg:text-xl md:text-2xl text-3xl `}
                  />
                </a>
              </li>
              <li>
                <a
                  href={props.teamMember.twitterLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    props.teamMember?.twitterLink === '' &&
                    'pointer-events-none'
                  } hover:underline `}
                >
                  <FontAwesomeIcon
                    icon={faXTwitter}
                    className={`${
                      props.teamMember?.twitterLink === ''
                        ? 'pointer-events-none text-gray-500'
                        : ' text-black '
                    } lg:text-xl md:text-2xl text-3xl `}
                  />
                </a>
              </li>
              <li>
                <a
                  href={props.teamMember.facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    props.teamMember?.facebookLink === '' &&
                    'pointer-events-none'
                  } hover:underline `}
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className={`${
                      props.teamMember?.facebookLink === ''
                        ? 'pointer-events-none text-gray-500'
                        : ' text-black '
                    } lg:text-xl md:text-2xl text-3xl `}
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:flex-1 text-right">
            <SpAdvButton className="mr-2" disabled={true}>
              Buy Team Member NFT!
            </SpAdvButton>
            <SpAdvButton
              onClick={() =>
                window.open(
                  `${import.meta.env.VITE_CONTACT_SPONSOR_FORM}?Offer=${
                    props.teamMember.name
                  }`,
                  '_blank'
                )
              }
            >
              Contact us to Sponsor
            </SpAdvButton>
            {/* <SpAdvButton onClick={() => goToSelectCar()}>
              Purchase Sponsorship
            </SpAdvButton> */}
          </div>
        </div>
      </div>
      <hr className="mb-14 mt-20" />
    </div>
  );
}

export default Banner;
