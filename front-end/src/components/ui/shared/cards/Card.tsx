import React from 'react';
import { Tooltip } from 'react-tooltip';
import {
  //etherumGoldIcon,
  arrowIcon,
} from '../../../../assets/images';
import SpAdvIcon from '../SpAdvIcon';
import TwitterShare from '../shareTweet';
import FacebookShare from '../shareFacebook';

const Card = (props: any) => {
  return (
    <div>
      <div className="sp-adv-card bg-antiFlashWhite-100">
        <div className="max-w-sm py-5">
          <div className="relative flex justify-center">
            <img
              className="object-cover w-full h-56 rounded-t-lg"
              src={props.item.image}
              alt=""
            />
            {/* {props.isShowTeamDetails && (
            <img
              src={props.item.seasonLogo}
              alt="logo"
              className=" left-1 top-4 absolute w-20"
            />
          )}
          {props.isShowTeamDetails && (
            <img
              src={props.item.eventLogo}
              alt="logo"
              className=" right-1 top-2 absolute w-10"
            />
          )} */}
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
              {/* {props.isShowTeamDetails && (
              <span className=" text-neutral-400 ml-1 text-xs">
                -{props.item.driverName}
              </span>
            )} */}
            </h5>
            <div className="text-neutral-400 mb-3 text-sm font-normal">
              {/* {props.isShowTeamDetails ? ( */}
              <>
                <p>Team: {props.item.team}</p>
                <p>Model: {props.item.model}</p>
                {/* <p>Max Size: {props.item.maxSize}</p>
                <p>Price per cm2: {props.item.Pricepercm2}</p>
                <p>PR Value: {props.item.PRValue}</p> */}
              </>
              {/* ) : (
              props.item.description
            )} */}
            </div>
            {/* <div className="flex">
            {props.item.time && (
              <div className="flex items-center flex-1">
                <img src={clockIcon} className="w-4 h-4 mr-1" />
                <span className="text-lava-100 text-md font-bold">
                  {props.item.time}
                </span>
              </div>
            )}

            <div className="flex items-center flex-1">
              <img src={currencyInfo.image} className="w-4 mr-1" />
              <span className="text-neutral-400 mr-1 text-xs font-normal">
                from
              </span>
              <span className="text-darkGunmetal-200 text-xs font-bold">
                {props.item.price} {currencyInfo.label}
              </span>
            </div>

            {props.item.location && (
              <div className="flex items-center justify-end flex-1">
                <img src={locationIcon} className="w-4 h-4 mr-1" />
                <span className="text-neutral-400 text-xs font-bold">
                  {props.item.location}
                </span>
              </div>
            )}
          </div> */}
            <div
              className={`absolute bottom-0 flex items-center right-4 w-full justify-end
              `}
            >
              <div>
                <Tooltip anchorSelect=".contact" place="top">
                  Contact us to Sponsors
                </Tooltip>
                <div
                  onClick={() =>
                    window.open(
                      `${import.meta.env.VITE_CONTACT_SPONSOR_FORM}?Offer=${
                        props.item.name
                      }`,
                      '_blank'
                    )
                  }
                  className="contact"
                >
                  <SpAdvIcon
                    image={arrowIcon}
                    ParentClassName="flex items-center sp-adv-rec-arrow-lava justify-center bg-lava-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
      {props.isShareSocial && (
        <div className="flex mt-2">
          <TwitterShare
            msg={`Sponsor ${props.item.team} on `}
            hashTags={['hashtag1', 'hashtag2']}
          />
          <FacebookShare
            hashTags={'#Sports_Advantage'}
            msg={`Sponsor ${props.item.team} on `}
          />
        </div>
      )}
    </div>
  );
};

export default Card;
