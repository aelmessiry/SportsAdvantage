import React, { useState } from 'react';
import { TeamAdminTabs } from '../Enum/teamAdminTabs';
import Team from '../components/teamAdmin/team';
import TeamMembers from '../components/teamAdmin/teamMembers';
import TeamOwnedCars from '../components/teamAdmin/cars';
import SPADVAdminSidebar from '../components/teamAdmin/sidebar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../Horus-social-login/web3/context/AuthContext';
import { Spinner } from 'flowbite-react';
import { useLocation } from 'react-router-dom';

function TeamAdmin() {
  const [selectedTeam, setSelectedTeam]: any = React.useState(false);
  const { isLoggedIn, entityInfo } = useAuth();
  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);
  const tab = queryParams.get('tab');
  const [selectedTab, setSelectedTab] = useState(
    tab ? Number(tab) : TeamAdminTabs.Team
  );
  const getTeams = React.useCallback(async (pk) => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_all_teams`,
    })
      .then((response) => {
        setSelectedTeam(
          response.data.result.find(({ address }) => address === pk)
        );
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
  }, []);
  React.useEffect(() => {
    try {
      isLoggedIn && getTeams(entityInfo.activePublicKey);
    } catch (err) {}
  }, [getTeams, isLoggedIn, entityInfo]);
  return (
    <>
      {selectedTeam ? (
        <div className="md:flex sp-adv-side-bar relative min-h-screen">
          <SPADVAdminSidebar
            returnSelectedTab={(selected: any) => {
              setSelectedTab(selected);
            }}
          />
          {/* <!-- content --> */}
          <div className="flex-1 py-10 text-2xl font-bold">
            {selectedTab === TeamAdminTabs.Team ? (
              <Team team={selectedTeam} />
            ) : selectedTab === TeamAdminTabs.TeamMembers ? (
              <TeamMembers
                itemInfo={selectedTeam}
                teamId={selectedTeam.id}
                teamName={selectedTeam.name}
                isTeamApproved={selectedTeam.is_approved}
              />
            ) : (
              <TeamOwnedCars
                teamId={selectedTeam.id}
                teamName={selectedTeam.name}
                isTeamApproved={selectedTeam.is_approved}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Spinner size={'xl'} />
        </div>
      )}
    </>
  );
}

export default TeamAdmin;
