import React from 'react';
import SpAdvCard from '../shared/SpAdvCard';
import {
  teamDecal,
  carDecal,
  locationIcon,
  //etherumGoldIcon,
} from '../../assets/images';
import SpAdvLargeCardModal from '../ui/shared/modals/SpAdvLargeCardModal';
import { NFTCollectionData } from '../../data/nftCollectionData';
import { useSelectedCurrency } from '../../contexts/CurrencyContext';
function DecalDetails() {
  const { currencyInfo } = useSelectedCurrency();
  const [openLargeView, setOpenLargeView] = React.useState(false);
  const selectedItem = NFTCollectionData[0];

  return (
    <SpAdvCard className="my-10">
      <div className="flex flex-wrap justify-center py-6 mx-auto">
        <div className="lg:w-1/3 h-full p-4">
          <img src={teamDecal} alt="team" />
          <div className="flex justify-between">
            <div className=" font-spAdvBold mt-4 text-base font-bold text-black">
              Fach Auto Tech
            </div>
            <div className="flex items-center justify-end flex-1">
              <img src={locationIcon} className="w-4 h-4 mr-1" />
              <span className="text-neutral-400 text-xs font-bold">
                Switzerland
              </span>
            </div>
          </div>
          <div className="flex my-4 text-sm font-normal leading-5 text-black">
            <span className=" font-bold">Car</span> | Driver Name
          </div>
          <p className=" text-neutral-400 text-xs font-normal">
            Lacus aliquam lobortis convallis morbi ornare urna, arcu. Tortor, mi
            tristique sit sed. Ultrices nibh posuere leo quis. Sed diam id
            cursus integer feugiat. Est purus sollicitudin molestie aenean sit
            ut lacus pretium ut. Nulla morbi mauris diam, turpis sagittis.
          </p>
        </div>
        <div className="lg:w-2/3 lg:pl-16 h-full p-4">
          <div className=" text-darkGunmetal-200 text-sm font-bold">
            Decal Location
          </div>
          <div className="flex flex-wrap justify-between py-6 mx-auto">
            <div>
              <div className=" mb-3 text-xl font-bold leading-7">
                4 - left door
              </div>
              <div className="flex items-center">
                <div className="font-spAdvBold text-darkGunmetal-200 text-sm font-bold leading-5 text-left">
                  <img
                    className="float-left w-5 mr-2"
                    src={currencyInfo.image}
                  />
                  total{' '}
                  <b className=" text-lg">
                    {((103 * 2000) / 0.05).toLocaleString('en-US')}{' '}
                    {currencyInfo?.label}
                  </b>
                </div>
              </div>
            </div>
            <div className=" text-sm font-bold">
              <p> Decal Size: 34.45cm x 54cm</p>
              <p>
                Price per cm: {((0.24 * 2000) / 0.05).toLocaleString('en-US')}{' '}
                {currencyInfo?.label}
              </p>
              <p>
                Listing Deadline:
                <span className=" text-lava-100">Aug 30 2022</span>
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className=" bg-darkGunmetal-500 inline-block w-full rounded-md">
              <img src={carDecal} alt="carDecal" className="w-full" />
              <div className=" w-full pr-6 mb-3 text-right">
                <button
                  className=" text-sm font-semibold text-white underline"
                  onClick={() => {
                    setOpenLargeView(true);
                  }}
                >
                  View Larger
                </button>
                {openLargeView && (
                  <SpAdvLargeCardModal
                    show={openLargeView}
                    item={selectedItem}
                    handleCloseParent={() => {
                      setOpenLargeView(false);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SpAdvCard>
  );
}

export default DecalDetails;
