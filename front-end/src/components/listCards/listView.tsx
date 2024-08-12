import React from 'react';
import ListFilteration from '../shared/ListFilteration';
import { ListDetailsData } from '../../data/listDetailsData';
import ListViewCard from '../ui/shared/cards/ListViewCard';

function ListView() {
  return (
    <>
      <div className="flex flex-wrap justify-start py-6">
        <div className=" pl-3 border-l-4 border-l-lava-100 text-darkGunmetal-200 text-sm font-semibold leading-5 font-spAdvSemiBold tracking-wider">
          LIST VIEW
        </div>
        <div className="my-5 text-darkGunmetal-200 text-base font-normal leading-6 font-spAdvRegular">
          Elementum ullamcorper sed phasellus massa elit turpis eu id varius.
          Diam vestibulum egestas turpis mattis. In praesent lectus eget
          volutpat massa. Tortor purus iaculis consequat, erat nec euismod
          tempus porttitor. Mauris aliquam pharetra in facilisis donec nec, sed
          sit. Nunc, sed amet adipiscing tincidunt sollicitudin tellus platea.
        </div>
      </div>
      <ListFilteration />
      <div className="flex flex-wrap flex-col space-y-10 justify-center pb-6">
        {ListDetailsData.map((d, index) => (
          <div key={index}>
            <ListViewCard item={d} />
          </div>
        ))}
      </div>
    </>
  );
}

export default ListView;
