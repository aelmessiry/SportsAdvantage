import React, { useState } from 'react';
import AdminTabs from '../teamAdminTabs';
import { AdminDriverTabs } from '../adminTabsStaticData';
import AddTeamMember from '../../admin/teamMember/addTeamMember';
import ManageTeamMembers from '../../admin/teamMember/manageTeamMembers';
function TeamMembers(props) {
  const [selectedTab, setSelectedTab] = useState(AdminDriverTabs[0].label);

  const handleTabChange = (tabLabel) => {
    setSelectedTab(tabLabel);
  };
  return (
    <div className="md:px-16 lg:flex-row px-4 mb-10">
      <div className="">
        <div className="">
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
            Team Members
          </p>
          {props.isTeamApproved ? (
            <>
              <AdminTabs
                Tabs={AdminDriverTabs}
                selectedTab={selectedTab}
                onTabChange={handleTabChange}
              />
              {selectedTab == 'Add New Team Member' ? (
                <AddTeamMember
                  teamName={props.teamName}
                  teamId={props.teamId}
                />
              ) : selectedTab == 'Manage Team Members' ? (
                <ManageTeamMembers
                  isFromTeamAdmin={true}
                  teamName={props.teamName}
                  teamId={props.teamId}
                />
              ) : (
                <></>
              )}
            </>
          ) : (
            <div className=" flex items-center justify-center h-screen">
              Please wait untill admin approve your team
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamMembers;
