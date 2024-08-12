import React, { useEffect, useState, useRef } from 'react';
import { ProfileTabs } from '../../Enum/profileTabs.js';
import { logoutIcon } from '../../assets/images/index.js';
import { useNavigate } from 'react-router-dom';
function SPADVSidebar(props: any) {
  const navigate = useNavigate();
  // grab everything we need
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState(ProfileTabs.MyListings);

  const trigger = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLDivElement>(null);

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setMobileNavOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleSelectedTab = (selectedEle: any) => {
    setSelectedTab(selectedEle);
    props.returnSelectedTab(selectedEle);
    setMobileNavOpen(false);
  };
  return (
    <>
      {/* <!-- mobile menu bar --> */}

      <button
        ref={trigger}
        className={`hamburger bg-black p-3  md:hidden ${
          mobileNavOpen && 'active'
        }`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="text-antiFlashWhite-100 w-6 h-6 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="4" width="24" height="4" />
          <rect y="11" width="24" height="4" />
          <rect y="18" width="24" height="4" />
        </svg>
      </button>
      {/* <!-- sidebar --> */}
      {/*Mobile navigation */}
      <div
        ref={mobileNav}
        className={`${
          mobileNavOpen ? '' : '-translate-x-full'
        } sidebar mt-14 md:mt-0 py-7 md:relative md:translate-x-0 absolute text-sm font-normal font-spAdvRegular inset-y-0 left-0 w-64 px-2 space-y-6 text-cetaceanBlue-100 transition duration-200 ease-in-out transform bg-antiFlashWhite-100`}
      >
        {/* <!-- nav --> */}
        <nav>
          <div className="flex flex-wrap space-x-2">
            <div
              className={`${
                selectedTab === ProfileTabs.MyListings &&
                'rounded-tr-md rounded-br-md  w-1  bg-cetaceanBlue-100'
              }`}
            ></div>
            <div
              onClick={() => handleSelectedTab(ProfileTabs.MyListings)}
              className={`${
                selectedTab === ProfileTabs.MyListings &&
                ' text-antiFlashWhite-100 bg-cetaceanBlue-100 rounded-md'
              } block text-sm py-4 px-4 rounded transition duration-200 cursor-pointer flex-1`}
            >
              <span className="float-left mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    d="M16.7606 11.2869L11.2913 16.7577C11.1496 16.8996 10.9814 17.0121 10.7962 17.0889C10.611 17.1657 10.4124 17.2053 10.212 17.2053C10.0115 17.2053 9.81294 17.1657 9.62774 17.0889C9.44253 17.0121 9.27427 16.8996 9.13258 16.7577L2.58008 10.2111V2.58105H10.2081L16.7606 9.13527C17.0448 9.42119 17.2043 9.80796 17.2043 10.2111C17.2043 10.6143 17.0448 11.001 16.7606 11.2869V11.2869Z"
                    stroke={
                      selectedTab === ProfileTabs.MyListings
                        ? '#fff'
                        : '#474553'
                    }
                    strokeWidth="1.72049"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.02148 6.02148H6.03009"
                    stroke={
                      selectedTab === ProfileTabs.MyListings
                        ? '#fff'
                        : '#474553'
                    }
                    strokeWidth="1.72049"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>My Team</span>
            </div>
          </div>
          <div className="flex flex-wrap space-x-2">
            <div
              className={`${
                selectedTab === ProfileTabs.MyAccount &&
                'rounded-tr-md rounded-br-md  w-1  bg-cetaceanBlue-100'
              }`}
            ></div>
            <div
              onClick={() => handleSelectedTab(ProfileTabs.MyAccount)}
              className={`${
                selectedTab === ProfileTabs.MyAccount &&
                ' text-antiFlashWhite-100 bg-cetaceanBlue-100 rounded-md'
              } block text-sm py-4 px-4 rounded transition duration-200 cursor-pointer flex-1`}
            >
              <span className="float-left mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                >
                  <path
                    d="M9.32383 17.092C13.6146 17.092 17.093 13.6136 17.093 9.32285C17.093 5.03207 13.6146 1.55371 9.32383 1.55371C5.03305 1.55371 1.55469 5.03207 1.55469 9.32285C1.55469 13.6136 5.03305 17.092 9.32383 17.092Z"
                    stroke={
                      selectedTab === ProfileTabs.MyAccount ? '#fff' : '#474553'
                    }
                    strokeWidth="1.55383"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.21484 10.877C6.21484 10.877 7.38021 12.4308 9.3225 12.4308C11.2648 12.4308 12.4302 10.877 12.4302 10.877"
                    stroke={
                      selectedTab === ProfileTabs.MyAccount ? '#fff' : '#474553'
                    }
                    strokeWidth="1.55383"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.99219 6.99219H6.99996"
                    stroke={
                      selectedTab === ProfileTabs.MyAccount ? '#fff' : '#474553'
                    }
                    strokeWidth="1.55383"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.6543 6.99219H11.6621"
                    stroke={
                      selectedTab === ProfileTabs.MyAccount ? '#fff' : '#474553'
                    }
                    strokeWidth="1.55383"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span> My Account</span>
            </div>
          </div>
          <div className="flex flex-wrap space-x-2">
            <div
              className={`${
                selectedTab === ProfileTabs.Settings &&
                'rounded-tr-md rounded-br-md  w-1  bg-cetaceanBlue-100'
              }`}
            ></div>
            <div
              onClick={() => handleSelectedTab(ProfileTabs.Settings)}
              className={`${
                selectedTab === ProfileTabs.Settings &&
                ' text-antiFlashWhite-100 bg-cetaceanBlue-100 rounded-md'
              } block text-sm py-4 px-4 rounded transition duration-200 cursor-pointer flex-1`}
            >
              <span className="float-left mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                >
                  <g clipPath="url(#clip0_335_14994)">
                    <path
                      d="M9.32293 11.6537C10.6102 11.6537 11.6537 10.6102 11.6537 9.32293C11.6537 8.0357 10.6102 6.99219 9.32293 6.99219C8.0357 6.99219 6.99219 8.0357 6.99219 9.32293C6.99219 10.6102 8.0357 11.6537 9.32293 11.6537Z"
                      stroke={
                        selectedTab === ProfileTabs.Settings
                          ? '#fff'
                          : '#474553'
                      }
                      strokeWidth="1.55383"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.0726 11.6541C14.9691 11.8885 14.9383 12.1484 14.984 12.4004C15.0297 12.6525 15.1498 12.885 15.3289 13.0681L15.3756 13.1147C15.52 13.259 15.6346 13.4304 15.7128 13.619C15.791 13.8077 15.8313 14.0099 15.8313 14.2141C15.8313 14.4183 15.791 14.6205 15.7128 14.8091C15.6346 14.9977 15.52 15.1691 15.3756 15.3134C15.2313 15.4579 15.0599 15.5725 14.8712 15.6507C14.6826 15.7289 14.4804 15.7691 14.2762 15.7691C14.072 15.7691 13.8698 15.7289 13.6812 15.6507C13.4926 15.5725 13.3212 15.4579 13.1769 15.3134L13.1303 15.2668C12.9472 15.0877 12.7146 14.9675 12.4626 14.9218C12.2106 14.8761 11.9506 14.907 11.7163 15.0104C11.4865 15.1089 11.2905 15.2724 11.1525 15.4809C11.0145 15.6893 10.9404 15.9335 10.9394 16.1835V16.3156C10.9394 16.7277 10.7757 17.1229 10.4843 17.4143C10.1929 17.7057 9.79765 17.8695 9.38555 17.8695C8.97345 17.8695 8.57823 17.7057 8.28683 17.4143C7.99543 17.1229 7.83172 16.7277 7.83172 16.3156V16.2457C7.82571 15.9885 7.74247 15.7392 7.59283 15.5299C7.44319 15.3207 7.23407 15.1614 6.99266 15.0726C6.75833 14.9691 6.49839 14.9383 6.24636 14.984C5.99433 15.0297 5.76177 15.1498 5.57867 15.3289L5.53206 15.3756C5.38775 15.52 5.21638 15.6346 5.02775 15.7128C4.83912 15.791 4.63692 15.8313 4.43272 15.8313C4.22853 15.8313 4.02633 15.791 3.8377 15.7128C3.64907 15.6346 3.4777 15.52 3.33339 15.3756C3.18892 15.2313 3.07431 15.0599 2.99612 14.8712C2.91792 14.6826 2.87767 14.4804 2.87767 14.2762C2.87767 14.072 2.91792 13.8698 2.99612 13.6812C3.07431 13.4926 3.18892 13.3212 3.33339 13.1769L3.38001 13.1303C3.55911 12.9472 3.67926 12.7146 3.72496 12.4626C3.77066 12.2106 3.73981 11.9506 3.63639 11.7163C3.5379 11.4865 3.37438 11.2905 3.16594 11.1525C2.9575 11.0145 2.71325 10.9404 2.46325 10.9394H2.33117C1.91907 10.9394 1.52385 10.7757 1.23245 10.4843C0.94105 10.1929 0.777344 9.79765 0.777344 9.38555C0.777344 8.97345 0.94105 8.57823 1.23245 8.28683C1.52385 7.99543 1.91907 7.83172 2.33117 7.83172H2.40109C2.65825 7.82571 2.90765 7.74247 3.11686 7.59283C3.32608 7.44319 3.48545 7.23407 3.57423 6.99266C3.67765 6.75833 3.7085 6.49839 3.66281 6.24636C3.61711 5.99433 3.49696 5.76177 3.31785 5.57867L3.27124 5.53206C3.12677 5.38775 3.01216 5.21638 2.93396 5.02775C2.85577 4.83912 2.81552 4.63692 2.81552 4.43272C2.81552 4.22853 2.85577 4.02633 2.93396 3.8377C3.01216 3.64907 3.12677 3.4777 3.27124 3.33339C3.41555 3.18892 3.58692 3.07431 3.77555 2.99612C3.96418 2.91792 4.16637 2.87767 4.37057 2.87767C4.57477 2.87767 4.77696 2.91792 4.96559 2.99612C5.15423 3.07431 5.3256 3.18892 5.4699 3.33339L5.51652 3.38001C5.69962 3.55911 5.93218 3.67926 6.18421 3.72496C6.43624 3.77066 6.69617 3.73981 6.9305 3.63639H6.99266C7.22244 3.5379 7.41842 3.37438 7.55646 3.16594C7.6945 2.9575 7.76857 2.71325 7.76957 2.46325V2.33117C7.76957 1.91907 7.93328 1.52385 8.22468 1.23245C8.51608 0.94105 8.9113 0.777344 9.3234 0.777344C9.7355 0.777344 10.1307 0.94105 10.4221 1.23245C10.7135 1.52385 10.8772 1.91907 10.8772 2.33117V2.40109C10.8782 2.65109 10.9523 2.89535 11.0903 3.10379C11.2284 3.31222 11.4244 3.47575 11.6541 3.57423C11.8885 3.67765 12.1484 3.7085 12.4004 3.66281C12.6525 3.61711 12.885 3.49696 13.0681 3.31785L13.1147 3.27124C13.259 3.12677 13.4304 3.01216 13.619 2.93396C13.8077 2.85577 14.0099 2.81552 14.2141 2.81552C14.4183 2.81552 14.6205 2.85577 14.8091 2.93396C14.9977 3.01216 15.1691 3.12677 15.3134 3.27124C15.4579 3.41555 15.5725 3.58692 15.6507 3.77555C15.7289 3.96418 15.7691 4.16637 15.7691 4.37057C15.7691 4.57477 15.7289 4.77696 15.6507 4.96559C15.5725 5.15423 15.4579 5.3256 15.3134 5.4699L15.2668 5.51652C15.0877 5.69962 14.9675 5.93218 14.9218 6.18421C14.8761 6.43624 14.907 6.69617 15.0104 6.9305V6.99266C15.1089 7.22244 15.2724 7.41842 15.4809 7.55646C15.6893 7.6945 15.9335 7.76857 16.1835 7.76957H16.3156C16.7277 7.76957 17.1229 7.93328 17.4143 8.22468C17.7057 8.51608 17.8695 8.9113 17.8695 9.3234C17.8695 9.7355 17.7057 10.1307 17.4143 10.4221C17.1229 10.7135 16.7277 10.8772 16.3156 10.8772H16.2457C15.9957 10.8782 15.7514 10.9523 15.543 11.0903C15.3346 11.2284 15.171 11.4244 15.0726 11.6541V11.6541Z"
                      stroke={
                        selectedTab === ProfileTabs.Settings
                          ? '#fff'
                          : '#474553'
                      }
                      strokeWidth="1.55383"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_335_14994">
                      <rect width="18.6459" height="18.6459" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <span>Settings</span>
            </div>
          </div>
          <div
            onClick={() => {
              localStorage.removeItem('isLoggedIn');
              navigate('/');
            }}
            className="block py-2.5 px-4 rounded transition duration-200 text-lava-100 cursor-pointer"
          >
            <img
              src={logoutIcon}
              alt="logoutIcon"
              className="float-left mr-2"
            />
            Logout
          </div>
        </nav>
      </div>
    </>
  );
}

export default SPADVSidebar;
