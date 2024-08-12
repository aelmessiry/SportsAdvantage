import React from 'react';
import { Link } from 'react-router-dom';

import { arrowIcon } from '../../assets/images';
import SpAdvIcon from '../ui/shared/SpAdvIcon';
import { useSelectedSpot } from '../../contexts/SelectedSpotContext';
import { useSelectedCurrency } from '../../contexts/CurrencyContext';
function SelectSpotSingle(props: any) {
  console.log('ddddd', props);
  const { currencyInfo } = useSelectedCurrency();
  const [spotClicked, setSpotClicked] = React.useState(false);
  const { setSpotData, selectedSpots } = useSelectedSpot();
  console.log(spotClicked, selectedSpots);
  React.useEffect(() => {
    if (selectedSpots && selectedSpots.length > 0) {
      const isSelectedExist = selectedSpots.findIndex(
        ({ id }) => id == props.data.id
      );
      isSelectedExist > -1 ? setSpotClicked(true) : setSpotClicked(false);
    } else {
      setSpotClicked(false);
    }
  }, [selectedSpots]);
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

  const handleSelectSpot = () => {
    const newSpots =
      selectedSpots && selectedSpots.filter(({ id }) => id != props.data.id);
    spotClicked
      ? setSpotData(newSpots)
      : setSpotData(
          selectedSpots && selectedSpots.length > 0
            ? [...selectedSpots, props.data]
            : [props.data]
        );
  };
  return (
    <div
      key={props.data.id}
      className={`${props.data.className} spot-card flex h-20 shrink-0 justify-between w-full sp-adv-spot-body`}
      onMouseOver={() => hoverAdSpot(props.data.className)}
      onMouseLeave={() =>
        !spotClicked && leaveHoverAdSpot(props.data.className)
      }
      onClick={() => {
        handleSelectSpot();
        setSpotClicked(!spotClicked);
      }}
    >
      <div
        className={` bg-cetaceanBlue-600 shadow-inner-xl p-5  rounded-tl-md rounded-bl-md  ${
          spotClicked && 'border border-lava-100 rounded-tl-md rounded-bl-md '
        }  
      `}
      >
        <div className=" font-spAdvSemiBold bg-lava-100 text-antiFlashWhite-100 flex items-center justify-center w-10 h-10 text-2xl font-semibold leading-10 rounded-full">
          {props.data.positionNumber}
        </div>
      </div>
      <div
        className={`  grow flex flex-col py-2 pl-4 border ${
          spotClicked ? ' border-lava-100' : 'border-neutral-100'
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

      <Link
        onClick={(e) => {
          e.stopPropagation();
          handleSelectSpot();
        }}
        to={'/selected-spot'}
      >
        <SpAdvIcon
          image={arrowIcon}
          ParentClassName={`flex items-center h-full px-6 rounded-tr-md rounded-br-md  justify-center bg-lava-100 atr-spot-action`}
        />
      </Link>
    </div>
  );
}

export default SelectSpotSingle;
