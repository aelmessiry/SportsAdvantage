import React from 'react';
import SpAdvCard from '../shared/SpAdvCard';
import { manager } from '../../assets/images';
function SponsorshipManagement() {
  return (
    <SpAdvCard
      className="mb-10"
      title={
        <div className="flex items-start">
          <div className="flex-1">
            <p className=" text-darkGunmetal-300 font-spAdvRegular mb-3 text-xl font-semibold leading-9">
              Sponsorship Management
            </p>
            <div className="flex text-neutral-400 text-sm font-normal leading-5">
              Please write your message to the sponsoring manager and they will
              get back to you as soon as possible. Or directly contact them with
              the information provided below.
            </div>
          </div>
        </div>
      }
    >
      <div className="flex items-center justify-start space-x-5">
        <img src={manager} alt="manager" />
        <div>
          <p className=" text-lg font-semibold leading-7 text-darkGunmetal-200 font-spAdvSemiBold">
            Sponsorship Manager
          </p>
          <p className=" text-xs font-semibold leading-5  text-neutral-400">
            Manager Name
          </p>
          <p className=" text-xs font-normal leading-5  text-neutral-400">
            john@email.com | 1+ 123-12345
          </p>
        </div>
      </div>
    </SpAdvCard>
  );
}

export default SponsorshipManagement;
