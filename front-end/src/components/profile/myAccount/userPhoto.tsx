import React from 'react';
import ImageUploader from 'react-images-upload';
import SpAdvCard from '../../shared/SpAdvCard';
import { loggedUser } from '../../../assets/images';
function UserPhoto() {
  return (
    <SpAdvCard title="Your Photo" className="mt-10">
      <div className="flex items-center">
        <img
          className=" float-left w-16 h-16 mr-3 rounded-full"
          src={loggedUser}
          alt="user photo"
        />
        <div>
          <p className=" text-darkGunmetal-300 font-spAdvRegular mb-3 text-sm font-normal leading-5">
            Edit Your Photo
          </p>
          <div className="flex">
            <label className=" text-neutral-900 font-spAdvRegular mr-3 text-sm font-normal leading-5 cursor-pointer">
              Delete
            </label>
            <label className=" text-lava-100 font-spAdvRegular text-sm font-normal leading-5 underline cursor-pointer">
              Change
            </label>
          </div>
        </div>
      </div>
      <div>
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
      </div>
    </SpAdvCard>
  );
}

export default UserPhoto;
