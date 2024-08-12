import React from 'react';

const SpAdvIcon = (props: any) => {
  return (
    <div className={`${props.ParentClassName}`}>
      <div className={`${props.SubClassName && props.SubClassName}`}>
        <img src={props.image} className="" />
      </div>
    </div>
  );
};

export default SpAdvIcon;
