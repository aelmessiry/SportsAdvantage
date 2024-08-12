import React from 'react';
import SelectSpot from '../chooseSpot/selectSpot';
import SpotLocation from '../chooseSpot/spotLocation';
export default function chooseTeamSpotSub() {
  const [selectedPos, setSelectedPos] = React.useState();

  return (
    <div className="md:px-16 lg:flex-row px-4 mb-10">
      <div className=" lg:flex lg:flex-wrap">
        <div className="lg:w-2/3 flex flex-col p-6">
          <SelectSpot setSelectedPos={(pos) => setSelectedPos(pos)} />
        </div>
        <div className="lg:w-1/3 flex flex-col p-6">
          <SpotLocation selectedPos={selectedPos} />
        </div>
      </div>
    </div>
  );
}
