import React from 'react';
import ReactGA from 'react-ga4';
import Hero from '../components/explore/hero';
import Teams from '../components/explore/teams';

function Explore() {
  React.useEffect(()=>{
    ReactGA.send({ hitType: "pageview", page: "/explore", title: "Explore Page" });
  },[])
  return (
    <>
      <div className="sp-adv-inner-page ">
        <Hero />
        <Teams />
      </div>
    </>
  );
}

export default Explore;
