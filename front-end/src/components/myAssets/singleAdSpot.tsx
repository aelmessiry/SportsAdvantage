import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { MyAdSpotsStatus } from '../../Enum/myAdSpotsStatus';
import { useSelectedCurrency } from '../../contexts/CurrencyContext';

function SingleAdSpot(props: any) {
  const { currencyInfo } = useSelectedCurrency();
  let navigate = useNavigate();
  const handleRowClick = (status) => {
    navigate(`/upload-decal?status=${status}`);
  };
  return (
    <tr
      className={`hover:bg-cetaceanBlue-400 cursor-pointer
       ${props.item.status === MyAdSpotsStatus.Pending ? ' opacity-60' : ''}
      `}
      onClick={() => handleRowClick(props.item.status)}
    >
      <td className="whitespace-nowrap px-4 py-6">
        <div className="flex items-center">
          <div className="sm:mr-3 flex-shrink-0 w-10 h-10 mr-2">
            <img
              className="rounded-full"
              src={props.item.image}
              width="40"
              height="40"
              alt="Spot Image"
            />
          </div>
          <div className=" font-spAdvSemiBold text-darkGunmetal-200 text-base font-semibold leading-5">
            {props.item.name}
            <div className=" text-neutral-900 font-spAdvSemiBold text-xs font-semibold leading-5">
              {props.item.team}
            </div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-6">
        <div className="font-spAdvBold text-darkGunmetal-200 text-base font-bold leading-5 text-left">
          {moment(new Date(props.item.date)).format('DD MMM YYYY')}
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-6">
        <div className="font-spAdvBold text-darkGunmetal-200 flex items-center text-base font-bold leading-5 text-left">
          <span>
            {props.item.price * 2000} $ {`(${(props.item.price * 2000) / 0.05}`}{' '}
          </span>
          <img className="float-left w-6 ml-2" src={currencyInfo.image} />
          <span>)</span>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-6">
        <div className="text-left">
          {props.item.status == MyAdSpotsStatus.Empty ? (
            <div className=" text-cetaceanBlue-200 font-spAdvRegular text-base font-normal leading-6 underline">
              Upload Decal
            </div>
          ) : props.item.status === MyAdSpotsStatus.Pending ? (
            <div className=" text-neutral-400 font-spAdvRegular text-base font-normal">
              <span className="text-neutral-400 sp-adv-dot"></span> Pending
            </div>
          ) : props.item.status === MyAdSpotsStatus.Approved ? (
            <div className=" text-darkGunmetal-200 font-spAdvRegular text-base font-normal">
              <span className="sp-adv-dot bg-green-100"></span> Approved
            </div>
          ) : props.item.status === MyAdSpotsStatus.Rejected ? (
            <div className=" text-darkGunmetal-200 font-spAdvRegular text-base font-normal">
              <span className="sp-adv-dot bg-lava-100 "></span> Rejected
            </div>
          ) : (
            <div className=" text-darkGunmetal-200 font-spAdvRegular text-base font-normal">
              <span className="sp-adv-dot bg-lava-100 "></span> Rejected{' '}
              <span className=" text-ms text-neutral-300">(Re-Submit)</span>
            </div>
          )}
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-6">
        <div className="text-left">
          {props.item.status == MyAdSpotsStatus.Empty && (
            <div className=" text-cetaceanBlue-200 font-spAdvRegular text-base font-normal leading-6 underline">
              List For Sale
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

export default SingleAdSpot;
