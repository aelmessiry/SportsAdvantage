import React from 'react';
import Card from '../ui/shared/cards/Card.tsx';
import Slider from 'react-slick';
//import MainFilteration from '../shared/MainFilteration.tsx';
import TeamCard from '../ui/shared/cards/TeamCard.tsx';
import PrevArrow from '../ui/slider/prevArrow.tsx';
import NextArrow from '../ui/slider/nextArrow.tsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Spinner } from 'flowbite-react';

export default function Teams() {
  const [approvedTeams, setApprovedTeams]: any = React.useState();
  const [teams, setTeams]: any = React.useState();
  const [cars, setCars]: any = React.useState();

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
  const getCars = React.useCallback(async (allTeams) => {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/get_all_cars`,
    })
      .then((response) => {
        const allcars = response.data.result
          .filter(({ is_approved }) => is_approved)
          .map((item) => ({
            ...item,
            team: allTeams.find(({ id }) => item.team_id == id)?.name,
            isTeamApproved: allTeams.find(({ id }) => item.team_id == id)
              .is_approved,
          }));
        setCars(allcars.filter(({ isTeamApproved }) => isTeamApproved));
      })
      .catch((e) => {
        console.log(e);
        toast.error('Something went wrong please try again later!');
      });
  }, []);
  React.useEffect(() => {
    try {
      teams && getCars(teams);
    } catch (err) {}
  }, [getCars, teams]);
  React.useEffect(() => {
    try {
      getTeams();
    } catch (err) {}
  }, [getTeams]);
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
  return (
    <div className="md:px-16 lg:flex-row px-4 mb-10">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className=" font-spAdvSemiBold text-h1 text-black">Explore NFTs</p>
          <p className=" font-spAdvSemiBold text-neutral-400 sp-adv-vertical-line mb-10 text-3xl font-semibold">
            Discover new Advertising Opportunities…
          </p>
        </div>
      </div>
      {/* <MainFilteration /> */}
      <p className=" font-spAdvSemiBold text-4xl text-black">Ad Spots NFTs</p>
      <div className="flex flex-wrap justify-start py-6 mx-auto">
        {cars ? (
          cars.length > 0 ? (
            cars.map((d: any, index: any) => (
              <div className="lg:w-1/4 md:w-1/3 w-full h-full p-4" key={index}>
                <Card item={d} isShowTeamDetails={true} />
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-screen text-lg text-black">
              <span>We are working hard to add more data</span>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-screen">
            <Spinner size={'xl'} />
          </div>
        )}
      </div>
      <p className=" font-spAdvSemiBold mt-10 text-4xl text-black">
        Teams NFTs
      </p>
      <div className=" inline-block w-full">
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
              <span>We are working hard to add more data</span>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-screen">
            <Spinner size={'xl'} />
          </div>
        )}
      </div>
    </div>
  );
}
