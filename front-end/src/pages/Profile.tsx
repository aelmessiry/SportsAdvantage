import React, { useState } from 'react';
import ReactGA from 'react-ga4';
import SPADVSidebar from '../components/profile/sidebar';
import { ProfileTabs } from '../Enum/profileTabs';
import MyAdsSpots from '../components/profile/myListing';
import MyAccount from '../components/profile/myAccount';
import Settings from '../components/profile/settings';

function Profile() {
  const [selectedTab, setSelectedTab] = useState(ProfileTabs.MyListings);
  React.useEffect(()=>{
    ReactGA.send({ hitType: "pageview", page: "/profile", title: "Profile Page" });
  },[])
  return (
    <>
      <div className="md:flex sp-adv-side-bar relative min-h-screen">
        <SPADVSidebar
          returnSelectedTab={(selected: any) => {
            setSelectedTab(selected);
          }}
        />
        {/* <!-- content --> */}
        <div className="flex-1 py-10 text-2xl font-bold">
          {selectedTab === ProfileTabs.MyListings ? (
            <MyAdsSpots />
          ) : selectedTab === ProfileTabs.MyAccount ? (
            <MyAccount />
          ) : (
            <Settings />
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
