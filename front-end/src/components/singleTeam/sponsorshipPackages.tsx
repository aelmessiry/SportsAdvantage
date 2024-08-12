import React from 'react';
import PricingList from './pricingList';
import { PricingListData } from '../../data/pricingListData';
function SponsorshipPackages() {
  return (
    <>
      <div className="flex flex-wrap justify-start py-6">
        <div className=" pl-3 border-l-4 border-l-lava-100 text-darkGunmetal-200 text-sm font-semibold leading-5 font-spAdvSemiBold tracking-wider">
          SPONSORSHIP PACKAGES
        </div>
        <div className="my-5 text-darkGunmetal-200 text-base font-normal leading-6 font-spAdvRegular">
          Elementum ullamcorper sed phasellus massa elit turpis eu id varius.
          Diam vestibulum egestas turpis mattis. In praesent lectus eget
          volutpat massa. Tortor purus iaculis consequat, erat nec euismod
          tempus porttitor. Mauris aliquam pharetra in facilisis donec nec, sed
          sit. Nunc, sed amet adipiscing tincidunt sollicitudin tellus platea.
        </div>
      </div>
      <div className="flex flex-wrap justify-center pb-6">
        {PricingListData.map((d: any, index: any) => (
          <div className="lg:w-1/3 h-full p-4 w-full" key={index}>
            <PricingList item={d} />
          </div>
        ))}
      </div>
    </>
  );
}

export default SponsorshipPackages;
