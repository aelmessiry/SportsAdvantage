import React, { useState } from 'react';
import AdminTabs from '../adminTabs';
import { AdminCarsTabs } from '../adminTabsStaticData';
import AddCar from './addCar';
import ManageCars from './manageCars';
import BackToHistory from '../../shared/BackToHistory';
import { useLocation } from 'react-router-dom';
import { AdminTabs as AdminTabsEnum } from '../../../Enum/adminTabs';
function TeamOwnedCars() {
  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);
  const team = queryParams.get('id');
  const [selectedTab, setSelectedTab] = useState(AdminCarsTabs[0].label);

  const handleTabChange = (tabLabel) => {
    setSelectedTab(tabLabel);
  };
  return (
    <div className="md:px-l lg:flex-row pl-4 mb-10">
      <div className="">
        <div className="mt-5">
          <BackToHistory
            text="Back to Browse"
            redirectTab={AdminTabsEnum.Teams}
            isCar={true}
          />
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
            Cars
          </p>
          <AdminTabs
            Tabs={AdminCarsTabs}
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
          {selectedTab == 'Add New Car' ? (
            <AddCar teamId={team} isAdmin={true} />
          ) : selectedTab == 'Manage Cars' ? (
            <ManageCars teamId={team} isAdmin={true} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamOwnedCars;
