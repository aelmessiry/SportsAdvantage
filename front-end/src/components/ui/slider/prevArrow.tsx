import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button type="button" className="custom-prev-arrow" onClick={onClick}>
      <FontAwesomeIcon icon={faAngleLeft} />
    </button>
  );
};

export default PrevArrow;
