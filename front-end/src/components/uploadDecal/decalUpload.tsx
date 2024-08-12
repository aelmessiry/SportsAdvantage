import React from 'react';
import ImageUploader from 'react-images-upload';
import SpAdvCard from '../shared/SpAdvCard';
import SpAdvButton from '../ui/SpAdvButton';
import { MyAdSpotsStatus } from '../../Enum/myAdSpotsStatus';
import { uploadedDecal } from '../../assets/images';
function DecalUpload(props: any) {
  return (
    <SpAdvCard
      title={
        <div className="flex items-center">
          <div className=" text-darkGunmetal-300 font-spAdvRegular mr-3 text-xl font-bold leading-9">
            Decal Upload
          </div>
          <div className="text-neutral-400 text-sm font-normal leading-5">
            <div className="float-left mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M19 10C19 14.968 14.968 19 10 19C5.032 19 1 14.968 1 10C1 5.032 5.032 1 10 1C14.968 1 19 5.032 19 10Z"
                  stroke="#D91118"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.338 12.862L10.548 11.197C10.062 10.909 9.66602 10.216 9.66602 9.64898V5.95898"
                  stroke="#D91118"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className=" text-lava-100 text-sm font-normal leading-6">
              <b>Upload Deadline:</b> 07/08/2022
            </span>
          </div>
        </div>
      }
    >
      <div>
        {Number(props.status) === MyAdSpotsStatus.ReSubmit ? (
          <>
            <div className="text-darkGunmetal-300 font-spAdvSemiBold flex text-lg font-semibold leading-7">
              <div>
                <div className="float-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <path
                      d="M10.5 19.248C15.3125 19.248 19.25 15.3105 19.25 10.498C19.25 5.68555 15.3125 1.74805 10.5 1.74805C5.6875 1.74805 1.75 5.68555 1.75 10.498C1.75 15.3105 5.6875 19.248 10.5 19.248Z"
                      fill="#D91118"
                    />
                    <line
                      x1="14"
                      y1="7.59099"
                      x2="7.10571"
                      y2="14.4853"
                      stroke="white"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                    />
                    <line
                      x1="14.4118"
                      y1="14.0934"
                      x2="7.12451"
                      y2="7.61588"
                      stroke="white"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                Rejected
              </div>
              <div className="flex ml-5">
                <div className="float-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_443_15534)">
                      <path
                        d="M8.33268 16.6673H16.666V18.7507H8.33268V16.6673ZM8.33268 12.5007H16.666V14.584H8.33268V12.5007ZM14.5827 2.08398H6.24935C5.10352 2.08398 4.16602 3.02148 4.16602 4.16732V20.834C4.16602 21.9798 5.0931 22.9173 6.23893 22.9173H18.7493C19.8952 22.9173 20.8327 21.9798 20.8327 20.834V8.33398L14.5827 2.08398ZM18.7493 20.834H6.24935V4.16732H13.541V9.37565H18.7493V20.834Z"
                        fill="#B9B9B9"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_443_15534">
                        <rect width="25" height="25" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className=" text-darkGunmetal-200 font-base font-semibold underline">
                  Decal_Image.png
                </div>
              </div>
            </div>
            <div className=" text-neutral-400 mt-2 text-sm font-normal leading-5">
              Massa tellus eget nam magna cursus turpis massa in. Tempor dictum
              purus imperdiet elementum. Morbi dui blandit nullam urna,
              placerat. Suspendisse proin malesuada sed lobortis in. At neque
              nam ac a non eget libero nec. Nisl feugiat dui enim integer proin
              in. Nisl at eget sollicitudin at. Sagittis, nunc, a amet eu. Non
              sed pulvinar facilisis pellentesque vivamus egestas mattis.
            </div>
          </>
        ) : Number(props.status) === MyAdSpotsStatus.Rejected ||
          Number(props.status) === MyAdSpotsStatus.Approved ? (
          <>
            <p className=" text-darkGunmetal-300 font-spAdvSemiBold text-lg font-semibold leading-7">
              Your decal has been successfully uploaded.
            </p>
            <div className=" text-neutral-400 mt-2 text-sm font-normal leading-5">
              A porttitor sem neque eget odio imperdiet nibh maecenas. Facilisis
              dolor non cursus mi nec tristique in lacus. Aliquet maecenas
              praesent ultrices urna nam. Dui at eu enim sit accumsan tristique
              fames.
            </div>
          </>
        ) : Number(props.status) === MyAdSpotsStatus.Pending ? (
          <div className=" text-neutral-400 mt-2 text-sm font-normal leading-5">
            A porttitor sem neque eget odio imperdiet nibh maecenas. Facilisis
            dolor non cursus mi nec tristique in lacus. Aliquet maecenas
            praesent ultrices urna nam. Dui at eu enim sit accumsan tristique
            fames.
          </div>
        ) : (
          <>
            <p className=" text-darkGunmetal-300 font-spAdvSemiBold text-lg font-semibold leading-7">
              Please Upload Decal
            </p>
            <div className=" text-neutral-400 mt-2 text-sm font-normal leading-5">
              Please write your message to the sponsoring manager and they will
              get back to you as soon as possible. Or directly contact them with
              the information provided below.
            </div>
          </>
        )}
      </div>
      <div
        className={`${
          Number(props.status) !== MyAdSpotsStatus.Rejected &&
          Number(props.status) !== MyAdSpotsStatus.Approved &&
          Number(props.status) !== MyAdSpotsStatus.Pending &&
          'border border-antiFlashWhite-700 rounded mt-5'
        }`}
      >
        {Number(props.status) === MyAdSpotsStatus.Rejected ||
        Number(props.status) === MyAdSpotsStatus.Approved ||
        Number(props.status) === MyAdSpotsStatus.Pending ? (
          <div className="flex items-center my-6">
            <img src={uploadedDecal} alt="uploadedDecal" />
            <div className="ml-5">
              <div className="flex">
                <div className="float-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_443_15534)">
                      <path
                        d="M8.33268 16.6673H16.666V18.7507H8.33268V16.6673ZM8.33268 12.5007H16.666V14.584H8.33268V12.5007ZM14.5827 2.08398H6.24935C5.10352 2.08398 4.16602 3.02148 4.16602 4.16732V20.834C4.16602 21.9798 5.0931 22.9173 6.23893 22.9173H18.7493C19.8952 22.9173 20.8327 21.9798 20.8327 20.834V8.33398L14.5827 2.08398ZM18.7493 20.834H6.24935V4.16732H13.541V9.37565H18.7493V20.834Z"
                        fill="#B9B9B9"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_443_15534">
                        <rect width="25" height="25" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className=" text-darkGunmetal-200 font-base font-semibold underline">
                  Decal_Image.png
                </div>
              </div>
              <div className="flex mt-4">
                <label className=" text-neutral-900 font-spAdvRegular mr-3 text-sm font-normal leading-5 underline cursor-pointer">
                  Delete
                </label>
                <label className=" text-lava-100 font-spAdvRegular text-sm font-normal leading-5 underline cursor-pointer">
                  Change
                </label>
              </div>
            </div>
          </div>
        ) : (
          <ImageUploader
            singleImage
            withIcon={true}
            buttonText="Click to upload"
            onChange={() => {
              //  onDrop(e, true);
            }}
            buttonClassName=" !bg-transparent !text-neutral-900"
            imgExtension={['.jpg', '.gif', '.png']}
            maxFileSize={20209230}
            withPreview={true}
            label={'Max file size: 20mb, accepted: jpg|gif|png'}
            labelClass=" !text-neutral-900 !font-normal"
            className="sp-adv-photo-upload"
          />
        )}
      </div>
      {(Number(props.status) === MyAdSpotsStatus.Rejected ||
        Number(props.status) === MyAdSpotsStatus.Approved ||
        Number(props.status) === MyAdSpotsStatus.Pending) && (
        <div>
          <div className=" font-spAdvSemiBold border-b-antiFlashWhite-300 py-5 text-xl font-semibold leading-9 border-b">
            Decal Status
          </div>
          <div className="p-4 px-6">
            <p className=" font-spAdvRegular">
              <div className="float-left mr-2">
                {Number(props.status) === MyAdSpotsStatus.Approved ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <path
                      d="M10.5 19.248C15.3125 19.248 19.25 15.3105 19.25 10.498C19.25 5.68555 15.3125 1.74805 10.5 1.74805C5.6875 1.74805 1.75 5.68555 1.75 10.498C1.75 15.3105 5.6875 19.248 10.5 19.248Z"
                      fill="#2AB377"
                    />
                    <path
                      d="M6.78125 10.4997L9.2575 12.9759L14.2188 8.02344"
                      stroke="white"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : Number(props.status) === MyAdSpotsStatus.Pending ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <path
                      d="M10.5 19.248C15.3125 19.248 19.25 15.3105 19.25 10.498C19.25 5.68555 15.3125 1.74805 10.5 1.74805C5.6875 1.74805 1.75 5.68555 1.75 10.498C1.75 15.3105 5.6875 19.248 10.5 19.248Z"
                      fill="#388DF6"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <path
                      d="M10.5 19.248C15.3125 19.248 19.25 15.3105 19.25 10.498C19.25 5.68555 15.3125 1.74805 10.5 1.74805C5.6875 1.74805 1.75 5.68555 1.75 10.498C1.75 15.3105 5.6875 19.248 10.5 19.248Z"
                      fill="#D91118"
                    />
                    <line
                      x1="14"
                      y1="7.59099"
                      x2="7.10571"
                      y2="14.4853"
                      stroke="white"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                    />
                    <line
                      x1="14.4118"
                      y1="14.0934"
                      x2="7.12451"
                      y2="7.61588"
                      stroke="white"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>
              {Number(props.status) === MyAdSpotsStatus.Approved
                ? 'Approved'
                : Number(props.status) === MyAdSpotsStatus.Pending
                ? 'Pending'
                : 'Rejected'}
            </p>

            {Number(props.status) === MyAdSpotsStatus.Approved ? (
              <div className=" text-neutral-400 mt-4 text-sm font-normal leading-5">
                A porttitor sem neque eget odio imperdiet nibh maecenas.
                Facilisis dolor non cursus mi nec tristique in lacus. Aliquet
                maecenas praesent ultrices urna nam. Dui at eu enim sit accumsan
                tristique fames.
              </div>
            ) : Number(props.status) === MyAdSpotsStatus.Pending ? (
              <div className=" text-neutral-400 mt-4 text-sm font-normal leading-5">
                Thank you for submitting your decal, it is under review for
                approval. Please check status for pendinng approvals under ‘My
                Listings’. This may take 2-3 business days.
              </div>
            ) : (
              <div className=" text-neutral-400 mt-4 text-sm font-normal leading-5">
                Massa tellus eget nam magna cursus turpis massa in. Tempor
                dictum purus imperdiet elementum. Morbi dui blandit nullam urna,
                placerat. Suspendisse proin malesuada sed lobortis in. At neque
                nam ac a non eget libero nec. Nisl feugiat dui enim integer
                proin in. Nisl at eget sollicitudin at. Sagittis, nunc, a amet
                eu. Non sed pulvinar facilisis pellentesque vivamus egestas
                mattis.
              </div>
            )}
            {Number(props.status) === MyAdSpotsStatus.Rejected && (
              <div className=" text-neutral-400 mt-4 text-sm font-normal leading-5">
                Please contact sponsorship management with questionns or
                concerns below.
              </div>
            )}
          </div>
        </div>
      )}
      {Number(props.status) !== MyAdSpotsStatus.Rejected &&
        Number(props.status) !== MyAdSpotsStatus.Approved &&
        Number(props.status) !== MyAdSpotsStatus.Pending && (
          <div
            className={`${
              Number(props.status) === MyAdSpotsStatus.Empty
                ? 'justify-end'
                : 'justify-between'
            } flex items-end mt-5`}
          >
            {Number(props.status) == MyAdSpotsStatus.ReSubmit && (
              <div className=" text-neutral-400 font-base font-normal">
                Please re-submit your decal for approval.
              </div>
            )}
            <SpAdvButton disabled={true} className=" w-40 h-12">
              {Number(props.status) == MyAdSpotsStatus.ReSubmit
                ? 'Re-Submit'
                : 'Submit'}
            </SpAdvButton>
          </div>
        )}
    </SpAdvCard>
  );
}

export default DecalUpload;
