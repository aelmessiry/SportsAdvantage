import React from 'react';
import { Dropdown } from 'flowbite-react';

import {
  loggedUser,
  listIcon,
  settingsIcon,
  smileIcon,
  logoutIcon,
} from '../../../assets/images';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../Horus-social-login/web3/context/AuthContext';
export default function LoggedInUserMenu() {
  const { logout } = useAuth();
  return (
    <>
      <Dropdown
        inline
        size={'lg'}
        label={
          <div className=" hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white flex items-center text-sm font-medium text-gray-900 rounded-full">
            <span className="sr-only">Open user menu</span>
            <img
              className=" w-12 h-12 rounded-full"
              src={loggedUser}
              alt="user photo"
            />
          </div>
        }
        className="sp-adv-logged-user"
      >
        <Dropdown.Item>
          <div className=" text-darkGunmetal-300 font-spAdvBold flex items-center px-4 text-sm font-semibold">
            <img
              src={loggedUser}
              alt="loggedUser"
              className="user-img float-left mr-3"
            />
            Carter Nate
          </div>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          <li>
            <Link
              to="/profile"
              className="text-neutral-500 font-spAdvBold block px-4 py-2 text-sm font-bold"
            >
              <img src={listIcon} alt="listIcon" className="float-left mr-3" />
              My Team
            </Link>
          </li>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link
            to="/profile"
            className="text-neutral-500 font-spAdvBold block px-4 py-2 text-sm font-bold"
          >
            <img src={smileIcon} alt="smileIcon" className="float-left mr-3" />
            My Account
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link
            to="/profile"
            className="text-neutral-500 font-spAdvBold block px-4 py-2 text-sm font-bold divide-y divide-gray-100"
          >
            <img
              src={settingsIcon}
              alt="settingsIcon"
              className="float-left mr-3"
            />
            Settings
          </Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          <a
            onClick={() => {
              logout();
            }}
            className="text-lava-100 font-spAdvBold block px-4 py-2 text-sm font-bold"
          >
            <img
              src={logoutIcon}
              alt="logoutIcon"
              className="float-left mr-3"
            />
            Logout
          </a>
        </Dropdown.Item>
      </Dropdown>
    </>
  );
}
