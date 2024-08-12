import React from 'react';
import moment from 'moment';
import { locationIcon, eventFlagIcon } from '../../assets/images';
function SingleEvent(props: any) {
  return (
    <div className="flex flex-wrap justify-start py-2 mx-auto">
      <div className="lg:w-1/6">
        <img src={eventFlagIcon} alt="eventFlagIcon" />
      </div>
      <div className="lg:w-5/6 h-full px-4">
        <div className="flex flex-col space-y-2">
          <div className=" text-darkGunmetal-200 text-sm font-bold leading-6">
            {props.item.title}
          </div>
          <div className="flex items-center flex-1">
            <img src={locationIcon} className="w-4 h-4 mr-1" />
            <span className="text-neutral-400 text-xs font-normal">
              {props.item.location}
            </span>
          </div>
          <div className=" text-neutral-500 text-xs font-normal leading-6">
            {moment(new Date(props.item.start)).format('DD-MM-YYYY h:mm a')}
          </div>
          <div className=" text-neutral-500 text-xs font-normal leading-6">
            {props.item.description}
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default SingleEvent;
