import React, { useState } from 'react';
import AdminTabs from '../adminTabs';
import { AdminSeasonsTabs } from '../adminTabsStaticData';
import ManageSeasons from './manageSeasons';
import AddSeason from './addSeason';
function Seasons() {
  const [selectedTab, setSelectedTab] = useState(AdminSeasonsTabs[0].label);
  const handleTabChange = (tabLabel) => {
    setSelectedTab(tabLabel);
  };
  return (
    <div className="md:px-l lg:flex-row pl-4 mb-10">
      <div className="">
        <div className="">
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
            Seasons
          </p>
          <AdminTabs
            Tabs={AdminSeasonsTabs}
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
          {selectedTab == 'Add New Season' ? (
            <AddSeason />
          ) : selectedTab == 'Manage Seasons' ? (
            <ManageSeasons />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Seasons;
