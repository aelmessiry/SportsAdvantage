import React from 'react';
import Banner from '../components/singleTeam/banner';
import TeamTabs from '../components/singleTeam/singleTeamTabs';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Spinner } from 'flowbite-react';
function SingleTeam(props) {
  const [team, setTeam]: any = React.useState();
  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);
  const teamId = queryParams.get('id');
  const getTeam = React.useCallback(async () => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_team`,
      data: { id: teamId },
    })
      .then((response) => {
        setTeam(response.data.result);
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
  }, []);
  React.useEffect(() => {
    try {
      getTeam();
    } catch (err) {}
  }, [getTeam]);
  return (
    <>
      {team ? (
        <>
          <Banner team={team} isTeamAdmin={props.isTeamAdmin} />
          <div className="md:px-16 lg:flex-row flex flex-wrap px-4 mb-10">
            <TeamTabs team={team} isTeamAdmin={props.isTeamAdmin} />
          </div>
        </>
      ) : (
        <div className=" flex items-center justify-center h-screen">
          <Spinner />
        </div>
      )}
    </>
  );
}

export default SingleTeam;
