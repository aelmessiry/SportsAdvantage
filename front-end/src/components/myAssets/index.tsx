import React, { useState } from 'react';
import { MyAssetsTabs } from '../../Enum/myAssetsTabs';
import MyAdsSpots from './myAdSpot';
import MyAssets from './myAssets';
function MyAssetsTab() {
  const [selectedTab, setSelectedTab] = useState(MyAssetsTabs.MyAssets);

  return (
    <div className="w-full mb-10">
      <div className="border-b-neutral-1200 flex items-center justify-between border-b">
        <div className="dark:text-gray-400 dark:border-gray-700 text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <div
                onClick={() => {
                  setSelectedTab(MyAssetsTabs.MyAssets);
                }}
                className={`${
                  selectedTab === MyAssetsTabs.MyAssets
                    ? 'font-bold font-spAdvBold border-b-4  border-cetaceanBlue-100'
                    : 'font-normal font-spAdvRegular border-b-2 border-transparent'
                }  text-cetaceanBlue-100 text-base cursor-pointer  inline-block p-4 rounded-t-lg `}
              >
                My Assets
              </div>
            </li>
            <li className="mr-2">
              <div
                onClick={() => {
                  setSelectedTab(MyAssetsTabs.MyAdSpots);
                }}
                className={` ${
                  selectedTab === MyAssetsTabs.MyAdSpots
                    ? 'font-bold font-spAdvBold border-b-4  border-cetaceanBlue-100'
                    : 'font-normal font-spAdvRegular border-b-2 border-transparent'
                }  text-cetaceanBlue-100 text-base cursor-pointer  inline-block p-4 rounded-t-lg `}
              >
                My Ad Spots
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {selectedTab === MyAssetsTabs.MyAssets ? <MyAssets /> : <MyAdsSpots />}
      </div>
    </div>
  );
}

export default MyAssetsTab;
