import React, { useState } from 'react';
import AdminTabs from '../adminTabs';
import { AdminCategoriesTabs } from '../adminTabsStaticData';
import ManageCategories from './manageCategories';
import AddCategory from './addCategory';
function Categories() {
  const [selectedTab, setSelectedTab] = useState(AdminCategoriesTabs[0].label);
  const handleTabChange = (tabLabel) => {
    setSelectedTab(tabLabel);
  };
  return (
    <div className="md:px-l lg:flex-row pl-4 mb-10">
      <div className="">
        <div className="">
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
            Categories
          </p>
          <AdminTabs
            Tabs={AdminCategoriesTabs}
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
          {selectedTab == 'Add New Category' ? (
            <AddCategory />
          ) : selectedTab == 'Manage Categories' ? (
            <ManageCategories />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
