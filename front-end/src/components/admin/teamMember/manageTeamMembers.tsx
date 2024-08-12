import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Spinner } from 'flowbite-react';
import SingleTeamMemberRow from './singleTeamMemberRow';

function ManageTeamMembers(props) {
  const [teamMembers, setTeamMembers]: any = React.useState();
  const [isApprovedChanged, setIsApprovedChanged]: any = React.useState(false);
  const getTeams = React.useCallback(async () => {
    let teams = [];
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_all_teams`,
    })
      .then((response) => {
        const result = response.data.result;
        teams = result;
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
    return teams;
  }, []);
  const getTeamMembers = React.useCallback(async () => {
    const teams = await getTeams();
    teams.length > 0 &&
      (await axios({
        method: 'post',
        url: props.teamId
          ? `${import.meta.env.VITE_BACKEND_API}/get_team_members_of_team`
          : `${import.meta.env.VITE_BACKEND_API}/get_all_team_members`,
        data: { team_id: props.teamId },
      })
        .then((response) => {
          const teamMembers =
            teams &&
            response.data.result.map((item) => ({
              ...item,
              team: teams.find(({ id }) => item.team_id == id).name,
            }));
          setTeamMembers(teamMembers);
        })
        .catch(() => {
          toast.error('Something went wrong please try again later!');
        }));
  }, []);
  React.useEffect(() => {
    try {
      setTeamMembers();
      getTeamMembers();
    } catch (err) {}
  }, [getTeamMembers, isApprovedChanged]);
  return (
    <div className=" flex-1 overflow-x-auto">
      {teamMembers ? (
        teamMembers.length > 0 ? (
          <table className="w-full table-auto">
            <thead className=" bg-transparent">
              <tr className="px-4">
                <th className="whitespace-nowrap px-4 py-2">
                  <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                    Name
                  </div>
                </th>
                <th className="whitespace-nowrap px-4 py-2">
                  <div className="font-spAdvSemiBold text-neutral-400 flex items-center text-base font-semibold tracking-wide text-left cursor-pointer">
                    Team
                  </div>
                </th>
                <th className="whitespace-nowrap px-4 py-2">
                  <div className="font-spAdvSemiBold text-neutral-400 flex items-center text-base font-semibold tracking-wide text-left cursor-pointer">
                    Country
                  </div>
                </th>
                <th className="whitespace-nowrap px-4 py-2">
                  <div className="font-spAdvSemiBold text-neutral-400 flex items-center text-base font-semibold tracking-wide text-left cursor-pointer">
                    Type
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {teamMembers.map((item: Object, index: Number) => (
                <SingleTeamMemberRow
                  item={item}
                  key={index}
                  approvedChanged={() =>
                    setIsApprovedChanged(!isApprovedChanged)
                  }
                  isAdmin={props.isAdmin}
                  isFromTeamAdmin={props.isFromTeamAdmin}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center h-screen text-lg text-black">
            <span>You Don't have any Data Yet</span>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Spinner size={'xl'} />
        </div>
      )}
    </div>
  );
}

export default ManageTeamMembers;
