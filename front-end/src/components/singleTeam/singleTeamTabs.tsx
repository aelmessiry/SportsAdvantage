import React, { useState } from 'react';
import { TeamTabs } from '../../Enum/teamTabs';
import About from './about';
import SponsorshipPackages from './sponsorshipPackages';
import EventCalendar from './eventCalendar';
function SingleTeamTabs(props) {
  const [selectedTab, setSelectedTab] = useState(TeamTabs.About);

  return (
    <div className="w-full mb-10">
      <div className="border-b-neutral-1200 flex items-center justify-between border-b">
        <div className="dark:text-gray-400 dark:border-gray-700 text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <div
                onClick={() => {
                  setSelectedTab(TeamTabs.About);
                }}
                className={`${
                  selectedTab === TeamTabs.About
                    ? 'font-bold font-spAdvBold border-b-4  border-cetaceanBlue-100'
                    : 'font-normal font-spAdvRegular border-b-2 border-transparent'
                }  text-cetaceanBlue-100 text-base cursor-pointer  inline-block p-4 rounded-t-lg `}
              >
                About
              </div>
            </li>
            <li className="mr-2">
              <div
                onClick={() => {
                  setSelectedTab(TeamTabs.SponsorshipPackages);
                }}
                className={` pointer-events-none text-gray-400 ${
                  selectedTab === TeamTabs.SponsorshipPackages
                    ? 'font-bold font-spAdvBold border-b-4  border-cetaceanBlue-100'
                    : 'font-normal font-spAdvRegular border-b-2 border-transparent'
                }  text-cetaceanBlue-100 text-base cursor-pointer  inline-block p-4 rounded-t-lg `}
              >
                Sponsorship Packages
              </div>
            </li>
            <li className="mr-2">
              <div
                onClick={() => {
                  setSelectedTab(TeamTabs.Calendar);
                }}
                className={` pointer-events-none text-gray-400 ${
                  selectedTab === TeamTabs.Calendar
                    ? 'font-bold font-spAdvBold border-b-4  border-cetaceanBlue-100'
                    : 'font-normal font-spAdvRegular border-b-2 border-transparent'
                }  text-cetaceanBlue-100 text-base cursor-pointer  inline-block p-4 rounded-t-lg `}
              >
                Calendar
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {selectedTab === TeamTabs.About ? (
          <About team={props.team} />
        ) : selectedTab === TeamTabs.SponsorshipPackages ? (
          <SponsorshipPackages />
        ) : (
          <EventCalendar />
        )}
      </div>
    </div>
  );
}

export default SingleTeamTabs;
