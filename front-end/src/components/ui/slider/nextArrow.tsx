import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button type="button" className="custom-next-arrow" onClick={onClick}>
      <FontAwesomeIcon icon={faAngleRight} />
    </button>
  );
};

export default NextArrow;
