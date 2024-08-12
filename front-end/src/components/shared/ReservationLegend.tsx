import React from 'react';
function ReservationLegend() {
  return (
    <div className="flex gap-2">
      <div className="flex items-center">
        <div className="bg-lava-100 w-3 h-3 rounded-full"></div>
        <span className=" text-darkGunmetal-200 text-sm">
          Reserved By Others
        </span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-green-100 rounded-full"></div>
        <span className=" text-darkGunmetal-200 text-sm"> Reserved By You</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
        <span className=" text-darkGunmetal-200 text-sm">About to Buy it</span>
      </div>
    </div>
  );
}

export default ReservationLegend;
