import React from 'react';
import SingleSponsorRow from './singleSponsorRow';
import { SponsorsData } from '../../../data/sponsorsData';

function ManageSponsors() {
  return (
    <div className=" overflow-x-auto">
      {' '}
      <table className="w-full table-auto">
        <thead className=" bg-transparent">
          <tr className="px-4">
            <th className="whitespace-nowrap px-4 py-2">
              <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                Sponsor Name
              </div>
            </th>
            <th className="whitespace-nowrap px-4 py-2">
              <div className="font-spAdvSemiBold text-neutral-400 flex items-center text-base font-semibold tracking-wide text-left cursor-pointer">
                Url
              </div>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {SponsorsData.map((item: Object, index: Number) => (
            <SingleSponsorRow item={item} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageSponsors;
