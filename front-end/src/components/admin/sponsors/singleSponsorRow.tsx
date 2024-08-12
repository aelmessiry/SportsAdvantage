import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MyAdSpotsStatus } from '../../../Enum/myAdSpotsStatus';
import SpAdvButton from '../../ui/SpAdvButton';

function SingleSponsorRow(props: any) {
  let navigate = useNavigate();
  const handleRowClick = () => {
    navigate(`/single-driver?id=${props.item.id}`);
  };
  return (
    <tr
      className={`hover:bg-cetaceanBlue-400 cursor-pointer
       ${props.item.status === MyAdSpotsStatus.Pending ? ' opacity-60' : ''}
      `}
      onClick={() => handleRowClick()}
    >
      <td className="whitespace-nowrap px-4 py-6">
        <div className="flex items-center">
          <div className="sm:mr-3 flex-shrink-0 w-10 h-10 mr-2">
            <img
              className="object-cover w-10 h-10 rounded-full"
              src={props.item.image}
              alt="Spot Image"
            />
          </div>
          <div className=" font-spAdvSemiBold text-darkGunmetal-200 text-base font-semibold leading-5">
            {props.item.name}
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-6">
        <div className="font-spAdvBold text-darkGunmetal-200 text-base font-bold leading-5 text-left">
          {props.item.url}
        </div>
      </td>
      <td
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
      >
        <SpAdvButton
          className=" z-20"
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }}
        >
          Disable
        </SpAdvButton>
      </td>
    </tr>
  );
}

export default SingleSponsorRow;
