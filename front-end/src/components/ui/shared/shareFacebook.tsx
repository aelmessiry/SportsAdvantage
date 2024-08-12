import React from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { Tooltip } from 'flowbite-react';

const FacebookShare = ({ msg, hashTags }) => {
  return (
    <div className="rounded-full">
      <Tooltip
        content={`Share in Facebook`}
        placement="top"
        className=" text-white bg-black"
      >
        <FacebookShareButton
          hashtag={hashTags}
          url={`https://market.sportsadvantage.io/`}
          title={msg}
        >
          <FacebookIcon size="32" round />
        </FacebookShareButton>
      </Tooltip>
    </div>
  );
};
export default FacebookShare;
