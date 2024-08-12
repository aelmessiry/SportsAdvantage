import React from 'react';
import { Link } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import { checkGreenIcon } from '../../assets/images';
import SpAdvButton from '../ui/SpAdvButton';
import { useSelectedSpot } from '../../contexts/SelectedSpotContext';
import SpAdvSpotFinalLookModal from '../ui/shared/modals/SpAdvSpotFinalLookModal';

export default function UploadDecalAfterPurchaseSub() {
  const [openLargeView, setOpenLargeView] = React.useState(false);
  const { selectedSpots } = useSelectedSpot();
  return (
    <div className="md:px-16 lg:flex-row px-4 mb-10">
      <div className=" flex justify-center">
        <div className=" lg:w-1/2 flex flex-col">
          <div className="flex flex-col">
            <div className="text-darkGunmetal-200 font-spAdvSemiBold mb-10 text-xl font-semibold leading-9 text-center">
              Congratulations, you have purchased a listing!
              <br /> Please upload your decal for approval.
            </div>
          </div>
          <div className="border-neutral-1000 flex justify-between p-3 border rounded-md">
            <div className="text-darkGunmetal-200 font-spAdvSemiBold text-lg font-semibold leading-9 text-center">
              Your order is confirmed
            </div>
            <img src={checkGreenIcon} alt="checkGreenIcon" />
          </div>
          <div className="border-neutral-1000 flex flex-col justify-between p-3 my-5 border rounded-md">
            <div className="text-darkGunmetal-200 font-spAdvSemiBold text-lg font-semibold leading-9">
              Upload your Decal
            </div>
            <div className=" text-neutral-400 font-spAdvRegular text-base font-normal leading-6">
              Et justo, dictumst nulla mi quis nam senectus adipiscing. Cursus
              orci felis varius odio sed hendrerit fermentum sed.
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
          </div>
          <div className="lg:flex items-center justify-end mt-12 space-x-6 text-right">
            <div className="lg:w-1/2 justify-end">
              <Link
                className="text-darkGunmetal-200 font-spAdvBold mr-4 text-xs font-bold leading-4 underline"
                to={`/`}
              >
                Add Decal Later
              </Link>
              <SpAdvButton
                className="grow flex-1 w-32"
                onClick={() => setOpenLargeView(true)}
              >
                Next
              </SpAdvButton>
              {openLargeView && (
                <SpAdvSpotFinalLookModal
                  show={openLargeView}
                  item={selectedSpots[0]}
                  handleCloseParent={() => {
                    setOpenLargeView(false);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
