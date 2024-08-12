import React, { useState } from 'react';
import AdminTabs from '../adminTabs';
import { AdminTeamTabs } from '../adminTabsStaticData';
import AddTeam from '../../singleTeam/addTeam';
import ManageTeams from './manageTeams';
function Teams() {
  const [selectedTab, setSelectedTab] = useState(AdminTeamTabs[0].label);

  const handleTabChange = (tabLabel) => {
    setSelectedTab(tabLabel);
  };
  return (
    <div className="md:px-l lg:flex-row pl-4 mb-10">
      <div className="">
        <div className="">
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
            Teams
          </p>
          <AdminTabs
            Tabs={AdminTeamTabs}
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
          {selectedTab == 'Add New Team' ? (
            <AddTeam isAdmin={true} />
          ) : selectedTab == 'Manage Teams' ? (
            <ManageTeams />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;
