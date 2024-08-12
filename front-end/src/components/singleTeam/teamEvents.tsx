import React from 'react';
import { TeamEventsData } from '../../data/teameventsData';

function TeamEvents() {
  return (
    <div className="shadow-outline-main-card rounded-2xl border-antiFlashWhite-100 flex-1 mt-10 overflow-x-auto border-solid">
      <table className="w-full table-auto">
        <thead className=" bg-transparent">
          <tr className="px-4">
            <th className="whitespace-nowrap px-4 py-2">
              <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                Event
              </div>
            </th>
            <th className="whitespace-nowrap px-4 py-2">
              <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                Circuit
              </div>
            </th>
            <th className="whitespace-nowrap px-4 py-2">
              <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                Finish Position
              </div>
            </th>
            <th className="whitespace-nowrap px-4 py-2">
              <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                Starting Position
              </div>
            </th>{' '}
            <th className="whitespace-nowrap px-4 py-2">
              <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                Abandon
              </div>
            </th>
            <th className="whitespace-nowrap px-4 py-2">
              <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                Points
              </div>
            </th>
            <th className="whitespace-nowrap px-4 py-2">
              <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                Driver
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {TeamEventsData.map((item: any) => (
            <tr key={item.id}>
              <td className="text-darkGunmetal-200 whitespace-nowrap px-4 py-6 text-base leading-5">
                {item.name}
              </td>
              <td className="text-darkGunmetal-200 whitespace-nowrap px-4 py-6 text-base leading-5">
                {item.circuit}
              </td>
              <td className="text-darkGunmetal-200 whitespace-nowrap px-4 py-6 text-base leading-5">
                {item.finishPosition}
              </td>
              <td className="text-darkGunmetal-200 whitespace-nowrap px-4 py-6 text-base leading-5">
                {item.startingPosition}
              </td>
              <td className="text-darkGunmetal-200 whitespace-nowrap px-4 py-6 text-base leading-5">
                {item.Abandon}
              </td>
              <td className="text-darkGunmetal-200 whitespace-nowrap px-4 py-6 text-base leading-5">
                {item.points}
              </td>
              <td className="text-darkGunmetal-200 whitespace-nowrap px-4 py-6 text-base leading-5">
                {item.driver}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeamEvents;
