import React from 'react';
import Slider from 'react-slick';
import SpAdvLink from '../ui/SpAdvLink/index.tsx';
import PrevArrow from '../ui/slider/prevArrow.tsx';
import NextArrow from '../ui/slider/nextArrow.tsx';
import TeamCard from '../ui/shared/cards/TeamCard.tsx';
import TeamMemberCard from '../ui/shared/cards/TeamMemberCard.tsx';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
export default function FeaturedAdSpotsHome() {
  const [approvedTeams, setApprovedTeams]: any = React.useState();
  const [teams, setTeams]: any = React.useState();
  const [teamMembers, setTeamMembers]: any = React.useState();

  const getTeams = React.useCallback(async () => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_all_teams`,
    })
      .then((response) => {
        setApprovedTeams(
          response.data.result.filter(({ is_approved }) => is_approved)
        );
        setTeams(response.data.result);
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
  }, []);
  React.useEffect(() => {
    try {
      getTeams();
    } catch (err) {}
  }, [getTeams]);

  const getTeamMembers = React.useCallback(async (allTeams) => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_all_team_members`,
    })
      .then((response) => {
        const selectedTeamMembers = response.data.result
          .filter((item) => item.type === 'Driver' && item.is_approved)
          .map((item) => ({
            ...item,
            isTeamApproved: allTeams.find(({ id }) => item.team_id == id)
              .is_approved,
            team: allTeams.find(({ id }) => item.team_id == id).name,
          }));
        setTeamMembers(
          selectedTeamMembers.filter(({ isTeamApproved }) => isTeamApproved)
        );
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
      });
  }, []);
  React.useEffect(() => {
    try {
      teams && getTeamMembers(teams);
    } catch (err) {}
  }, [getTeamMembers, teams]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    nav: true,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 3000,

    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    slidesToShow:
      approvedTeams?.length > 0 && approvedTeams?.length <= 4
        ? approvedTeams?.length
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
  const settingsDriver = {
    dots: false,
    infinite: true,
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
    <div className="md:px-16 lg:flex-row px-4 mb-10">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-h1 font-spAdvSemiBold text-black">
            Featured Teams
          </p>
          <span className="text-neutral-400 mb-3 text-sm font-normal">
            Elevate your brand's visibility to pole position! Secure an
            Elite-level sponsorship for the Hankook Dubai 24 Hour. Limited slots
            available, so act fast!
          </span>
        </div>
        <div className="flex-1">
          <SpAdvLink
            to="/explore"
            className="text-lava-100 text-md font-spAdvRegular float-right font-normal underline"
          >
            See All
          </SpAdvLink>
        </div>
      </div>
      {approvedTeams ? (
        approvedTeams.length > 0 ? (
          approvedTeams?.length >= 4 ? (
            <div className=" inline-block w-full">
              <Slider {...settings}>
                {approvedTeams.map((d: any, index: any) => (
                  <div className="lg:w-1/4 h-full p-4 mt-10" key={index}>
                    <TeamCard item={d} isShareSocial={true} />
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className=" flex flex-wrap w-full">
              {approvedTeams.map((d: any, index: any) => (
                <div
                  className="lg:w-1/4 md:w-1/3 w-full h-full p-4 mt-10"
                  key={index}
                >
                  <TeamCard item={d} isShareSocial={true} />
                </div>
              ))}
            </div>
          )
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
      <div className="flex items-center justify-between mt-10">
        <div className="flex-1">
          <p className="text-h1 font-spAdvSemiBold text-black">
            Featured Drivers
          </p>
          <span className="text-neutral-400 mb-3 text-sm font-normal">
            Elevate your brand's visibility to pole position! Secure an
            Elite-level sponsorship for the Hankook Dubai 24 Hour. Limited slots
            available, so act fast!
          </span>
        </div>
      </div>
      {teamMembers ? (
        teamMembers.length > 0 ? (
          teamMembers?.length >= 4 ? (
            <div className="inline-block w-full mt-10">
              <Slider {...settingsDriver}>
                {teamMembers.map((d: any, index: any) => (
                  <div className="lg:w-1/4 h-full p-4 mt-10" key={index}>
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
