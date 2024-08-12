import React from 'react';
import BackToHistory from '../shared/BackToHistory';
import SpotFilteration from '../shared/SpotFilteration';
import CarSlider from './carSlider';
import ReservationLegend from '../shared/ReservationLegend';
export default function SelectSpot(props) {
  return (
    <div className="md:px-16 lg:flex-row px-4 mb-10">
      <BackToHistory text="Back" />
      <div className="px-6">
        <div className="flex flex-col">
          <div className="text-darkGunmetal-200 font-spAdvSemiBold mb-2 text-xl font-semibold leading-9">
            Decal Placements
          </div>
          <div className=" text-neutral-400 font-spAdvRegular text-base font-normal leading-6">
            Sollicitudin arcu lectus porta viverra ultrices nec senectus ornare.
            Habitant curabitur nunc aliquet eu etiam faucibus arcu. Et ut quis
            sed venenatis, sed eget. Hac laoreet mi sodales malesuada rhoncus.
          </div>
        </div>
        <SpotFilteration />
        <ReservationLegend />
        <CarSlider
          setSelectedPosition={(pos) => props.setSelectedPos(pos)}
          isCart={props.isCart}
        />
      </div>
    </div>
  );
}
