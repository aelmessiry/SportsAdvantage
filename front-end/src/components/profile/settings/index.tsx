import React from 'react';
import EmailNotification from './emailNotification';
import EmailVerification from './emailVerification';
function Settings() {
  return (
    <div className="md:px-16 lg:flex-row px-4 mb-10">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className=" font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
            My Account
          </p>
          <p className=" text-darkGunmetal-200 font-spAdvRegular text-sm font-normal">
            Every change is automatically saved
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-stretch py-2">
        <div className="lg:w-2/3 h-fullpr-4">
          <EmailNotification />
        </div>
        <div className="lg:w-1/3 w-full h-full pl-4">
          <EmailVerification />
        </div>
      </div>
    </div>
  );
}

export default Settings;
