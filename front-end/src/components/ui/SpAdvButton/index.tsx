import React from 'react';

const SpAdvButton = (props: any) => {
  return (
    <button
      type={props.type}
      onClick={(e) => props.onClick(e)}
      className={`rounded-md text-center sp-adv-button font-bold bg-lava-100 text-antiFlashWhite-100 font-sm hover:shadow-button-hover  px-6  text-sm ${
        props.className
      } ${props.disabled ? 'bg-neutral-300' : ''}`}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default SpAdvButton;
