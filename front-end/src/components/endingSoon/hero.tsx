import React from 'react';
//import SpAdvLink from '../ui/SpAdvLink';
import {
  hero4,
  judgeIcon,
  //etherumIcon,
  monitorIcon,
  casperWhiteIcon,
} from '../../assets/images';
import SpAdvIcon from '../ui/shared/SpAdvIcon';
export default function Hero() {
  return (
    <div className="lg:flex-row flex flex-col items-center justify-between w-full mb-10">
      <div className="lg:mb-0 lg:max-w-lg lg:pr-5 sm:max-w-xl md:max-w-full md:px-24 lg:px-8 lg:py-20 px-4 py-16 mx-auto mb-16">
        <div className="max-w-xl mb-6">
          <div>
            <p className="lg:leading-loose text-h1 text-darkGunmetal-200 inline-block py-px mb-4 font-bold leading-snug tracking-normal rounded-full">
              Ending Soon
            </p>
          </div>
        </div>
        {/* <div className="flex items-center">
          <SpAdvLink
            to="/explore"
            isButtonStyle={true}
            className="font-spAdvRegular tracking-normal"
          >
            View all Opportunities
          </SpAdvLink>
        </div> */}
      </div>
      <div className="lg:mb-0 lg:max-w-lg lg:pr-5 sm:max-w-xl md:max-w-full md:px-24 lg:px-8 lg:py-20 relative px-4 py-16 mx-auto mb-16">
        <div className="relative">
          <img className="object-cover" src={hero4} alt="" />
          <SpAdvIcon
            image={judgeIcon}
            ParentClassName=" absolute -left-4  md:-left-12 top-2  md:top-5 sp-adv-rec-lava sp-adv-rec-lava_judge flex items-center justify-center rounded-md bg-lava-100"
          />
          <SpAdvIcon
            image={casperWhiteIcon}
            ParentClassName=" absolute -left-1  md:-left-5 top-24 md:top-26 sp-adv-rec-lava sp-adv-rec-lava_etherum flex items-center justify-center rounded-md bg-lava-100"
          />
          <SpAdvIcon
            image={monitorIcon}
            ParentClassName="absolute -right-2 md:-right-5 sp-adv-rec-lava sp-adv-rec-lava_left_bottom  sp-adv-rec-lava_msg  flex items-center justify-center rounded-md bg-lava-100 bottom-6"
          />
        </div>
      </div>
    </div>
  );
}
