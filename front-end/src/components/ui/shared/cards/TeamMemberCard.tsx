import React from 'react';
import { Link } from 'react-router-dom';
import SpAdvIcon from '../SpAdvIcon';
import { arrowIcon } from '../../../../assets/images';
import TwitterShare from '../shareTweet';
import FacebookShare from '../shareFacebook';

const TeamMemberCard = (props: any) => {
  return (
    <div>
      <div className="sp-adv-card bg-antiFlashWhite-100 py-1 !cursor-pointer">
        <Link to={`/single-driver?id=${props.item.id}`}>
          <div className="border-antiFlashWhite-800 rounded-xl max-w-sm m-4 my-3 border-2 cursor-pointer">
            <div className="inline-block w-full">
              <img
                className="object-cover object-top w-full h-56 rounded-t-lg"
                src={props.item.profile_image}
                alt=""
              />
            </div>
            <div className="relative flex flex-col p-4 px-5 pb-16 space-y-2">
              <div className="text-base font-bold tracking-tight text-black">
                {/* <img
              src={props.item.flag}
              className="float-left w-2 mt-2 mr-2"
              alt="flag"
            /> */}
                {props.item.name}
                <span className=" text-neutral-400 ml-1 text-xs">
                  -{props.item.type}
                </span>
              </div>
              <p className="text-neutral-400 mb-3 text-sm font-normal">
                {props.item.email}
              </p>
              <div
                className={`absolute bottom-0 flex items-center right-4 w-full justify-end`}
              >
                <Link to={`/single-driver?id=${props.item.id}`}>
                  <SpAdvIcon
                    image={arrowIcon}
                    ParentClassName="flex items-center sp-adv-rec-arrow-lava mb-3 justify-center bg-lava-100"
                  />
                </Link>
              </div>
            </div>
          </div>
        </Link>
      </div>
      {props.isShareSocial && (
        <div className="flex mt-2">
          <TwitterShare
            msg={`Sponsor ${props.item.team} on `}
            hashTags={['Racing', 'NFTs']}
          />
          <FacebookShare
            msg={`Sponsor ${props.item.team} on `}
            hashTags={['Racing', 'NFTs']}
          />
        </div>
      )}
    </div>
  );
};

export default TeamMemberCard;
