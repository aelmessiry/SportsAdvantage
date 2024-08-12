import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import SpAdvButton from '../../SpAdvButton';
import toast from 'react-hot-toast';
import axios from 'axios';
import SpAdvTextArea from '../../SpAdvTextArea';
import { Spinner } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faClose } from '@fortawesome/free-solid-svg-icons';
import { seasonPlaceHolder } from '../../../../assets/images';
import SpAdvInput from '../../SpAdvInput';
import { useDropzone } from 'react-dropzone';
import ReactPlayer from 'react-player';
import { APIERRORHandling } from '../../../../Enum/apiErrorHandling';
import SingleMetaDataAttribute from '../../../admin/teams/singleMetaDataAttribute';
const SpAdvAddNFTMetaDataModal = (props: any) => {
  const [open, setOpen] = useState(props.show);
  const [isAddNFTButtonClicked, setIsAddNFTButtonClicked] = useState(false);
  const [attributes, setAttributes] = useState(
    props.metaData && props.metaData.attributes ? props.metaData.attributes : []
  );
  const fileImgNFTInput = React.useRef();
  const [uploadedNFTImage, setUploadedNFTImage] = React.useState();
  const [videoSizeErrors, setVideoSizeErrors] = useState('');
  const posterImage =
    !props?.metaData?.poster?.startsWith('https://') &&
    !props?.metaData?.poster?.startsWith('http://')
      ? `https://${props?.metaData?.poster}`
      : props?.metaData?.poster;
  const nftMainImage =
    !props?.metaData?.image?.startsWith('https://') &&
    !props?.metaData?.image?.startsWith('http://')
      ? `https://${props?.metaData?.image}`
      : props?.metaData?.image;
  const [nftImage, setNFTImage] = React.useState(
    props.metaData && props.metaData?.poster
      ? posterImage
      : props.metaData && props.metaData?.image
      ? nftMainImage
      : seasonPlaceHolder
  );
  const [uploadedVideoToView, setUploadedVideoToView] = useState(
    props.metaData && props.metaData?.poster
      ? !props?.metaData?.image?.startsWith('https://') &&
        !props?.metaData?.image?.startsWith('http://')
        ? `https://${props?.metaData?.image}`
        : props?.metaData?.image
      : undefined
  );
  const [uploadedVideo, setUploadedVideo] = useState();
  const [selectedNFTtype, setSelectedNFTtype] = useState(
    props.metaData && props.metaData?.poster ? 'video' : 'image'
  );
  const resetImages = () => {
    setUploadedNFTImage(undefined);
    setUploadedVideo(undefined);
    setUploadedVideoToView(
      props.metaData && props.metaData?.poster
        ? !props?.metaData?.image?.startsWith('https://') &&
          !props?.metaData?.image?.startsWith('http://')
          ? `https://${props?.metaData?.image}`
          : props?.metaData?.image
        : undefined
    );
    setNFTImage(
      props.metaData && props.metaData?.poster
        ? posterImage
        : props.metaData && props.metaData?.image
        ? nftMainImage
        : seasonPlaceHolder
    );
  };
  const handleCancel = (index) => {
    var array = [...attributes]; // make a separate copy of the array
    if (index !== -1) {
      array.splice(index, 1);
      setAttributes(array);
    }
  };

  const onDrop = (acceptedFiles, fileRejections) => {
    fileRejections.forEach((file) => {
      file.errors.forEach((err) => {
        if (err.code === 'file-too-large') {
          setVideoSizeErrors(`Error: Max allowed size is 4MB`);
        }

        if (err.code === 'file-invalid-type') {
          setVideoSizeErrors(`Error: ${err.message}`);
        }
      });
    });
    // Ensure only one file is uploaded
    const file = acceptedFiles[0];
    if (file) {
      // Display the video preview
      setUploadedVideoToView(URL.createObjectURL(file));
      setUploadedVideo(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'video/*': [] }, // Specify the accepted file types (e.g., video/* for any video format)
    maxFiles: 1, // Limit the number of files to 1
    maxSize: 4194304, //4mb
  });

  const uploadProfile = async (e) => {
    setNFTImage(URL.createObjectURL(e.target.files[0]));
    setUploadedNFTImage(e.target.files[0]);
  };
  const InitialInputs = () => ({
    inputs: {
      title: props.metaData ? props.metaData.title : '',
      description: props.metaData ? props.metaData.description : '',
    },
  });
  const [state, setState] = React.useState(InitialInputs());
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    const { inputs }: any = state;

    inputs[name] = value;
    setState({
      ...state,
      inputs,
    });
  };
  const handleSaveVideo = async () => {
    let videoURL;
    var formdata: any = new FormData();
    formdata.append('file', uploadedVideo);
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_META_DATA_API}/upload_asset_pinata`,
      data: formdata,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
      },
    })
      .then((response) => {
        if (response.data.code === APIERRORHandling.OK) {
          videoURL = response.data.result[0];
        }
      })
      .catch(() => {
        toast.error('Something went wrong please try again later!');
        videoURL = undefined;
      });
    return videoURL;
  };
  const cancelButtonRef = useRef(null);
  const handleAddMetaData = async () => {
    try {
      setIsAddNFTButtonClicked(true);
      const videoURL = selectedNFTtype === 'video' && (await handleSaveVideo());
      if (
        (selectedNFTtype === 'video' && videoURL) ||
        selectedNFTtype === 'image'
      ) {
        const sharedAttr = {
          title: state.inputs.title.trim(),
          description: state.inputs.description,
          attributes: attributes,
          type: 'Genesis',
          image:
            selectedNFTtype === 'image' && props?.metaData?.poster
              ? props?.metaData?.poster
              : (selectedNFTtype === 'video' && props?.metaData?.poster) ||
                (selectedNFTtype === 'image' && !props?.metaData?.poster)
              ? props?.metaData?.image
              : videoURL,
        };
        var formdata: any = new FormData();
        uploadedNFTImage && formdata.append('file', uploadedNFTImage); //poster image in case video or nft image in case image
        formdata.append('team_id', props?.id);
        formdata.append('hasVideo', selectedNFTtype === 'video');
        selectedNFTtype === 'video'
          ? formdata.append(
              'nft_metadata',
              JSON.stringify({
                ...sharedAttr,
                poster: props?.metaData?.poster
                  ? props?.metaData?.poster
                  : props?.metaData?.image,
              })
            )
          : formdata.append('nft_metadata', JSON.stringify({ ...sharedAttr }));
        await axios({
          method: 'post',
          url: `${import.meta.env.VITE_BACKEND_META_DATA_API}/nft_metadata`,
          data: formdata,
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
          },
        })
          .then(() => {
            toast.success('Data Saved Successfully');
            props.approvedChanged();
          })
          .catch(() => {
            toast.error('Something went wrong please try again later!');
          });
      }
    } catch (err) {
      toast.error(err.message);
    }
    props.handleCloseParent();
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          static
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={() => {
            setOpen(false);
            props.handleCloseParent();
          }}
        >
          <div className="sm:block sm:p-0 flex items-end justify-center min-h-screen pt-4 pb-20 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 mr-4 transition-opacity bg-gray-500 bg-opacity-75" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="sm:inline-block sm:align-middle sm:h-screen hidden"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="sm:my-8 sm:align-middle sm:w-full lg:max-w-3xl shadow-info-modal border-cetaceanBlue-300 bg-cetaceanBlue-100 inline-block max-w-md max-h-full overflow-hidden text-left align-bottom transition-all transform rounded-md">
                <div className="bg-cetaceanBlue-100px-14 sm:pb-4 py-6">
                  <div className="sm:flex sm:items-start w-full">
                    <div className="sm:mt-0 sm:text-left w-full mt-3 text-center">
                      <Dialog.Title className=" border-b-neutral-1100 font-spAdvSemiBold text-darkGunmetal-300 relative flex items-start py-2 text-sm font-semibold leading-5 border-b">
                        <div className="text-antiFlashWhite-100 font-spAdvSemiBold lg:text-xl flex-1 text-lg font-semibold leading-loose text-center">
                          Add NFT Meta data
                        </div>
                        <div
                          className="bg-cetaceanBlue-500 border-lava-100 right-2 lg:p-2 md:p-1 absolute p-0 border cursor-pointer"
                          onClick={() => {
                            setOpen(false);
                            props.handleCloseParent();
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M8.82408 10.0005L5.24074 6.42548C5.08382 6.26856 4.99567 6.05573 4.99567 5.83381C4.99567 5.6119 5.08382 5.39907 5.24074 5.24215C5.39766 5.08523 5.61049 4.99707 5.83241 4.99707C6.05433 4.99707 6.26715 5.08523 6.42407 5.24215L9.99907 8.82548L13.5741 5.24215C13.731 5.08523 13.9438 4.99707 14.1657 4.99707C14.3877 4.99707 14.6005 5.08523 14.7574 5.24215C14.9143 5.39907 15.0025 5.6119 15.0025 5.83381C15.0025 6.05573 14.9143 6.26856 14.7574 6.42548L11.1741 10.0005L14.7574 13.5755C14.8355 13.653 14.8975 13.7451 14.9398 13.8467C14.9821 13.9482 15.0039 14.0571 15.0039 14.1671C15.0039 14.2772 14.9821 14.3861 14.9398 14.4876C14.8975 14.5892 14.8355 14.6813 14.7574 14.7588C14.6799 14.8369 14.5878 14.8989 14.4862 14.9412C14.3847 14.9835 14.2758 15.0053 14.1657 15.0053C14.0557 15.0053 13.9468 14.9835 13.8453 14.9412C13.7437 14.8989 13.6515 14.8369 13.5741 14.7588L9.99907 11.1755L6.42407 14.7588C6.34661 14.8369 6.25444 14.8989 6.15289 14.9412C6.05134 14.9835 5.94242 15.0053 5.83241 15.0053C5.7224 15.0053 5.61348 14.9835 5.51193 14.9412C5.41038 14.8989 5.31821 14.8369 5.24074 14.7588C5.16264 14.6813 5.10064 14.5892 5.05833 14.4876C5.01602 14.3861 4.99424 14.2772 4.99424 14.1671C4.99424 14.0571 5.01602 13.9482 5.05833 13.8467C5.10064 13.7451 5.16264 13.653 5.24074 13.5755L8.82408 10.0005Z"
                              fill="#fff"
                            />
                          </svg>
                        </div>
                      </Dialog.Title>
                      <div className="lg:p-8 text-neutral-400 text-sm font-normal">
                        <div className="flex items-center gap-2 mb-5">
                          <label>
                            <input
                              type="radio"
                              id="image-nft"
                              name="nftType"
                              value="image"
                              onChange={(e) => {
                                setSelectedNFTtype(e.target.value);
                                resetImages();
                              }}
                              className="ml-4"
                              checked={selectedNFTtype === 'image'}
                            />
                            Image NFT
                          </label>

                          <label>
                            <input
                              type="radio"
                              id="video-nft"
                              name="nftType"
                              value="video"
                              onChange={(e) => {
                                setSelectedNFTtype(e.target.value);
                              }}
                              className="ml-4"
                              checked={selectedNFTtype === 'video'}
                            />
                            Video NFT
                          </label>
                        </div>
                        <div className="flex">
                          <div
                            className={` ${
                              selectedNFTtype === 'image'
                                ? 'w-full'
                                : 'lg:w-1/2'
                            } `}
                          >
                            <div className=" w-fit">
                              <label className=" text-white">
                                {selectedNFTtype === 'image'
                                  ? 'NFT Image'
                                  : 'Poster Image'}
                              </label>
                              <div className="relative">
                                <img
                                  className=" border-antiFlashWhite-100 lg:w-56 lg:h-56 rounded-2 w-24 h-24 border-4"
                                  src={nftImage}
                                  alt="driver"
                                />
                                <label className=" bottom-4 bg-neutral-600 absolute right-0 z-20 p-3 text-white rounded-full cursor-pointer">
                                  <FontAwesomeIcon
                                    icon={faCameraRetro}
                                    className="mr-1"
                                    size="lg"
                                  />
                                  <input
                                    accept="*/*"
                                    className=" hidden"
                                    type="file"
                                    ref={fileImgNFTInput}
                                    onChange={(e) => uploadProfile(e)}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                          {selectedNFTtype === 'video' && (
                            <div className="lg:w-1/2 flex flex-col w-full">
                              <label className=" text-white">NFT Video</label>
                              <div className=" p-4 border-2 border-white border-dashed rounded-md cursor-pointer">
                                <div {...getRootProps()}>
                                  <input {...getInputProps()} />
                                  {isDragActive ? (
                                    <p>Drop the video here...</p>
                                  ) : (
                                    <p>
                                      Drag & drop a video file here, or click to
                                      select one
                                    </p>
                                  )}
                                  <p
                                    style={{
                                      color: 'red',
                                      padding: 5,
                                      margin: 0,
                                      fontSize: 14,
                                    }}
                                  >
                                    {videoSizeErrors}
                                  </p>
                                </div>

                                {(uploadedVideo ||
                                  (props.metaData &&
                                    props.metaData?.poster)) && (
                                  <div className="mt-5">
                                    <ReactPlayer
                                      url={uploadedVideoToView}
                                      controls
                                      width="100%"
                                      height="auto"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col justify-center w-full mt-4">
                          <div className="flex justify-center w-full">
                            <SpAdvInput
                              placeholder="NFT title"
                              name="title"
                              value={state.inputs.title}
                              onChange={(e: any) => handleChange(e)}
                              label="NFT title"
                              required={true}
                              type="text"
                              className="w-full h-full"
                              labelClassName=" text-white"
                            />
                          </div>
                          <div className="flex justify-center w-full mt-4">
                            <SpAdvTextArea
                              placeholder="NFT Description "
                              name="description"
                              value={state.inputs.description}
                              onChange={(e: any) => handleChange(e)}
                              label="Enter NFT Description"
                              required={true}
                              type="text"
                              labelClassName=" text-white"
                              className="w-full"
                            />
                          </div>
                          <div className="flex w-full mt-4">
                            <label>NFT Attributes</label>
                          </div>
                          <div className="flex w-full mt-4">
                            <SingleMetaDataAttribute
                              isAdd={true}
                              AddedAttrs={(data) => {
                                setAttributes([data, ...attributes]);
                              }}
                            />
                          </div>
                          <div>
                            {attributes &&
                              attributes.map((attr, index) => (
                                <div className="flex items-center" key={index}>
                                  <SingleMetaDataAttribute
                                    attr={attr}
                                    key={index}
                                  />
                                  <FontAwesomeIcon
                                    icon={faClose}
                                    onClick={() => handleCancel(index)}
                                  />
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="lg:w-1/2 h-full">
                          <SpAdvButton
                            className="w-full"
                            onClick={() => {
                              handleAddMetaData();
                            }}
                            disabled={
                              (selectedNFTtype == 'video' &&
                                (uploadedVideo === undefined ||
                                  uploadedVideoToView === undefined)) ||
                              (!props?.metaData &&
                                uploadedNFTImage === undefined) ||
                              state.inputs.title.trim() == '' ||
                              state.inputs.description.trim() === ''
                            }
                          >
                            {isAddNFTButtonClicked ? <Spinner /> : 'Save'}
                          </SpAdvButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default SpAdvAddNFTMetaDataModal;
