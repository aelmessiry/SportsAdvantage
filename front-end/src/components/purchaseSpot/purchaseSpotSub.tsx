import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { nft } from '../../assets/images';
import BackToHistory from '../shared/BackToHistory';
import SpAdvButton from '../ui/SpAdvButton';
import { useSelectedCurrency } from '../../contexts/CurrencyContext';
export default function PurchaseSpotSub() {
  const { currencyInfo } = useSelectedCurrency();
  let navigate = useNavigate();
  const goToUploadDecal = () => {
    navigate('/upload-decal-after-purchase');
  };
  return (
    <div className="md:px-16 lg:flex-row px-4 mb-10">
      <BackToHistory text="Back" />
      <div className=" flex justify-center">
        <div className=" lg:w-1/2 flex flex-col">
          <div className="border-b-neutral-1000 flex flex-col pb-3 border-b">
            <div className="text-darkGunmetal-200 font-spAdvSemiBold mb-2 text-xl font-semibold leading-9">
              Sponsorship NFT
            </div>
            <div className=" text-neutral-400 font-spAdvRegular text-base font-normal leading-6">
              Every purchasse comes with a unique sponsorship NFT that can be
              used for future perks.
            </div>
          </div>
          <div className=" flex flex-wrap mt-10">
            <div className="lg:w-1/2 flex flex-col pr-6">
              <img src={nft} alt="nft" />
            </div>
            <div className="lg:w-1/2 flex flex-col pl-6">
              <div className=" text-darkGunmetal-200 font-spAdvSemiBold mb-2 text-lg font-semibold leading-7">
                This NFT includes the following:
              </div>
              <details className="border-y-neutral-1000 border-y py-3" open>
                <summary className="flex items-center justify-between w-full py-3 font-medium text-left bg-transparent outline-none cursor-pointer">
                  Purchase Details
                  <svg
                    data-accordion-icon
                    className="shrink-0 w-3 h-3 rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </summary>
                <div className="text-antiFlashWhite-600 flex justify-between mb-2 text-sm font-normal">
                  <p>Purchase Date</p>
                  <p>August 30, 2022</p>
                </div>
                <div className="text-antiFlashWhite-600 flex justify-between mb-2 text-sm font-normal">
                  <p>Price per cm</p>
                  <p>
                    {((0.24 * 2000) / 0.05).toLocaleString('en-US')} (
                    {currencyInfo?.label})
                  </p>
                </div>
                <div className="text-antiFlashWhite-600 flex justify-between mb-2 text-sm font-normal">
                  <p>Decal Location</p>
                  <p>4a - Left Door</p>
                </div>
                <div className="text-antiFlashWhite-600 flex justify-between mt-5 mb-2 text-sm font-normal">
                  <p>Total Price</p>
                  <p className=" font-semibold text-right">
                    <span className="text-right">
                      {((73.3 * 2000) / 0.05).toLocaleString('en-US')}{' '}
                      {currencyInfo?.label}
                    </span>
                    <br />
                    <span className=" font-normal">$73.3 USD</span>
                  </p>
                </div>
              </details>
              <div className="lg:flex items-center justify-end mt-12 space-x-6 text-right">
                <Link
                  className="text-darkGunmetal-200 font-spAdvBold text-xs font-bold leading-4 underline"
                  to={`/list-cards`}
                >
                  Continue Shopping
                </Link>
                <SpAdvButton
                  className="grow flex-1"
                  onClick={() => goToUploadDecal()}
                >
                  Purchase
                </SpAdvButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
