import React from 'react';
import { CarPositionsData } from '../../data/carPositions';

//import SpAdvButton from '../ui/SpAdvButton';
import SelectSpotSingle from '../shared/SelectSpotSingle';
import { ReservedSpots } from '../../data/resevedSpots';
import SelectSpotCartSingle from '../shared/SelectSpotCartSingle';
import SpAdvButton from '../ui/SpAdvButton';
import { useNavigate } from 'react-router-dom';
import { useSelectedSpot } from '../../contexts/SelectedSpotContext';
export default function SpotLocation(props) {
  let navigate = useNavigate();
  const { selectedSpots, selectedSpotsToPurchase } = useSelectedSpot();
  let spotsData;
  if (props.isCart) {
    if (props.selectedPos) {
      spotsData = selectedSpots?.filter(
        (data) => data.order === props.selectedPos
      );
    } else {
      spotsData = selectedSpots?.filter(({ id }: any) => id.includes('rear'));
    }
  } else {
    if (props.selectedPos) {
      spotsData = CarPositionsData.find(
        (data) => data.order === props.selectedPos
      ).spots;
    } else {
      spotsData = CarPositionsData[0].spots;
    }
  }
  React.useEffect(() => {
    if (ReservedSpots && ReservedSpots.length > 0) {
      ReservedSpots.forEach((item) => {
        const allElements = document.getElementsByClassName(item.spot);
        for (var i = 0; i < allElements.length; i++) {
          allElements[i].classList.add(
            item.reservedByLoginUser ? 'hoverdSpotGreen' : 'hoverdSpotRed',
            'disabledItem'
          );
        }
      });
    }
  }, [ReservedSpots, props.selectedPos]);

  const goToSelectedSpot = () => {
    navigate(`/selected-spot`);
  };
  const goToPurchaseSpot = () => {
    navigate(`/purchase-spot`);
  };
  //const [spotsData,setSpotsData]=React.useState( props.selectedPos?: );
  return (
    <div className=" rounded-tl-4xl rounded-bl-4xl lg:flex-row bg-antiFlashWhite-400 shadow-outline-spot-selection h-full py-12 mb-10">
      <div className="lg:px-16 flex flex-col px-4">
        <div className="text-darkGunmetal-200 font-spAdvSemiBold mb-2 text-xl font-semibold leading-9">
          Decal Placements
        </div>
        <div className=" text-darkGunmetal-200 font-spAdvRegular text-base font-normal leading-6">
          Please select one of the following numbers on the vehicle to purchase
        </div>
      </div>
      {!props.isCart && (
        <div className="flex justify-end">
          <SpAdvButton
            onClick={() => {
              goToSelectedSpot();
            }}
            className={` bg-transparent hover:shadow-none flex items-center justify-end px-6 py-3 text-sm uppercase transition duration-150 ease-in-out ${
              selectedSpots == undefined || null || selectedSpots.length <= 0
                ? 'pointer-events-none !text-neutral-300'
                : 'text-lava-100'
            } `}
            disabled={
              selectedSpots == undefined || null || selectedSpots.length <= 0
            }
          >
            Go To Purchase
          </SpAdvButton>
        </div>
      )}
      <div className="md:px-2 sp-adv-spot-container py-8 mt-8">
        <div className=" h-96 sp-adv-spot-selection flex flex-col items-start w-full gap-3 px-4 overflow-y-auto">
          {spotsData &&
            spotsData?.map((data) =>
              props.isCart ? (
                <SelectSpotCartSingle data={data} key={data.id} />
              ) : (
                <SelectSpotSingle data={data} key={data.id} />
              )
            )}
        </div>
      </div>
      {props.isCart && (
        <div className="w-full px-6 mt-10">
          <SpAdvButton
            className={` ${
              selectedSpotsToPurchase == undefined ||
              (null && 'pointer-events-none')
            } w-full `}
            disabled={selectedSpotsToPurchase == undefined || null}
            onClick={() => goToPurchaseSpot()}
          >
            Checkout
          </SpAdvButton>
        </div>
      )}
    </div>
  );
}
