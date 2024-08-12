import React from 'react';

import { cartWhiteIcon, cartIcon } from '../../assets/images';
import SpAdvIcon from '../ui/shared/SpAdvIcon';
import { useSelectedSpot } from '../../contexts/SelectedSpotContext';
import { useSelectedCurrency } from '../../contexts/CurrencyContext';
function SelectSpotCartSingle(props: any) {
  const { currencyInfo } = useSelectedCurrency();
  const [selectedSpot, setSelectedSpot] = React.useState(false);
  const { selectedSpotsToPurchase, setSpotsToPurchaseData } = useSelectedSpot();
  React.useEffect(() => {
    const allElements = document.getElementsByClassName(props.data.className);
    for (var i = 0; i < allElements.length; i++) {
      allElements[i].classList.add('hoverdSpotOrange');
    }
  }, []);
  const hoverAdSpot = (pos) => {
    const allElements = document.getElementsByClassName(pos);
    for (var i = 0; i < allElements.length; i++) {
      allElements[i].classList.add('hoverdSpotOrange');
    }
  };
  const leaveHoverAdSpot = (pos) => {
    const allElements = document.getElementsByClassName(pos);
    if (allElements.length > 0) {
      for (var i = 0; i < allElements.length; i++) {
        allElements[i].classList.remove('hoverdSpotOrange');
      }
    }
  };

  const handleSelectSpotCart = () => {
    const newSpots =
      selectedSpotsToPurchase &&
      selectedSpotsToPurchase.filter(({ id }) => id != props.data.id);
    selectedSpot
      ? setSpotsToPurchaseData(newSpots)
      : setSpotsToPurchaseData(
          selectedSpotsToPurchase && selectedSpotsToPurchase.length > 0
            ? [...selectedSpotsToPurchase, props.data]
            : [props.data]
        );
  };
  return (
    <div
      key={props.data.id}
      className={`${props.data.className} spot-card flex h-20 shrink-0 justify-between w-full sp-adv-spot-body`}
      onMouseOver={() => hoverAdSpot(props.data.className)}
      onMouseLeave={() =>
        !selectedSpot && leaveHoverAdSpot(props.data.className)
      }
      onClick={() => {
        handleSelectSpotCart();
        setSelectedSpot(!selectedSpot);
      }}
    >
      <div
        className={` bg-cetaceanBlue-600 shadow-inner-xl p-5  rounded-tl-md rounded-bl-md  ${
          selectedSpot && 'border border-lava-100 rounded-tl-md rounded-bl-md '
        }  
      `}
      >
        <div className=" font-spAdvSemiBold bg-lava-100 text-antiFlashWhite-100 flex items-center justify-center w-10 h-10 text-2xl font-semibold leading-10 rounded-full">
          {props.data.positionNumber}
        </div>
      </div>
      <div
        className={`  grow flex flex-col py-2 pl-4 border ${
          selectedSpot ? ' border-lava-100' : 'border-neutral-100'
        }`}
      >
        <div className=" text-darkGunmetal-200 mb-0 text-xs font-bold leading-5">
          {props.data.name}
        </div>
        <div className=" text-darkGunmetal-200 text-xs font-medium leading-5">
          {props.data.size}
        </div>
        <div className="flex items-center flex-1">
          <img src={currencyInfo.image} className="w-4 mr-1" />
          <span className="text-neutral-400 mr-1 text-xs font-normal">
            from
          </span>
          <span className="text-darkGunmetal-200 text-xs font-bold">
            {props.data.price} {currencyInfo.label}
          </span>
        </div>
      </div>
      <SpAdvIcon
        image={selectedSpot ? cartIcon : cartWhiteIcon}
        ParentClassName={`${
          selectedSpot ? 'px-4 ' : 'px-6'
        } flex items-center h-full rounded-tr-md rounded-br-md  justify-center bg-lava-100 `}
        SubClassName={
          selectedSpot && ' sp-adv-selected-spot-icon rounded-full p-2'
        }
      />
    </div>
  );
}

export default SelectSpotCartSingle;
