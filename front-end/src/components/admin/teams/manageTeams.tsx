import React from 'react';
import SingleTeamRow from './singleTeamRow';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';

function ManageTeams() {
  const [teams, setTeams]: any = React.useState();
  const [isApprovedChanged, setIsApprovedChanged]: any = React.useState(false);

  const getTeams = React.useCallback(async () => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_all_teams`,
    })
      .then((response) => {
        setTeams(response.data.result);
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
  }, []);
  React.useEffect(() => {
    try {
      setTeams();
      getTeams();
    } catch (err) {}
  }, [getTeams, isApprovedChanged]);
  return (
    <div className=" overflow-x-auto">
      {teams ? (
        teams.length > 0 ? (
          <table className="w-full table-auto">
            <thead className=" bg-transparent">
              <tr className="px-4">
                <th className="whitespace-nowrap px-4 py-2">
                  <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                    Team Name
                  </div>
                </th>
                <th className="whitespace-nowrap px-4 py-2">
                  <div className="font-spAdvSemiBold text-neutral-400 flex items-center text-base font-semibold tracking-wide text-left cursor-pointer">
                    Owner
                  </div>
                </th>
                <th className="whitespace-nowrap px-4 py-2">
                  <div className="font-spAdvSemiBold text-neutral-400 flex items-center text-base font-semibold tracking-wide text-left cursor-pointer">
                    Found In
                  </div>
                </th>
                <th className="whitespace-nowrap px-4 py-2">
                  <div className="font-spAdvSemiBold text-neutral-400 flex items-center text-base font-semibold tracking-wide text-left cursor-pointer">
                    Location
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {teams.map((item: Object, index: Number) => (
                <SingleTeamRow
                  item={item}
                  key={index}
                  approvedChanged={() =>
                    setIsApprovedChanged(!isApprovedChanged)
                  }
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

export default ManageTeams;
