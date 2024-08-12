import { Spinner } from 'flowbite-react';
import React, { useEffect } from 'react';

const NftCard = (props) => {
  const [isVideo, setIsVideo] = React.useState<String | undefined>();
  const url = import.meta.env.VITE_APP_CPR_LINK_LIVE;
  const nftUrl = `${url}${props.nft.contract_package_hash}/nfts/${props.nft.token_id}`;
  const checkIsIPFSContentVideo = (url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then((blob) => {
        if (blob.type.includes('image')) {
          setIsVideo('image');
        } else if (blob.type.includes('video')) {
          setIsVideo('video');
        } else {
          setIsVideo(undefined);
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setIsVideo(undefined);
      });
  };
  useEffect(() => {
    checkIsIPFSContentVideo(props.nft.image);
  }, []);
  return (
    <a href={nftUrl} target="_blank" rel="noopener noreferrer">
      <div className="sp-adv-card max-w-sm py-5 mt-5">
        <div className="relative flex justify-center">
          {isVideo == 'video' ? (
            <video
              autoPlay={false}
              controls
              poster={props.nft.poster}
              height={'100%'}
              className=" nft-video rounded-4xl shadow-white become-member object-cover h-56 p-1 shadow-md"
            >
              <source src={props.nft.image} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : isVideo == 'image' ? (
            <img
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
              }}
              className="object-contain h-56 rounded-t-lg"
              src={props.nft.image}
              alt={props.nft.title}
            />
          ) : (
            <div className="h-56">
              <Spinner />
            </div>
          )}
        </div>
        <div className="relative p-4 px-5 pb-16">
          <h5 className="flex items-center text-base font-bold tracking-tight text-black">
            {props.nft.title} #{props.nft.token_id}
          </h5>
          <p className="text-neutral-400 mb-3 text-sm font-normal">
            <p>Type: {props.nft.type}</p>
            <p>Description: {props.nft.description}</p>
          </p>
        </div>
      </div>
    </a>
  );
};

export default NftCard;
