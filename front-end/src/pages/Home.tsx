import React from 'react';
import ReactGA from 'react-ga4';
import Hero from '../components/home/hero';
import EndingSoonHome from '../components/home/endingSoon';
import NewWaveHome from '../components/home/newWave';
import FeaturedAdSpotsHome from '../components/home/featuredAdSpots';
import Livechat from '../components/liveChat/LiveChat';

function Home() {
  React.useEffect(()=>{
    ReactGA.send({ hitType: "pageview", page: "/Home", title: "Home Page" });
  },[])
  return (
    <>
      <Hero />
      <NewWaveHome />
      <EndingSoonHome />
      <FeaturedAdSpotsHome />
      <Livechat />
    </>
  );
}

export default Home;
