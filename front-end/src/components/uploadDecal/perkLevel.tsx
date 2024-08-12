import React from 'react';
import SpAdvCard from '../shared/SpAdvCard';
import SpAdvInfoModal from '../ui/shared/modals/SpAdvInfoModal';
import { perkLevelData } from '../../data/perkLevelData';
import { checkLavaIcon } from '../../assets/images';
function PerkLevel() {
  return (
    <SpAdvCard
      className="mb-10"
      title={
        <div className="flex items-start">
          <div className="flex-1">
            <p className=" text-darkGunmetal-300 font-spAdvSemiBold mb-3 text-xl font-semibold leading-9">
              Perk Level
            </p>
          </div>
          <div>
            <SpAdvInfoModal title={'Perk Level'} id={'perkLevel'}>
              <div className=" text-neutral-400 text-sm font-normal leading-5">
                Nibh et neque, eget nulla tincidunt diam. Diam id sagittis et
                diam fusce consectetur nulla sed quam. Nunc morbi urna, accumsan
                eget etiam arcu mauris fermentum porttitor. Cras tempor, in non,
                sit neque. Tempus dui tortor, est tincidunt semper magna ut.
                Ipsum, odio massa scelerisque parturient at egestas. Purus sit
                et quis pellentesque enim convallis. Nec hendrerit pharetra odio
                rhoncus.
              </div>
            </SpAdvInfoModal>
          </div>
        </div>
      }
    >
      <div className="flex justify-center">
        <div
          className=" flex-1 bg-aztecGold-100 text-center   px-4 py-5 rounded-md"
          role="alert"
        >
          <p className="text-sm text-center flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="67"
              height="17"
              viewBox="0 0 67 17"
              fill="none"
            >
              <path
                d="M0 16.9102H11.2031V13.9922H3.53906V9.73828H10.7695V6.97266H3.53906V2.91797H11.2031V0H0V16.9102Z"
                fill="white"
              />
              <path
                d="M15.7578 16.9102H26.6914V13.9922H19.2969V0H15.7578V16.9102Z"
                fill="white"
              />
              <path
                d="M30.7891 16.9102H34.3281V0H30.7891V16.9102Z"
                fill="white"
              />
              <path
                d="M43.1836 16.9102H46.7227V2.91797H51.6211V0H38.2969V2.91797H43.1836V16.9102Z"
                fill="white"
              />
              <path
                d="M55.5781 16.9102H66.7812V13.9922H59.1172V9.73828H66.3477V6.97266H59.1172V2.91797H66.7812V0H55.5781V16.9102Z"
                fill="white"
              />
            </svg>
          </p>
        </div>
      </div>
      <ul className="flex flex-wrap items-center py-6 mx-auto space-y-1 text-left">
        {perkLevelData.map((item: any, index: any) => (
          <li
            key={index}
            className="flex items-center space-x-3 lg:w-1/2 h-full p-4 text-darkGunmetal-200 font-bold text-base leading-7 -tracking-normal"
          >
            <img src={checkLavaIcon} alt="checkLava" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </SpAdvCard>
  );
}

export default PerkLevel;
