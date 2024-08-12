import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { logo } from '../../../assets/images';
//import CartIcon from './cartIcon';
//import SpAdvLink from '../../ui/SpAdvLink';
import MobileMenu from './mobile-menu';
//import LoggedInUserMenu from './loggedInUserMenu';
//import CurrencyMenu from './currencyMenu';
import LoginButtons from '../../../Horus-social-login/social-wallet/loginButtons';
import { useAuth } from '../../../Horus-social-login/web3/context/AuthContext';
//import { Tooltip } from 'react-tooltip';
import toast from 'react-hot-toast';
import axios from 'axios';
import { APIERRORHandling } from '../../../Enum/apiErrorHandling';
import { useUserRole } from '../../../contexts/LoggedUserRoleContext';
import { UserRole } from '../../../Enum/userRole';
export default function Header() {
  const [top, setTop] = useState<boolean>(true);
  const { isLoggedIn, entityInfo } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { userRoleInfo, setUserRoleData } = useUserRole();
  const getTeams = React.useCallback(async (pk) => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_all_teams`,
    })
      .then((response) => {
        const isExist = response.data.result.findIndex(
          ({ address }) => address === pk
        );
        isExist > -1 &&
          setUserRoleData({
            pk: pk,
            role: UserRole.teamAdmin,
            isDisabled: false,
          });
      })
      .catch(() => {
        setUserRoleData(undefined);

        toast.error('Something went wrong please try again later!');
      });
  }, []);

  const getIsUserAdmin = React.useCallback(async (pk) => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_user`,
      data: { address: pk },
    })
      .then((response) => {
        if (response.data.code === APIERRORHandling.OK) {
          setUserRoleData({
            pk: pk,
            role: response.data.user.role,
            isDisabled: response.data.user.is_disabled,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        setUserRoleData(undefined);
      });
  }, []);
  React.useEffect(() => {
    try {
      const checkRole = async () => {
        if (isLoggedIn) {
          await getIsUserAdmin(entityInfo.activePublicKey);
          getTeams(entityInfo.activePublicKey);
        } else {
          setUserRoleData(undefined);
        }
      };
      checkRole();
    } catch (err) {}
  }, [getIsUserAdmin, isLoggedIn, entityInfo]);

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };
  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/admin') {
      navigate('/');
    }
  }, [isLoggedIn, history]);
  useEffect(() => {
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-4 transition duration-300 ease-in-out bg-antiFlashWhite-400 sp-adv-header ${
        !top ? 'bg-antiFlashWhite-400' : ''
      }`}
    >
      <div className="md:px-12 shadow-outer-lg px-4">
        <div className="sp-adv-header limit-max-width flex items-center justify-between">
          {/* Site branding */}
          <Link to="/" className="shrink-0 mr-4">
            <img src={logo} />
          </Link>

          {/* Desktop navigation */}
          <nav className="md:grow xl:flex hidden">
            {/* Desktop sign in links */}
            <ul className="grow font-spAdvRegular flex flex-wrap items-center justify-end">
              <li className="">
                <NavLink
                  style={({ isActive }) => ({
                    fontWeight: isActive ? 700 : 400,
                  })}
                  to="/explore"
                  className="text-cetaceanBlue-100 xxl:px-5 flex items-center px-2 py-3 text-lg font-medium transition duration-150 ease-in-out"
                >
                  Explore
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={({ isActive }) => ({
                    fontWeight: isActive ? 700 : 400,
                  })}
                  to="/ending-soon"
                  className="text-cetaceanBlue-100 flex items-center px-5 py-3 text-lg font-medium transition duration-150 ease-in-out"
                >
                  Ending Soon
                </NavLink>
              </li>
              {isLoggedIn && (
                <li>
                  <NavLink
                    style={({ isActive }) => ({
                      fontWeight: isActive ? 700 : 400,
                    })}
                    to="/my-assets"
                    className="text-cetaceanBlue-100 flex items-center px-5 py-3 text-lg font-medium transition duration-150 ease-in-out"
                  >
                    My Assets
                  </NavLink>
                </li>
              )}
              {userRoleInfo?.role === UserRole.superAdmin ? (
                <li className="register">
                  <NavLink
                    onClick={(e) => !isLoggedIn && e.stopPropagation()}
                    style={({ isActive }) => ({
                      fontWeight: isActive ? 700 : 400,
                    })}
                    to={`/admin`}
                    className={` text-cetaceanBlue-100 flex items-center px-5 py-3 text-lg font-medium transition duration-150 ease-in-out`}
                  >
                    Admin Dashboard
                  </NavLink>
                </li>
              ) : (
                <li className="register">
                  <NavLink
                    onClick={(e) => !isLoggedIn && e.stopPropagation()}
                    style={({ isActive }) => ({
                      fontWeight: isActive ? 700 : 400,
                    })}
                    to={`${
                      userRoleInfo?.role === UserRole.teamAdmin
                        ? '/team-admin'
                        : '/register-team'
                    }`}
                    className={` text-cetaceanBlue-100 flex items-center px-5 py-3 text-lg font-medium transition duration-150 ease-in-out`}
                  >
                    {userRoleInfo?.role === UserRole.teamAdmin && isLoggedIn
                      ? 'Manage Team'
                      : 'Register As Team'}
                  </NavLink>
                </li>
              )}
              {/* <li>
                <NavLink
                  style={({ isActive }) => ({
                    fontWeight: isActive ? 700 : 400,
                  })}
                  to="/cart"
                  className="flex items-center px-5 py-3 transition duration-150 ease-in-out"
                >
                  <CartIcon />
                </NavLink>
              </li> */}
              {/* <li>
                <CurrencyMenu />
              </li>
              {isLoggedIn && (
                <li>
                  <LoggedInUserMenu />
                </li>
              )} */}
              <li>
                {/* <NavLink
                      to="/login"
                      className="font-spAdvBold text-md text-cetaceanBlue-100 flex items-center px-5 py-3 font-medium leading-5 underline uppercase transition duration-150 ease-in-out"
                    >
                      Login
                    </NavLink> */}

                <LoginButtons />
              </li>
              {/* <li>
                    <SpAdvLink
                      to="/signup"
                      className=" flex items-center px-6 py-3 text-sm uppercase transition duration-150 ease-in-out"
                      isButtonStyle={true}
                    >
                      Sign up
                    </SpAdvLink>
                  </li> */}
            </ul>
          </nav>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
