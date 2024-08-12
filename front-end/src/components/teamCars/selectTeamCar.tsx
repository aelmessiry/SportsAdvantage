import React from 'react';
import { TeamCarsData } from '../../data/teamCarsData';
import CarCard from '../ui/shared/cards/CarCard';
import BackToHistory from '../shared/BackToHistory';

function SelectTeamCar() {
  return (
    <div className="md:px-16 lg:flex-row px-4 my-6">
      <BackToHistory text="Back" />
      <div className=" flex flex-col mt-10">
        <div className=" font-spAdvSemiBold text-darkGunmetal-200 mb-3 text-xl font-semibold leading-9">
          Please Select Car
        </div>
        <p className=" text-darkGunmetal-200 font-spAdvRegular text-base font-normal leading-5">
          Please select one of the following events to continue with sponsorship
          options.
        </p>
        <div className="flex flex-wrap justify-start my-10">
          {TeamCarsData.map((d: any, index: any) => (
            <div className="lg:w-1/4 h-full pr-4" key={index}>
              <CarCard item={d} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectTeamCar;
