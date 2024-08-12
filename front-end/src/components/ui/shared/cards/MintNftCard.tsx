import React from 'react';
import { cardLogoBadge } from '../../../../assets/images';
import SpAdvButton from '../../SpAdvButton';
const MintNftCard = (props: any) => {
  return (
    <div className=" rounded border shadow-outline-mint-card border-antiFlashWhite-300 bg-antiFlashWhite-100 p-4">
      <div className=" relative">
        <img
          className="sp-adv-mint-card-nft w-full"
          src={props.item.image}
          alt=""
        />
        <img
          className="rounded-t-lg absolute top-0 left-0"
          src={cardLogoBadge}
          alt=""
        />
      </div>
      <div className="p-5">
        <div className="mb-2 text-lg font-spAdvSemiBold text-darkGunmetal-200 font-semibold leading-7">
          {props.item.name}
        </div>
        <div className="mb-2 text-black text-sm italic font-semibold leading-5 font-spAdvRegular ">
          {props.item.player}
        </div>
        <p className="mb-3 text-neutral-400 text-sm font-normal font-spAdvRegular left-5">
          {props.item.description}
        </p>
        <SpAdvButton className="w-full !py-0">Mint NFT</SpAdvButton>
      </div>
    </div>
  );
};

export default MintNftCard;
