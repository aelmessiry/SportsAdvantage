import React, { useState } from 'react';
import BackToHistory from '../../shared/BackToHistory';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Spinner } from 'flowbite-react';
import { AdminTabs } from '../../../Enum/adminTabs';
import { TeamAdminTabs } from '../../../Enum/teamAdminTabs';
import AddTeamMember from './addTeamMember';
function EditTeamMember() {
  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get('id');
  const from = queryParams.get('from');
  const [teamMember, setTeamMember]: any = useState();
  const getTeamMember = React.useCallback(async () => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_team_member`,
      data: { id: id },
    })
      .then((response) => {
        setTeamMember(response.data.result);
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
  }, []);
  React.useEffect(() => {
    try {
      getTeamMember();
    } catch (err) {}
  }, [getTeamMember]);
  return (
    <div className="md:px-16 lg:flex-row px-4 mb-10">
      <div className="">
        <div className="mt-5">
          <BackToHistory
            text="Back to Browse"
            fromScreen={from}
            redirectTab={
              from === 'teamAdmin'
                ? TeamAdminTabs.TeamMembers
                : AdminTabs.TeamMembers
            }
          />
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
            Edit Team Member
          </p>
          {teamMember ? (
            <AddTeamMember itemInfo={teamMember} fromScreen={from} />
          ) : (
            <div className="flex items-center justify-center h-screen">
              <Spinner size={'xl'} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditTeamMember;
