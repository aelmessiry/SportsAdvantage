import React from 'react';
import { NewWaveData } from '../../data/newWave.ts';
import WaveValue from './waveValue.tsx';
export default function NewWaveHome() {
  return (
    <div className="md:px-16 lg:flex-row px-4 mb-10">
      <div className="flex items-center justify-between">
        <div className="lg:w-2/5 w-full">
          <p className="text-h1 font-spAdvSemiBold lg:leading-loose leading-snug text-black">
            The New Wave in
          </p>
          <p className="text-h1 font-spAdvSemiBold lg:leading-loose leading-snug text-black">
            Sport Sponsorship
          </p>
          <p className=" text-md font-spAdvRegular text-neutral-400">
            We connect businesses with thrilling highexposure motorsports events
            for maximum brand exposure.
          </p>
        </div>
      </div>
      <div className="lg:-mt-20 flex flex-wrap justify-end mx-auto">
        <div className="lg:w-3/5 h-full p-4">
          <div className="lg:justify-end flex flex-wrap mx-auto">
            {NewWaveData.map((d: any, index: any) => (
              <div className="lg:p-4 lg:w-1/2 h-full" key={index}>
                <WaveValue item={d} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
