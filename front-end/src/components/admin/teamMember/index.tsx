import React, { useState } from 'react';
import AdminTabs from '../adminTabs';
import { AdminDriverTabs } from '../adminTabsStaticData';
import AddTeamMember from './addTeamMember';
import ManageTeamMembers from './manageTeamMembers';
function TeamMembers() {
  const [selectedTab, setSelectedTab] = useState(AdminDriverTabs[0].label);

  const handleTabChange = (tabLabel) => {
    setSelectedTab(tabLabel);
  };
  return (
    <div className="md:px-l lg:flex-row pl-4 mb-10">
      <div className="">
        <div className="">
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
            Team Members
          </p>
          <AdminTabs
            Tabs={AdminDriverTabs}
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
          {selectedTab == 'Add New Team Member' ? (
            <AddTeamMember isAdmin={true} />
          ) : selectedTab == 'Manage Team Members' ? (
            <ManageTeamMembers isAdmin={true} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamMembers;
