import React, { useState } from 'react';
import AdminTabs from '../adminTabs';
import { AdminAdminsTabs } from '../adminTabsStaticData';
import AddAdmin from './addAdmin';
import ManageAdmins from './manageAdmins';
function Admins() {
  const [selectedTab, setSelectedTab] = useState(AdminAdminsTabs[0].label);
  const handleTabChange = (tabLabel) => {
    setSelectedTab(tabLabel);
  };
  return (
    <div className="md:px-l lg:flex-row pl-4 mb-10">
      <div className="">
        <div className="">
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
            Admins
          </p>
          <AdminTabs
            Tabs={AdminAdminsTabs}
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
          {selectedTab == 'Add New Admin' ? (
            <AddAdmin />
          ) : selectedTab == 'Manage Admins' ? (
            <ManageAdmins />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admins;
