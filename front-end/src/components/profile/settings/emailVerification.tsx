import React from 'react';
import SpAdvCard from '../../shared/SpAdvCard';
function EmailVerification() {
  return (
    <SpAdvCard className="mt-10">
      <ul className="dark:divide-gray-700 divide-y divide-gray-200">
        <li className="sm:pb-4 pb-3">
          <div className="flex items-center space-x-4">
            <p className=" text-darkGunmetal-400 text-lg font-bold leading-7">
              Email Verification
            </p>
          </div>
        </li>
        <li className="sm:pb-4 py-3">
          <div className="flex items-center space-x-4">
            <p className=" text-darkGunmetal-400 text-lg font-bold leading-7">
              Login Password
            </p>
          </div>
        </li>
      </ul>
    </SpAdvCard>
  );
}

export default EmailVerification;
