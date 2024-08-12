import React from 'react';
import ReactGA from 'react-ga4';
import Hero from '../components/endingSoon/hero';
import Teams from '../components/endingSoon/teams';

function EndingSoon() {
  React.useEffect(()=>{
    ReactGA.send({ hitType: "pageview", page: "/endingSoon", title: "EndingSoon Page" });
  },[])
  return (
    <>
      <Hero />
      <Teams />
    </>
  );
}

export default EndingSoon;
