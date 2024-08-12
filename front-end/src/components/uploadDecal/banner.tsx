import React from 'react';
import { MyAdSpotsStatus } from '../../Enum/myAdSpotsStatus';
import BackToHistory from '../shared/BackToHistory';
function Banner(props: any) {
  return (
    <div className="md:px-16 lg:flex-row px-4 my-6">
      <BackToHistory text="Back to My Ad Spots" />
      {Number(props.status) !== MyAdSpotsStatus.Approved &&
        Number(props.status) !== MyAdSpotsStatus.Pending &&
        Number(props.status) !== MyAdSpotsStatus.Rejected && (
          <div className="flex my-10">
            <div
              className={` ${
                Number(props.status) === MyAdSpotsStatus.ReSubmit
                  ? ' bg-lava-300'
                  : 'bg-cetaceanBlue-400  '
              } flex-1  px-4 py-5 rounded-md`}
              role="alert"
            >
              <p
                className={`${
                  Number(props.status) === MyAdSpotsStatus.ReSubmit
                    ? ' text-lava-100'
                    : 'text-cetaceanBlue-200'
                }  text-sm  font-normal`}
              >
                {Number(props.status) === MyAdSpotsStatus.ReSubmit ? (
                  <span>
                    Please Re-Submit<b className="ml-1"> Sponsorship DECAL</b>
                  </span>
                ) : (
                  'Please Upload Decal'
                )}
              </p>
            </div>
          </div>
        )}
    </div>
  );
}

export default Banner;
