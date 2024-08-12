import React from 'react';
import Slider from 'react-slick';
import SpAdvCard from '../shared/SpAdvCard';
import {
  dollarIcon,
  sportsAdvIcon,
  // etherumGoldIcon,
} from '../../assets/images';
import TeamMemberCard from '../ui/shared/cards/TeamMemberCard';
import { useSelectedCurrency } from '../../contexts/CurrencyContext';
import PrevArrow from '../ui/slider/prevArrow';
import NextArrow from '../ui/slider/nextArrow';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TeamBio from './TeamBio';
import TeamEvents from './teamEvents';
import SharedSponsors from '../ui/shared/SharedSponsors';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
export const ComingSoon = () => {
  return (
    <div className=" top-1/2 left-1/2 backdrop-brightness-50 absolute flex items-center justify-center w-full h-full text-5xl text-black -translate-x-1/2 -translate-y-1/2">
      <p className=" text-xl font-bold">Coming Soon</p>
    </div>
  );
};
function About(props) {
  const { currencyInfo } = useSelectedCurrency();
  const [teamMembers, setTeamMembers]: any = React.useState();

  const getTeamMembers = React.useCallback(async (teamId) => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_team_members_of_team`,
      data: { team_id: teamId },
    })
      .then((response) => {
        const selectedTeamMembers = response.data.result
          .filter((item) => item.is_approved)
          .map((item) => ({
            ...item,
            team: props.team.name,
          }));
        setTeamMembers(selectedTeamMembers);
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
  }, []);
  React.useEffect(() => {
    try {
      if (props.team?.name) {
        getTeamMembers(props.team?.id);
      }
    } catch (err) {}
  }, [getTeamMembers, props.team]);
  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    nav: true,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 3000,

    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    slidesToShow:
      teamMembers?.length > 0 && teamMembers?.length <= 4
        ? teamMembers?.length
        : 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          Padding: '100px 50px',
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className=" mt-5">
        <SpAdvCard>
          <div className="flex flex-col px-4 py-8">
            <div className=" text-h2 font-spAdvBold font-bold leading-10 text-black">
              Team
            </div>
            <div>
              {teamMembers ? (
                teamMembers.length > 0 ? (
                  teamMembers?.length >= 4 ? (
                    <div className="inline-block w-full mt-10">
                      <Slider {...settings}>
                        {teamMembers.map((d: any, index: any) => (
                          <div
                            className="lg:w-1/4 h-full p-4 mt-10"
                            key={index}
                          >
                            <TeamMemberCard item={d} isShareSocial={true} />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  ) : (
                    <div className=" flex flex-wrap w-full">
                      {teamMembers.map((d: any, index: any) => (
                        <div
                          className="lg:w-1/4 md:w-1/3 w-full h-full p-4 mt-10"
                          key={index}
                        >
                          <TeamMemberCard item={d} isShareSocial={true} />
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-center h-48 text-lg text-black">
                    <span>You Don't have any Data Yet</span>
                  </div>
                )
              ) : (
                <div className="flex items-center justify-center h-48">
                  <Spinner size={'xl'} />
                </div>
              )}
            </div>
          </div>
        </SpAdvCard>
      </div>
      <div className=" mt-5">
        <SharedSponsors />
      </div>
      <div className="flex flex-wrap justify-center py-6">
        <div className="lg:w-2/3 h-full p-4">
          <TeamBio bio={props.team?.bio} />
          <hr className=" mt-14" />
        </div>
        <div className="lg:w-1/3 h-full p-4">
          <SpAdvCard>
            <div className="shadow-outline-xs relative flex p-6 mb-6 rounded-md">
              <ComingSoon />
              <div>
                <p className=" text-darkGunmetal-200 font-spAdvBold mb-2 text-sm font-bold leading-5">
                  Top 5 Team highlights
                </p>
                <p className=" text-neutral-400 font-spAdvRegular text-xs font-normal leading-5">
                  <span className=" text-lava-100 text-xs font-bold leading-4">
                    2022:{' '}
                  </span>
                  Rookie Champion, PCCGB
                </p>
                <p className=" text-neutral-400 font-spAdvRegular text-xs font-normal leading-5">
                  <span className=" text-lava-100 text-xs font-bold leading-4">
                    2021:{' '}
                  </span>
                  British GT4 Champion
                </p>
                <p className=" text-neutral-400 font-spAdvRegular text-xs font-normal leading-5">
                  <span className=" text-lava-100 text-xs font-bold leading-4">
                    2020:{' '}
                  </span>
                  Vice-Champion, Ginetta GT SuperCup
                </p>
                <p className=" text-neutral-400 font-spAdvRegular text-xs font-normal leading-5">
                  <span className=" text-lava-100 text-xs font-bold leading-4">
                    2019:{' '}
                  </span>
                  Ginetta Junior Championship Finished
                </p>
                <p className=" text-neutral-400 font-spAdvRegular text-xs font-normal leading-5">
                  <span className=" text-lava-100 text-xs font-bold leading-4">
                    2018:{' '}
                  </span>
                  Vice-Champion, Ginetta GT SuperCup
                </p>
              </div>
            </div>
            <div className="shadow-outline-xs relative flex p-6 rounded-md">
              <ComingSoon />
              <div className=" bg-cetaceanBlue-300 flex items-center justify-center w-16 h-16 pb-2 rounded-full">
                <img src={sportsAdvIcon} alt="sportsAdvIcon" />
              </div>
              <div className="ml-3">
                <p className=" text-darkGunmetal-200 font-spAdvBold text-sm font-bold leading-5">
                  Spots Available | 65
                </p>
                <p className=" text-neutral-400 font-spAdvRegular text-xs font-normal leading-5">
                  Erat elementum congue scelerisque nisi, donec mattis.
                </p>
                <p className=" text-lava-100 text-xs font-bold leading-4">
                  40% Sold
                </p>
              </div>
            </div>
            <div className="shadow-outline-xs relative flex p-6 mt-6 rounded-md">
              <ComingSoon />
              <div className=" bg-cetaceanBlue-300 flex items-center justify-center w-16 h-16 pb-2 rounded-full">
                <img src={dollarIcon} alt="dollarIcon" />
              </div>
              <div className="ml-3">
                <p className=" text-darkGunmetal-200 font-spAdvBold text-sm font-bold leading-5">
                  Price Range
                </p>
                <p className=" text-neutral-400 font-spAdvRegular text-xs font-normal leading-5">
                  Erat elementum congue scelerisque nisi, donec mattis.
                </p>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <img
                      src={currencyInfo.image}
                      className="w-5 mr-1"
                      alt="etherumGoldIcon"
                    />
                    <div className=" text-darkGunmetal-200 mr-1 text-xs font-bold leading-3">
                      {((4.66 * 2000) / 0.05).toLocaleString('en-US')}{' '}
                      {currencyInfo?.label}
                    </div>
                  </div>
                  <p>
                    to
                    <span className="text-darkGunmetal-200 ml-1 text-xs font-bold leading-3">
                      {((93.11 * 2000) / 0.05).toLocaleString('en-US')}{' '}
                      {currencyInfo?.label}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </SpAdvCard>
        </div>
      </div>
      <div className=" relative flex flex-wrap justify-center py-6">
        <ComingSoon />
        <div className="lg:w-1/2 lg:p-4 w-full h-full">
          <SpAdvCard>
            <div className=" shadow-outline-xs p-6 mb-6 overflow-x-auto rounded-md">
              <div className="w-full">
                <p className=" text-darkGunmetal-200 font-spAdvBold mb-2 text-sm font-bold leading-5">
                  Latest Race Results
                </p>
                <table className="w-full table-auto">
                  <thead className=" bg-transparent">
                    <tr className="px-4">
                      <th className="whitespace-nowrap px-4 py-2">
                        <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                          Event
                        </div>
                      </th>
                      <th className="whitespace-nowrap px-4 py-2">
                        <div className="font-spAdvSemiBold text-neutral-400 flex items-center text-base font-semibold tracking-wide text-left cursor-pointer">
                          Circuit
                        </div>
                      </th>
                      <th className="whitespace-nowrap px-4 py-2">
                        <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                          Finish
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-6">
                        2022 Carrera Cup Deutchland
                      </td>
                      <td className="whitespace-nowrap px-4 py-6">
                        Hochenheimring
                      </td>
                      <td className="whitespace-nowrap px-4 py-6">6</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-6">
                        2022 Carrera Cup Deutchland
                      </td>
                      <td className="whitespace-nowrap px-4 py-6">Zandwoort</td>
                      <td className="whitespace-nowrap px-4 py-6">7</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-6">
                        2022 Mobile 1 Supercup
                      </td>
                      <td className="whitespace-nowrap px-4 py-6">Monza</td>
                      <td className="whitespace-nowrap px-4 py-6">3</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-6">
                        2022 Carrera Cup Deutchland
                      </td>
                      <td className="whitespace-nowrap px-4 py-6">
                        Nurburgring
                      </td>
                      <td className="whitespace-nowrap px-4 py-6">5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </SpAdvCard>
        </div>
        <div className="lg:w-1/2 lg:p-4 w-full h-full">
          <SpAdvCard>
            <div className=" shadow-outline-xs p-6 mb-6 overflow-x-auto rounded-md">
              <div className="w-full">
                <p className=" text-darkGunmetal-200 font-spAdvBold mb-2 text-sm font-bold leading-5">
                  Next Events
                </p>
                <table className="w-full table-auto">
                  <thead className=" bg-transparent">
                    <tr className="px-4">
                      <th className="whitespace-nowrap px-4 py-2">
                        <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                          Event
                        </div>
                      </th>
                      <th className="whitespace-nowrap px-4 py-2">
                        <div className="font-spAdvSemiBold text-neutral-400 flex items-center text-base font-semibold tracking-wide text-left cursor-pointer">
                          Circuit
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-6">
                        06 Mar 2022 - Carrera Cup Deutchland
                      </td>
                      <td className="whitespace-nowrap px-4 py-6">
                        Hochenheimring
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-6">
                        08 Jun 2022 - Carrera Cup Deutchland
                      </td>
                      <td className="whitespace-nowrap px-4 py-6">Zandwoort</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-6">
                        23 Apr 2022 Mobile 1 Supercup
                      </td>
                      <td className="whitespace-nowrap px-4 py-6">Monza</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-6">
                        23 Dec 2022 Carrera Cup Deutchland
                      </td>
                      <td className="whitespace-nowrap px-4 py-6">
                        Nurburgring
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </SpAdvCard>
        </div>
      </div>
      <div className="relative w-full mt-5">
        <ComingSoon />
        <SpAdvCard>
          <div className=" text-h2 font-spAdvBold font-bold leading-10 text-black">
            Race Results
          </div>
          <div className=" text-neutral-400 font-spAdvRegular mt-2 text-sm font-normal leading-5"></div>
          <TeamEvents />
        </SpAdvCard>
      </div>
    </>
  );
}

export default About;
