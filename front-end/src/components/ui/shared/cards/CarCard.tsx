import React from 'react';
import { Link } from 'react-router-dom';
import {
  clockIcon,
  //etherumGoldIcon,
  arrowIcon,
} from '../../../../assets/images';
import SpAdvIcon from '../SpAdvIcon';
import { useSelectedCurrency } from '../../../../contexts/CurrencyContext';
const CarCard = (props: any) => {
  const { currencyInfo } = useSelectedCurrency();
  return (
    <div className="sp-adv-card bg-antiFlashWhite-100">
      <div className="max-w-sm p-5">
        <div className="border-neutral-200 rounded-2xl inline-block border">
          <div className="inline-block w-full">
            <img
              className="w-full rounded-t-lg"
              src={props.item.image}
              alt=""
            />
          </div>
          <div className="relative p-4 px-5 pb-16">
            <h5 className="text-base font-bold tracking-tight text-black">
              {props.item.name}
            </h5>
            <p className="text-neutral-400 mb-3 text-sm font-normal">
              {props.item.description}
            </p>
            <div className="flex">
              {props.item.time && (
                <div className="flex items-center flex-1">
                  <img src={clockIcon} className="w-4 h-4 mr-1" />
                  <span className="text-lava-100 text-md font-bold">
                    {props.item.time}
                  </span>
                </div>
              )}
              <div className="flex items-center flex-1">
                <img src={currencyInfo.image} className="w-4 mr-1" />
                <span className="text-neutral-400 mr-1 text-xs font-normal">
                  from
                </span>
                <span className="text-darkGunmetal-200 text-xs font-bold">
                  {props.item.price} {currencyInfo.label}
                </span>
              </div>
            </div>
            <div className=" right-1 absolute bottom-0 flex justify-end">
              <Link to={`/choose-team-spot?id=${props.item.id}`}>
                <SpAdvIcon
                  image={arrowIcon}
                  ParentClassName="flex items-center sp-adv-rec-arrow-lava justify-center bg-lava-100"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
