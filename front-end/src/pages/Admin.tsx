import React, { useState } from 'react';
import ReactGA from 'react-ga4';
import { AdminTabs } from '../Enum/adminTabs';
import SPADVAdminSidebar from '../components/admin/sidebar';
import Teams from '../components/admin/teams';
import Drivers from '../components/admin/teamMember';
import Sponsors from '../components/admin/sponsors';
import Categories from '../components/admin/categories';
import Seasons from '../components/admin/seasons';
import Events from '../components/admin/events';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Horus-social-login/web3/context/AuthContext';
import { useUserRole } from '../contexts/LoggedUserRoleContext';
import LoginModal from '../components/ui/shared/modals/LoginModal';
import { UserRole } from '../Enum/userRole';
import Admins from '../components/admin/admins';

function Admin() {
  const { isLoggedIn } = useAuth();
  const { userRoleInfo } = useUserRole();
  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);
  const tab = queryParams.get('tab');
  const [selectedTab, setSelectedTab] = useState(
    tab ? Number(tab) : AdminTabs.Categories
  );
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  React.useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/admin', title: 'Admin Page' });
  }, []);
  return (
    <>
      {!isLoggedIn ? (
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
      ) : userRoleInfo && userRoleInfo?.role === UserRole.superAdmin ? (
        !userRoleInfo?.isDisabled ? (
          <>
            <div className="md:flex sp-adv-side-bar relative min-h-screen">
              <SPADVAdminSidebar
                returnSelectedTab={(selected: any) => {
                  setSelectedTab(selected);
                }}
                redirectTab={selectedTab}
              />
              {/* <!-- content --> */}
              <div className="flex-1 py-10 text-2xl font-bold">
                {selectedTab === AdminTabs.Categories ? (
                  <Categories />
                ) : selectedTab === AdminTabs.Seasons ? (
                  <Seasons />
                ) : selectedTab === AdminTabs.Events ? (
                  <Events />
                ) : selectedTab === AdminTabs.Teams ? (
                  <Teams />
                ) : selectedTab === AdminTabs.TeamMembers ? (
                  <Drivers />
                ) : selectedTab === AdminTabs.Sponsors ? (
                  <Sponsors />
                ) : (
                  <Admins />
                )}
              </div>
            </div>
          </>
        ) : (
          <div className=" flex items-center justify-center min-h-screen text-xl">
            You're disabled from access this Screen
          </div>
        )
      ) : (
        <div className=" flex items-center justify-center min-h-screen text-xl">
          You're Not allowed to access this Screen
        </div>
      )}
    </>
  );
}

export default Admin;
