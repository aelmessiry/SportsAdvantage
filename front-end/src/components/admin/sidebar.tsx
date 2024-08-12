import React, { useEffect, useState, useRef } from 'react';
import { AdminTabs } from '../../Enum/adminTabs.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiagramSuccessor,
  faPeopleRoof,
  faTree,
  faUser,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faHandshake } from '@fortawesome/free-regular-svg-icons';
function SPADVAdminSidebar(props: any) {
  // grab everything we need
  const [selectedTab, setSelectedTab] = useState(
    props.redirectTab ? Number(props.redirectTab) : AdminTabs.Categories
  );
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

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
                selectedTab === AdminTabs.Categories &&
                'rounded-tr-md rounded-br-md  w-1  bg-cetaceanBlue-100'
              }`}
            ></div>
            <div
              onClick={() => handleSelectedTab(AdminTabs.Categories)}
              className={`${
                selectedTab === AdminTabs.Categories &&
                ' text-antiFlashWhite-100 bg-cetaceanBlue-100 rounded-md'
              } block text-sm py-4 px-4 rounded transition duration-200 cursor-pointer flex-1`}
            >
              <span className="float-left mr-2">
                <FontAwesomeIcon icon={faDiagramSuccessor} />
              </span>
              <span>Categories</span>
            </div>
          </div>
          <div className="flex flex-wrap space-x-2">
            <div
              className={`${
                selectedTab === AdminTabs.Seasons &&
                'rounded-tr-md rounded-br-md  w-1  bg-cetaceanBlue-100'
              }`}
            ></div>
            <div
              onClick={() => handleSelectedTab(AdminTabs.Seasons)}
              className={`${
                selectedTab === AdminTabs.Seasons &&
                ' text-antiFlashWhite-100 bg-cetaceanBlue-100 rounded-md'
              } block text-sm py-4 px-4 rounded transition duration-200 cursor-pointer flex-1`}
            >
              <span className="float-left mr-2">
                <FontAwesomeIcon icon={faTree} />
              </span>
              <span>Seasons</span>
            </div>
          </div>
          <div className="flex flex-wrap space-x-2">
            <div
              className={`${
                selectedTab === AdminTabs.Events &&
                'rounded-tr-md rounded-br-md  w-1  bg-cetaceanBlue-100'
              }`}
            ></div>
            <div
              onClick={() => handleSelectedTab(AdminTabs.Events)}
              className={`${
                selectedTab === AdminTabs.Events &&
                ' text-antiFlashWhite-100 bg-cetaceanBlue-100 rounded-md'
              } block text-sm py-4 px-4 rounded transition duration-200 cursor-pointer flex-1`}
            >
              <span className="float-left mr-2">
                <FontAwesomeIcon icon={faCalendar} />
              </span>
              <span>Events</span>
            </div>
          </div>
          <div className="flex flex-wrap space-x-2">
            <div
              className={`${
                selectedTab === AdminTabs.Teams &&
                'rounded-tr-md rounded-br-md  w-1  bg-cetaceanBlue-100'
              }`}
            ></div>
            <div
              onClick={() => handleSelectedTab(AdminTabs.Teams)}
              className={`${
                selectedTab === AdminTabs.Teams &&
                ' text-antiFlashWhite-100 bg-cetaceanBlue-100 rounded-md'
              } block text-sm py-4 px-4 rounded transition duration-200 cursor-pointer flex-1`}
            >
              <span className="float-left mr-2">
                <FontAwesomeIcon icon={faUserGroup} />
              </span>
              <span>Teams</span>
            </div>
          </div>
          <div className="flex flex-wrap space-x-2">
            <div
              className={`${
                selectedTab === AdminTabs.TeamMembers &&
                'rounded-tr-md rounded-br-md  w-1  bg-cetaceanBlue-100'
              }`}
            ></div>
            <div
              onClick={() => handleSelectedTab(AdminTabs.TeamMembers)}
              className={`${
                selectedTab === AdminTabs.TeamMembers &&
                ' text-antiFlashWhite-100 bg-cetaceanBlue-100 rounded-md'
              } block text-sm py-4 px-4 rounded transition duration-200 cursor-pointer flex-1`}
            >
              <span className="float-left mr-2">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span> Team Members</span>
            </div>
          </div>
          <div className="flex flex-wrap space-x-2">
            <div
              className={`${
                selectedTab === AdminTabs.Sponsors &&
                'rounded-tr-md rounded-br-md  w-1  bg-cetaceanBlue-100'
              }`}
            ></div>
            <div
              onClick={() => handleSelectedTab(AdminTabs.Sponsors)}
              className={`pointer-events-none text-gray-500 ${
                selectedTab === AdminTabs.Sponsors &&
                '  text-antiFlashWhite-100 bg-cetaceanBlue-100 rounded-md'
              } block text-sm py-4 px-4 rounded transition duration-200 cursor-pointer flex-1`}
            >
              <span className="float-left mr-2">
                <FontAwesomeIcon icon={faHandshake} />
              </span>
              <span>Sponsors</span>
            </div>
          </div>
          <div className="flex flex-wrap space-x-2">
            <div
              className={`${
                selectedTab === AdminTabs.Admins &&
                'rounded-tr-md rounded-br-md  w-1  bg-cetaceanBlue-100'
              }`}
            ></div>
            <div
              onClick={() => handleSelectedTab(AdminTabs.Admins)}
              className={`${
                selectedTab === AdminTabs.Admins &&
                '  text-antiFlashWhite-100 bg-cetaceanBlue-100 rounded-md'
              } block text-sm py-4 px-4 rounded transition duration-200 cursor-pointer flex-1`}
            >
              <span className="float-left mr-2">
                <FontAwesomeIcon icon={faPeopleRoof} />
              </span>
              <span>Admins</span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default SPADVAdminSidebar;
