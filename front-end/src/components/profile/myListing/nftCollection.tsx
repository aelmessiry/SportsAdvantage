import React from 'react';
import MintNftCard from '../../ui/shared/cards/MintNftCard';
import { NFTCollectionData } from '../../../data/nftCollectionData';

function NFTCollection() {
  return (
    <div className="flex mt-10 flex-col ">
      <div className=" text-xl mb-3 font-semibold font-spAdvSemiBold leading-9 text-darkGunmetal-200">
        NFT Collection
      </div>
      <p className=" text-neutral-400 text-sm font-normal leading-5">
        Felis, neque faucibus lacus ultricies suspendisse lacus, ac consequat.
        Id commodo quam sit euismod lectus dapibus commodo. Senectus varius diam
        varius sit lorem maecenas commodo in et. Ultrices eu.
      </p>
      <div className="flex flex-wrap justify-start my-10">
        {NFTCollectionData.map((d: any, index: any) => (
          <div className="lg:w-1/3 h-full pr-4" key={index}>
            <MintNftCard item={d} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NFTCollection;
