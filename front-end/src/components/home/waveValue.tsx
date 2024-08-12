import React from 'react';
const WaveValue = (props: any) => {
  return (
    <div>
      <div className="flex items-center justify-start w-20 mb-4 lg:w-72 sp-adv-wave-value">
        <img
          className="text-primary-600 dark:text-primary-300"
          src={props.item.image}
        />
      </div>
      <h3 className="mb-2 text-lg font-bold text-darkGunmetal-200">
        {props.item.label}
      </h3>
      {/* <p className="text-gray-500 dark:text-gray-400">
        {props.item.description}
      </p> */}
    </div>
  );
};

export default WaveValue;
