import React from 'react';
import { useNavigate } from 'react-router-dom';
function BackToHistory(props) {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <div
        onClick={() => {
          props.redirectTab >= 0
            ? props.fromScreen === 'teamAdmin'
              ? navigate(`/team-admin?tab=${props.redirectTab}`)
              : navigate(`/admin?tab=${props.redirectTab}`)
            : navigate(-1);
        }}
        className="flex items-center mb-5"
      >
        <div className=" shadow-inner-md bg-neutral-200 w-9 h-9 flex items-center justify-center float-left mr-1 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.7109 13.59L8.12094 9L12.7109 4.41L11.2909 3L5.29094 9L11.2909 15L12.7109 13.59Z"
              fill="#8F92A1"
            />
            <mask
              id="mask0_451_16192"
              style={{ maskType: 'luminance' }}
              maskUnits="userSpaceOnUse"
              x="5"
              y="3"
              width="8"
              height="12"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.7109 13.59L8.12094 9L12.7109 4.41L11.2909 3L5.29094 9L11.2909 15L12.7109 13.59Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask0_451_16192)"></g>
          </svg>
        </div>
        <span className=" text-darkGunmetal-200 font-spAdvSemiBold ml-2 text-lg font-semibold">
          {props.text}
        </span>
      </div>
    </div>
  );
}

export default BackToHistory;
