import React from 'react';
import Banner from '../components/singleTeamMember/banner';
import { useLocation } from 'react-router-dom';
import TeamMemberSub from '../components/singleTeamMember/teamMemberSub';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
function SingleTeamMember() {
  const [teamMemeber, setTeamMember]: any = React.useState();

  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);
  const teamMemberId = queryParams.get('id');
  const getTeamMember = React.useCallback(async () => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_team_member`,
      data: { id: teamMemberId },
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
    <>
      {teamMemeber ? (
        <>
          <Banner teamMember={teamMemeber} isTeamAdmin={false} />
          <div className="md:px-16 lg:flex-row flex flex-wrap px-4 mb-10">
            <TeamMemberSub teamMember={teamMemeber} isTeamAdmin={false} />
          </div>{' '}
        </>
      ) : (
        <div className=" flex justify-center items-center h-screen">
          <Spinner />
        </div>
      )}
    </>
  );
}

export default SingleTeamMember;
