import React from 'react';
import useSortableData from '../../../hooks/sortTable';
import SingleAdSpot from './singleMyListing';
import { MyListingData } from '../../../data/myListing';
import { useSelectedCurrency } from '../../../contexts/CurrencyContext';

function MyListingSub() {
  const { currencyInfo } = useSelectedCurrency();
  const { items, requestSort } = useSortableData(MyListingData);

  return (
    <div className="shadow-outline-main-card rounded-2xl border-antiFlashWhite-100 flex-1 mt-10 overflow-x-auto border-solid">
      <table className="w-full table-auto">
        <thead className=" bg-transparent">
          <tr className="px-4">
            <th className="whitespace-nowrap px-4 py-2">
              <div
                className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left"
                onClick={() => requestSort('name')}
              >
                Item List
              </div>
            </th>
            <th className="whitespace-nowrap px-4 py-2">
              <div
                className="font-spAdvSemiBold text-neutral-400 flex items-center text-base font-semibold tracking-wide text-left cursor-pointer"
                onClick={() => requestSort('date')}
              >
                <span className="float-left mr-2">Purchase Date</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  fill="none"
                >
                  <path
                    d="M3.94737 0L7.36589 5.92105H0.528847L3.94737 0Z"
                    fill="#D9D9D9"
                  />
                  <path
                    d="M3.94716 15L0.528641 9.07895L7.36568 9.07895L3.94716 15Z"
                    fill="#D9D9D9"
                  />
                </svg>
              </div>
            </th>
            <th className="whitespace-nowrap px-4 py-2">
              <div
                className="font-spAdvSemiBold text-neutral-400 flex items-center text-base font-semibold tracking-wide text-left cursor-pointer"
                onClick={() => requestSort('price')}
              >
                <span className="float-left mr-2">
                  Purchase Price$ ({currencyInfo?.label})
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  fill="none"
                >
                  <path
                    d="M3.94737 0L7.36589 5.92105H0.528847L3.94737 0Z"
                    fill="#D9D9D9"
                  />
                  <path
                    d="M3.94716 15L0.528641 9.07895L7.36568 9.07895L3.94716 15Z"
                    fill="#D9D9D9"
                  />
                </svg>
              </div>
            </th>
            <th className="whitespace-nowrap px-4 py-2">
              <div
                className="font-spAdvSemiBold text-neutral-400 flex items-center text-base font-semibold tracking-wide text-left cursor-pointer"
                onClick={() => requestSort('price')}
              >
                <span className="float-left mr-2">
                  Listing Price$ ({currencyInfo?.label})
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  fill="none"
                >
                  <path
                    d="M3.94737 0L7.36589 5.92105H0.528847L3.94737 0Z"
                    fill="#D9D9D9"
                  />
                  <path
                    d="M3.94716 15L0.528641 9.07895L7.36568 9.07895L3.94716 15Z"
                    fill="#D9D9D9"
                  />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {items.map((item: Object, index: Number) => (
            <SingleAdSpot item={item} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyListingSub;
