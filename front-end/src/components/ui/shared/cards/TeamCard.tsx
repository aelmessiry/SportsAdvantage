import React from 'react';
import { arrowIcon } from '../../../../assets/images';
import SpAdvIcon from '../SpAdvIcon';
import { Link } from 'react-router-dom';
import TwitterShare from '../shareTweet';
import FacebookShare from '../shareFacebook';
const TeamCard = (props: any) => {
  return (
    <div>
      <div className="sp-adv-card bg-antiFlashWhite-100 cursor-pointer">
        <Link to={`/single-team?id=${props.item.id}`}>
          <div className="max-w-sm py-5 cursor-pointer">
            <div className="relative flex justify-center">
              <img
                className="object-cover w-full h-56 rounded-t-lg"
                src={props.item.image}
                alt=""
              />
              {/* <img
            src={props.item.seasonLogo}
            alt="logo"
            className=" left-1 top-4 absolute w-20"
          />
          <img
            src={props.item.eventLogo}
            alt="logo"
            className=" right-1 top-2 absolute w-10"
          /> */}
            </div>
            <div className="relative p-4 px-5 pb-16">
              <h5 className="flex items-center text-base font-bold tracking-tight text-black">
                {/* {props.isShowTeamDetails && (
              <img
                className=" float-left w-3 mr-1"
                src={props.item.logo}
                alt="team"
              />
            )} */}
                {props.item.name}
              </h5>
              <p className="text-neutral-400 mb-3 text-sm font-normal">
                {props.item.website}
              </p>

              <div
                className={`absolute bottom-0 flex items-center right-4 w-full  justify-end`}
              >
                <Link to={`/single-team?id=${props.item.id}`}>
                  <SpAdvIcon
                    image={arrowIcon}
                    ParentClassName="flex items-center sp-adv-rec-arrow-lava justify-center bg-lava-100"
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
            msg={`Sponsor ${props.item.name} on `}
            hashTags={['Racing', 'NFTs']}
          />
          <FacebookShare
            msg={`Sponsor ${props.item.name} on `}
            hashTags={['Racing', 'NFTs']}
          />
        </div>
      )}
    </div>
  );
};

export default TeamCard;
