import React, { useState } from 'react';
import AdminTabs from '../adminTabs';
import { AdminSponsorsTabs } from '../adminTabsStaticData';
import ManageSponsors from './manageSponsors';
import AddSponsor from './addSponsor';
function Sponsors() {
  const [selectedTab, setSelectedTab] = useState(AdminSponsorsTabs[0].label);
  const handleTabChange = (tabLabel) => {
    setSelectedTab(tabLabel);
  };
  return (
    <div className="md:px-l lg:flex-row pl-4 mb-10">
      <div className="">
        <div className="">
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
            Sponsors
          </p>
          <AdminTabs
            Tabs={AdminSponsorsTabs}
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
          {selectedTab == 'Add New Sponsor' ? (
            <AddSponsor />
          ) : selectedTab == 'Manage Sponsors' ? (
            <ManageSponsors />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sponsors;
