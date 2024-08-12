import React from 'react';
import SpAdvLink from '../ui/SpAdvLink';
import Card from '../ui/shared/cards/Card.tsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Spinner } from 'flowbite-react';
export default function EndingSoonHome() {
  const [cars, setCars]: any = React.useState();

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
  const getCars = React.useCallback(async () => {
    const teams = await getTeams();
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_all_cars`,
    })
      .then((response) => {
        const cars =
          teams &&
          response.data.result
            .filter(({ is_approved }) => is_approved)
            .map((item) => ({
              ...item,
              team: teams.find(({ id }) => item.team_id == id).name,
              isTeamApproved: teams.find(({ id }) => item.team_id == id)
                .is_approved,
            }));
        setCars(cars.filter(({ isTeamApproved }) => isTeamApproved));
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
  }, []);

  React.useEffect(() => {
    try {
      getCars();
    } catch (err) {}
  }, [getCars]);
  return (
    <div className="md:px-16 lg:flex-row px-4 mb-10">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-h1 font-spAdvSemiBold lg:leading-loose leading-snug text-black">
            Don't Miss Out - Ending Soon!
          </p>
          <p className=" text-md font-spAdvRegular text-neutral-400">
            These Exclusive Sponsorship Opportunities Are Revving to the Finish
            Line.
          </p>
        </div>
        <div className="flex-1">
          <SpAdvLink
            to="/ending-soon"
            className="text-lava-100 text-md font-spAdvRegular float-right font-normal underline"
          >
            See All
          </SpAdvLink>
        </div>
      </div>
      {cars ? (
        cars.length > 0 ? (
          <div className="flex flex-wrap py-6 mx-auto">
            {cars.map((d: any, index: any) => (
              <div className="lg:w-1/4 md:w-1/3 w-full h-full p-4" key={index}>
                <Card item={d} isShowTeamDetails={true} isShareSocial={true} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 text-lg text-black">
            <span>We are working hard to add more data</span>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center h-48">
          <Spinner size={'xl'} />
        </div>
      )}
    </div>
  );
}
