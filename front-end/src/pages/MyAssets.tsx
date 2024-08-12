import React from 'react';
import ReactGA from 'react-ga4';
import MyAssetsTab from '../components/myAssets';

function MyAssets() {
  React.useEffect(()=>{
    ReactGA.send({ hitType: "pageview", page: "/MyAssets", title: "MyAssets Page" });
  },[])
  return (
    <>
      <div className="my-8">
        <MyAssetsTab />
      </div>
    </>
  );
}

export default MyAssets;
