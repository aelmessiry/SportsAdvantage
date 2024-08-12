import React, { useState } from 'react';
import ListView from './listView';
import EventCalendar from './eventCalendar';
import { ListCardsTabs } from '../../Enum/listCardsTabs';
import BackToHistory from '../shared/BackToHistory';
function ListCardsSub() {
  const [selectedTab, setSelectedTab] = useState(ListCardsTabs.ListView);

  return (
    <div className="lg:flex-row my-10">
      <BackToHistory text={'Back to Browse'} />
      <div className="border-b-neutral-1200 flex items-center justify-between border-b">
        <div className="dark:text-gray-400 dark:border-gray-700 text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <div
                onClick={() => {
                  setSelectedTab(ListCardsTabs.ListView);
                }}
                className={`${
                  selectedTab === ListCardsTabs.ListView
                    ? 'font-bold font-spAdvBold border-b-4  border-cetaceanBlue-100'
                    : 'font-normal font-spAdvRegular border-b-2 border-transparent'
                }  text-cetaceanBlue-100 text-base cursor-pointer  inline-block p-4 rounded-t-lg `}
              >
                List View
              </div>
            </li>
            <li className="mr-2">
              <div
                onClick={() => {
                  setSelectedTab(ListCardsTabs.Calendar);
                }}
                className={`${
                  selectedTab === ListCardsTabs.Calendar
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
        {selectedTab === ListCardsTabs.ListView ? (
          <ListView />
        ) : (
          <EventCalendar />
        )}
      </div>
    </div>
  );
}

export default ListCardsSub;
