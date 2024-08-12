import React from 'react';
import SpAdvCard from '../../shared/SpAdvCard';
import SpAdvSwitch from '../../ui/SpAdvSwitch';
function EmailNotification() {
  return (
    <SpAdvCard title="Notification Settings via email" className="mt-10">
      <ul className="dark:divide-gray-700 divide-y divide-gray-200">
        <li className="sm:pb-4 pb-3">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className=" text-darkGunmetal-300 mb-3 text-sm font-normal leading-5">
                Decal Updates
              </p>
              <p className=" text-neutral-900 text-sm font-normal leading-5">
                Ac quam purus lacus, urna, euismod. Sit erat.
              </p>
            </div>
            <div>
              <SpAdvSwitch />
            </div>
          </div>
        </li>
        <li className="sm:pb-4 py-3">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className=" text-darkGunmetal-300 mb-3 text-sm font-normal leading-5">
                Ending Soon Updates
              </p>
              <p className=" text-neutral-900 text-sm font-normal leading-5">
                Pellentesque sed massa imperdiet.
              </p>
            </div>
            <div>
              <SpAdvSwitch />
            </div>
          </div>
        </li>
        <li className="sm:pb-4 py-3">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className=" text-darkGunmetal-300 mb-3 text-sm font-normal leading-5">
                Event Updates
              </p>
              <p className=" text-neutral-900 text-sm font-normal leading-5">
                Massa malesuada nascetur nunc odio nunc sem blandit pretium.
                Suspendisse morbi.
              </p>
            </div>
            <div>
              <SpAdvSwitch />
            </div>
          </div>
        </li>
        <li className="sm:pb-4 py-3">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className=" text-darkGunmetal-300 mb-3 text-sm font-normal leading-5">
                Successful Purchase
              </p>
              <p className=" text-neutral-900 text-sm font-normal leading-5">
                Facilisi praesent eu mollis nibh. Ac.
              </p>
            </div>
            <div>
              <SpAdvSwitch />
            </div>
          </div>
        </li>
      </ul>
    </SpAdvCard>
  );
}

export default EmailNotification;
