import React, { useState } from 'react';
import { MyListingsTabs } from '../../../Enum//myListingsTabs';
import MyAdsSpotsSub from './myListing';
import NFTCollection from './nftCollection';
function MyAdsSpots() {
  const [selectedTab, setSelectedTab] = useState(MyListingsTabs.MyListings);

  return (
    <div className="md:px-16 lg:flex-row px-4 mb-10">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
            My Listings
          </p>
          <p className=" text-darkGunmetal-200 font-spAdvRegular text-sm font-normal">
            Ultrices aliquam enim, diam sollicitudin elit lorem massa quam.
            Neque sapien orci ultrices.
          </p>
        </div>
      </div>
      <div className="border-b-neutral-800 flex items-center justify-between border-b-2">
        <div className="dark:text-gray-400 dark:border-gray-700 text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <div
                onClick={() => {
                  setSelectedTab(MyListingsTabs.MyListings);
                }}
                className={`${
                  selectedTab === MyListingsTabs.MyListings
                    ? 'font-bold font-spAdvBold border-b-3 border-b-lava-200'
                    : 'font-normal font-spAdvRegular'
                }  text-cetaceanBlue-100 text-base cursor-pointer  inline-block p-4 border-b-2 border-transparent rounded-t-lg `}
              >
                My Listings
              </div>
            </li>
            <li className="mr-2">
              <div
                onClick={() => {
                  setSelectedTab(MyListingsTabs.NFTCollections);
                }}
                className={`${
                  selectedTab === MyListingsTabs.NFTCollections
                    ? 'font-bold font-spAdvBold  border-b-3 border-b-lava-200'
                    : 'font-normal font-spAdvRegular'
                }  text-cetaceanBlue-100 text-base cursor-pointer font-bold font-spAdvBold inline-block p-4 border-b-2 border-transparent rounded-t-lg`}
              >
                NFT Collection
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-between">
        {selectedTab === MyListingsTabs.MyListings ? (
          <MyAdsSpotsSub />
        ) : (
          <NFTCollection />
        )}
      </div>
    </div>
  );
}

export default MyAdsSpots;
