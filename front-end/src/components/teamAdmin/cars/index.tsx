import React, { useState } from 'react';
import AdminTabs from '../teamAdminTabs';
import { AdminCarsTabs } from '../adminTabsStaticData';
import AddCar from '../../admin/cars/addCar';
import ManageCars from '../../admin/cars/manageCars';
function TeamOwnedCars(props) {
  const [selectedTab, setSelectedTab] = useState(AdminCarsTabs[0].label);
  const handleTabChange = (tabLabel) => {
    setSelectedTab(tabLabel);
  };
  return (
    <div className="md:px-16 lg:flex-row px-4 mb-10">
      <div className="">
        <div className="mt-5">
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
            Cars
          </p>
          {props.isTeamApproved ? (
            <>
              <AdminTabs
                Tabs={AdminCarsTabs}
                selectedTab={selectedTab}
                onTabChange={handleTabChange}
              />
              {selectedTab == 'Add New Car' ? (
                <AddCar
                  teamName={props.teamName}
                  teamId={props.teamId}
                  isAdmin={false}
                />
              ) : selectedTab == 'Manage Cars' ? (
                <ManageCars
                  teamName={props.teamName}
                  teamId={props.teamId}
                  isAdmin={false}
                  isFromTeamAdmin={true}
                />
              ) : (
                <></>
              )}{' '}
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

export default TeamOwnedCars;
