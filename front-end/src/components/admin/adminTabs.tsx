import React from 'react'

function AdminTabs({Tabs, selectedTab  ,onTabChange}) {

  return (
    <div className="w-full mb-10">
    <div className="border-b-neutral-1200 flex items-center justify-between border-b">
      <div className="dark:text-gray-400 dark:border-gray-700 text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          {Tabs && Tabs.map((item , index)=>
            <li className="mr-2" key={index}>
            <div
              onClick={() => {
                onTabChange(item.label);
              }}
              className={`${
                selectedTab === item.label
                  ? 'font-bold font-spAdvBold border-b-4  border-cetaceanBlue-100'
                  : 'font-normal font-spAdvRegular border-b-2 border-transparent'
              }  text-cetaceanBlue-100 text-base cursor-pointer  inline-block p-4 rounded-t-lg `}
            >
              {item.label}
            </div>
          </li>
          )}
          
        </ul>
      </div>
    </div>
    <div>
      </div>
      </div>
  )
}

export default AdminTabs