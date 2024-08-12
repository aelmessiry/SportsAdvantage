import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  locationIcon,
  //etherumGoldIcon,
  checkLavaIcon,
} from '../../../../assets/images';
import { PriceClassification } from '../../../../Enum/priceClassification';
import SpAdvButton from '../../SpAdvButton';
import { useSelectedSpot } from '../../../../contexts/SelectedSpotContext';
import { useSelectedCurrency } from '../../../../contexts/CurrencyContext';
const ListViewCard = (props: any) => {
  const { currencyInfo } = useSelectedCurrency();
  const { setSpotData, selectedSpots } = useSelectedSpot();
  let navigate = useNavigate();
  const goToSelectCar = () => {
    setSpotData(
      selectedSpots && selectedSpots.length > 0
        ? [...selectedSpots, props.item]
        : [props.item]
    );
    navigate(`/selected-spot`);
  };
  return (
    <div className=" shadow-outline-xs border-antiFlashWhite-300 bg-antiFlashWhite-100 flex flex-wrap p-4 border rounded">
      <div className="lg:w-1/3 h-full px-8 space-y-3">
        <div className="relative">
          {' '}
          <img
            className="sp-adv-mint-card-nft w-full h-64 rounded-md"
            src={props.item.image}
            alt=""
          />
          <p
            style={{
              backgroundColor:
                Number(props.item.classify) === PriceClassification.Elite
                  ? '#C59F59'
                  : Number(props.item.classify) === PriceClassification.Premium
                  ? '#D91118'
                  : '#131444',
            }}
            className=" text-antiFlashWhite-100 absolute top-0 w-full py-3 text-center"
          >
            {Number(props.item.classify) === PriceClassification.Elite
              ? 'ELITE'
              : Number(props.item.classify) === PriceClassification.Premium
              ? 'PREMIUM'
              : 'PRO'}
          </p>
        </div>
        <div className=" flex">
          <div className=" font-spAdvBold text-lg font-bold leading-6 text-black">
            {props.item.label}
          </div>

          <div className="flex items-center justify-end flex-1">
            <img src={locationIcon} className="w-4 h-4 mr-1" />
            <span className="text-neutral-400 text-xs font-bold">
              {props.item.location}
            </span>
          </div>
        </div>
        <div className="text-xs leading-5 text-black">
          <span className="font-spAdvBold mr-1 font-bold">Car</span>
          <span className="font-spAdvRegular font-normal">
            | {props.item.player}
          </span>
        </div>
        <div className=" text-neutral-400 font-spAdvRegular text-sm font-normal leading-5">
          {props.item.description}
        </div>
      </div>
      <div className="lg:w-2/3 h-full p-4 pb-0">
        <div className="border-b-neutral-300 flex flex-wrap border-b">
          <div className="lg:w-1/3 h-full p-4">
            <div className=" text-darkGunmetal-200 text-sm font-bold">
              Decal Location
            </div>
            <div className="flex flex-wrap justify-between py-6 mx-auto">
              <div>
                <div className=" mb-3 text-xl font-bold leading-7">
                  {props.item.spot}
                </div>
                <div className="flex items-center">
                  <div className=" font-spAdvRegular text-darkGunmetal-200 mb-3 text-lg font-normal leading-5 text-left">
                    <img
                      className="float-left w-5 mr-2"
                      src={currencyInfo.image}
                    />
                    total{' '}
                    <b className=" ml-1 text-lg">
                      {props.item.price} {currencyInfo.label}
                    </b>
                  </div>
                </div>
              </div>
              <div className=" text-sm font-bold">
                <p> Decal Size: {props.item.size}</p>
                <p>
                  Price per cm: {props.item.pricePerCM} {currencyInfo.label}
                </p>
                <p>
                  Listing Deadline:
                  <span className=" text-lava-100">{props.item.deadline}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 h-full p-4 pb-0">
            <div className="flex justify-center">
              <div
                style={{
                  backgroundColor:
                    Number(props.item.classify) === PriceClassification.Elite
                      ? '#C59F59'
                      : Number(props.item.classify) ===
                        PriceClassification.Premium
                      ? '#D91118'
                      : '#131444',
                }}
                className={`flex-1  text-center   px-4 py-1 rounded-md`}
                role="alert"
              >
                <p className="text-antiFlashWhite-100 font-spAdvBold flex justify-center text-xl font-bold leading-9 tracking-wider text-center">
                  {Number(props.item.classify) === PriceClassification.Elite
                    ? 'ELITE'
                    : Number(props.item.classify) ===
                      PriceClassification.Premium
                    ? 'PREMIUM'
                    : 'PRO'}
                </p>
              </div>
            </div>
            <ul className="flex flex-wrap items-center py-6 mx-auto space-y-1 text-left">
              {props.item.features.map((item: any, index: any) => (
                <li
                  key={index}
                  className="text-darkGunmetal-200 -tracking-normal flex items-start w-full h-full text-base font-bold leading-7"
                >
                  <img src={checkLavaIcon} alt="checkLava" />
                  <span className="ml-2">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:flex items-center justify-end mt-12 space-x-6 text-right">
          <Link
            className="text-darkGunmetal-200 font-spAdvBold text-xs font-bold leading-4 underline"
            to={`/single-team?id=${props.item.id}`}
          >
            About Team
          </Link>
          <SpAdvButton onClick={() => goToSelectCar()}>
            Purchase Sponsorship
          </SpAdvButton>
        </div>
      </div>
    </div>
  );
};

export default ListViewCard;
