import React from 'react';
import {
  checkLavaIcon,
  //etherumGoldIcon,
} from '../../assets/images';
import { useSelectedCurrency } from '../../contexts/CurrencyContext';
function PricingList(props: any) {
  const { currencyInfo } = useSelectedCurrency();
  return (
    <div className="lg:px-6 max-w-screen-xl px-4 mx-auto">
      <div className=" pb-14 shadow-outline-main-card border-1 border-antiFlashWhite-800 flex flex-col max-w-lg mx-auto text-center rounded-lg">
        <div
          style={{
            backgroundColor: props.item.color,
          }}
          className={` text-antiFlashWhite-100 rounded-tr-lg rounded-tl-lg py-8 text-center`}
        >
          <div className="font-spAdvBold mb-2 text-3xl font-bold leading-normal tracking-wider">
            {props.item.title}
          </div>
          <div className="font-spAdvRegular text-lg italic font-light leading-7 tracking-wide">
            {props.item.subTitle}
          </div>
        </div>
        <div className="p-6">
          <ul role="list" className="mb-2 space-y-3 text-left">
            {props.item.features.map((feature, index) => (
              <li
                key={index}
                className="text-darkGunmetal-200 font-spAdvBold flex items-start space-x-3 text-sm font-bold leading-6 tracking-wider"
              >
                <img src={checkLavaIcon} alt="checkLava" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div className=" flex flex-col space-y-3">
          <div className=" text-darkGunmetal-200 font-spAdvBold mt-2 text-xl font-bold leading-9 text-center">
            Minimum Purchase
          </div>
          <div className="text-darkGunmetal-200 font-spAdvBold flex items-center justify-center text-xl font-bold leading-9 text-center">
            <img
              src={currencyInfo.image}
              alt="etherumGoldIcon"
              className="h-9 mr-2"
            />
            <span className=" text-darkGunmetal-200 font-spAdvSemiBold text-h1 font-semibold leading-relaxed">
              {props.item.purchase}
            </span>
          </div>
          <div className=" text-neutral-400 font-spAdvBold text-base font-bold leading-6">
            {props.item.priceInUSD}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingList;
