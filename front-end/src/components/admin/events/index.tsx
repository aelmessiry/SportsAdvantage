import React, { useState } from 'react';
import AdminTabs from '../adminTabs';
import { AdminEventsTabs } from '../adminTabsStaticData';
import ManageEvents from './manageEvents';
import AddEvent from './addEvent';
function Events() {
  const [selectedTab, setSelectedTab] = useState(AdminEventsTabs[0].label);
  const handleTabChange = (tabLabel) => {
    setSelectedTab(tabLabel);
  };
  return (
    <div className="md:px-l lg:flex-row pl-4 mb-10">
      <div className="">
        <div className="">
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
            Events
          </p>
          <AdminTabs
            Tabs={AdminEventsTabs}
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
          {selectedTab == 'Add New Event' ? (
            <AddEvent />
          ) : selectedTab == 'Manage Events' ? (
            <ManageEvents />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Events;
