import React from 'react';
import SpAdvCard from '../shared/SpAdvCard';
import { nft } from '../../assets/images';
import SpAdvInfoModal from '../ui/shared/modals/SpAdvInfoModal';
import { useSelectedCurrency } from '../../contexts/CurrencyContext';
function SponsorshipNFT() {
  const { currencyInfo } = useSelectedCurrency();
  return (
    <SpAdvCard
      title={
        <div className="flex items-start">
          <div className="flex-1">
            <p className=" text-darkGunmetal-300 font-spAdvSemiBold mb-3 text-xl font-semibold leading-9">
              Sponsorship NFT
            </p>
            <div className="text-neutral-400 flex text-sm font-normal leading-5">
              Hac massa nunc non nisi. Nulla vestibulum risus quis feugiat eu
              id. Aenean quis laoreet nulla aenean non amet.
            </div>
          </div>
          <div>
            <SpAdvInfoModal title={'Sponsorship NFT'} id={'sponsorNFT'}>
              <div className=" text-neutral-400 text-sm font-normal leading-5">
                Nibh et neque, eget nulla tincidunt diam. Diam id sagittis et
                diam fusce consectetur nulla sed quam. Nunc morbi urna, accumsan
                eget etiam arcu mauris fermentum porttitor. Cras tempor, in non,
                sit neque. Tempus dui tortor, est tincidunt semper magna ut.
                Ipsum, odio massa scelerisque parturient at egestas. Purus sit
                et quis pellentesque enim convallis. Nec hendrerit pharetra odio
                rhoncus.
              </div>
            </SpAdvInfoModal>
          </div>
        </div>
      }
    >
      <div className="flex items-center justify-center">
        <img src={nft} alt="nft" />
      </div>
      <div className="border-b-neutral-1000 flex justify-between my-5 border-b">
        <div className=" text-darkGunmetal-200 py-4 text-lg font-semibold leading-7">
          This NFT includes the following:
        </div>
        <SpAdvInfoModal title={'NFT Details'} id={'nftDetails'}>
          <div className=" text-neutral-400 text-sm font-normal leading-5">
            Nibh et neque, eget nulla tincidunt diam. Diam id sagittis et diam
            fusce consectetur nulla sed quam. Nunc morbi urna, accumsan eget
            etiam arcu mauris fermentum porttitor. Cras tempor, in non, sit
            neque. Tempus dui tortor, est tincidunt semper magna ut. Ipsum, odio
            massa scelerisque parturient at egestas. Purus sit et quis
            pellentesque enim convallis. Nec hendrerit pharetra odio rhoncus.
          </div>
        </SpAdvInfoModal>
      </div>
      <details>
        <summary className="flex items-center justify-between w-full p-5 px-4 py-3 font-medium text-left bg-transparent outline-none cursor-pointer">
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
        <div className="border-b-neutral-1000 p-5 border-b">
          <div className="text-antiFlashWhite-600 flex justify-between mb-2 text-sm font-normal">
            <p>Purchase Date</p>
            <p>August 30, 2022</p>
          </div>
          <div className="text-antiFlashWhite-600 flex justify-between mb-2 text-sm font-normal">
            <p>Price per cm</p>
            <p>
              {((0.24 * 2000) / 0.05).toLocaleString('en-US')}{' '}
              {currencyInfo?.label}
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
        </div>
      </details>
    </SpAdvCard>
  );
}

export default SponsorshipNFT;
