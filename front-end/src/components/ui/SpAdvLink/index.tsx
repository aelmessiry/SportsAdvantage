import React from 'react';
import { Link } from 'react-router-dom';

const SpAdvLink = (props: any) => {
  return (
    <Link
      className={` rounded-md text-center sp-adv-button font-bold ${
        props.isButtonStyle
          ? 'bg-lava-100 text-antiFlashWhite-100 font-sm hover:shadow-button-hover  px-6 py-3 text-sm '
          : ''
      } ${props.className}`}
      to={props.to}
    >
      {props.children}
    </Link>
  );
};

export default SpAdvLink;
