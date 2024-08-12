import React from 'react';
import { TwitterShareButton } from 'react-share';
import twitterIcon from '../../../assets/images/logo/x-dark-logo.webp';
import { Tooltip } from 'flowbite-react';
const TwitterShare = ({ msg, hashTags }) => {
  return (
    <div>
      <Tooltip
        content={`Share in Twitter`}
        placement="top"
        className=" text-white bg-black"
      >
        <TwitterShareButton
          title={msg}
          url={`${window.location.origin}`}
          hashtags={hashTags}
        >
          <img src={twitterIcon} className={` w-8 h-8 cursor-pointer`} />
        </TwitterShareButton>
      </Tooltip>
    </div>
  );
};
export default TwitterShare;
