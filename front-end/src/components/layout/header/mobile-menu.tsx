import React, { useState, useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
// import CartIcon from './cartIcon';
// import SpAdvLink from '../../ui/SpAdvLink';
// import LoggedInUserMenu from './loggedInUserMenu';
// import CurrencyMenu from './currencyMenu';
import LoginButtons from '../../../Horus-social-login/social-wallet/loginButtons';
import { useAuth } from '../../../Horus-social-login/web3/context/AuthContext';
import { useUserRole } from '../../../contexts/LoggedUserRoleContext';
import { UserRole } from '../../../Enum/userRole';

export default function MobileMenu() {
  // const isLogged = true;
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLDivElement>(null);
  const { isLoggedIn } = useAuth();
  const { userRoleInfo } = useUserRole();
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

  return (
    <div className="xl:hidden flex">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`hamburger ${mobileNavOpen && 'active'}`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="w-6 h-6 text-gray-900 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="4" width="24" height="4" />
          <rect y="11" width="24" height="4" />
          <rect y="18" width="24" height="4" />
        </svg>
      </button>

      {/*Mobile navigation */}
      <div ref={mobileNav}>
        <Transition
          show={mobileNavOpen}
          as="nav"
          id="mobile-nav"
          className="top-full absolute left-0 z-20 w-full h-screen pb-16 overflow-scroll bg-white"
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul className="px-5 py-2">
            <li>
              <Link
                to="/explore"
                className="text-cetaceanBlue-100 flex items-center justify-center px-5 py-3 text-lg font-medium transition duration-150 ease-in-out"
                onClick={() => setMobileNavOpen(false)}
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                to="/ending-soon"
                className="text-cetaceanBlue-100 flex items-center justify-center px-5 py-3 text-lg font-medium transition duration-150 ease-in-out"
                onClick={() => setMobileNavOpen(false)}
              >
                Ending Soon
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link
                  to="/my-assets"
                  className="text-cetaceanBlue-100 flex items-center justify-center px-5 py-3 text-lg font-medium transition duration-150 ease-in-out"
                  onClick={() => setMobileNavOpen(false)}
                >
                  My Assets
                </Link>
              </li>
            )}
            {userRoleInfo?.role === UserRole.superAdmin ? (
              <li className="register">
                <Link
                  onClick={(e) => !isLoggedIn && e.stopPropagation()}
                  to={`/admin`}
                  className={` text-cetaceanBlue-100 flex items-center justify-center px-5 py-3 text-lg font-medium transition duration-150 ease-in-out`}
                >
                  Admin Dashboard
                </Link>
              </li>
            ) : (
              <li className="register">
                <Link
                  onClick={(e) => !isLoggedIn && e.stopPropagation()}
                  to={`${
                    userRoleInfo?.role === UserRole.teamAdmin
                      ? '/team-admin'
                      : '/register-team'
                  }`}
                  className={` text-cetaceanBlue-100 flex items-center justify-center px-5 py-3 text-lg font-medium transition duration-150 ease-in-out`}
                >
                  {userRoleInfo?.role === UserRole.teamAdmin && isLoggedIn
                    ? 'Manage Team'
                    : 'Register As Team'}
                </Link>
              </li>
            )}
            {/* <li>
              <Link
                to="/cart"
                className="text-cetaceanBlue-100 flex items-center justify-center px-5 py-3 text-lg font-medium transition duration-150 ease-in-out"
                onClick={() => setMobileNavOpen(false)}
              >
                <CartIcon />
              </Link>
            </li>
            <li className="text-cetaceanBlue-100 flex items-center justify-center px-5 py-3 text-lg font-medium transition duration-150 ease-in-out">
              <CurrencyMenu />
            </li> */}
            {/* {isLogged ? (
              <li className=" flex items-center justify-center">
                <LoggedInUserMenu />
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="font-spAdvBold text-md text-cetaceanBlue-100 flex items-center justify-center px-5 py-3 font-medium leading-5 underline uppercase transition duration-150 ease-in-out"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <SpAdvLink
                    to="/signup"
                    className=" flex items-center justify-center px-6 py-3 text-sm uppercase transition duration-150 ease-in-out"
                    isButtonStyle={true}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Sign up
                  </SpAdvLink>
                </li>
              </>
            )} */}
            <li>
              <LoginButtons onCloseModal={() => setMobileNavOpen(false)} />
            </li>
          </ul>
        </Transition>
      </div>
    </div>
  );
}
